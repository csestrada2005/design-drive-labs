import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * LaserTransition — scroll-triggered "laser sweep" overlay
 * between Design Lab and How We Work sections.
 *
 * Uses IntersectionObserver on a sentinel div placed between the two sections.
 * Animation: a 2px glowing line sweeps left→right across viewport.
 * Total duration ≈ 550ms. GPU-only (transform + opacity).
 */

const COOLDOWN_MS = 1200;

export const LaserTransition = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [firing, setFiring] = useState(false);
  const lastFiredRef = useRef(0);
  const prefersReduced = useReducedMotion();

  const fire = useCallback(() => {
    const now = Date.now();
    if (now - lastFiredRef.current < COOLDOWN_MS) return;
    lastFiredRef.current = now;
    setFiring(true);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fire();
      },
      { threshold: 0, rootMargin: "-10% 0px -10% 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fire]);

  // Reset after animation completes
  useEffect(() => {
    if (!firing) return;
    const t = setTimeout(() => setFiring(false), 700);
    return () => clearTimeout(t);
  }, [firing]);

  return (
    <>
      {/* Sentinel — zero-height trigger point between sections */}
      <div
        ref={sentinelRef}
        className="relative w-full"
        style={{ height: 1 }}
        aria-hidden="true"
      />

      {/* Laser overlay — fixed fullscreen, pointer-events none */}
      {firing && !prefersReduced && (
        <div
          className="fixed inset-0 pointer-events-none z-[90]"
          aria-hidden="true"
        >
          {/* Main laser line */}
          <motion.div
            initial={{ x: "-110%" }}
            animate={{ x: "110%" }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-1/2 left-0 w-full"
            style={{ height: 2 }}
          >
            {/* Core line */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, hsl(var(--primary)) 15%, hsl(var(--primary)) 85%, transparent 100%)",
              }}
            />
            {/* Glow */}
            <div
              className="absolute -top-3 -bottom-3 left-0 right-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.4) 20%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 80%, transparent 100%)",
                filter: "blur(6px)",
              }}
            />
            {/* Wide ambient glow */}
            <div
              className="absolute -top-8 -bottom-8 left-0 right-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 5%, hsl(var(--primary) / 0.12) 30%, hsl(var(--primary) / 0.18) 50%, hsl(var(--primary) / 0.12) 70%, transparent 95%)",
                filter: "blur(16px)",
              }}
            />
            {/* Spark head */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.3] }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "hsl(var(--primary))",
                boxShadow:
                  "0 0 8px 2px hsl(var(--primary) / 0.8), 0 0 20px 4px hsl(var(--primary) / 0.3)",
              }}
            />
          </motion.div>

          {/* Flash overlay — brief screen-wide flash at midpoint */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.04, 0] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse 80% 30% at 50% 50%, hsl(var(--primary) / 0.15), transparent 70%)",
            }}
          />
        </div>
      )}
    </>
  );
};
