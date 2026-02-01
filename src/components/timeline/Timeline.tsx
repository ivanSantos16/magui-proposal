import { motion, MotionValue } from 'framer-motion';
import { FierySphere } from './FierySphere';
import { TimelineItem } from './TimelineItem';
import { timelineData } from '@/data/timeline';
import { TIMELINE } from '@/constants';

interface TimelineProps {
  timelineRef: React.RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
}

export const Timeline = ({ timelineRef, scrollYProgress }: TimelineProps) => {
  return (
    <div ref={timelineRef} className="relative">
      {/* Background timeline line */}
      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-white/10" />

      {/* Burned/traveled line */}
      <motion.div
        className="absolute left-2 top-0 w-0.5 bg-gradient-to-b from-rose-500 via-pink-500 to-rose-500 origin-top"
        style={{
          scaleY: scrollYProgress,
          boxShadow: '0 0 10px rgba(244, 63, 94, 0.5)'
        }}
      />

      {/* Fiery sphere */}
      <FierySphere scrollProgress={scrollYProgress} />

      {/* Timeline items */}
      {timelineData.map((item) => (
        <TimelineItem key={item.id} item={item} />
      ))}
    </div>
  );
};
