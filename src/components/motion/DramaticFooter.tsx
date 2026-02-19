import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimationFrame } from "framer-motion";
import { useScrollPaint } from "@/hooks/useScrollPaint";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

// ── Animated NEBU STUDIO letters ──────────────────────────────────────────────
const LETTERS = "NEBU STUDIO".split("");

const GlitchLetter = ({ char, index, isInView }: { char: string; index: number; isInView: boolean }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const scheduleGlitch = () => {
      const delay = Math.random() * 4000 + index * 180;
      const timer = setTimeout(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 120 + Math.random() * 80);
        scheduleGlitch();
      }, delay);
      return timer;
    };
    const t = scheduleGlitch();
    return () => clearTimeout(t);
  }, [isInView, index]);

  if (char === " ") return <span className="inline-block w-6 sm:w-10 md:w-14" />;

  return (
    <motion.span
      className="inline-block relative font-display select-none cursor-default"
      initial={{ opacity: 0, y: 80, rotateX: -90, filter: "blur(20px)" }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -12,
        color: "hsl(var(--primary))",
        textShadow: "0 0 40px hsl(var(--primary) / 0.8), 0 0 80px hsl(var(--primary) / 0.4)",
        transition: { duration: 0.15 },
      }}
      style={{
        transformOrigin: "bottom center",
        perspective: 600,
        color: glitch ? "hsl(var(--primary))" : undefined,
        textShadow: glitch
          ? "2px 0 hsl(0 100% 60%), -2px 0 hsl(200 100% 60%), 0 0 20px hsl(var(--primary) / 0.9)"
          : undefined,
        transform: glitch ? `translateX(${(Math.random() - 0.5) * 6}px)` : undefined,
      }}
    >
      {char}
      {/* Clipping glitch ghost */}
      {glitch && (
        <span
          className="absolute inset-0 font-display text-primary/60"
          style={{
            clipPath: `inset(${Math.random() * 40}% 0 ${Math.random() * 40}% 0)`,
            transform: `translateX(${(Math.random() - 0.5) * 8}px)`,
          }}
          aria-hidden
        >
          {char}
        </span>
      )}
    </motion.span>
  );
};

// ── Fluid canvas behind the letters ──────────────────────────────────────────
const FluidCanvas = ({ isInView }: { isInView: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  useAnimationFrame((_, delta) => {
    if (!isInView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    timeRef.current += delta * 0.0006;
    const t = timeRef.current;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const blobs = [
      { cx: w * 0.25, cy: h * 0.5, r: w * 0.22, color: "rgba(255, 40, 20, 0.22)", phase: 0 },
      { cx: w * 0.55, cy: h * 0.45, r: w * 0.18, color: "rgba(255, 100, 20, 0.18)", phase: 2.1 },
      { cx: w * 0.75, cy: h * 0.6, r: w * 0.16, color: "rgba(255, 30, 10, 0.14)", phase: 4.2 },
      { cx: w * 0.45, cy: h * 0.3, r: w * 0.12, color: "rgba(20, 10, 10, 0.5)", phase: 1.1 },
    ];

    blobs.forEach((b) => {
      const x = b.cx + Math.sin(t + b.phase) * w * 0.06;
      const y = b.cy + Math.cos(t * 0.7 + b.phase) * h * 0.12;
      const r = b.r + Math.sin(t * 1.4 + b.phase) * w * 0.03;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, b.color);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ filter: "blur(48px)" }} aria-hidden />;
};

// ── Scan-line sweep effect ────────────────────────────────────────────────────
const ScanLine = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: "linear-gradient(to bottom, transparent 0%, hsl(var(--primary) / 0.06) 50%, transparent 100%)",
      backgroundSize: "100% 6px",
    }}
    animate={isInView ? { backgroundPositionY: ["0%", "100%"] } : {}}
    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    aria-hidden
  />
);

// ── Main component ─────────────────────────────────────────────────────────────
export const DramaticFooter = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const headerPaint = useScrollPaint({ xDrift: 15, yDrift: 30 });

  return (
    <footer ref={ref} className="relative overflow-hidden pt-20 pb-10">
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        aria-hidden
      />

      <div className="container relative z-10">
        <motion.div ref={headerPaint.ref} style={headerPaint.style}>

          {/* ── NEBU STUDIO animated block ─────────────────────────── */}
          <div className="relative mb-20 rounded-2xl overflow-hidden py-16 sm:py-24 flex items-center justify-center"
            style={{ minHeight: 200 }}>
            {/* Fluid color canvas */}
            <FluidCanvas isInView={isInView} />
            {/* Scan lines */}
            <ScanLine isInView={isInView} />
            {/* Horizontal rule accents */}
            <motion.div
              className="absolute top-0 left-0 w-full h-px bg-primary/20"
              initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-px bg-primary/20"
              initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "right" }}
            />

            {/* The big text */}
            <div
              className="relative z-10 flex items-end gap-0 sm:gap-1"
              style={{
                fontSize: "clamp(3rem, 10vw, 8rem)",
                lineHeight: 1,
                perspective: 800,
              }}
            >
              {LETTERS.map((char, i) => (
                <GlitchLetter key={i} char={char} index={i} isInView={isInView} />
              ))}
            </div>

            {/* Corner brackets */}
            {[
              { top: 12, left: 12, rotate: 0 },
              { top: 12, right: 12, rotate: 90 },
              { bottom: 12, right: 12, rotate: 180 },
              { bottom: 12, left: 12, rotate: 270 },
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-5 h-5 pointer-events-none"
                style={{
                  ...pos,
                  border: "1.5px solid hsl(var(--primary) / 0.5)",
                  borderRadius: 2,
                  rotate: pos.rotate,
                  clipPath: "polygon(0 0, 60% 0, 60% 15%, 15% 15%, 15% 60%, 0 60%)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
              />
            ))}
          </div>

        </motion.div>

        {/* Footer bar */}
        <div className="border-t border-border/20 pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <h2 className="font-display text-4xl sm:text-5xl mb-2">NEBU STUDIO</h2>
              <p className="text-muted-foreground text-xs tracking-wider">Web Design • E-commerce • Systems</p>
            </motion.div>
            <nav className="flex gap-6" aria-label="Footer navigation">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>
          </div>
          <p className="text-center text-muted-foreground/60 text-[10px] mt-10 tracking-wider">
            © {new Date().getFullYear()} NEBU STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
