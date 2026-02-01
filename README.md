# Magui - Romantic Proposal Website

A beautiful, romantic timeline website built with React, TypeScript, TailwindCSS, and Framer Motion.

## 🏗️ Project Structure

```
src/
├── components/          # React components organized by feature
│   ├── effects/        # Visual effects (Fireworks, etc.)
│   ├── layout/         # Layout components (Header, Footer)
│   ├── loading/        # Loading screen components
│   ├── music/          # Music control components
│   ├── proposal/       # Proposal-related components
│   ├── timeline/       # Timeline components
│   └── ui/             # shadcn/ui components
│
├── hooks/              # Custom React hooks
│   ├── useMusic.ts
│   └── useTimelineScroll.ts
│
├── data/               # Static data
│   └── timeline.ts
│
├── types/              # TypeScript type definitions
│   └── index.ts
│
├── constants/          # Application constants
│   └── index.ts
│
├── config/             # Configuration files
│   └── index.ts
│
├── utils/              # Utility functions
│   ├── animations.ts
│   └── random.ts
│
└── assets/             # Static assets
    ├── images/
    └── music/
```

## ✨ Features

- **Clean Architecture**: Feature-based component organization
- **Type Safety**: Full TypeScript support
- **Constants Management**: Centralized configuration
- **Reusable Hooks**: Custom hooks for music and scroll tracking
- **Animation Utils**: Shared animation variants
- **Random Utils**: Helper functions for random values

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📦 Key Enhancements

1. **Feature-based Organization**: Components grouped by feature/domain
2. **Constants File**: All magic numbers and strings centralized
3. **Configuration**: App-wide settings in config file
4. **Utility Functions**: Reusable helpers for animations and random values
5. **Barrel Exports**: Clean imports via index files
6. **Type Safety**: Fixed naming conflicts and improved types
