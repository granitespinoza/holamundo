import { useCallback, useRef, useState } from 'react';

interface SoundOptions {
  volume?: number;
  enabled?: boolean;
}

const defaultOptions: SoundOptions = {
  volume: 0.4,
  enabled: true
};

export function useSound() {
  const [enabled, setEnabled] = useState(true);
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  const preloadSound = useCallback((src: string) => {
    if (!audioCache.current.has(src)) {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audioCache.current.set(src, audio);
    }
  }, []);

  const playSound = useCallback((src: string, options: SoundOptions = {}) => {
    const { volume = defaultOptions.volume, enabled: soundEnabled = enabled } = options;
    
    if (!soundEnabled) return;

    try {
      let audio = audioCache.current.get(src);
      
      if (!audio) {
        audio = new Audio(src);
        audioCache.current.set(src, audio);
      }

      audio.volume = volume!;
      audio.currentTime = 0;
      
      // Play with error handling
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silently handle autoPlay policy restrictions
        });
      }
    } catch (error) {
      // Silently handle audio loading errors
    }
  }, [enabled]);

  // Preload common sounds on hook initialization
  const initializeSounds = useCallback(() => {
    const sounds = [
      '/sounds/analysis-start.mp3',
      '/sounds/achievement.mp3',
      '/sounds/challenge-start.mp3',
      '/sounds/save-draft.mp3',
      '/sounds/planning-complete.mp3',
      '/sounds/connector-insert.mp3'
    ];
    
    sounds.forEach(preloadSound);
  }, [preloadSound]);

  return {
    playSound,
    enabled,
    setEnabled,
    initializeSounds
  };
}