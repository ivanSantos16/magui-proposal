import { cn } from '@/lib/utils';

/**
 * Base card styles used across timeline items
 */
export const cardBaseClasses = "backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl";

/**
 * Photo card specific styles
 */
export const photoCardClasses = cn(
  "backdrop-blur-md rounded-3xl border border-white/10 shadow-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 p-0 overflow-hidden"
);

/**
 * Quote card specific styles
 */
export const quoteCardClasses = cn(cardBaseClasses, "bg-white/5");

/**
 * Memory card specific styles
 */
export const memoryCardClasses = cn(
  cardBaseClasses,
  "bg-gradient-to-br from-rose-500/10 to-pink-500/10"
);

/**
 * Timeline item wrapper classes
 */
export const timelineItemWrapperClasses = "relative pl-12 mb-20";
