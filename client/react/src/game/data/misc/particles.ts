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

export const particlesOptions = {
  background: {
    color: {
      value: "#0d47a1",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
