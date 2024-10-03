import tailwindConfig from "../../../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const tailwindTheme = resolveConfig(tailwindConfig).theme;

export const incorrectGuessAnimation = {
  borderColor: tailwindTheme.colors.error[1],
  x: [0, 10, -10, 0],
};

export const correctGuessAnimation = {
  borderColor: tailwindTheme.colors.success[1],
  x: [0, 5, -5, 0],
};

export const correctGuessTransition = {
  duration: 0.5,
  times: [0, 0.2, 0.4, 1],
};

export const connGroupTransition = {
  duration: 0.5,
  delay: 0.2,
};

export const liWordAnimation = {
  color: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"],
};

export const liWordTransition = {
  duration: 0.8,
  delay: 0.8,
  ease: "easeIn",
  // ease: [0.17, 0.67, 0.83, 0.67],
};

export const listVariants = {
  open: {
    transition: { staggerChildren: 0.3, delayChildren: 0.43 },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const listItemVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 2.0,
      type: "spring",
      stiffness: 300,
      damping: 20,
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -50,
    opacity: 0,
    transition: {
      duration: 2.0,
      type: "spring",
      stiffness: 300,
      damping: 20,
      x: { stiffness: 1000 },
    },
  },
};

export const winStaggerVariant = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const winSectionVariant = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
