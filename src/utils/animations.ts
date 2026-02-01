import type { Variants } from 'framer-motion';

/**
 * Standard animation variants for timeline items
 */
export const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
  }
};

/**
 * Fade in animation variants
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

/**
 * Slide up animation variants
 */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

/**
 * Scale animation variants
 */
export const scaleVariants: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1 }
};
