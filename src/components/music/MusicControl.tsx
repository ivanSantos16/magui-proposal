import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { UI } from '@/constants';

interface MusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicControl = ({ isPlaying, onToggle }: MusicControlProps) => {
  const [showPlayHint, setShowPlayHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlayHint(false);
    }, 2000); // 2 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="relative">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: UI.MUSIC_BUTTON_DELAY, ease: "easeOut" }}
          onClick={onToggle}
          className="
            relative
            w-10 h-10
            rounded-full
            active:scale-95
            flex items-center justify-center
            transition-all
          "
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white/90" strokeWidth={1.8} />
          ) : (
            <Play className="w-4 h-4 text-white/90 ml-[1px]" strokeWidth={1.8} />
          )}
        </motion.button>

        <AnimatePresence>
          {showPlayHint && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: -2 }}
              animate={{ opacity: [0.3, 0.8, 0.3], x: [0, 4, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.6,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none
                absolute
                right-8
                top-1/2
                -translate-y-1/2
              "
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.6"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
