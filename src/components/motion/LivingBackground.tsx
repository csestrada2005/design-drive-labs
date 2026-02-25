/**
 * LivingBackground — "alive" ambient system for NEBU STUDIO
 *
 * Three layered effects:
 * 1. Section Mood Shift   — ~1% tone change (brightness / contrast / warmth) per section
 * 2. Micro Parallax       — cursor-driven depth on desktop, scroll on mobile
 * 3. Glass Ghost          — single 300ms sheen sweep on section entry
 *
 * All pointer-events:none. Never blocks content or CTAs.
 */

import { useEffect, useRef, useCallback } from "react";

// ─── Mood definitions per section ────────────────────────────────────────────
// Values are CSS filter strings applied to the full-page background wrapper.
// Changes are deliberately tiny (1–2%) to stay imperceptible yet felt.

const SECTION_MOODS: Record<string, string> = {
  hero: "brightness(1.00) contrast(1.00) saturate(1.00) sepia(0.00)",
  services:
    "brightness(0.992) contrast(1.012) saturate(0.98) sepia(0.00)",   // slightly cooler
  lab:
    "brightness(1.015) contrast(0.995) saturate(1.01) sepia(0.00)",   // tiny clarity/brighter
  process:
    "brightness(0.988) contrast(1.015) saturate(0.97) sepia(0.00)",   // slightly darker
  growth:
    "brightness(1.005) contrast(1.005) saturate(1.00) sepia(0.01)",   // neutral+
  work:
    "brightness(0.994) contrast(1.01) saturate(0.985) sepia(0.00)",   // cooler
  standards:
    "brightness(0.99) contrast(1.01) saturate(0.99) sepia(0.00)",
  contact:
    "brightness(1.012) contrast(0.998) saturate(1.02) sepia(0.018)",  // slightly warmer
};

const DEFAULT_MOOD = SECTION_MOODS["hero"];

// Ordered list of section ids to observe
const SECTION_IDS = [
  "hero",
  "services",
  "lab",
  "process",
  "growth",
  "work",
  "standards",
  "contact",
];

// ─── Component ────────────────────────────────────────────────────────────────
export const LivingBackground = () => {
  // The wrapper div that holds the bg image lives in App.tsx — we target it
  // via a CSS custom property set on :root so we avoid React re-renders.
  const ghostRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const currentPos = useRef({ x: 0.5, y: 0.5 });
  const rafId = useRef<number>(0);
  const playedGhost = useRef<Set<string>>(new Set());
  const isMobile = useRef(false);
  const ghostTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── 1. Mood Shift ─────────────────────────────────────────────────────────
  const applyMood = useCallback((sectionId: string) => {
    const mood = SECTION_MOODS[sectionId] ?? DEFAULT_MOOD;
    // Apply to the root background wrapper identified in App.tsx
    const bgWrapper = document.getElementById("bg-wrapper");
    if (bgWrapper) {
      bgWrapper.style.transition = "filter 700ms cubic-bezier(0.4, 0, 0.2, 1)";
      bgWrapper.style.filter = mood;
    }
  }, []);

  // ── 3. Glass Ghost ────────────────────────────────────────────────────────
  const triggerGhost = useCallback((sectionId: string) => {
    if (playedGhost.current.has(sectionId)) return;
    if (!ghostRef.current) return;
    playedGhost.current.add(sectionId);

    const el = ghostRef.current;
    // Reset
    el.style.transition = "none";
    el.style.transform = "translateX(-100%)";
    el.style.opacity = "1";

    // Force reflow
    void el.offsetWidth;

    // Sweep in then out in 300ms total
    el.style.transition =
      "transform 280ms cubic-bezier(0.25, 1, 0.5, 1), opacity 280ms ease";
    el.style.transform = "translateX(110%)";

    if (ghostTimeout.current) clearTimeout(ghostTimeout.current);
    ghostTimeout.current = setTimeout(() => {
      if (el) el.style.opacity = "0";
    }, 200);
  }, []);

  // ── Intersection Observer for sections ────────────────────────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            applyMood(id);
            triggerGhost(id);
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [applyMood, triggerGhost]);

  // ── 2. Micro Parallax — cursor (desktop) / scroll (mobile) ───────────────
  useEffect(() => {
    isMobile.current = window.matchMedia("(max-width: 767px)").matches;

    // Mouse handler — desktop only
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile.current) return;
      mousePos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    // Scroll parallax — mobile fallback
    const onScroll = () => {
      if (!isMobile.current) return;
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      mousePos.current = { x: 0.5, y: progress };
    };

    // Device tilt — mobile bonus
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!isMobile.current) return;
      const gamma = Math.max(-30, Math.min(30, e.gamma ?? 0)); // left-right tilt
      const beta = Math.max(-30, Math.min(30, (e.beta ?? 0) - 45)); // fwd-back
      mousePos.current = {
        x: 0.5 + gamma / 60,
        y: 0.5 + beta / 60,
      };
    };

    // Smooth lerp animation loop
    const MAX_DRIFT = isMobile.current ? 4 : 8; // less drift on mobile

    const tick = () => {
      // Ease toward target
      const lerp = isMobile.current ? 0.03 : 0.04;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp;

      const dx = (currentPos.current.x - 0.5) * MAX_DRIFT * 2;
      const dy = (currentPos.current.y - 0.5) * MAX_DRIFT * 2;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
      cancelAnimationFrame(rafId.current);
      if (ghostTimeout.current) clearTimeout(ghostTimeout.current);
    };
  }, []);

  return (
    <>
      {/* ── Micro Parallax drift layer (sits inside bg-wrapper in App) ── */}
      {/* Rendered as a fixed ambient veil — very subtle radial highlight */}
      <div
        ref={parallaxRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 50%, hsl(0 0% 100% / 0.015), transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* ── Glass Ghost sweep ── */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        style={{ opacity: 0 }}
      >
        <div
          className="absolute inset-y-0"
          style={{
            // The sheen panel — wider than screen to avoid edge clipping
            left: "-20%",
            width: "40%",
            background:
              "linear-gradient(105deg, transparent 20%, hsl(0 0% 100% / 0.06) 40%, hsl(0 0% 100% / 0.11) 50%, hsl(0 0% 100% / 0.06) 60%, transparent 80%)",
          }}
        />
      </div>
    </>
  );
};
