export const contextInstructionVariant = {
  open: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
  closed: {
    opacity: 0,
  },
};

export const contextInputVariant = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0, 0.71, 0.2, 1.0],
      scale: {
        type: "spring",
        damping: 6,
        stiffness: 100,
        restDelta: 0.001,
      },
    },
  },
  closed: {
    opacity: 0,
    scale: 0.5,
  },
};
