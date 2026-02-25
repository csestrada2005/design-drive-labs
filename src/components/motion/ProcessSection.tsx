import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { MicroCTA } from "@/components/motion/MicroCTA";

const steps = [
  { id: "audit", number: "01", title: "Audit & Strategy", desc: "We dissect your market, audience, and competitors to build on real insight." },
  { id: "ux", number: "02", title: "UX Structure", desc: "Information architecture designed for how users actually think and move." },
  { id: "design", number: "03", title: "Design System", desc: "A premium visual identity built for consistency, speed, and brand authority." },
  { id: "build", number: "04", title: "Build & Integrations", desc: "Clean code, fluid motion, and every integration you need — shipped fast." },
  { id: "launch", number: "05", title: "Launch & Optimize", desc: "We track, test, and improve what matters after go-live." },
];

/* ── Morphing geometric anchor ── */
const morphConfigs = [
  // Audit: scattered, exploded pieces
  { points: 8, rotation: 0, scale: 1, spread: 1.8, opacity: 0.9, wireframe: true },
  // UX: grid-like, structured
  { points: 8, rotation: 45, scale: 0.9, spread: 0.6, opacity: 0.9, wireframe: true },
  // Design: bright, unified
  { points: 6, rotation: 0, scale: 1.1, spread: 0.3, opacity: 1, wireframe: false },
  // Build: complex, interlocked
  { points: 12, rotation: 30, scale: 1, spread: 0.5, opacity: 1, wireframe: true },
  // Launch: radiant, expanding
  { points: 6, rotation: 0, scale: 1.3, spread: 0.1, opacity: 1, wireframe: false },
];

const MorphAnchor = ({ activeIndex }: { activeIndex: number }) => {
  const config = morphConfigs[activeIndex];
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;

  const generatePoints = (count: number, spread: number) => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 60 + spread * 40;
      pts.push({
        x: cx + Math.cos(angle) * r + (spread > 1 ? (Math.random() - 0.5) * 40 : 0),
        y: cy + Math.sin(angle) * r + (spread > 1 ? (Math.random() - 0.5) * 40 : 0),
      });
    }
    return pts;
  };

  const points = generatePoints(config.points, config.spread);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full"
        animate={{ rotate: config.rotation }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Connections between points */}
        {points.map((p, i) =>
          points.slice(i + 1).map((q, j) => {
            const dist = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
            if (dist > 160) return null;
            return (
              <motion.line
                key={`${i}-${j}`}
                x1={p.x}
                y1={p.y}
                x2={q.x}
                y2={q.y}
                stroke="hsl(0 100% 50%)"
                strokeWidth={config.wireframe ? 0.5 : 1}
                initial={{ opacity: 0 }}
                animate={{ opacity: config.opacity * 0.3 }}
                transition={{ duration: 0.6, delay: (i + j) * 0.02 }}
              />
            );
          })
        )}

        {/* Points/nodes */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            r={config.wireframe ? 2 : 3}
            fill={config.wireframe ? "none" : "hsl(0 100% 50%)"}
            stroke="hsl(0 100% 50%)"
            strokeWidth="1"
            initial={{ cx: cx, cy: cy, opacity: 0 }}
            animate={{
              cx: p.x,
              cy: p.y,
              opacity: config.opacity,
              scale: config.scale,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
              delay: i * 0.04,
            }}
            style={{
              filter: "none",
            }}
          />
        ))}

        {/* Center glow */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={config.wireframe ? 4 : 8}
          fill="hsl(0 100% 50%)"
          animate={{ opacity: config.opacity * 0.6, r: config.wireframe ? 4 : 8 }}
          transition={{ duration: 0.5 }}
          style={{ filter: "none" }}
        />
      </motion.svg>

      {/* Ambient glow behind */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          opacity: config.opacity * 0.15,
          scale: config.scale,
        }}
        transition={{ duration: 0.8 }}
        style={{
          background: "radial-gradient(circle, hsl(0 100% 50% / 0.12), transparent 70%)",
        }}
      />
    </div>
  );
};

export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Direct mapping: scroll progress → step index (no cooldown, no stale closure)
    const idx = Math.min(Math.floor(v * steps.length), steps.length - 1);
    setActiveIndex(idx);
  });

  return (
    <div ref={containerRef} style={{ height: `${steps.length * 80}vh` }} id="process">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center pb-20 sm:pb-0">
        {/* Title */}
        <motion.h2
          className="font-display text-3xl sm:text-4xl md:text-5xl text-primary mb-8 sm:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          How we work.
        </motion.h2>

        {/* Central morph anchor + text */}
        <div className="flex flex-col items-center px-6">
          {/* Morphing geometric cluster */}
          <div className="mb-8">
            <MorphAnchor activeIndex={activeIndex} />
          </div>

          {/* Step info — no remount, just animate content changes */}
          <div className="text-center min-h-[140px]">
            <motion.span
              key={`num-${activeIndex}`}
              className="font-mono text-xs sm:text-[11px] tracking-[0.3em] text-primary mb-3 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {steps[activeIndex].number}
            </motion.span>
            <motion.h3
              key={`title-${activeIndex}`}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-none mb-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {steps[activeIndex].title}
            </motion.h3>
            <motion.p
              key={`desc-${activeIndex}`}
              className="text-foreground/80 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {steps[activeIndex].desc}
            </motion.p>
          </div>

           {/* Micro-CTA — visible on last step */}
           {activeIndex === steps.length - 1 && (
             <div className="mt-8">
               <MicroCTA variant="primary" />
             </div>
           )}
         </div>

        {/* Progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              className="rounded-full bg-primary"
              animate={{
                width: i === activeIndex ? 10 : 6,
                height: i === activeIndex ? 10 : 6,
                opacity: i === activeIndex ? 1 : 0.25,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
