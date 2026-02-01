import perfectMusic from '@/assets/music/Ed Sheeran - Perfect (Official Music Video).mp3';

export const config = {
  music: {
    src: perfectMusic,
    volume: 0.5,
    loop: true,
    autoPlayDelay: 500
  },
  loading: {
    duration: 5000,
    interval: 50
  },
  timeline: {
    scrollOffset: ['start start', 'end end'] as const,
    inViewMargin: '-100px'
  }
} as const;
