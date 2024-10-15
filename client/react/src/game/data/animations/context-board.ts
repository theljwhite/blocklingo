import { GAME_END_ANIM_DELAY_SEC } from "../constants";

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

export const contextScoreBarVariant = {
  open: {
    x: "0%",
    transition: {
      duration: 4.0,
      ease: "linear",
    },
  },
  closed: {
    x: "-100%",
    transition: {
      duration: 4.0,
      ease: "linear",
    },
  },
};

export const contextScoreBarVariantDynamic = (widthPercentage: number) => {
  return {
    open: {
      x: `${widthPercentage}%`,
      transition: {
        duration: GAME_END_ANIM_DELAY_SEC,
        ease: "linear",
      },
    },
    closed: {
      x: "-100%",
      transition: {
        duration: GAME_END_ANIM_DELAY_SEC,
        ease: "linear",
      },
    },
  };
};

export const contextScoreBorderVariant = {
  open: {
    boxShadow: "0px 0px 40px 4px #10b981",
    transition: {
      duration: GAME_END_ANIM_DELAY_SEC,
      ease: "linear",
    },
  },
  closed: {
    boxShadow: "none",
  },
};
