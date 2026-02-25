import { useRef, useEffect, useCallback } from "react";

/**
 * HeroLaserWipeOverlay — scroll-driven wipe that covers the hero TOP→BOTTOM.
 *
 * Uses a CSS custom property `--wipe` (0→1) set via rAF on scroll.
 * All visuals are driven by that single variable — no React state, no re-renders.
 *
 * progress 0 → overlay invisible (clip-path hides it)
 * progress 1 → overlay covers 100% of hero
 * Laser edge = bottom boundary of the revealed overlay
 */

export const HeroLaserOverlay = ({
  heroRef,
}: {
  heroRef: React.RefObject<HTMLElement | null>;
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  // Check reduced motion once
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const update = useCallback(() => {
    const hero = heroRef.current;
    const root = rootRef.current;
    if (!hero || !root) return;

    const rect = hero.getBoundingClientRect();
    const heroH = rect.height;

    // scrolled = how many px the hero has moved above viewport top
    const scrolled = -rect.top;

    // Animation range: start at 5% of hero scroll, end at 70%
    const startPx = heroH * 0.05;
    const endPx = heroH * 0.7;
    const range = endPx - startPx;

    let progress = 0;
    if (scrolled > startPx) {
      progress = Math.min(1, (scrolled - startPx) / range);
    }

    // Set CSS custom property — all children read from this
    root.style.setProperty("--wipe", `${progress}`);
  }, [heroRef]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial call
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  if (reducedMotion) {
    // Reduced motion: simple fade overlay driven by same scroll logic but no wipe
    return (
      <div
        ref={rootRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 20, ["--wipe" as string]: "0" }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "hsl(var(--background))",
            opacity: "calc(var(--wipe) * 0.85)",
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 20, ["--wipe" as string]: "0" }}
      aria-hidden="true"
    >
      {/* Main wipe overlay — covers hero from TOP → BOTTOM */}
      <div
        className="absolute inset-0"
        style={{
          background: "hsl(var(--background) / 0.92)",
          // clip from bottom: reveal top portion equal to progress
          clipPath: "inset(0 0 calc((1 - var(--wipe)) * 100%) 0)",
          willChange: "clip-path",
        }}
      />

      {/* Laser edge — glowing line at the bottom boundary of the wipe */}
      <div
        className="absolute left-0 right-0"
        style={{
          height: 44,
          // Position at wipe boundary: top = progress * 100%
          top: "calc(var(--wipe) * 100%)",
          marginTop: -22,
          opacity: "clamp(0, calc(var(--wipe) * 20) * calc(1 - (var(--wipe) - 0.95) * 20), 1)",
          willChange: "top, opacity",
        }}
      >
        {/* Core laser line — 2px bright */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: 2,
            top: "50%",
            marginTop: -1,
            background: "hsl(var(--primary))",
            boxShadow:
              "0 0 6px 1px hsl(var(--primary) / 0.9), 0 0 16px 3px hsl(var(--primary) / 0.45), 0 0 30px 5px hsl(var(--primary) / 0.15)",
          }}
        />
        {/* Upper ambient glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: 18,
            bottom: "50%",
            background:
              "linear-gradient(to top, hsl(var(--primary) / 0.25), transparent)",
          }}
        />
        {/* Lower ambient glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: 14,
            top: "50%",
            background:
              "linear-gradient(to bottom, hsl(var(--primary) / 0.18), transparent)",
          }}
        />
      </div>

      {/* Hero content dim — via sibling selector won't work, so use a second overlay */}
      {/* Content dimming is handled by the main overlay opacity already */}
    </div>
  );
};
