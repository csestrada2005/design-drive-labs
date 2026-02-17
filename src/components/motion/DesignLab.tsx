import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ── Demo 1: Electro Text ── */
const ElectroText = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const text = "ELECTRIFY";

  return (
    <div className="relative py-8 flex items-center justify-center">
      <div className="flex gap-1">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            className="font-display text-4xl sm:text-6xl cursor-default select-none relative"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            animate={{
              color: hoveredIdx === i ? "hsl(222, 100%, 65%)" : "hsl(0, 0%, 97%)",
              textShadow: hoveredIdx === i
                ? "0 0 20px hsl(222 100% 65% / 0.8), 0 0 60px hsl(222 100% 65% / 0.4)"
                : "none",
            }}
            transition={{ duration: 0.15 }}
          >
            {char}
            {hoveredIdx === i && (
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, hsl(222 100% 65%), transparent)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.span>
        ))}
      </div>
      {/* Spark particles */}
      {hoveredIdx !== null && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{ background: "hsl(222 100% 65%)" }}
              initial={{
                x: hoveredIdx * 40 - 80,
                y: 0,
                opacity: 1,
              }}
              animate={{
                x: hoveredIdx * 40 - 80 + (Math.random() - 0.5) * 60,
                y: -30 - Math.random() * 40,
                opacity: 0,
              }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            />
          ))}
        </>
      )}
    </div>
  );
};

/* ── Demo 2: Glass Pop-up ── */
const GlassPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative py-8 flex flex-col items-center gap-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
        style={{
          background: "hsl(222 100% 65% / 0.15)",
          border: "1px solid hsl(222 100% 65% / 0.3)",
          color: "hsl(222 100% 65%)",
        }}
      >
        {isOpen ? "Close" : "Open"} Glass Modal
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(8px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative p-6 max-w-xs w-full"
            style={{
              background: "linear-gradient(135deg, hsl(222 40% 12% / 0.8), hsl(222 40% 8% / 0.6))",
              backdropFilter: "blur(24px) saturate(150%)",
              WebkitBackdropFilter: "blur(24px) saturate(150%)",
              border: "1px solid hsl(222 100% 65% / 0.15)",
              borderRadius: "1rem",
              boxShadow: "0 20px 60px -15px hsl(222 100% 20% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs tracking-widest uppercase text-muted-foreground">Notification</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              This is a glassmorphism pop-up with spring physics. Swipe or click to dismiss.
            </p>
            <div className="mt-4 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(222 100% 65% / 0.2), transparent)" }} />
            <p className="mt-3 text-[10px] text-muted-foreground/50 tracking-wider uppercase">Cuatre Design System</p>
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
    setTrail(prev => [...prev.slice(-12), { x, y, id: idRef.current }]);
  }, [enabled]);

  return (
    <div className="py-8 flex flex-col items-center gap-3">
      <button
        onClick={() => setEnabled(!enabled)}
        className="text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full transition-all"
        style={{
          background: enabled ? "hsl(222 100% 65% / 0.15)" : "hsl(0 0% 50% / 0.1)",
          color: enabled ? "hsl(222 100% 65%)" : "hsl(0 0% 60%)",
          border: `1px solid ${enabled ? "hsl(222 100% 65% / 0.3)" : "hsl(0 0% 50% / 0.2)"}`,
        }}
      >
        Trail {enabled ? "ON" : "OFF"}
      </button>
      <div
        ref={containerRef}
        onMouseMove={handleMove}
        className="relative w-full h-40 overflow-hidden cursor-crosshair"
        style={{
          background: "radial-gradient(ellipse at center, hsl(222 100% 65% / 0.03), transparent)",
        }}
      >
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/30 text-xs tracking-widest uppercase pointer-events-none">
          Move cursor here
        </p>
        {trail.map((point, i) => (
          <motion.div
            key={point.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: point.x - 4,
              top: point.y - 4,
              width: 8,
              height: 8,
              background: `hsl(222 100% 65% / ${0.1 + (i / trail.length) * 0.5})`,
              boxShadow: `0 0 ${8 + i * 2}px hsl(222 100% 65% / ${(i / trail.length) * 0.3})`,
            }}
            initial={{ scale: 1.5, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Demo 4: 3D Tilt Object ── */
const TiltObject = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setTilt({ x, y });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="py-8 flex items-center justify-center"
      style={{ perspective: "600px" }}
    >
      <motion.div
        className="relative w-32 h-32 sm:w-40 sm:h-40"
        animate={{
          rotateX: tilt.y,
          rotateY: tilt.x,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Main shape */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(222 100% 65% / 0.2), hsl(222 100% 65% / 0.05))",
            border: "1px solid hsl(222 100% 65% / 0.3)",
            borderRadius: "1.5rem",
            boxShadow: `${-tilt.x * 0.5}px ${tilt.y * 0.5}px 30px hsl(222 100% 65% / 0.15)`,
          }}
        />
        {/* Specular highlight */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.x}% ${50 - tilt.y}%, hsl(0 0% 100% / 0.15), transparent 60%)`,
          }}
        />
        {/* Inner geometry */}
        <svg className="absolute inset-4 text-primary/30" viewBox="0 0 60 60">
          <polygon points="30,5 55,20 55,40 30,55 5,40 5,20" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
        </svg>
      </motion.div>
    </div>
  );
};

/* ── Demo 5: Scroll Morph Shapes ── */
const ScrollMorphShapes = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const borderRadius1 = useTransform(scrollYProgress, [0, 0.5, 1], ["60% 40% 30% 70%", "30% 60% 70% 40%", "50% 50% 50% 50%"]);
  const borderRadius2 = useTransform(scrollYProgress, [0, 0.5, 1], ["40% 60% 50% 50%", "50% 30% 60% 40%", "60% 40% 30% 70%"]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 0.85, 1.05]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div ref={ref} className="py-8 flex items-center justify-center gap-8 h-40">
      <motion.div
        className="w-20 h-20 sm:w-28 sm:h-28"
        style={{
          borderRadius: borderRadius1,
          scale: scale1,
          rotate: rotate1,
          background: "linear-gradient(135deg, hsl(222 100% 65% / 0.25), hsl(222 100% 65% / 0.05))",
          border: "1px solid hsl(222 100% 65% / 0.2)",
        }}
      />
      <motion.div
        className="w-16 h-16 sm:w-24 sm:h-24"
        style={{
          borderRadius: borderRadius2,
          scale: scale2,
          rotate: rotate2,
          background: "linear-gradient(135deg, hsl(163 56% 28% / 0.2), hsl(163 56% 28% / 0.05))",
          border: "1px solid hsl(163 56% 28% / 0.2)",
        }}
      />
    </div>
  );
};

/* ── Demo 6: Reveal Wipe ── */
const RevealWipe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div ref={ref} className="py-8 flex items-center justify-center gap-4">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="relative w-24 h-32 sm:w-32 sm:h-40 overflow-hidden rounded-xl"
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          animate={isInView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          transition={{ duration: 0.8, delay: i * 0.15, ease: [0.33, 1, 0.68, 1] }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(${135 + i * 30}deg, hsl(222 40% ${14 + i * 3}%), hsl(222 30% ${10 + i * 2}%))`,
            }}
          />
          {/* Placeholder pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "linear-gradient(45deg, hsl(222 100% 65%) 25%, transparent 25%, transparent 75%, hsl(222 100% 65%) 75%)",
              backgroundSize: "8px 8px",
            }}
          />
          <div className="absolute inset-0 flex items-end p-3">
            <span className="text-[9px] tracking-widest uppercase text-foreground/30">Placeholder {i + 1}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ── Demos wrapper ── */
const demos = [
  { id: "electro", label: "ELECTRO TEXT", desc: "Hover + glow", component: ElectroText },
  { id: "glass", label: "GLASS POP-UP", desc: "Spring + blur", component: GlassPopup },
  { id: "trail", label: "CURSOR TRAIL", desc: "Magnet + trail", component: CursorTrail },
  { id: "tilt", label: "3D TILT", desc: "Lighting + depth", component: TiltObject },
  { id: "morph", label: "SCROLL MORPH", desc: "Progress-driven", component: ScrollMorphShapes },
  { id: "reveal", label: "REVEAL WIPE", desc: "Clip-path + blur", component: RevealWipe },
];

export const DesignLab = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden" id="lab">
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(222 100% 65% / 0.04), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xs tracking-[0.25em] uppercase mb-4 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-primary/50" />
            Interactive Demos
          </motion.p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            DESIGN <span className="text-primary">LAB</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg">
            Esto es un demo. Todo puede adaptarse a tu marca. Interactua con cada elemento.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {demos.map((demo, i) => {
            const DemoComponent = demo.component;
            return (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group"
              >
                {/* Demo label — no box */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <span className="text-[10px] font-display tracking-widest text-foreground/60">{demo.label}</span>
                  <span className="text-[9px] text-muted-foreground/40 tracking-wider">{demo.desc}</span>
                </div>

                {/* Subtle separator */}
                <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, hsl(222 100% 65% / 0.15), transparent)" }} />

                {/* Demo content */}
                <DemoComponent />

                {/* CTA link */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground/40 hover:text-primary/70 transition-colors mt-2"
                >
                  <span className="w-3 h-px bg-current" />
                  Use this in my project
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
