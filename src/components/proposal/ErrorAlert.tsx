import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TEXT } from '@/constants';

interface ErrorAlertProps {
  show: boolean;
}

export const ErrorAlert = ({ show }: ErrorAlertProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6"
        >
          <motion.div
            animate={{ x: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Alert className="bg-black/95 border-red-500/50 backdrop-blur-xl">
              <AlertDescription className="text-white text-center text-lg">
                {TEXT.ERROR_MESSAGE}
              </AlertDescription>
            </Alert>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
