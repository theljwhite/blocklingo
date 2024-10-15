export const oldModalBgVariants = {
  open: {
    opacity: 1,
    // y: 0,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    // y: -1000,
    transition: {
      duration: 0.3,
    },
  },
};

export const oldModalVariants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    scale: 0.75,
    transition: {
      duration: 0.3,
    },
  },
};

export const textLeftToRightVariant = (index: number, duration: number) => {
  return {
    active: {
      opacity: 1,
      transition: {
        duration,
        delay: index / 10,
      },
    },
    inactive: {
      opacity: 0,
    },
  };
};
