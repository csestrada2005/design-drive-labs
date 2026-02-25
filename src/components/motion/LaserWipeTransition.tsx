import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * LaserWipeTransition — vertical full-screen wipe (bottom → top)
 * between Design Lab (#lab) and How We Work (#process).
 * Fires ONCE only (scrolling down). After that, scroll is free.
 */

const WIPE_DURATION = 800;

export const LaserWipeTransition = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "wiping" | "done">("idle");
  const prefersReduced = useReducedMotion();
  const hasFiredRef = useRef(false);

  const fire = useCallback(() => {
    if (hasFiredRef.current || phase !== "idle") return;
    hasFiredRef.current = true;

    const processEl = document.getElementById("process");
    if (!processEl) return;

    if (prefersReduced) {
      processEl.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Lock scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    setPhase("wiping");

    // At end of wipe: snap to target, unlock, fade out
    setTimeout(() => {
      const targetY = processEl.offsetTop;
      window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      setPhase("done");
      setTimeout(() => setPhase("idle"), 250);
    }, WIPE_DURATION);
  }, [phase, prefersReduced]);

  // IntersectionObserver — disconnects after firing once
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || hasFiredRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fire();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-20% 0px -20% 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fire]);

  return (
    <>
      <div
        ref={sentinelRef}
        className="relative w-full"
        style={{ height: 4 }}
        aria-hidden="true"
      />

      {phase !== "idle" && (
        <div
          className="fixed inset-0 pointer-events-none z-[90]"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background: "hsl(var(--background))",
              clipPath: phase === "wiping" ? undefined : "inset(100% 0 0 0)",
              animation: phase === "wiping"
                ? `vwipe-mask ${WIPE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
                : undefined,
              opacity: phase === "done" ? 0 : 1,
              transition: phase === "done" ? "opacity 200ms ease-out" : undefined,
            }}
          />

          <div
            className="absolute left-0 right-0"
            style={{
              height: 50,
              animation: phase === "wiping"
                ? `vwipe-edge ${WIPE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
                : undefined,
              opacity: phase === "done" ? 0 : 1,
              transition: phase === "done" ? "opacity 150ms ease-out" : undefined,
            }}
          >
            <div
              className="absolute left-0 right-0"
              style={{
                height: 2,
                top: "50%",
                background: "hsl(var(--primary))",
                boxShadow: "0 0 4px 1px hsl(var(--primary) / 0.9), 0 0 14px 3px hsl(var(--primary) / 0.5)",
              }}
            />
            <div
              className="absolute left-0 right-0"
              style={{
                height: 20, bottom: "50%",
                background: "linear-gradient(to top, hsl(var(--primary) / 0.35), transparent)",
                filter: "blur(8px)",
              }}
            />
            <div
              className="absolute left-0 right-0"
              style={{
                height: 20, top: "50%",
                background: "linear-gradient(to bottom, hsl(var(--primary) / 0.25), transparent)",
                filter: "blur(10px)",
              }}
            />
          </div>

          {phase === "wiping" &&
            [0.15, 0.3, 0.5, 0.7].map((delay, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 3, height: 3,
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
