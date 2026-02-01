import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { TEXT } from '@/constants';
import { ScrollIndicator } from './ScrollIndicator';
import { useEffect } from 'react';

export const Header = () => {
  // Fix para iOS Safari - calcula viewport height real
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center text-center relative"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Heart className="w-20 h-20 text-rose-500 mx-auto mb-8" />
        <h1 className="text-5xl font-light mb-4 tracking-tight">{TEXT.HEADER_TITLE}</h1>
        <p className="text-white/60 text-lg font-light">{TEXT.HEADER_SUBTITLE}</p>
      </motion.div>
      <ScrollIndicator />
    </section>
  );
};