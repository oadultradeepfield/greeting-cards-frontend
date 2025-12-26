import confetti from "canvas-confetti";
import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_DURATION = 1000;
const DEFAULT_COLORS = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

export function useConfetti(
  start: boolean,
  opts?: { duration?: number; colors?: string[] },
) {
  const duration = opts?.duration ?? DEFAULT_DURATION;
  const colors = opts?.colors ?? DEFAULT_COLORS;

  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const fireConfetti = useCallback(() => {
    setIsAnimating(true);
    startedRef.current = true;
    setHasStarted(true);

    const end = Date.now() + duration;

    const frame = () => {
      if (Date.now() > end) {
        setIsAnimating(false);
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        return;
      }

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      rafRef.current = requestAnimationFrame(frame);
    };

    frame();
  }, [duration, colors]);

  useEffect(() => {
    if (start && !startedRef.current) {
      fireConfetti();
    }

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [start, fireConfetti]);

  return { isAnimating, hasStarted };
}
