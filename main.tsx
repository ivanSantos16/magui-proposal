import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Heart, Music, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Timeline data
const timelineData = [
  {
    type: 'photo',
    content: '❤️',
    caption: 'O início de tudo...',
    date: 'Onde tudo começou'
  },
  {
    type: 'quote',
    content: '"Cada momento contigo é uma memória que guardo no coração"',
    author: 'O teu admirador secreto'
  },
  {
    type: 'memory',
    title: 'Primeira vez',
    content: 'A primeira vez que te vi, soube que eras especial. O teu sorriso iluminou o meu dia.',
    emoji: '✨'
  },
  {
    type: 'photo',
    content: '💑',
    caption: 'Juntos',
    date: 'Cada dia contigo'
  },
  {
    type: 'quote',
    content: '"O amor não se vê com os olhos, mas com o coração"',
    author: 'William Shakespeare'
  },
  {
    type: 'memory',
    title: 'Momentos inesquecíveis',
    content: 'Cada risada, cada conversa, cada segundo ao teu lado é precioso.',
    emoji: '🌟'
  },
  {
    type: 'photo',
    content: '🌹',
    caption: 'Para ti',
    date: 'Com todo o meu amor'
  },
  {
    type: 'quote',
    content: '"Tu és a razão pela qual eu acredito no amor verdadeiro"',
    author: 'Do fundo do meu coração'
  },
  {
    type: 'memory',
    title: 'O pedido',
    content: 'Chegou a hora de te perguntar algo muito importante...',
    emoji: '💕'
  }
];

// Loading Screen Component
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

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
        <h2 className="text-2xl font-light text-white/90 tracking-wide">
          A preparar o teu futuro…
        </h2>
      </motion.div>

      <div className="w-full max-w-md">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Timeline Item Component
const TimelineItem = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (item.type === 'photo') {
    return (
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col items-center my-16"
      >
        <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center text-8xl backdrop-blur-sm border border-white/10 shadow-2xl">
          {item.content}
        </div>
        <p className="text-white/70 mt-6 text-lg font-light">{item.caption}</p>
        <p className="text-white/40 mt-2 text-sm">{item.date}</p>
      </motion.div>
    );
  }

  if (item.type === 'quote') {
    return (
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`my-16 ${index % 2 === 0 ? 'ml-0 mr-auto' : 'ml-auto mr-0'} max-w-lg`}
      >
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl">
          <p className="text-white/90 text-xl font-light italic leading-relaxed">
            {item.content}
          </p>
          <p className="text-white/50 mt-4 text-sm">— {item.author}</p>
        </div>
      </motion.div>
    );
  }

  if (item.type === 'memory') {
    return (
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="my-16"
      >
        <div className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl">
          <div className="text-5xl mb-4">{item.emoji}</div>
          <h3 className="text-white text-2xl font-light mb-4">{item.title}</h3>
          <p className="text-white/70 text-lg leading-relaxed">{item.content}</p>
        </div>
      </motion.div>
    );
  }

  return null;
};

// Fireworks Component
const Fireworks = () => {
  const particles = Array.from({ length: 50 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            background: `hsl(${Math.random() * 360}, 100%, 60%)`
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.5,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      ))}
    </div>
  );
};

// Main App Component
export default function App() {
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const handleComplete = () => {
    setLoading(false);
  };

  const handleYes = () => {
    setShowSuccess(true);
  };

  const handleNo = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleComplete} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          {/* Background gradient */}
          <div className="fixed inset-0 bg-gradient-to-b from-rose-950/20 via-black to-black pointer-events-none" />

          {/* Music control */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors shadow-xl"
          >
            {musicPlaying ? (
              <Volume2 className="w-6 h-6 text-white" />
            ) : (
              <VolumeX className="w-6 h-6 text-white" />
            )}
          </motion.button>

          {/* Main content */}
          <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center mb-20"
            >
              <Heart className="w-20 h-20 text-rose-500 mx-auto mb-8" />
              <h1 className="text-5xl font-light mb-4 tracking-tight">A Nossa História</h1>
              <p className="text-white/60 text-lg font-light">Uma jornada de amor</p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/50 via-pink-500/50 to-transparent -translate-x-1/2" />

              {timelineData.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>

            {/* Final Question */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center my-20"
            >
              <h2 className="text-4xl font-light mb-6">Queres ser minha namorada?</h2>
              <p className="text-white/60 mb-12 text-lg">Escolhe sabiamente... ❤️</p>

              <div className="flex gap-6 justify-center flex-wrap">
                <Button
                  onClick={handleYes}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-12 py-6 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Sim ❤️
                </Button>
                <Button
                  onClick={handleNo}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-12 py-6 text-xl rounded-full backdrop-blur-sm"
                >
                  Não
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Success Modal */}
          <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
            <DialogContent className="bg-black/95 border-white/20 backdrop-blur-xl max-w-md">
              <Fireworks />
              <DialogHeader>
                <DialogTitle className="text-center text-3xl font-light text-white mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
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
                <p className="text-2xl text-white mb-4 font-light">
                  Podes beijar o teu namorado ❤️
                </p>
                <p className="text-white/60">Sabia que ias dizer que sim! 💕</p>
              </motion.div>
            </DialogContent>
          </Dialog>

          {/* Error Alert */}
          <AnimatePresence>
            {showError && (
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
                      Resposta errada. Tenta novamente mais tarde 😆
                    </AlertDescription>
                  </Alert>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}