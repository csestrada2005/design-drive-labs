import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArchitectureDemo } from "./ArchitectureDemo";

/* ── Demo 1: Electro Text — Auto-cycling lightning (RED) ── */
const ElectroText = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text = "ELECTRIFY";
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!isInView) { setActiveIdx(null); return; }
    let idx = 0;
    const interval = setInterval(() => {
      setActiveIdx(idx % text.length);
      idx++;
    }, 400);
    return () => clearInterval(interval);
  }, [isInView]);

  const drawLightning = useCallback(
    (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, depth: number) => {
      if (depth <= 0) { ctx.lineTo(x2, y2); return; }
      const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 30;
      const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 20;
      drawLightning(ctx, x1, y1, midX, midY, depth - 1);
      drawLightning(ctx, midX, midY, x2, y2, depth - 1);
    }, []
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
      const letterX = (activeIdx + 0.5) * (canvas.width / text.length);
      const letterY = canvas.height * 0.5;
      const numBolts = 3 + Math.floor(Math.random() * 3);
      for (let b = 0; b < numBolts; b++) {
        const endX = letterX + (Math.random() - 0.5) * 160;
        const endY = letterY + (Math.random() - 0.5) * 100;
        ctx.beginPath();
        ctx.moveTo(letterX, letterY);
        drawLightning(ctx, letterX, letterY, endX, endY, 4);
        ctx.strokeStyle = `hsla(50, 100%, ${55 + Math.random() * 20}%, ${0.4 + Math.random() * 0.5})`;
        ctx.lineWidth = 0.5 + Math.random() * 1.5;
        ctx.shadowColor = "hsl(50, 100%, 50%)";
        ctx.shadowBlur = 8 + Math.random() * 12;
        ctx.stroke();
      }
      for (let s = 0; s < 6; s++) {
        const sx = letterX + (Math.random() - 0.5) * 80;
        const sy = letterY + (Math.random() - 0.5) * 60;
        ctx.beginPath();
        ctx.arc(sx, sy, 1 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(50, 100%, 70%, ${Math.random() * 0.8})`;
        ctx.shadowColor = "hsl(50, 100%, 60%)";
        ctx.shadowBlur = 10;
        ctx.fill();
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, [activeIdx, drawLightning]);

  return (
    <div ref={sectionRef}>
      <div ref={containerRef} className="relative py-12 flex items-center justify-center min-h-[180px]">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "screen" }} />
        <div className="flex gap-1 sm:gap-2 relative z-10">
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              className="font-display text-4xl sm:text-6xl lg:text-7xl select-none relative"
              animate={{
                color: activeIdx === i ? "hsl(0, 100%, 90%)" : activeIdx !== null && Math.abs(activeIdx - i) <= 1 ? "hsl(0, 100%, 75%)" : "hsl(0, 0%, 100%)",
                textShadow: activeIdx === i ? "0 0 30px hsl(50 100% 50% / 0.9), 0 0 80px hsl(50 100% 50% / 0.5)" : "none",
                scale: activeIdx === i ? 1.15 : 1,
                y: activeIdx === i ? -4 : 0,
              }}
              transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 25 }}
            >
              {char}
            </motion.span>
          ))}
        </div>
        {activeIdx !== null && (
          <motion.div
            className="absolute bottom-4 h-8 rounded-full pointer-events-none"
            style={{
              left: `${(activeIdx / text.length) * 100}%`,
              width: "80px",
              background: "radial-gradient(ellipse, hsl(50 100% 50% / 0.3), transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>
    </div>
  );
};

/* ── Demo 2: Glass Pop-up — RED ── */
const GlassPopup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div ref={ref} className="relative py-12 flex flex-col items-center gap-6 min-h-[220px]">
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="relative p-6 max-w-xs w-full"
            style={{
              background: "hsl(0 0% 100%)",
              border: "1px solid hsl(0 0% 90%)",
              borderRadius: "1.25rem",
              boxShadow: "0 24px 80px -20px hsl(0 0% 0% / 0.3)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-black/60 animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-black/60">Notification</span>
            </div>
            <p className="text-sm text-black leading-relaxed">
              Glassmorphism pop-up con spring physics. Escala + profundidad.
            </p>
            <div className="mt-4 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 0% / 0.15), transparent)" }} />
            <p className="mt-3 text-[9px] text-black/60 tracking-[0.2em] uppercase">Cuatre Design System</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Demo 3: 3D Tilt Object — RED, auto-animated ── */
const TiltObject = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!isInView) { setTilt({ x: 0, y: 0 }); return; }
    let time = 0;
    let frameId: number;
    const animate = () => {
      time += 0.02;
      setTilt({
        x: Math.sin(time) * 15,
        y: Math.cos(time * 0.7) * 12,
      });
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView]);

  return (
    <div ref={ref} className="py-12 flex items-center justify-center min-h-[220px]" style={{ perspective: "800px" }}>
      <motion.div className="relative w-36 h-36 sm:w-44 sm:h-44" animate={{ rotateX: tilt.y, rotateY: tilt.x }} transition={{ type: "spring", stiffness: 180, damping: 18 }}>
        <div className="absolute inset-0" style={{
          background: "hsl(0 0% 100% / 0.9)",
          border: "1px solid hsl(0 0% 90%)",
          borderRadius: "2rem",
          boxShadow: `${-tilt.x * 0.8}px ${tilt.y * 0.8}px 40px hsl(0 0% 0% / 0.3)`,
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          borderRadius: "2rem",
          background: `radial-gradient(circle at ${50 + tilt.x * 1.2}% ${50 - tilt.y * 1.2}%, hsl(0 0% 0% / 0.08), transparent 55%)`,
        }} />
        <svg className="absolute inset-6" viewBox="0 0 60 60" style={{ color: "hsl(0 0% 0% / 0.4)" }}>
          <polygon points="30,5 55,20 55,40 30,55 5,40 5,20" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="30" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4">
            <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="12s" repeatCount="indefinite" />
          </circle>
          <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.4">
            <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/60">
            Tilt: {Math.round(tilt.x)}° / {Math.round(tilt.y)}°
          </span>
        </div>
      </motion.div>
    </div>
  );
};

/* ── Demo 4: Scroll Morph Shapes — RED ── */
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
      <motion.div className="w-24 h-24 sm:w-32 sm:h-32" style={{ borderRadius: br1, scale: s1, rotate: r1, background: "hsl(0 0% 100% / 0.9)", border: "1px solid hsl(0 0% 100%)", boxShadow: "0 0 40px hsl(0 0% 0% / 0.15)" }} />
      <motion.div className="w-20 h-20 sm:w-28 sm:h-28" style={{ borderRadius: br2, scale: s2, rotate: r2, background: "hsl(0 0% 100% / 0.85)", border: "1px solid hsl(0 0% 100%)", boxShadow: "0 0 40px hsl(0 0% 0% / 0.1)" }} />
      <p className="absolute text-[9px] tracking-[0.3em] uppercase text-white/60 pointer-events-none">
        Scroll para morph
      </p>
    </div>
  );
};

/* ── Demo 5: Reveal Wipe — RED ── */
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
          animate={isInView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          transition={{ duration: 0.9, delay: i * 0.18, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="absolute inset-0" style={{ background: `linear-gradient(${135 + i * 30}deg, hsl(0 0% 100%), hsl(0 0% 90%))` }} />
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `linear-gradient(hsl(0 0% 100% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.3) 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
          <div className="absolute inset-0 flex items-end p-4">
            <span className="text-[9px] tracking-[0.2em] uppercase text-black/80 font-medium">Project {i + 1}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ── Demo config ── */
const demos = [
  { id: "architecture", label: "SAAS DEMO", desc: "Auto-cycling preview", component: ArchitectureDemo },
  { id: "electro", label: "ELECTRO TEXT", desc: "Auto-cycling lightning", component: ElectroText },
  { id: "glass", label: "GLASS POP-UP", desc: "Appears on scroll", component: GlassPopup },
  { id: "tilt", label: "3D TILT", desc: "Auto-animated lighting", component: TiltObject },
  { id: "morph", label: "SCROLL MORPH", desc: "Scroll-driven shapes", component: ScrollMorphShapes },
  { id: "reveal", label: "REVEAL WIPE", desc: "Clip-path transitions", component: RevealWipe },
];

/* ── Main Section with scroll-driven red background ── */
export const DesignLab = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Scroll-driven red fill: maps scroll progress to background opacity
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // First 30% of scroll: red fills in (0 → 1). Last 30%: red fades out (1 → 0).
  const redOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" id="lab">
      {/* Scroll-driven red background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "hsl(0 100% 50%)",
          opacity: redOpacity,
        }}
        aria-hidden="true"
      />
      {/* Subtle dark vignette for depth on red */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(0 100% 20% / 0.4) 100%)",
          opacity: redOpacity,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 py-32 sm:py-40">
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
            className="text-[10px] tracking-[0.3em] uppercase mb-5 flex items-center gap-4 text-white/70"
            style={{ mixBlendMode: "difference" }}
          >
            <span className="w-10 h-px bg-white/40" />
            Interactive Demos
          </motion.p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-5">
            <span className="text-white">DESIGN</span> <span className="text-white">LAB</span>
          </h2>
          <p className="text-white/70 text-sm max-w-md leading-relaxed">
            Esto es un demo. Todo puede adaptarse a tu marca. Los elementos se activan automáticamente al hacer scroll.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 sm:gap-20 lg:gap-24">
          {demos.map((demo, i) => {
            const DemoComponent = demo.component;
            return (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{ boxShadow: ["0 0 0px hsl(0 0% 100% / 0)", "0 0 12px hsl(0 0% 100% / 0.6)", "0 0 0px hsl(0 0% 100% / 0)"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                  <span className="text-[10px] font-display tracking-[0.2em] text-white">{demo.label}</span>
                  <span className="text-[9px] text-white/60 tracking-wider ml-auto">{demo.desc}</span>
                </div>
                <div className="h-px mb-6" style={{ background: "linear-gradient(90deg, hsl(0 0% 100% / 0.2), transparent 80%)" }} />
                <DemoComponent />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
