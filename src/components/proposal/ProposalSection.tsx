import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { TEXT } from '@/constants';

interface ProposalSectionProps {
  onYes: () => void;
  onNo: () => void;
}

export const ProposalSection = ({ onYes, onNo }: ProposalSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50%' });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] // Apple's signature easing curve
      }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-0 mt-20"
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/10 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="relative text-center max-w-xl"
      >
        <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight tracking-tight">
          {TEXT.PROPOSAL_QUESTION}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/60 mb-16 text-xl font-light"
        >
          {TEXT.PROPOSAL_HINT}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-4 justify-center items-center"
        >
          <Button
            onClick={onYes}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-14 py-7 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Sim ❤️
          </Button>
          <Button
            onClick={onNo}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-14 py-7 text-xl rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Não
          </Button>
        </motion.div>
      </motion.div>

      {/* Footer fixed at absolute bottom of viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-0 w-full text-white/40 text-sm font-light text-center pb-4"
      >
        <p>© {new Date().getFullYear()} Made with ❤️</p>
        <p className="mt-1">All rights reserved</p>
      </motion.div>
    </motion.div>
  );
};