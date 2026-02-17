import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ROICalculator } from "@/components/tools/ROICalculator";

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

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{value}{suffix}
    </span>
  );
};

/* ── Line chart (SVG) ── */
const LineChart = ({ isInView }: { isInView: boolean }) => {
  const points = [10, 18, 15, 28, 25, 40, 38, 55, 52, 70, 68, 82];
  const width = 400;
  const height = 160;
  const padX = 30;
  const padY = 20;

  const pathData = points.map((p, i) => {
    const x = padX + (i / (points.length - 1)) * (width - padX * 2);
    const y = height - padY - (p / 100) * (height - padY * 2);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="relative">
      <p className="text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-3">Conversion Rate Over Time</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md">
        {/* Grid lines */}
        {[0, 25, 50, 75].map((v) => {
          const y = height - padY - (v / 100) * (height - padY * 2);
          return (
            <g key={v}>
              <line x1={padX} y1={y} x2={width - padX} y2={y} stroke="hsl(222 30% 18%)" strokeWidth="0.5" />
              <text x={padX - 5} y={y + 3} fill="hsl(220 10% 59%)" fontSize="8" textAnchor="end">{v}%</text>
            </g>
          );
        })}

        {/* Animated path */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="hsl(222 100% 65%)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />

        {/* Glow path */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="hsl(222 100% 65% / 0.3)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="blur(4px)"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />

        {/* Data points */}
        {points.map((p, i) => {
          const x = padX + (i / (points.length - 1)) * (width - padX * 2);
          const y = height - padY - (p / 100) * (height - padY * 2);
          return (
            <g key={i}>
              <motion.circle
                cx={x}
                cy={y}
                r={hoveredIdx === i ? 5 : 3}
                fill="hsl(222 100% 65%)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              />
              {hoveredIdx === i && (
                <g>
                  <rect
                    x={x - 22} y={y - 28} width="44" height="20" rx="6"
                    fill="hsl(222 40% 12% / 0.9)"
                    stroke="hsl(222 100% 65% / 0.3)"
                    strokeWidth="0.5"
                  />
                  <text x={x} y={y - 15} fill="hsl(222 100% 65%)" fontSize="9" textAnchor="middle" fontWeight="600">
                    {p}%
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ── Bar chart (SVG) ── */
const BarChart = ({ isInView }: { isInView: boolean }) => {
  const data = [
    { label: "Before", value: 45 },
    { label: "Month 1", value: 58 },
    { label: "Month 2", value: 72 },
    { label: "Month 3", value: 85 },
    { label: "Month 6", value: 110 },
  ];
  const width = 400;
  const height = 160;
  const padX = 30;
  const padY = 25;
  const barWidth = 30;
  const gap = (width - padX * 2 - barWidth * data.length) / (data.length - 1);
  const maxVal = 120;

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="relative">
      <p className="text-[10px] tracking-widest uppercase text-muted-foreground/50 mb-3">Average Order Value ($)</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md">
        {data.map((d, i) => {
          const x = padX + i * (barWidth + gap);
          const barH = (d.value / maxVal) * (height - padY * 2);
          const y = height - padY - barH;

          return (
            <g key={i}>
              <motion.rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={4}
                fill={hoveredIdx === i ? "hsl(222 100% 65%)" : "hsl(222 100% 65% / 0.6)"}
                initial={{ height: 0, y: height - padY }}
                animate={isInView ? { height: barH, y } : { height: 0, y: height - padY }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              />
              {/* Glow */}
              {hoveredIdx === i && (
                <rect x={x - 2} y={y - 2} width={barWidth + 4} height={barH + 4} rx={6} fill="none" stroke="hsl(222 100% 65% / 0.3)" strokeWidth="1" />
              )}
              <text
                x={x + barWidth / 2}
                y={height - 8}
                fill="hsl(220 10% 59%)"
                fontSize="8"
                textAnchor="middle"
              >
                {d.label}
              </text>
              {hoveredIdx === i && (
                <g>
                  <rect x={x + barWidth / 2 - 18} y={y - 22} width="36" height="18" rx="5"
                    fill="hsl(222 40% 12% / 0.9)" stroke="hsl(222 100% 65% / 0.3)" strokeWidth="0.5" />
                  <text x={x + barWidth / 2} y={y - 10} fill="hsl(222 100% 65%)" fontSize="9" textAnchor="middle" fontWeight="600">
                    ${d.value}
                  </text>
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
  { label: "Increase CRO", value: 35, suffix: "%", prefix: "+", sub: "Typical lift: 15-35%" },
  { label: "Increase AOV", value: 28, suffix: "%", prefix: "+", sub: "Typical lift: 10-28%" },
  { label: "More Leads", value: 45, suffix: "%", prefix: "+", sub: "Typical lift: 20-45%" },
  { label: "Faster Load", value: 60, suffix: "%", prefix: "", sub: "Typical improvement" },
];

export const GrowthImpact = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="growth">
      {/* Background ambient */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 40%, hsl(222 100% 65% / 0.04), transparent 60%)" }}
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
            Results
          </motion.p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            GROWTH <span className="text-primary">IMPACT</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg">
            No hacemos "paginas bonitas". Hacemos sistemas que venden. Estos son resultados tipicos de nuestros proyectos.
          </p>
        </motion.div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mb-20">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="relative"
            >
              <p className="font-display text-3xl sm:text-4xl md:text-5xl text-primary mb-2">
                <CountUp end={m.value} suffix={m.suffix} prefix={m.prefix} />
              </p>
              <p className="text-foreground/80 text-sm font-medium mb-1">{m.label}</p>
              <p className="text-muted-foreground/50 text-[10px] tracking-wider">{m.sub}</p>
              {/* Decorative line */}
              <motion.div
                className="absolute -bottom-4 left-0 h-px"
                style={{ background: "linear-gradient(90deg, hsl(222 100% 65% / 0.3), transparent)" }}
                initial={{ width: 0 }}
                animate={isInView ? { width: "80%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <LineChart isInView={isInView} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <BarChart isInView={isInView} />
          </motion.div>
        </div>

        {/* Revenue Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-24 sm:mt-32"
        >
          <div className="mb-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-primary/50" />
              Revenue Simulator
            </motion.p>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3">
              Good Design Costs Money.{" "}
              <span className="text-primary">Bad Design Costs Revenue.</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
              See what your revenue looks like now — and what it could look like with our design and technology systems working for you.
            </p>
          </div>

          <div className="max-w-xl">
            <ROICalculator />
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-muted-foreground/30 text-[10px] tracking-wider mt-10 max-w-md"
        >
          * Los numeros mostrados son rangos tipicos basados en proyectos anteriores. Los resultados reales varian segun industria, producto y estrategia.
        </motion.p>
      </div>
    </section>
  );
};
