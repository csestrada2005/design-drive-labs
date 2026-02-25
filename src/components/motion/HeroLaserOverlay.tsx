import { useRef, useEffect, useCallback } from "react";

/**
 * HeroLaserWipeOverlay — scroll-driven wipe covering hero TOP→BOTTOM.
 *
 * Architecture:
 * - IntersectionObserver gates the rAF loop (only runs when hero visible)
 * - Progress (0→1) computed from hero scroll position
 * - Lerp smoothing prevents jitter without adding perceptible lag
 * - All DOM updates via direct style manipulation — zero React state/re-renders
 * - Animates only transform, clip-path, opacity (compositor-friendly)
 * - Spark particles emitted from laser edge — pooled DOM nodes, no GC
 * - Mobile: reduced glow, fewer sparks
 * - Reduced motion: simple opacity fade, no wipe/sparks
 */

const LERP_FACTOR = 0.14;
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

/* ── Spark particle pool (pure DOM, zero React) ── */
const SPARK_POOL_SIZE = isMobile ? 8 : 16;
const SPARK_LIFETIME = 600; // ms
const SPARK_EMIT_INTERVAL = isMobile ? 120 : 60; // ms between emissions

interface Spark {
  el: HTMLDivElement;
  alive: boolean;
  birth: number;
  x: number;   // % from left
  vx: number;  // px/s
  vy: number;  // px/s
  size: number; // px
}

function createSparkPool(container: HTMLElement): Spark[] {
  const pool: Spark[] = [];
  for (let i = 0; i < SPARK_POOL_SIZE; i++) {
    const el = document.createElement("div");
    el.style.cssText =
      "position:absolute;border-radius:50%;pointer-events:none;will-change:transform,opacity;opacity:0;background:hsl(var(--primary));";
    container.appendChild(el);
    pool.push({ el, alive: false, birth: 0, x: 0, vx: 0, vy: 0, size: 2 });
  }
  return pool;
}

function emitSpark(pool: Spark[], now: number) {
  // Find a dead spark to reuse
  const spark = pool.find((s) => !s.alive);
  if (!spark) return;
  spark.alive = true;
  spark.birth = now;
  spark.x = 5 + Math.random() * 90; // 5-95% horizontal
  spark.vx = (Math.random() - 0.5) * 60; // px/s lateral drift
  spark.vy = -(20 + Math.random() * 40); // px/s upward
  spark.size = 1.5 + Math.random() * 2.5;
  spark.el.style.width = `${spark.size}px`;
  spark.el.style.height = `${spark.size}px`;
}

function updateSparks(pool: Spark[], now: number, laserY: number) {
  for (const s of pool) {
    if (!s.alive) continue;
    const age = now - s.birth;
    if (age > SPARK_LIFETIME) {
      s.alive = false;
      s.el.style.opacity = "0";
      continue;
    }
    const t = age / SPARK_LIFETIME; // 0→1
    const easeOut = 1 - t * t;
    const dt = age / 1000;
    const px = s.x; // stay in % for x base
    const offsetX = s.vx * dt;
    const offsetY = s.vy * dt * easeOut;
    // opacity: bright start, fade out
    const opacity = Math.max(0, (1 - t) * (0.6 + Math.random() * 0.15));
    s.el.style.transform = `translate(${offsetX}px, ${laserY + offsetY}px) translateZ(0)`;
    s.el.style.left = `${px}%`;
    s.el.style.opacity = `${opacity}`;
  }
}

export const HeroLaserOverlay = ({
  heroRef,
}: {
  heroRef: React.RefObject<HTMLElement | null>;
}) => {
  const wipeRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const sparksContainerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const isVisible = useRef(true);
  const currentProgress = useRef(0);
  const targetProgress = useRef(0);
  const sparkPool = useRef<Spark[] | null>(null);
  const lastEmitTime = useRef(0);
  const lastProgress = useRef(0);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Core update — called every rAF frame when hero is in view
  const tick = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) {
      if (isVisible.current) rafId.current = requestAnimationFrame(tick);
      return;
    }

    const rect = hero.getBoundingClientRect();
    const heroH = rect.height;
    const scrolled = -rect.top;

    // Progress range: 5% → 75% of hero height
    const startPx = heroH * 0.05;
    const endPx = heroH * 0.75;
    const raw = Math.max(0, Math.min(1, (scrolled - startPx) / (endPx - startPx)));
    targetProgress.current = raw;

    // Lerp for smoothness
    const prev = currentProgress.current;
    const next = prev + (raw - prev) * LERP_FACTOR;
    const progress = Math.abs(raw - next) < 0.001 ? raw : next;
    currentProgress.current = progress;

    if (reducedMotion) {
      if (rootRef.current) {
        rootRef.current.style.opacity = `${progress * 0.85}`;
      }
    } else {
      // Wipe overlay — clip from top
      if (wipeRef.current) {
        const bottomClip = (1 - progress) * 100;
        wipeRef.current.style.clipPath = `inset(0 0 ${bottomClip}% 0)`;
      }

      // Laser edge position + visibility
      const laserYpx = progress * heroH;
      if (laserRef.current) {
        const y = progress * 100;
        laserRef.current.style.transform = `translateY(${y}cqh) translateZ(0)`;
        const fadeIn = Math.min(1, progress * 15);
        const fadeOut = progress > 0.92 ? Math.max(0, 1 - (progress - 0.92) / 0.08) : 1;
        laserRef.current.style.opacity = `${fadeIn * fadeOut}`;
      }

      // Spark particles — only emit when scrolling (progress changing)
      const now = performance.now();
      if (sparkPool.current) {
        const delta = Math.abs(progress - lastProgress.current);
        // Only emit sparks when actively scrolling and laser is visible
        if (delta > 0.001 && progress > 0.02 && progress < 0.95) {
          if (now - lastEmitTime.current > SPARK_EMIT_INTERVAL) {
            emitSpark(sparkPool.current, now);
            lastEmitTime.current = now;
          }
        }
        updateSparks(sparkPool.current, now, laserYpx);
      }
      lastProgress.current = progress;
    }

    if (isVisible.current) {
      rafId.current = requestAnimationFrame(tick);
    }
  }, [heroRef, reducedMotion]);

  // Initialize spark pool + IntersectionObserver
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Create spark pool
    if (!reducedMotion && sparksContainerRef.current && !sparkPool.current) {
      sparkPool.current = createSparkPool(sparksContainerRef.current);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible.current;
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && !wasVisible) {
          rafId.current = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "100px 0px 100px 0px" }
    );

    io.observe(hero);

    isVisible.current = true;
    rafId.current = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      isVisible.current = false;
      cancelAnimationFrame(rafId.current);
    };
  }, [heroRef, tick, reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        ref={rootRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 20,
          background: "hsl(var(--background))",
          opacity: 0,
          willChange: "opacity",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 20, containerType: "size" }}
      aria-hidden="true"
    >
      {/* Wipe overlay — covers from top down */}
      <div
        ref={wipeRef}
        className="absolute inset-0"
        style={{
          background: "hsl(var(--background) / 0.92)",
          clipPath: "inset(0 0 100% 0)",
          willChange: "clip-path",
        }}
      />

      {/* Spark particles container */}
      <div
        ref={sparksContainerRef}
        className="absolute inset-0 overflow-hidden"
      />

      {/* Laser edge — positioned at wipe boundary */}
      <div
        ref={laserRef}
        className="absolute left-0 right-0"
        style={{
          height: 44,
          top: 0,
          marginTop: -22,
          opacity: 0,
          willChange: "transform, opacity",
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
            boxShadow: isMobile
              ? "0 0 8px 1px hsl(var(--primary) / 0.7)"
              : "0 0 6px 1px hsl(var(--primary) / 0.9), 0 0 18px 3px hsl(var(--primary) / 0.4), 0 0 32px 5px hsl(var(--primary) / 0.12)",
          }}
        />
        {/* Upper glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: isMobile ? 10 : 18,
            bottom: "50%",
            background: `linear-gradient(to top, hsl(var(--primary) / ${isMobile ? 0.15 : 0.25}), transparent)`,
          }}
        />
        {/* Lower glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: isMobile ? 8 : 14,
            top: "50%",
            background: `linear-gradient(to bottom, hsl(var(--primary) / ${isMobile ? 0.1 : 0.18}), transparent)`,
          }}
        />
      </div>
    </div>
  );
};
