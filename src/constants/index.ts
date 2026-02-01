// Animation constants
export const ANIMATION = {
  LOADING_DURATION: 5000,
  LOADING_INTERVAL: 50,
  FADE_DELAY: 500,
  TRANSITION_DURATION: 0.6,
  TRANSITION_DELAY: 0.2
} as const;

// Music constants
export const MUSIC = {
  VOLUME: 0.5,
  AUTO_PLAY_DELAY: 500,
  LOOP: true
} as const;

// Timeline constants
export const TIMELINE = {
  SCROLL_OFFSET: ['start start', 'end end'] as const,
  IN_VIEW_MARGIN: '-100px',
  SPHERE_SIZE: 12,
  FLAMES_COUNT: 20,
  HIGH_FLAMES_COUNT: 12
} as const;

// UI constants
export const UI = {
  ERROR_ALERT_DURATION: 3000,
  FOOTER_DELAY: 1.5,
  MUSIC_BUTTON_DELAY: 1
} as const;

// Text constants
export const TEXT = {
  LOADING_MESSAGE: 'A preparar o teu futuro…',
  HEADER_TITLE: 'A Nossa História',
  HEADER_SUBTITLE: 'Uma jornada de amor 🐣',
  PROPOSAL_QUESTION: 'Queres ser minha namorada?',
  PROPOSAL_HINT: 'Escolhe sabiamente... ❤️',
  SUCCESS_TITLE: ' ❤️ Podes beijar o teu namorado',
  SUCCESS_MESSAGE: 'Sabia que ias dizer que sim! 💕',
  ERROR_MESSAGE: 'Resposta errada. Tenta novamente mais tarde 😆',
  FOOTER_COPYRIGHT: 'Made with ❤️',
  FOOTER_RIGHTS: 'All rights reserved'
} as const;
