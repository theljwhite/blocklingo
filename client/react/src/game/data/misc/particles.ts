import { confetti } from "tsparticles-confetti";

//TODO - fix emoji

export const confettiOptions = {
  angle: 90,
  count: 500,
  position: {
    x: 50,
    y: 50,
  },
  spread: 45,
  startVelocity: 45,
  decay: 0.9,
  gravity: 1,
  drift: 0,
  ticks: 200,
  colors: ["#ffffff", "#FAD1A4"],
  shapes: ["square", "circle", "star", "heart", "spades", "dimonds"],
  scalar: 1,
  zIndex: 1,
  disableForReducedMotion: true,
};

export const confettiOptionsSlow = {
  angle: 90,
  count: 150,
  position: {
    x: 50,
    y: 50,
  },
  spread: 45,
  startVelocity: 45,
  decay: 0.9,
  gravity: 1,
  drift: 0,
  ticks: 200,
  colors: ["#ffffff", "#FAD1A4"],
  shapes: ["square", "circle", "star", "heart", "spades", "dimonds"],
  scalar: 1,
  zIndex: 1,
  disableForReducedMotion: true,
  delay: 0.9,
};

export const sadEmojiConfettiOptions = {
  angle: 90,
  count: 150,
  position: {
    x: 50,
    y: 50,
  },
  spread: 45,
  startVelocity: 45,
  decay: 0.9,
  gravity: 1,
  drift: 0,
  ticks: 200,
  colors: ["#ffffff", "#FF0000"],
  shapes: ["emoji"],
  shapeOptions: {
    emoji: {
      value: ["😔"],
    },
  },
  scalar: 1,
  zIndex: 1,
  disableForReducedMotion: true,
  delay: 0.9,
};

export const doConfetti = async (): Promise<void> => {
  await confetti("tsparticles", confettiOptionsSlow);
};

export const doSadConfetti = async (): Promise<void> => {
  await confetti("tsparticles", sadEmojiConfettiOptions);
};
