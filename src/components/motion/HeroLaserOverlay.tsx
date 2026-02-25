import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * HeroLaserOverlay — scroll-driven overlay that grows from the red underline
 * position and covers the hero as the user scrolls down. Fully reversible (scrub).
 *
 * - progress 0: overlay is a thin line matching the underline
 * - progress 1: overlay covers the entire hero
 * - The "laser edge" sits at the top of the growing overlay
 * - Hero content behind gets subtly dimmed/scaled
 */

export const HeroLaserOverlay = ({
  heroRef,
}: {
  heroRef: React.RefObject<HTMLElement | null>;
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef(0);
  const prefersReduced = useReducedMotion();

  const update = useCallback(() => {
    const hero = heroRef.current;
    const overlay = overlayRef.current;
    const edge = edgeRef.current;
    if (!hero || !overlay || !edge) return;

    const rect = hero.getBoundingClientRect();
    const heroH = rect.height;
    const vh = window.innerHeight;

    // progress: 0 when hero top is at viewport top, 1 when hero bottom reaches viewport top
    // We want the animation to play in the last ~40% of the hero's scroll
    const scrolled = -rect.top; // how far hero has scrolled up
    const animStart = heroH * 0.55; // start at 55% scrolled
    const animEnd = heroH; // end when hero fully scrolled
    const range = animEnd - animStart;

    let progress = 0;
    if (scrolled > animStart) {
      progress = Math.min(1, (scrolled - animStart) / range);
    }

    // The underline sits at roughly 82% from the top of the hero
    // (owl + title + underline area). Overlay grows upward from there.
    const underlineY = heroH * 0.52; // approximate Y position of underline within hero

    if (prefersReduced) {
      // Simple opacity fade for reduced motion
      overlay.style.opacity = progress > 0.1 ? `${Math.min(1, progress * 1.5)}` : "0";
      overlay.style.clipPath = "none";
      overlay.style.top = "0";
      overlay.style.height = "100%";
      overlay.style.background = `hsl(var(--background) / ${progress * 0.85})`;
      edge.style.opacity = "0";
      return;
    }

    if (progress <= 0) {
      overlay.style.opacity = "0";
      edge.style.opacity = "0";
      // Reset hero content
      const content = hero.querySelector("[data-hero-content]") as HTMLElement;
      if (content) {
        content.style.transform = "";
        content.style.opacity = "";
      }
      return;
    }

    // Overlay grows from underline position upward AND downward to cover hero
    // Using clip-path for GPU-accelerated animation
    const topClip = (1 - progress) * underlineY; // top edge moves up
    const bottomClip = (1 - progress) * (heroH - underlineY); // bottom edge moves down

    const topPct = (topClip / heroH) * 100;
    const bottomPct = (bottomClip / heroH) * 100;

    overlay.style.opacity = "1";
    overlay.style.clipPath = `inset(${topPct}% 0 ${bottomPct}% 0)`;
    overlay.style.top = "0";
    overlay.style.height = "100%";

    // Overlay color — dark with slight primary tint
    const overlayOpacity = 0.6 + progress * 0.35;
    overlay.style.background = `hsl(var(--background) / ${overlayOpacity})`;

    // Laser edge — positioned at the top clip boundary
    const edgeY = topClip;
    edge.style.opacity = progress > 0.02 && progress < 0.98 ? "1" : "0";
    edge.style.transform = `translateY(${edgeY}px)`;

    // Hero content "sinks back" effect
    const content = hero.querySelector("[data-hero-content]") as HTMLElement;
    if (content) {
      const scale = 1 - progress * 0.008; // 1 → 0.992
      const opacity = 1 - progress * 0.12; // 1 → 0.88
      content.style.transform = `scale(${scale})`;
      content.style.opacity = `${opacity}`;
      content.style.transition = "none";
    }
  }, [heroRef, prefersReduced]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 20 }}
      aria-hidden="true"
    >
      {/* Main overlay — covers hero */}
      <div
        ref={overlayRef}
        className="absolute left-0 right-0"
        style={{
          opacity: 0,
          willChange: "clip-path, opacity",
        }}
      />

      {/* Laser edge — the glowing line at the top of the overlay */}
      <div
        ref={edgeRef}
        className="absolute left-0 right-0"
        style={{
          height: 40,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        {/* Core line */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: 2,
            top: "50%",
            marginTop: -1,
            background: "hsl(var(--primary))",
            boxShadow:
              "0 0 4px 1px hsl(var(--primary) / 0.9), 0 0 12px 2px hsl(var(--primary) / 0.4)",
          }}
        />
        {/* Upper glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: 16,
            bottom: "50%",
            background:
              "linear-gradient(to top, hsl(var(--primary) / 0.3), transparent)",
          }}
        />
        {/* Lower glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: 12,
            top: "50%",
            background:
              "linear-gradient(to bottom, hsl(var(--primary) / 0.2), transparent)",
          }}
        />
      </div>
    </div>
  );
};
