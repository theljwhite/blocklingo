import tailwindConfig from "../../../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const tailwindTheme = resolveConfig(tailwindConfig).theme;

export const slowDispappearTransition = {
  duration: 0.7,
  ease: [0, 0.71, 0.2, 1.01],
  scale: {
    type: "spring",
    damping: 5,
    stiffness: 100,
    restDelta: 0.001,
  },
};

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

export const showGuessesStaggerVariant = {
  visible: {
    transition: { staggerChildren: 0.3, delayChildren: 0.1 },
  },
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
export const showGuessesSectionVariant = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100, scale: 1.04 },
    },
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000, scale: 1.0 },
    },
  },
};

export const showGuessesListVariants = {
  open: {
    transition: { staggerChildren: 0.3, delayChildren: 2.0 },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
export const showGuessesWordAnimation = {
  color: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"],
};

export const showGuessesListItemVariants = {
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

export const resultParentVariant = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const resultVariants = {
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
