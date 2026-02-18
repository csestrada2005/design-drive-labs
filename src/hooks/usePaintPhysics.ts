import { useEffect, useRef, useState, useCallback } from "react";

interface PaintPhysics {
  scrollY: number;
  isDrawing: boolean;
  pressure: number; // 0–1, smoothed from velocity
  direction: "down" | "up" | "idle";
}

/**
 * Extracts analog scroll data to drive "painting" interactions.
 * - isDrawing: true while user is actively scrolling
 * - pressure: 0–1 derived from scroll velocity (fast = high pressure)
 * - direction: current scroll direction
 */
export const usePaintPhysics = (): PaintPhysics => {
  const [state, setState] = useState<PaintPhysics>({
    scrollY: 0,
    isDrawing: false,
    pressure: 0,
    direction: "idle",
  });

  const lastY = useRef(0);
  const lastTime = useRef(Date.now());
  const velocitySmooth = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafId = useRef<number | null>(null);

  const update = useCallback(() => {
    const now = Date.now();
    const y = window.scrollY;
    const dt = Math.max(now - lastTime.current, 1);
    const rawVelocity = Math.abs(y - lastY.current) / dt; // px/ms

    // Exponential smoothing
    velocitySmooth.current += (rawVelocity - velocitySmooth.current) * 0.3;

    // Map velocity to 0–1 pressure (clamp at ~2 px/ms as max)
    const pressure = Math.min(velocitySmooth.current / 2, 1);

    const direction: PaintPhysics["direction"] =
      y > lastY.current ? "down" : y < lastY.current ? "up" : "idle";

    lastY.current = y;
    lastTime.current = now;

    setState({
      scrollY: y,
      isDrawing: true,
      pressure,
      direction,
    });

    // Reset idle timer
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      velocitySmooth.current = 0;
      setState((prev) => ({ ...prev, isDrawing: false, pressure: 0, direction: "idle" }));
    }, 150);

    rafId.current = null;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [update]);

  return state;
};
