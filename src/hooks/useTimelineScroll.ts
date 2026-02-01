import { useRef } from 'react';
import { useScroll } from 'framer-motion';

export const useTimelineScroll = () => {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start start', 'end end'] as const
  });

  return {
    timelineRef,
    scrollYProgress
  };
};
