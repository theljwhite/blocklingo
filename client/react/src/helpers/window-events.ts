import { useEffect } from "react";
import { type MutableRefObject } from "react";

export function useOnClickOutside(
  ref: MutableRefObject<HTMLDivElement | null>,
  handler: (...args: any[]) => any
): void {
  const listener = (event: any) => {
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    handler(event);
  };
  useEffect(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  });
}
