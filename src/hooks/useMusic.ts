import { useState, useEffect, useRef } from 'react';
import { config } from '@/config';
import { MUSIC } from '@/constants';

export const useMusic = (autoPlay: boolean = true): { musicPlaying: boolean; toggleMusic: () => void } => {
  const [musicPlaying, setMusicPlaying] = useState(autoPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(config.music.src);
    audio.loop = config.music.loop;
    audio.volume = MUSIC.VOLUME;
    audioRef.current = audio;

    const handlePlay = () => setMusicPlaying(true);
    const handlePause = () => setMusicPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Try autoplay muted
    if (autoPlay) {
      audio.play().catch(() => {
        // Autoplay blocked — wait for user interaction
        setMusicPlaying(false);
      });
    }

    // Fade in AFTER first user interaction
    let fadeInterval: ReturnType<typeof setInterval> | null = null;
    const unmuteOnInteraction = () => {
      if (!audioRef.current) return;

      let v = 0;
      fadeInterval = setInterval(() => {
        v += 0.05;
        if (audioRef.current) {
          audioRef.current.volume = v;
        }
        if (v >= MUSIC.VOLUME && fadeInterval) {
          clearInterval(fadeInterval);
          fadeInterval = null;
        }
      }, 100);

      window.removeEventListener('click', unmuteOnInteraction);
      window.removeEventListener('scroll', unmuteOnInteraction);
    };

    window.addEventListener('click', unmuteOnInteraction);
    window.addEventListener('scroll', unmuteOnInteraction);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      window.removeEventListener('click', unmuteOnInteraction);
      window.removeEventListener('scroll', unmuteOnInteraction);
      if (fadeInterval) {
        clearInterval(fadeInterval);
        fadeInterval = null;
      }
    };
  }, [autoPlay]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.play().catch(() => setMusicPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [musicPlaying]);

  const toggleMusic = () => setMusicPlaying((prev) => !prev);

  return { musicPlaying, toggleMusic };
};
