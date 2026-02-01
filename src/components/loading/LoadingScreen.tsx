import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ANIMATION, TEXT } from '@/constants';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const increment = (ANIMATION.LOADING_INTERVAL / ANIMATION.LOADING_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, ANIMATION.FADE_DELAY);
          return 100;
        }
        return prev + increment;
      });
    }, ANIMATION.LOADING_INTERVAL);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-12"
      >
        <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6" />
        <h2 className="text-2xl font-light text-white/90 tracking-wide">{TEXT.LOADING_MESSAGE}</h2>
      </motion.div>

      <div className="w-full max-w-md">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeInOut' }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/60 text-sm mt-4 text-center"
        >
          Coloca os teus 🎧 e carrega no ▶️
        </motion.p>
      </div>
    </motion.div>
  );
};
