/**
 * JapaneseBrushStrokes — sumi-e ink strokes on the background canvas
 *
 * Each stroke is drawn as a tapered bezier curve (like a calligraphy brush),
 * fades in briefly then dissolves away. They appear randomly across the full page.
 * pointer-events: none — never blocks anything.
 */

import { useEffect, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Stroke {
  x: number;        // start x (% of canvas width)
  y: number;        // start y (% of canvas height)
  angle: number;    // radians
  length: number;   // px
  width: number;    // max brush width px
  curve: number;    // bezier curvature offset
  opacity: number;  // current opacity
  phase: "in" | "hold" | "out";
  age: number;      // frame counter
  inDur: number;    // frames to fade in
  holdDur: number;  // frames to hold
  outDur: number;   // frames to fade out
  seed: number;     // randomness seed for bristle variation
}

// ── Helpers ────────────────────────────────────────────────────────────────
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Draw a single tapered brush stroke on a canvas context.
 * Simulates ink on washi paper: thick in the middle, tapered at both ends,
 * with slight bristle separation lines.
 */
function drawStroke(ctx: CanvasRenderingContext2D, s: Stroke, alpha: number) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;

  const sx = s.x * W;
  const sy = s.y * H;
  const ex = sx + Math.cos(s.angle) * s.length;
  const ey = sy + Math.sin(s.angle) * s.length;

  // Control point for curve
  const mx = (sx + ex) / 2 + Math.cos(s.angle + Math.PI / 2) * s.curve;
  const my = (sy + ey) / 2 + Math.sin(s.angle + Math.PI / 2) * s.curve;

  const steps = Math.ceil(s.length / 3); // sample points along the path

  ctx.save();

  // Main body of the stroke — tapered shape
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Quadratic bezier point
    const bx = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * mx + t * t * ex;
    const by = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * my + t * t * ey;

    // Taper: sin curve so stroke is narrow at ends, wide in middle
    const taper = Math.sin(t * Math.PI);
    const halfW = (s.width * taper) / 2;

    // Perpendicular direction
    const dx = Math.cos(s.angle + Math.PI / 2);
    const dy = Math.sin(s.angle + Math.PI / 2);

    if (i === 0) {
      ctx.moveTo(bx + dx * halfW, by + dy * halfW);
    } else {
      ctx.lineTo(bx + dx * halfW, by + dy * halfW);
    }
  }
  for (let i = steps; i >= 0; i--) {
    const t = i / steps;
    const bx = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * mx + t * t * ex;
    const by = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * my + t * t * ey;
    const taper = Math.sin(t * Math.PI);
    const halfW = (s.width * taper) / 2;
    const dx = Math.cos(s.angle + Math.PI / 2);
    const dy = Math.sin(s.angle + Math.PI / 2);
    ctx.lineTo(bx - dx * halfW, by - dy * halfW);
  }
  ctx.closePath();

  // Rich ink black, slightly warm (sumi ink has a warm-dark tone)
  ctx.fillStyle = `hsla(20, 8%, 4%, ${alpha * 0.82})`;
  ctx.fill();

  // ── Bristle texture — a few thin lines along the stroke ──
  const bristleCount = Math.floor(s.width / 4);
  for (let b = 0; b < bristleCount; b++) {
    const offset = lerp(-s.width * 0.35, s.width * 0.35, b / Math.max(bristleCount - 1, 1));
    const jitter = (Math.sin(s.seed * 31 + b * 7.3) * 0.5 + 0.5) * 0.3;

    ctx.beginPath();
    ctx.moveTo(
      sx + Math.cos(s.angle + Math.PI / 2) * offset,
      sy + Math.sin(s.angle + Math.PI / 2) * offset
    );
    ctx.quadraticCurveTo(
      mx + Math.cos(s.angle + Math.PI / 2) * (offset * 0.8),
      my + Math.sin(s.angle + Math.PI / 2) * (offset * 0.8),
      ex + Math.cos(s.angle + Math.PI / 2) * offset,
      ey + Math.sin(s.angle + Math.PI / 2) * offset
    );
    ctx.strokeStyle = `hsla(20, 8%, 4%, ${alpha * jitter * 0.25})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  ctx.restore();
}

// ── Stroke factory ─────────────────────────────────────────────────────────
function createStroke(): Stroke {
  // Bias angles toward horizontal/diagonal like calligraphy
  const angleBase = rand(-0.3, 0.3) + (Math.random() > 0.5 ? 0 : Math.PI / 6);

  return {
    x: rand(0.02, 0.95),
    y: rand(0.02, 0.95),
    angle: angleBase,
    length: rand(60, 240),
    width: rand(4, 18),
    curve: rand(-30, 30),
    opacity: 0,
    phase: "in",
    age: 0,
    inDur: Math.floor(rand(40, 80)),    // ~0.7–1.3s at 60fps
    holdDur: Math.floor(rand(60, 180)), // ~1–3s
    outDur: Math.floor(rand(80, 160)),  // ~1.3–2.7s
    seed: Math.random() * 1000,
  };
}

// ── Component ──────────────────────────────────────────────────────────────
export const JapaneseBrushStrokes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to match full document height
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Pool of active strokes
    const MAX_STROKES = 6;
    const strokes: Stroke[] = [];

    // Seed initial strokes staggered
    for (let i = 0; i < MAX_STROKES; i++) {
      const s = createStroke();
      // Stagger start times so they don't all appear at once
      s.age = -Math.floor(rand(0, 300));
      strokes.push(s);
    }

    let rafId: number;

    const tick = () => {
      // Clear canvas each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < strokes.length; i++) {
        const s = strokes[i];
        s.age++;

        if (s.age < 0) continue; // still waiting to start

        // Advance phase
        if (s.phase === "in") {
          s.opacity = Math.min(1, s.age / s.inDur);
          if (s.age >= s.inDur) {
            s.phase = "hold";
            s.age = 0;
          }
        } else if (s.phase === "hold") {
          s.opacity = 1;
          if (s.age >= s.holdDur) {
            s.phase = "out";
            s.age = 0;
          }
        } else if (s.phase === "out") {
          s.opacity = Math.max(0, 1 - s.age / s.outDur);
          if (s.age >= s.outDur) {
            // Recycle stroke at a new random position
            strokes[i] = createStroke();
            // Give it a delay before appearing
            strokes[i].age = -Math.floor(rand(30, 200));
            continue;
          }
        }

        // Draw with eased opacity — use smooth ease-in-out on the alpha
        const eased =
          s.phase === "in"
            ? s.opacity * s.opacity * (3 - 2 * s.opacity)       // smooth step in
            : s.phase === "out"
            ? s.opacity * s.opacity * (3 - 2 * s.opacity)       // smooth step out
            : 1;

        // Max global alpha very low — these are background whispers
        const maxAlpha = 0.13;
        drawStroke(ctx, s, eased * maxAlpha);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ mixBlendMode: "multiply" }}
    />
  );
};
