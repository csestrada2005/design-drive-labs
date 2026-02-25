import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { ROICalculator } from "@/components/tools/ROICalculator";
import { KineticType } from "@/components/motion/KineticType";
import { MicroCTA } from "@/components/motion/MicroCTA";


/* ── Animated counter ── */
const CountUp = ({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end]);

  return <span ref={ref} className="tabular-nums">{prefix}{value}{suffix}</span>;
};

/* ── Click-and-Hold Tension Reveal ── */
const TensionReveal = ({ children, label = "Hold to reveal" }: { children: React.ReactNode; label?: string }) => {
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [holding, setHolding] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const prefersReduced = useReducedMotion();

  const startHold = useCallback(() => {
    if (revealed) return;
    setHolding(true);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 2, 100);
        if (next >= 100) {
          clearInterval(intervalRef.current);
          setRevealed(true);
          setHolding(false);
        }
        return next;
      });
    }, 30);
  }, [revealed]);

  const stopHold = useCallback(() => {
    clearInterval(intervalRef.current);
    setHolding(false);
    if (!revealed) {
      // Drain back
      const drain = setInterval(() => {
        setProgress((p) => {
          if (p <= 0) { clearInterval(drain); return 0; }
          return p - 3;
        });
      }, 20);
    }
  }, [revealed]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const circumference = 2 * Math.PI * 44;
  const dashOffset = circumference - (progress / 100) * circumference;

  if (prefersReduced) {
    return <div>{children}</div>;
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="trigger"
            className="flex flex-col items-center gap-4 cursor-pointer select-none"
            onMouseDown={startHold}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
            onTouchStart={startHold}
            onTouchEnd={stopHold}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* SVG progress ring */}
            <div className="relative w-28 h-28 flex items-center justify-center border-2 border-primary/30 rounded-full p-1">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 96 96">
                <circle
                  cx="48" cy="48" r="44"
                  fill="none"
                  stroke="hsl(var(--muted-foreground) / 0.15)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="48" cy="48" r="44"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  style={{
                    filter: "none",
                  }}
                />
              </svg>
              <motion.span
                className="text-xs font-mono tracking-wider text-muted-foreground"
                animate={{ scale: holding ? 0.9 : 1 }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-primary animate-pulse">
              {label}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Scroll-driven Line chart (SVG) ── */
const ScrollLineChart = () => {
  const points = [2.1, 2.8, 3.2, 4.1, 4.5, 5.8, 6.2, 7.1, 7.8, 8.5, 9.2, 10.4];
  const width = 400;
  const height = 160;
  const padX = 30;
  const padY = 20;
  const maxVal = 12;

  const pathData = points.map((p, i) => {
    const x = padX + (i / (points.length - 1)) * (width - padX * 2);
    const y = height - padY - (p / maxVal) * (height - padY * 2);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div ref={containerRef} className="relative">
       <p className="text-xs sm:text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
        Conversion Rate Over Time (%)
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md">
        {[0, 3, 6, 9, 12].map((v) => {
          const y = height - padY - (v / maxVal) * (height - padY * 2);
          return (
            <g key={v}>
              <line x1={padX} y1={y} x2={width - padX} y2={y} stroke="hsl(var(--muted-foreground) / 0.1)" strokeWidth="0.5" />
              <text x={padX - 5} y={y + 3} fill="hsl(var(--muted-foreground))" fontSize="8" textAnchor="end">{v}%</text>
            </g>
          );
        })}
        <motion.path d={pathData} fill="none" stroke="hsl(0 100% 50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength }} />
        {points.map((p, i) => {
          const x = padX + (i / (points.length - 1)) * (width - padX * 2);
          const y = height - padY - (p / maxVal) * (height - padY * 2);
          const pointThreshold = (i + 1) / points.length;
          return (
            <g key={i}>
              <motion.circle cx={x} cy={y} r={hoveredIdx === i ? 5 : 3} fill="hsl(0 100% 50%)" style={{ opacity: useTransform(scrollYProgress, [pointThreshold - 0.05, pointThreshold], [0, 1]) }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} className="cursor-pointer" />
              {hoveredIdx === i && (
                <g>
                  <rect x={x - 22} y={y - 28} width="44" height="20" rx="6" fill="hsl(var(--card))" stroke="hsl(0 100% 50% / 0.3)" strokeWidth="0.5" />
                  <text x={x} y={y - 15} fill="hsl(0 100% 50%)" fontSize="9" textAnchor="middle" fontWeight="600">{p}%</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ── Scroll-driven Bar chart (SVG) ── */
const ScrollBarChart = () => {
  const data = [
    { label: "Before", value: 1.9 },
    { label: "Month 1", value: 3.2 },
    { label: "Month 3", value: 5.1 },
    { label: "Month 6", value: 7.6 },
    { label: "Month 12", value: 10.1 },
  ];

  const width = 400;
  const height = 160;
  const padX = 30;
  const padY = 25;
  const barWidth = 30;
  const gap = (width - padX * 2 - barWidth * data.length) / (data.length - 1);
  const maxVal = 12;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  return (
    <div ref={containerRef} className="relative">
      <p className="text-xs sm:text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
        Lead-to-Customer Rate (%)
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md">
        {data.map((d, i) => {
          const x = padX + i * (barWidth + gap);
          const barH = (d.value / maxVal) * (height - padY * 2);
          const y = height - padY - barH;
          const barProgress = useTransform(scrollYProgress, [i * 0.15, 0.3 + i * 0.15], [0, 1]);
          const animatedHeight = useTransform(barProgress, [0, 1], [0, barH]);
          const animatedY = useTransform(barProgress, [0, 1], [height - padY, y]);
          return (
            <g key={i}>
              <motion.rect x={x} width={barWidth} rx={4} fill="hsl(0 100% 50%)" style={{ height: animatedHeight, y: animatedY }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} className="cursor-pointer" />
              <text x={x + barWidth / 2} y={height - 8} fill="hsl(var(--muted-foreground))" fontSize="8" textAnchor="middle">{d.label}</text>
              {hoveredIdx === i && (
                <g>
                  <rect x={x + barWidth / 2 - 18} y={y - 22} width="36" height="18" rx="5" fill="hsl(var(--card))" stroke="hsl(0 100% 50% / 0.3)" strokeWidth="0.5" />
                  <text x={x + barWidth / 2} y={y - 10} fill="hsl(0 100% 50%)" fontSize="9" textAnchor="middle" fontWeight="600">{d.value}%</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ── Metrics ── */
const metrics = [
  { label: "First Impressions", value: 75, suffix: "%", prefix: "", sub: "Influenced by web design quality" },
  { label: "Higher Conversion", value: 40, suffix: "%", prefix: "+", sub: "With professional UX design" },
  { label: "More Time on Site", value: 30, suffix: "%", prefix: "+", sub: "With quality visual content" },
  { label: "Brand Trust", value: 60, suffix: "%", prefix: "+", sub: "Stronger credibility with polished design" },
];

export const GrowthImpact = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="py-32 sm:py-40 relative overflow-hidden" id="growth">
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 40%, hsl(0 100% 50% / 0.04), transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-20 sm:mb-24">
          <KineticType
            text="GROWTH IMPACT"
            as="h2"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground"
            delay={0.05}
            wordDelay={0.1}
          />
           <p className="text-foreground/80 text-sm max-w-lg">
            We don't make "pretty pages." We build systems that sell. These are research-backed statistics on how design impacts business.
          </p>
         </div>

        {/* Core metric behind tension mechanic */}
        <div className="mb-20 flex justify-center">
          <TensionReveal label="Hold to reveal the data">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl text-primary mb-2">
                    <CountUp end={m.value} suffix={m.suffix} prefix={m.prefix} />
                  </p>
                  <p className="text-foreground text-sm font-medium mb-1">{m.label}</p>
                  <p className="text-xs sm:text-[10px] tracking-wider">{m.sub}</p>
                  <motion.div
                    className="absolute -bottom-4 left-0 h-px"
                    style={{ background: "linear-gradient(90deg, hsl(0 100% 50% / 0.3), transparent)" }}
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                  />
                </motion.div>
              ))}
            </div>
          </TensionReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ScrollLineChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <ScrollBarChart />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-24 sm:mt-32"
        >
          <div className="mb-10">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3">
              Good Design Costs Money.{" "}
              <span className="text-primary">Bad Design Costs Revenue.</span>
            </h3>
           <p className="text-foreground/80 text-sm max-w-lg leading-relaxed">
              See what your revenue looks like now — and what it could look like with our design and technology systems working for you.
            </p>
           </div>
           <div className="w-full max-w-4xl mx-auto">
             <ROICalculator />
           </div>

           {/* Micro-CTA */}
           <div className="mt-16 sm:mt-20 flex justify-center">
             <MicroCTA variant="primary" />
           </div>
         </motion.div>
       </div>
     </section>
  );
};
