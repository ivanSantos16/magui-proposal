import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Fireworks } from '../effects/Fireworks';
import { TEXT } from '@/constants';
import gorilaEmoji from '@/assets/images/gorila_emoji.png';

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SuccessModal = ({ open, onOpenChange }: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border-white/20 backdrop-blur-xl max-w-md">
        <Fireworks />
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-light text-white mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
            >
              🎉
            </motion.div>
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center py-8"
        >
          <Sparkles className="w-16 h-16 text-rose-500 mx-auto mb-6" />
          <p className="text-xl text-white mb-4 font-light flex items-center justify-center gap-2">
            {TEXT.SUCCESS_TITLE}
            <img 
              src={gorilaEmoji} 
              alt="Gorila emoji decorativo" 
              role="presentation"
              className="w-8 h-8 object-contain inline-block align-middle"
            />
          </p>
          <p className="text-white/60">{TEXT.SUCCESS_MESSAGE}</p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
