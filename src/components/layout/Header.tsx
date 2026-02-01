import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { TEXT } from '@/constants';
import { ScrollIndicator } from './ScrollIndicator';

export const Header = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative">
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
