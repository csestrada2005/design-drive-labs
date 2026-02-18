import { useRef, useEffect, useState, useCallback } from "react";
import { useInView } from "framer-motion";

/**
 * BlackSandReveal — canvas-based "ink/sand crumbling" overlay.
 *
 * Covers the children with a black canvas. When the element enters the
 * viewport, particles fall downward with gravity and scatter, revealing
 * the content beneath. On mobile it falls back to a smooth CSS mask-wipe.
 *
 * mode="section"  → full-area cover (used on DesignLab)
 * mode="text"     → tighter reveal for a headline block
 */

interface BlackSandRevealProps {
  children: React.ReactNode;
  mode?: "section" | "text";
  className?: string;
  delay?: number; // ms before animation fires
}

/* ── Mobile detection (simple, sync) ── */
const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

/* ── CSS mask-wipe fallback (mobile) ── */
const MaskWipeFallback = ({
  children,
  triggered,
}: {
  children: React.ReactNode;
  triggered: boolean;
}) => (
  <div className="relative overflow-hidden">
    {children}
    <div
      className="absolute inset-0 pointer-events-none transition-transform"
      style={{
        background: "hsl(0 0% 0%)",
        transformOrigin: "top",
        transform: triggered ? "scaleY(0)" : "scaleY(1)",
        transition: triggered
          ? "transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)"
          : "none",
      }}
    />
  </div>
);

/* ── Particle type ── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  gravity: number;
}

/* ── Canvas Sand Reveal ── */
const CanvasSandReveal = ({
  children,
  triggered,
  mode,
}: {
  children: React.ReactNode;
  triggered: boolean;
  mode: "section" | "text";
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const doneRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);
  const [canvasVisible, setCanvasVisible] = useState(true);

  /* Build grid of particles covering the canvas */
  const buildParticles = useCallback(
    (w: number, h: number): Particle[] => {
      const grid = mode === "section" ? 10 : 8;
      const cols = Math.ceil(w / grid);
      const rows = Math.ceil(h / grid);
      const particles: Particle[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.4 + Math.random() * 1.8;
          const gravityStrength = 0.12 + Math.random() * 0.22;

          particles.push({
            x: c * grid + Math.random() * grid,
            y: r * grid + Math.random() * grid,
            vx: Math.cos(angle) * speed * 0.3,
            vy: -0.2 + Math.random() * 0.5, // slight upward drift before gravity
            size: grid * (0.7 + Math.random() * 0.6),
            alpha: 1,
            decay: 0.006 + Math.random() * 0.012,
            gravity: gravityStrength,
          });
        }
      }

      // Shuffle so particles don't fall in a uniform wave
      for (let i = particles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [particles[i], particles[j]] = [particles[j], particles[i]];
      }

      return particles;
    },
    [mode]
  );

  useEffect(() => {
    if (!triggered || doneRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill canvas black initially
    ctx.fillStyle = "hsl(0 0% 0%)";
    ctx.fillRect(0, 0, w, h);

    // Build particles
    particlesRef.current = buildParticles(w, h);

    let startTime: number | null = null;

    const animate = (ts: number) => {
      if (startTime === null) startTime = ts;

      ctx.clearRect(0, 0, w, h);

      let allDead = true;

      particlesRef.current.forEach((p) => {
        if (p.alpha <= 0) return;
        allDead = false;

        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0, p.alpha - p.decay);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "hsl(0 0% 3%)";
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      });

      if (!allDead) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        doneRef.current = true;
        setCanvasVisible(false);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [triggered, buildParticles]);

  return (
    <div ref={containerRef} className="relative">
      {children}
      {canvasVisible && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 40 }}
          aria-hidden
        />
      )}
    </div>
  );
};

/* ── Public component ── */
export const BlackSandReveal = ({
  children,
  mode = "section",
  className = "",
  delay = 0,
}: BlackSandRevealProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(triggerRef, { once: true, margin: "-80px" });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (isInView && !triggered) {
      const t = setTimeout(() => setTriggered(true), delay);
      return () => clearTimeout(t);
    }
  }, [isInView, triggered, delay]);

  const mobile = isMobile();

  return (
    <div ref={triggerRef} className={className}>
      {mobile ? (
        <MaskWipeFallback triggered={triggered}>
          {children}
        </MaskWipeFallback>
      ) : (
        <CanvasSandReveal triggered={triggered} mode={mode}>
          {children}
        </CanvasSandReveal>
      )}
    </div>
  );
};
