import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * LaserWipeTransition — vertical full-screen wipe (bottom → top)
 * between Design Lab (#lab) and How We Work (#process).
 *
 * The mask grows upward from the bottom revealing a dark panel,
 * with a glowing horizontal laser line as the leading edge.
 * Scroll locks briefly, then snaps to #process top.
 */

const WIPE_DURATION = 800;
const COOLDOWN_MS = 1200;

export const LaserWipeTransition = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "wiping" | "done">("idle");
  const lastFiredRef = useRef(0);
  const prefersReduced = useReducedMotion();
  const savedScrollRef = useRef(0);

  const fire = useCallback(() => {
    const now = Date.now();
    if (now - lastFiredRef.current < COOLDOWN_MS) return;
    if (phase !== "idle") return;
    lastFiredRef.current = now;

    const processEl = document.getElementById("process");
    if (!processEl) return;

    if (prefersReduced) {
      processEl.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Save current scroll and lock
    savedScrollRef.current = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    setPhase("wiping");

    // At end of wipe: snap to target, unlock, fade out
    setTimeout(() => {
      // Scroll to process section
      const targetY = processEl.offsetTop;
      window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });

      // Unlock scroll
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      setPhase("done");

      // Reset overlay
      setTimeout(() => setPhase("idle"), 250);
    }, WIPE_DURATION);
  }, [phase, prefersReduced]);

  // IntersectionObserver on sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fire();
      },
      { threshold: 0, rootMargin: "-20% 0px -20% 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fire]);

  return (
    <>
      {/* Sentinel between sections */}
      <div
        ref={sentinelRef}
        className="relative w-full"
        style={{ height: 4 }}
        aria-hidden="true"
      />

      {/* Wipe overlay */}
      {phase !== "idle" && (
        <div
          className="fixed inset-0 pointer-events-none z-[90]"
          aria-hidden="true"
        >
          {/* Dark mask — grows from bottom to top */}
          <div
            className="absolute inset-0"
            style={{
              background: "hsl(var(--background))",
              clipPath:
                phase === "wiping"
                  ? undefined
                  : "inset(100% 0 0 0)",
              animation:
                phase === "wiping"
                  ? `vwipe-mask ${WIPE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
                  : undefined,
              opacity: phase === "done" ? 0 : 1,
              transition:
                phase === "done" ? "opacity 200ms ease-out" : undefined,
            }}
          />

          {/* Laser edge — horizontal line that sweeps upward */}
          <div
            className="absolute left-0 right-0"
            style={{
              height: 50,
              animation:
                phase === "wiping"
                  ? `vwipe-edge ${WIPE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
                  : undefined,
              opacity: phase === "done" ? 0 : 1,
              transition:
                phase === "done" ? "opacity 150ms ease-out" : undefined,
            }}
          >
            {/* Core 2px line */}
            <div
              className="absolute left-0 right-0"
              style={{
                height: 2,
                top: "50%",
                background: "hsl(var(--primary))",
                boxShadow:
                  "0 0 4px 1px hsl(var(--primary) / 0.9), 0 0 14px 3px hsl(var(--primary) / 0.5)",
              }}
            />
            {/* Glow above */}
            <div
              className="absolute left-0 right-0"
              style={{
                height: 20,
                bottom: "50%",
                background:
                  "linear-gradient(to top, hsl(var(--primary) / 0.35), transparent)",
                filter: "blur(8px)",
              }}
            />
            {/* Glow below */}
            <div
              className="absolute left-0 right-0"
              style={{
                height: 20,
                top: "50%",
                background:
                  "linear-gradient(to bottom, hsl(var(--primary) / 0.25), transparent)",
                filter: "blur(10px)",
              }}
            />
          </div>

          {/* Micro sparks */}
          {phase === "wiping" &&
            [0.15, 0.3, 0.5, 0.7].map((delay, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 3,
                  height: 3,
                  background: "hsl(var(--primary))",
                  boxShadow: "0 0 6px 2px hsl(var(--primary) / 0.6)",
                  left: `${15 + i * 22}%`,
                  bottom: 0,
                  animation: `vwipe-spark ${WIPE_DURATION * 0.5}ms ${delay * WIPE_DURATION}ms ease-out forwards`,
                  opacity: 0,
                }}
              />
            ))}
        </div>
      )}

      <style>{`
        @keyframes vwipe-mask {
          0%   { clip-path: inset(100% 0 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes vwipe-edge {
          0%   { transform: translateY(calc(100vh + 50px)); }
          100% { transform: translateY(-50px); }
        }
        @keyframes vwipe-spark {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.5); }
          30%  { opacity: 1; transform: translate(6px, -20px) scale(1.3); }
          100% { opacity: 0; transform: translate(-4px, -60px) scale(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="vwipe"] { animation: none !important; }
        }
      `}</style>
    </>
  );
};
