import { motion } from 'framer-motion';
import { UI, TEXT } from '@/constants';

export const Footer = () => {
  return (
    <footer className="relative z-10 pb-8 px-6 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: UI.FOOTER_DELAY, duration: 0.8 }}
        className="text-white/40 text-sm font-light"
      >
        <p>
          © {new Date().getFullYear()} {TEXT.FOOTER_COPYRIGHT}
        </p>
        <p className="mt-2">{TEXT.FOOTER_RIGHTS}</p>
      </motion.div>
    </footer>
  );
};
