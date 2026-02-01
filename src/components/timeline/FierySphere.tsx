import { useMemo } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { TIMELINE } from '@/constants';
import { randomFlameColor, random } from '@/utils/random';

interface FierySphereProps {
  scrollProgress: MotionValue<number>;
}

export const FierySphere = ({ scrollProgress }: FierySphereProps) => {
  const flames = Array.from({ length: TIMELINE.FLAMES_COUNT });
  const highFlames = Array.from({ length: TIMELINE.HIGH_FLAMES_COUNT });

  const opacity = useTransform(scrollProgress, (value: number) => {
    return value >= 0 && value <= 1 ? 1 : 0;
  });

  const yPosition = useTransform(scrollProgress, (value: number) => {
    const clamped = Math.max(0, Math.min(1, value));
    return `${clamped * 100}%`;
  });

  const highFlameData = useMemo(
    () =>
      highFlames.map((_, i) => {
        const angle = (i / highFlames.length) * 360;
        const radius = random(8, 12);
        const xOffset = Math.cos((angle * Math.PI) / 180) * radius;
        const yOffset = Math.sin((angle * Math.PI) / 180) * radius;
        const color1 = randomFlameColor();
        const color2 = randomFlameColor();
        const scaleMax = random(1.5, 2);
        const xVariation = random(-1.5, 1.5);
        const duration = random(0.6, 1);

        return {
          angle,
          radius,
          xOffset,
          yOffset,
          hue1: color1.hue,
          hue2: color2.hue,
          scaleMax,
          xVariation,
          duration
        };
      }),
    [highFlames]
  );

  const flameData = useMemo(
    () =>
      flames.map((_) => {
        const angle = random(0, 360);
        const distance = random(15, 40);
        const color1 = randomFlameColor();
        const color2 = randomFlameColor();
        const glowSize = random(4, 8);
        const yVariation = random(0, 15);
        const duration = random(1, 1.6);

        return {
          angle,
          distance,
          hue1: color1.hue,
          lightness1: color1.lightness,
          hue2: color2.hue,
          glowSize,
          yVariation,
          duration
        };
      }),
    [flames]
  );

  return (
    <motion.div
      className={`absolute left-2 -translate-x-1/2 z-30 w-${TIMELINE.SPHERE_SIZE} h-${TIMELINE.SPHERE_SIZE} pointer-events-none`}
      style={{
        top: yPosition,
        opacity: opacity,
        width: `${TIMELINE.SPHERE_SIZE * 4}px`,
        height: `${TIMELINE.SPHERE_SIZE * 4}px`
      }}
    >
      {/* High flame effects */}
      {highFlameData.map((data, i) => (
        <motion.div
          key={`high-${i}`}
          className="absolute w-2 h-8 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            background: `linear-gradient(to top, 
              hsl(${data.hue1}, 100%, 60%), 
              hsl(${data.hue2}, 100%, 50%),
              transparent)`,
            transformOrigin: 'bottom center',
            x: data.xOffset,
            y: -data.yOffset - 20
          }}
          animate={{
            scaleY: [1, data.scaleMax, 1],
            opacity: [0.7, 1, 0.7],
            x: [data.xOffset, data.xOffset + data.xVariation, data.xOffset],
            filter: ['blur(1px)', 'blur(2px)', 'blur(1px)']
          }}
          transition={{
            duration: data.duration,
            repeat: Infinity,
            delay: i * 0.05,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Core sphere */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 via-rose-500 to-pink-600 shadow-2xl shadow-rose-500/80">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-rose-500 blur-sm"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-2 rounded-full bg-white blur-[2px]"
        />
      </div>

      {/* Small flame particles */}
      {flameData.map((data, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            background: `hsl(${data.hue1}, 100%, ${data.lightness1}%)`,
            boxShadow: `0 0 ${data.glowSize}px hsl(${data.hue2}, 100%, 60%)`
          }}
          animate={{
            x: [0, Math.cos((data.angle * Math.PI) / 180) * data.distance],
            y: [0, -data.distance - data.yVariation],
            scale: [1, 0.5, 0],
            opacity: [1, 0.8, 0]
          }}
          transition={{
            duration: data.duration,
            repeat: Infinity,
            delay: i * 0.08,
            ease: 'easeOut'
          }}
        />
      ))}

      {/* Outer glow rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          animate={{
            scale: [1, 1.5 + ring * 0.3, 1],
            opacity: [0.4 / ring, 0, 0.4 / ring]
          }}
          transition={{
            duration: 1.5 + ring * 0.3,
            repeat: Infinity,
            delay: ring * 0.2,
            ease: 'easeOut'
          }}
          className="absolute inset-0 rounded-full border-2 border-rose-500/40"
          style={{
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Intense heat distortion effect */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0, 0.3]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -inset-4 rounded-full blur-xl"
        style={{
          background:
            'radial-gradient(circle, rgba(244, 63, 94, 0.3) 0%, rgba(251, 146, 60, 0.2) 50%, transparent 100%)'
        }}
      />
    </motion.div>
  );
};
