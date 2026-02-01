import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { random } from '@/utils/random';

export const Fireworks = () => {
  const particles = Array.from({ length: 50 });

  const particleData = useMemo(
    () =>
      particles.map(() => ({
        hue: random(0, 360),
        x: random(-200, 200),
        y: random(-200, 200),
        delay: random(0, 0.5)
      })),
    [particles]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((data, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            background: `hsl(${data.hue}, 100%, 60%)`
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: data.x,
            y: data.y,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 2,
            delay: data.delay,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      ))}
    </div>
  );
};
