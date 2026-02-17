import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ── Demo 1: Electro Text — Lightning arcs ── */
const ElectroText = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text = "ELECTRIFY";
  const containerRef = useRef<HTMLDivElement>(null);

  // Draw lightning bolt between two points
  const drawLightning = useCallback(
    (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, depth: number) => {
      if (depth <= 0) {
        ctx.lineTo(x2, y2);
        return;
      }
      const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 30;
      const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 20;
      drawLightning(ctx, x1, y1, midX, midY, depth - 1);
      drawLightning(ctx, midX, midY, x2, y2, depth - 1);
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || activeIdx === null) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    let frameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw 3-5 lightning bolts from the active letter
      const letterX = (activeIdx + 0.5) * (canvas.width / text.length);
      const letterY = canvas.height * 0.5;
      const numBolts = 3 + Math.floor(Math.random() * 3);

      for (let b = 0; b < numBolts; b++) {
        const endX = letterX + (Math.random() - 0.5) * 160;
        const endY = letterY + (Math.random() - 0.5) * 100;

        ctx.beginPath();
        ctx.moveTo(letterX, letterY);
        drawLightning(ctx, letterX, letterY, endX, endY, 4);
        ctx.strokeStyle = `hsla(222, 100%, ${65 + Math.random() * 20}%, ${0.4 + Math.random() * 0.5})`;
        ctx.lineWidth = 0.5 + Math.random() * 1.5;
        ctx.shadowColor = "hsl(222, 100%, 65%)";
        ctx.shadowBlur = 8 + Math.random() * 12;
        ctx.stroke();
      }

      // Small sparks
      for (let s = 0; s < 6; s++) {
        const sx = letterX + (Math.random() - 0.5) * 80;
        const sy = letterY + (Math.random() - 0.5) * 60;
        ctx.beginPath();
        ctx.arc(sx, sy, 1 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(222, 100%, 80%, ${Math.random() * 0.8})`;
        ctx.shadowColor = "hsl(222, 100%, 75%)";
        ctx.shadowBlur = 10;
        ctx.fill();
      }

      frameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameId);
  }, [activeIdx, drawLightning]);

  return (
    <div ref={containerRef} className="relative py-12 flex items-center justify-center min-h-[180px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />
      <div className="flex gap-1 sm:gap-2 relative z-10">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            className="font-display text-4xl sm:text-6xl lg:text-7xl cursor-default select-none relative"
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
            animate={{
              color: activeIdx === i
                ? "hsl(222, 100%, 85%)"
                : activeIdx !== null && Math.abs(activeIdx - i) <= 1
                  ? "hsl(222, 100%, 65%)"
                  : "hsl(0, 0%, 97%)",
              textShadow: activeIdx === i
                ? "0 0 30px hsl(222 100% 65% / 0.9), 0 0 80px hsl(222 100% 65% / 0.5), 0 0 120px hsl(222 100% 65% / 0.2)"
                : "none",
              scale: activeIdx === i ? 1.15 : 1,
              y: activeIdx === i ? -4 : 0,
            }}
            transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 25 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      {/* Ambient floor glow */}
      {activeIdx !== null && (
        <motion.div
          className="absolute bottom-4 h-8 rounded-full pointer-events-none"
          style={{
            left: `${(activeIdx / text.length) * 100}%`,
            width: "80px",
            background: "radial-gradient(ellipse, hsl(222 100% 65% / 0.3), transparent 70%)",
            filter: "blur(12px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  );
};

/* ── Demo 2: Glass Pop-up ── */
const GlassPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative py-12 flex flex-col items-center gap-6 min-h-[220px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group"
        style={{
          background: "hsl(222 100% 65% / 0.1)",
          border: "1px solid hsl(222 100% 65% / 0.25)",
          color: "hsl(222 100% 75%)",
        }}
      >
        <span className="relative z-10">{isOpen ? "Close" : "Open"} Glass Modal</span>
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "hsl(222 100% 65% / 0.1)" }}
          initial={false}
          whileHover={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 30, filter: "blur(16px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.85, y: 15, filter: "blur(12px)" }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="relative p-6 max-w-xs w-full"
            style={{
              background: "linear-gradient(135deg, hsl(222 40% 12% / 0.7), hsl(222 40% 6% / 0.5))",
              backdropFilter: "blur(30px) saturate(160%)",
              WebkitBackdropFilter: "blur(30px) saturate(160%)",
              border: "1px solid hsl(222 100% 65% / 0.12)",
              borderRadius: "1.25rem",
              boxShadow: "0 24px 80px -20px hsl(222 100% 20% / 0.6), inset 0 1px 0 hsl(0 0% 100% / 0.04)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Notification</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Glassmorphism pop-up con spring physics. Blur + escala + profundidad.
            </p>
            <div className="mt-4 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(222 100% 65% / 0.15), transparent)" }} />
            <p className="mt-3 text-[9px] text-muted-foreground/40 tracking-[0.2em] uppercase">Cuatre Design System</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Demo 3: Cursor Magnet Trail ── */
const CursorTrail = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [enabled, setEnabled] = useState(true);
  const idRef = useRef(0);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!enabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    idRef.current++;
    setTrail(prev => [...prev.slice(-15), { x, y, id: idRef.current }]);
  }, [enabled]);

  return (
    <div className="py-12 flex flex-col items-center gap-4 min-h-[220px]">
      <button
        onClick={() => { setEnabled(!enabled); setTrail([]); }}
        className="text-[10px] tracking-[0.2em] uppercase px-5 py-2 rounded-full transition-all"
        style={{
          background: enabled ? "hsl(222 100% 65% / 0.1)" : "hsl(0 0% 50% / 0.08)",
          color: enabled ? "hsl(222 100% 70%)" : "hsl(0 0% 55%)",
          border: `1px solid ${enabled ? "hsl(222 100% 65% / 0.25)" : "hsl(0 0% 50% / 0.15)"}`,
        }}
      >
        Trail {enabled ? "ON" : "OFF"}
      </button>
      <div
        ref={containerRef}
        onMouseMove={handleMove}
        className="relative w-full h-44 overflow-hidden cursor-crosshair"
        style={{
          background: "radial-gradient(ellipse at center, hsl(222 100% 65% / 0.03), transparent 70%)",
        }}
      >
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/20 text-xs tracking-[0.3em] uppercase pointer-events-none select-none">
          Mueve el cursor aquí
        </p>
        {trail.map((point, i) => {
          const progress = i / trail.length;
          const size = 6 + progress * 10;
          return (
            <motion.div
              key={point.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: point.x - size / 2,
                top: point.y - size / 2,
                width: size,
                height: size,
                background: `radial-gradient(circle, hsl(222 100% 75% / ${0.2 + progress * 0.6}), transparent)`,
                boxShadow: `0 0 ${10 + progress * 20}px hsl(222 100% 65% / ${progress * 0.4})`,
              }}
              initial={{ scale: 1.2, opacity: 1 }}
              animate={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          );
        })}
      </div>
    </div>
  );
};

/* ── Demo 4: 3D Tilt Object ── */
const TiltObject = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 35;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -35;
    setTilt({ x, y });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovering(false); }}
      className="py-12 flex items-center justify-center min-h-[220px] cursor-pointer"
      style={{ perspective: "800px" }}
    >
      <motion.div
        className="relative w-36 h-36 sm:w-44 sm:h-44"
        animate={{ rotateX: tilt.y, rotateY: tilt.x }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      >
        {/* Shape */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(222 100% 65% / 0.15), hsl(222 100% 65% / 0.03))",
            border: "1px solid hsl(222 100% 65% / 0.2)",
            borderRadius: "2rem",
            boxShadow: `${-tilt.x * 0.8}px ${tilt.y * 0.8}px 40px hsl(222 100% 65% / 0.12)`,
          }}
        />
        {/* Specular */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "2rem",
            background: `radial-gradient(circle at ${50 + tilt.x * 1.2}% ${50 - tilt.y * 1.2}%, hsl(0 0% 100% / ${isHovering ? 0.12 : 0.04}), transparent 55%)`,
          }}
        />
        {/* Inner SVG */}
        <svg className="absolute inset-6" viewBox="0 0 60 60" style={{ color: "hsl(222 100% 65% / 0.25)" }}>
          <polygon points="30,5 55,20 55,40 30,55 5,40 5,20" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="30" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4">
            <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="12s" repeatCount="indefinite" />
          </circle>
          <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.4">
            <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/30">
            Tilt: {Math.round(tilt.x)}° / {Math.round(tilt.y)}°
          </span>
        </div>
      </motion.div>
    </div>
  );
};

/* ── Demo 5: Scroll Morph Shapes ── */
const ScrollMorphShapes = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const br1 = useTransform(scrollYProgress, [0, 0.5, 1], ["60% 40% 30% 70%", "30% 60% 70% 40%", "50% 50% 50% 50%"]);
  const br2 = useTransform(scrollYProgress, [0, 0.5, 1], ["40% 60% 50% 50%", "50% 30% 60% 40%", "60% 40% 30% 70%"]);
  const s1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.15, 0.85]);
  const s2 = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 0.8, 1.1]);
  const r1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const r2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={ref} className="py-12 flex items-center justify-center gap-10 min-h-[220px]">
      <motion.div
        className="w-24 h-24 sm:w-32 sm:h-32"
        style={{
          borderRadius: br1,
          scale: s1,
          rotate: r1,
          background: "linear-gradient(135deg, hsl(222 100% 65% / 0.2), hsl(222 100% 65% / 0.04))",
          border: "1px solid hsl(222 100% 65% / 0.15)",
          boxShadow: "0 0 40px hsl(222 100% 65% / 0.08)",
        }}
      />
      <motion.div
        className="w-20 h-20 sm:w-28 sm:h-28"
        style={{
          borderRadius: br2,
          scale: s2,
          rotate: r2,
          background: "linear-gradient(135deg, hsl(163 56% 28% / 0.15), hsl(163 56% 28% / 0.03))",
          border: "1px solid hsl(163 56% 28% / 0.15)",
          boxShadow: "0 0 40px hsl(163 56% 28% / 0.06)",
        }}
      />
      <p className="absolute text-[9px] tracking-[0.3em] uppercase text-muted-foreground/20 pointer-events-none">
        Scroll para morph
      </p>
    </div>
  );
};

/* ── Demo 6: Reveal Wipe ── */
const RevealWipe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <div ref={ref} className="py-12 flex items-center justify-center gap-5 min-h-[220px]">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="relative w-28 h-36 sm:w-36 sm:h-44 overflow-hidden"
          style={{ borderRadius: "1.25rem" }}
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          animate={isInView
            ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
            : { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }
          }
          transition={{ duration: 0.9, delay: i * 0.18, ease: [0.33, 1, 0.68, 1] }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(${135 + i * 30}deg, hsl(222 40% ${14 + i * 3}%), hsl(222 30% ${8 + i * 2}%))`,
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(222 100% 65% / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsl(222 100% 65% / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute inset-0 flex items-end p-4">
            <span className="text-[9px] tracking-[0.2em] uppercase text-foreground/25 font-medium">
              Project {i + 1}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ── Demo config ── */
const demos = [
  { id: "electro", label: "ELECTRO TEXT", desc: "Lightning + glow on hover", component: ElectroText },
  { id: "glass", label: "GLASS POP-UP", desc: "Spring + blur physics", component: GlassPopup },
  { id: "trail", label: "CURSOR TRAIL", desc: "Magnetic particle trail", component: CursorTrail },
  { id: "tilt", label: "3D TILT", desc: "Dynamic specular lighting", component: TiltObject },
  { id: "morph", label: "SCROLL MORPH", desc: "Scroll-driven shapes", component: ScrollMorphShapes },
  { id: "reveal", label: "REVEAL WIPE", desc: "Clip-path transitions", component: RevealWipe },
];

/* ── Main Section ── */
export const DesignLab = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 sm:py-40 relative overflow-hidden" id="lab">
      {/* Ambient glows */}
      <div
        className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(222 100% 65% / 0.03), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(163 56% 28% / 0.02), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-24 sm:mb-32"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase mb-5 flex items-center gap-4"
          >
            <span className="w-10 h-px bg-primary/40" />
            Interactive Demos
          </motion.p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-5">
            DESIGN <span className="text-primary">LAB</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            Esto es un demo. Todo puede adaptarse a tu marca. Interactúa con cada elemento.
          </p>
        </motion.div>

        {/* Demos — 1 column on mobile, 2 on tablet, stretched with big gaps */}
        <div className="grid md:grid-cols-2 gap-16 sm:gap-20 lg:gap-24">
          {demos.map((demo, i) => {
            const DemoComponent = demo.component;
            return (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
                className="relative group"
              >
                {/* Label row */}
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "hsl(222 100% 65% / 0.5)" }}
                    animate={{ boxShadow: ["0 0 0px hsl(222 100% 65% / 0)", "0 0 12px hsl(222 100% 65% / 0.4)", "0 0 0px hsl(222 100% 65% / 0)"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                  <span className="text-[10px] font-display tracking-[0.2em] text-foreground/50">
                    {demo.label}
                  </span>
                  <span className="text-[9px] text-muted-foreground/30 tracking-wider ml-auto">
                    {demo.desc}
                  </span>
                </div>

                {/* Subtle top line */}
                <div
                  className="h-px mb-6"
                  style={{ background: "linear-gradient(90deg, hsl(222 100% 65% / 0.12), transparent 80%)" }}
                />

                {/* Demo */}
                <DemoComponent />

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 text-[9px] tracking-[0.2em] uppercase text-muted-foreground/30 hover:text-primary/60 transition-colors duration-300 mt-4 group/link"
                >
                  <span className="w-4 h-px bg-current transition-all duration-300 group-hover/link:w-8" />
                  Usar en mi proyecto
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
