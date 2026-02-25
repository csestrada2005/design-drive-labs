import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * LaserWipeTransition — full-screen "slide-to-slide" wipe between
 * Design Lab and How We Work.
 *
 * A clip-path rect grows from left→right revealing section B.
 * The leading edge of the rect is a glowing laser line.
 * Scroll is briefly locked during the animation (~800ms).
 *
 * Trigger: IntersectionObserver on a sentinel between the two sections.
 * Reduced-motion: crossfade only, no wipe, no scroll lock.
 */

const WIPE_DURATION = 750; // ms
const COOLDOWN_MS = 1500;

export const LaserWipeTransition = () => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "wiping" | "done">("idle");
  const lastFiredRef = useRef(0);
  const prefersReduced = useReducedMotion();
  const directionRef = useRef<"down" | "up">("down");
  const prevScrollRef = useRef(0);

  const fire = useCallback(
    (direction: "down" | "up") => {
      const now = Date.now();
      if (now - lastFiredRef.current < COOLDOWN_MS) return;
      if (phase !== "idle") return;
      lastFiredRef.current = now;
      directionRef.current = direction;

      // Scroll to ProcessSection top
      const processEl = document.getElementById("process");
      const designLabEl = document.getElementById("lab");

      if (prefersReduced) {
        // Simple smooth scroll, no wipe
        const target = direction === "down" ? processEl : designLabEl;
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      // Lock scroll
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      setPhase("wiping");

      // At 60% of wipe, scroll to target
      setTimeout(() => {
        const target = direction === "down" ? processEl : designLabEl;
        if (target) {
          const targetY = target.getBoundingClientRect().top + scrollY;
          window.scrollTo(0, targetY);
        }
      }, WIPE_DURATION * 0.6);

      // End wipe
      setTimeout(() => {
        setPhase("done");

        // Unlock scroll
        const top = document.body.style.top;
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, parseInt(top || "0") * -1);

        // Reset after fade-out
        setTimeout(() => setPhase("idle"), 200);
      }, WIPE_DURATION);
    },
    [phase, prefersReduced]
  );

  // Track scroll direction
  useEffect(() => {
    const handler = () => {
      prevScrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // IntersectionObserver trigger
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const scrollingDown = window.scrollY >= prevScrollRef.current;
        fire(scrollingDown ? "down" : "up");
      },
      { threshold: 0, rootMargin: "-15% 0px -15% 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fire]);

  const isDown = directionRef.current === "down";

  return (
    <>
      {/* Sentinel — trigger point between sections */}
      <div
        ref={sentinelRef}
        className="relative w-full"
        style={{ height: 2 }}
        aria-hidden="true"
      />

      {/* Wipe overlay */}
      {phase !== "idle" && (
        <div
          className="fixed inset-0 pointer-events-none z-[90]"
          aria-hidden="true"
        >
          {/* Reveal mask — black rect that wipes across */}
          <div
            className="absolute inset-0"
            style={{
              background: "hsl(var(--background))",
              animation:
                phase === "wiping"
                  ? `laser-wipe-mask ${WIPE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
                  : undefined,
              opacity: phase === "done" ? 0 : 1,
              transition: phase === "done" ? "opacity 200ms ease-out" : undefined,
              clipPath: isDown
                ? "inset(0 100% 0 0)"
                : "inset(0 0 0 100%)",
            }}
          />

          {/* Laser edge — the glowing leading edge of the wipe */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              width: 40,
              animation:
                phase === "wiping"
                  ? `laser-wipe-edge ${WIPE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`
                  : undefined,
              opacity: phase === "done" ? 0 : 1,
              transition: phase === "done" ? "opacity 150ms ease-out" : undefined,
              left: isDown ? "-40px" : undefined,
              right: isDown ? undefined : "-40px",
            }}
          >
            {/* Core laser line 2px */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                width: 2,
                left: isDown ? "50%" : undefined,
                right: isDown ? undefined : "50%",
                background: "hsl(var(--primary))",
                boxShadow: `0 0 4px 1px hsl(var(--primary) / 0.9), 0 0 12px 2px hsl(var(--primary) / 0.5)`,
              }}
            />
            {/* Soft glow */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                width: 20,
                left: isDown ? "calc(50% - 10px)" : undefined,
                right: isDown ? undefined : "calc(50% - 10px)",
                background: `linear-gradient(${isDown ? "90deg" : "270deg"}, hsl(var(--primary) / 0.3), transparent)`,
                filter: "blur(8px)",
              }}
            />
            {/* Wide ambient */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                width: 40,
                left: 0,
                background: `radial-gradient(ellipse 100% 80% at ${isDown ? "60%" : "40%"} 50%, hsl(var(--primary) / 0.08), transparent)`,
                filter: "blur(12px)",
              }}
            />
          </div>

          {/* Micro sparks */}
          {phase === "wiping" && (
            <>
              {[0.2, 0.35, 0.5, 0.65].map((delay, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 3,
                    height: 3,
                    background: "hsl(var(--primary))",
                    boxShadow: "0 0 6px 2px hsl(var(--primary) / 0.6)",
                    top: `${20 + i * 18}%`,
                    left: isDown ? "0%" : "100%",
                    animation: `laser-spark ${WIPE_DURATION * 0.6}ms ${delay * WIPE_DURATION}ms ease-out forwards`,
                    opacity: 0,
                  }}
                />
              ))}
            </>
          )}
        </div>
      )}

      {/* Keyframe styles — injected once */}
      <style>{`
        @keyframes laser-wipe-mask {
          0% { clip-path: inset(0 ${isDown ? "100%" : "0"} 0 ${isDown ? "0" : "100%"}); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes laser-wipe-edge {
          0% { transform: translateX(${isDown ? "-40px" : "calc(100vw + 40px)"}); }
          100% { transform: translateX(${isDown ? "calc(100vw + 40px)" : "-40px"}); }
        }
        @keyframes laser-spark {
          0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
          30% { opacity: 1; transform: translate(${isDown ? "20px" : "-20px"}, -8px) scale(1.2); }
          100% { opacity: 0; transform: translate(${isDown ? "60px" : "-60px"}, 12px) scale(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .laser-wipe-mask,
          .laser-wipe-edge,
          .laser-spark { animation: none !important; }
        }
      `}</style>
    </>
  );
};
