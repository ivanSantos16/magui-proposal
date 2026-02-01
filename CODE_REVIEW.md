# Code Review Report

## Summary

The project demonstrates good architectural separation with feature-based component organization, centralized constants, and reusable hooks. However, several areas need attention: **duplicated Tailwind class strings** (not using `cn()` helper consistently), **potential memory leaks** in the music hook, **missing TypeScript types** in utilities, **accessibility gaps**, and **performance optimizations** through memoization. The codebase is generally clean but would benefit from DRY principles applied to styling and some React best practices.

---

## Blockers

### [src/lib/utils.js:4] Missing TypeScript types in cn() utility
**Why it matters**: Type safety leak; `cn()` helper lacks proper TypeScript types, reducing IDE support and type checking.
**Action**: Convert to `.ts` and add proper type annotations:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### [src/hooks/useMusic.ts:34-38] Potential memory leak in volume fade interval
**Why it matters**: The `setInterval` in `unmuteOnInteraction` may not be cleared if component unmounts during fade, causing memory leaks.
**Action**: Store interval ID and clear in cleanup:
```typescript
const fadeInterval = setInterval(() => {
  v += 0.05;
  audioRef.current!.volume = v;
  if (v >= MUSIC.VOLUME) {
    clearInterval(fadeInterval);
  }
}, 100);

// In cleanup:
if (fadeInterval) clearInterval(fadeInterval);
```

### [src/components/timeline/Timeline.tsx:32] Using array index as React key
**Why it matters**: Can cause rendering issues and state bugs when timeline items are reordered or filtered.
**Action**: Use stable IDs. Add `id` field to `TimelineItemData` type and use `item.id` as key.

---

## Major

### [src/components/timeline/TimelineItem.tsx:24,51,68] Duplicated Tailwind class strings
**Why it matters**: Violates DRY principle; repeated class combinations (`bg-gradient-to-br from-rose-500/20 to-pink-500/20`, `backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl`) appear 3+ times without abstraction.
**Action**: Extract common card styles to utility classes or use `cn()` with shared constants:
```typescript
// In utils/styles.ts or constants
export const cardBaseClasses = "backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl";
export const photoCardClasses = cn(cardBaseClasses, "bg-gradient-to-br from-rose-500/20 to-pink-500/20");
export const quoteCardClasses = cn(cardBaseClasses, "bg-white/5");
export const memoryCardClasses = cn(cardBaseClasses, "bg-gradient-to-br from-rose-500/10 to-pink-500/10");
```

### [src/components/timeline/TimelineItem.tsx] Missing React.memo optimization
**Why it matters**: TimelineItem re-renders unnecessarily when parent updates, impacting performance with many items.
**Action**: Wrap component with `React.memo`:
```typescript
export const TimelineItem = React.memo(({ item }: TimelineItemProps) => {
  // ... component code
});
```

### [src/components/proposal/SuccessModal.tsx:38-42] Image missing proper accessibility attributes
**Why it matters**: Decorative image should be marked as such, or have descriptive alt text if meaningful.
**Action**: Add `role="presentation"` or improve alt text:
```typescript
<img 
  src={gorilaEmoji} 
  alt="Gorila emoji decorativo" 
  role="presentation"
  className="w-8 h-8 object-contain inline-block align-middle"
/>
```

### [src/hooks/useMusic.ts:54] Missing dependency in useEffect
**Why it matters**: `useEffect` depends on `autoPlay` but cleanup function references it indirectly; could cause stale closures.
**Action**: Ensure all dependencies are listed, or restructure to avoid closure issues.

---

## Minor

### [src/components/timeline/TimelineItem.tsx:17,45,62] Repeated wrapper div structure
**Why it matters**: Same wrapper pattern (`<div ref={ref} className="relative pl-12 mb-20">`) repeated 3 times.
**Action**: Extract to a wrapper component or use a shared constant for the className.

### [src/components/proposal/ProposalSection.tsx:25,32] Long className strings not using cn()
**Why it matters**: Harder to maintain and merge; `cn()` utility exists but isn't used.
**Action**: Use `cn()` for className merging, especially for conditional classes.

### [src/components/effects/Fireworks.tsx:21] Using array index as key
**Why it matters**: Particles are static but using index as key is not ideal practice.
**Action**: Generate stable IDs or use a combination that ensures uniqueness.

### [src/components/music/MusicControl.tsx:17] Long className string should use cn()
**Why it matters**: Consistency with project standards; easier to maintain.
**Action**: Consider extracting common button styles or using `cn()`.

### [src/hooks/useMusic.ts] Missing return type annotation
**Why it matters**: TypeScript best practice; improves type inference and documentation.
**Action**: Add explicit return type:
```typescript
export const useMusic = (autoPlay: boolean = true): { musicPlaying: boolean; toggleMusic: () => void } => {
```

---

## Nits

### [src/components/proposal/SuccessModal.tsx:36] Inline flex classes could use cn()
**Minor cleanup**: `className="text-xl text-white mb-4 font-light flex items-center justify-center gap-2"` could benefit from `cn()` for consistency.

### [src/components/timeline/FierySphere.tsx] Large component (>200 lines)
**Consideration**: Component is complex; consider extracting flame rendering logic into separate components or hooks.

### [src/components/loading/LoadingScreen.tsx:27] setTimeout not cleared in cleanup
**Low risk**: The `setTimeout` for `onComplete` callback isn't stored/cleared, but it's low risk since component unmounts after completion.

### [src/App.tsx:22] Hook dependency on derived state
**Minor**: `useMusic(!loading)` depends on `loading` state; consider if this pattern is intentional or could be simplified.

---

## Refactor Plan (DRY-first, minimal risk)

1. **Step 1**: Convert `src/lib/utils.js` to TypeScript with proper types.
2. **Step 2**: Fix memory leak in `useMusic` hook (interval cleanup).
3. **Step 3**: Extract repeated Tailwind class combinations to shared constants/utilities.
4. **Step 4**: Add stable IDs to timeline items and use as keys.
5. **Step 5**: Add `React.memo` to `TimelineItem` component.
6. **Step 6**: Improve accessibility attributes (aria-labels, image roles).
7. **Step 7**: Use `cn()` consistently across components for className merging.
8. **Step 8**: Add explicit return types to hooks and functions.

---

## Positive Highlights

✅ **Excellent architecture**: Feature-based component organization is clean and maintainable.
✅ **Good separation of concerns**: Hooks, components, data, and types are well-separated.
✅ **Constants centralization**: Magic numbers and strings are properly extracted.
✅ **Type safety**: Discriminated unions for timeline items are well-designed.
✅ **No `any` types**: TypeScript usage is generally strict.
✅ **Reusable utilities**: Animation variants and random helpers are extracted.
✅ **Barrel exports**: Clean import structure via index files.

---

## Acceptance Checklist Status

- ❌ No duplicated logic blocks (≥ ~5 lines) without consolidation — **Tailwind classes duplicated**
- ✅ Axios centralized — **N/A (no API calls)**
- ✅ Tables use shared column factories — **N/A (no tables)**
- ⚠️ FeedbackState used for loading/error/empty — **Partially (components exist but could be more unified)**
- ✅ Components small, typed, and cohesive — **Mostly**
- ⚠️ Tailwind + Shadcn patterns consistent — **cn() exists but not used consistently**
- ✅ No any leaks — **Good**
- ✅ Route params validated — **N/A (no routing)**
- ⚠️ Perf considered — **Missing memoization opportunities**
- ⚠️ Security & a11y checks pass — **Some accessibility gaps**
