import { useEffect, useRef, useCallback } from "react";

/**
 * LaserWipeTransition — full-screen vertical wipe (bottom → top)
 * between Design Lab (#lab) and How We Work (#process).
 *
 * - Fires once per direction with 1200ms cooldown
 * - Uses rAF for the wipe animation (no setState per frame)
 * - Locks scroll during wipe, snaps to target, then releases
 * - prefers-reduced-motion: crossfade + smooth scroll
 */

const WIPE_MS = 750;
const COOLDOWN_MS = 1200;

// Cubic-bezier approximation for JS: easeOutExpo
const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const LaserWipeTransition = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const firingRef = useRef(false);
  const cooldownRef = useRef(0);
  const hasFiredDownRef = useRef(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animateWipe = useCallback(
    (direction: "down" | "up") => {
      const overlay = overlayRef.current;
      const edge = edgeRef.current;
      const targetId = direction === "down" ? "process" : "lab";
      const targetEl = document.getElementById(targetId);
      if (!overlay || !edge || !targetEl || firingRef.current) return;
      if (Date.now() < cooldownRef.current) return;

      firingRef.current = true;

      // Reduced motion: just scroll
      if (prefersReduced) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        cooldownRef.current = Date.now() + COOLDOWN_MS;
        firingRef.current = false;
        return;
      }

      // Lock scroll
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      // Show overlay
      overlay.style.display = "block";
      edge.style.display = "block";

      const startTime = performance.now();
      let snapped = false;

      const frame = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(1, elapsed / WIPE_MS);
        const progress = ease(rawProgress);

        // Wipe direction: down = bottom→top reveal, up = top→bottom reveal
        if (direction === "down") {
          // Overlay enters from bottom: inset(X 0 0 0) where X goes 100%→0%
          overlay.style.clipPath = `inset(${(1 - progress) * 100}% 0 0 0)`;
          // Edge position: starts at bottom, moves to top
          edge.style.transform = `translateY(${(1 - progress) * 100}vh)`;
        } else {
          // Overlay enters from top: inset(0 0 X 0) where X goes 100%→0%
          overlay.style.clipPath = `inset(0 0 ${(1 - progress) * 100}% 0)`;
          edge.style.transform = `translateY(${progress * 100}vh)`;
        }

        overlay.style.opacity = "1";
        edge.style.opacity = progress > 0.02 && progress < 0.95 ? "1" : "0";

        // Snap at 75% progress
        if (!snapped && progress >= 0.75) {
          snapped = true;
          const targetY = targetEl.offsetTop;
          window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
        }

        if (rawProgress < 1) {
          requestAnimationFrame(frame);
        } else {
          // Done — fade out overlay, unlock scroll
          overlay.style.transition = "opacity 180ms ease-out";
          overlay.style.opacity = "0";
          edge.style.opacity = "0";

          setTimeout(() => {
            overlay.style.display = "none";
            edge.style.display = "none";
            overlay.style.transition = "";
            overlay.style.clipPath = "";
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            firingRef.current = false;
            cooldownRef.current = Date.now() + COOLDOWN_MS;
          }, 200);
        }
      };

      requestAnimationFrame(frame);
    },
    [prefersReduced]
  );

  // Intersection observer on sentinel between the two sections
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > lastScrollY;
      lastScrollY = currentY;

      if (firingRef.current || Date.now() < cooldownRef.current) return;

      const rect = sentinel.getBoundingClientRect();
      const vh = window.innerHeight;

      // Trigger down: sentinel enters top 20% of viewport while scrolling down
      if (goingDown && !hasFiredDownRef.current && rect.top < vh * 0.2 && rect.top > -vh * 0.3) {
        hasFiredDownRef.current = true;
        animateWipe("down");
      }

      // Trigger up: sentinel enters bottom 20% of viewport while scrolling up
      if (!goingDown && hasFiredDownRef.current && rect.top > vh * 0.7 && rect.top < vh * 1.3) {
        hasFiredDownRef.current = false;
        animateWipe("up");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [animateWipe]);

  return (
    <>
      {/* Sentinel marker between Design Lab and Process */}
      <div
        ref={sentinelRef}
        className="relative w-full"
        style={{ height: 4 }}
        aria-hidden="true"
      />

      {/* Fixed overlay — the wipe curtain */}
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none z-[90]"
        aria-hidden="true"
        style={{ display: "none", background: "hsl(var(--background))", willChange: "clip-path, opacity" }}
      />

      {/* Laser edge — the glowing horizontal line */}
      <div
        ref={edgeRef}
        className="fixed left-0 right-0 pointer-events-none z-[91]"
        aria-hidden="true"
        style={{ display: "none", height: 50, top: 0, willChange: "transform, opacity" }}
      >
        {/* Core 2px bright line */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: 2,
            top: "50%",
            marginTop: -1,
            background: "hsl(var(--primary))",
            boxShadow:
              "0 0 6px 1px hsl(var(--primary) / 0.9), 0 0 16px 3px hsl(var(--primary) / 0.5), 0 0 32px 6px hsl(var(--primary) / 0.15)",
          }}
        />
        {/* Upper glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: 20,
            bottom: "50%",
            background: "linear-gradient(to top, hsl(var(--primary) / 0.3), transparent)",
          }}
        />
        {/* Lower glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: 20,
            top: "50%",
            background: "linear-gradient(to bottom, hsl(var(--primary) / 0.2), transparent)",
          }}
        />
      </div>
    </>
  );
};
