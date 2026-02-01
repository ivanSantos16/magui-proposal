import { useRef, memo, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { TimelineItemData } from '@/types';
import { timelineItemVariants } from '@/utils/animations';
import { TIMELINE } from '@/constants';
import { timelineItemWrapperClasses, photoCardClasses, quoteCardClasses, memoryCardClasses } from '@/utils/styles';
import { cn } from '@/lib/utils';
import { ImageViewerModal } from './ImageViewerModal';

interface TimelineItemProps {
  item: TimelineItemData;
}

export const TimelineItem = memo(({ item }: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: TIMELINE.IN_VIEW_MARGIN });
  const [imageModalOpen, setImageModalOpen] = useState(false);

  if (item.type === 'photo') {
    return (
      <>
        <div ref={ref} className={timelineItemWrapperClasses}>
          <motion.div
            variants={timelineItemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col items-center"
          >
            <motion.div
              className={cn(
                photoCardClasses,
                "w-64 h-64 flex items-center justify-center relative cursor-pointer group"
              )}
              onClick={() => item.image && setImageModalOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {item.image ? (
                <>
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.content && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all duration-300 z-10">
                      <span className="text-7xl drop-shadow-lg">{item.content}</span>
                    </div>
                  )}
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                    <span className="text-white/90 text-sm font-light z-10 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                      Toca para expandir
                    </span>
                  </div>
                </>
              ) : (
                <span className="text-8xl z-10">{item.content}</span>
              )}
            </motion.div>
            <p className="text-white/70 mt-6 text-lg font-light text-center">{item.caption}</p>
            <p className="text-white/40 mt-2 text-sm text-center">{item.date}</p>
          </motion.div>
        </div>

        {item.image && (
          <ImageViewerModal
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
            imageSrc={item.image}
            caption={item.caption}
          />
        )}
      </>
    );
  }

  if (item.type === 'quote') {
    return (
      <div ref={ref} className={timelineItemWrapperClasses}>
        <motion.div
          variants={timelineItemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className={quoteCardClasses}>
            <p className="text-white/90 text-xl font-light italic leading-relaxed">{item.content}</p>
            <p className="text-white/50 mt-4 text-sm">— {item.author}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (item.type === 'memory') {
    return (
      <div ref={ref} className={timelineItemWrapperClasses}>
        <motion.div
          variants={timelineItemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className={memoryCardClasses}>
            <div className="text-5xl mb-4">{item.emoji}</div>
            <h3 className="text-white text-2xl font-light mb-4">{item.title}</h3>
            <p className="text-white/70 text-lg leading-relaxed">{item.content}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
});