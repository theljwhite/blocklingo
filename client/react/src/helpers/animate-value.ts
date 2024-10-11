import { animate } from "framer-motion";

export const animateNumberValue = (
  ref: React.RefObject<HTMLSpanElement>,
  from: number,
  to: number,
  duration: number
): any => {
  if (!ref.current) return;

  animate(from, to, {
    duration,
    onUpdate(value) {
      ref.current!.textContent = value.toFixed();
    },
  });
};
