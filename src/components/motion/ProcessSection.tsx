import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { id: "audit", number: "01", title: "Audit & Strategy" },
  { id: "ux", number: "02", title: "UX Structure" },
  { id: "design", number: "03", title: "Design System" },
  { id: "build", number: "04", title: "Build & Integrations" },
  { id: "launch", number: "05", title: "Launch & Optimize" },
];

const StepSlide = ({
  step,
  index,
  total,
  scrollYProgress,
}: {
  step: (typeof steps)[number];
  index: number;
  total: number;
  scrollYProgress: any;
}) => {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const fadeIn = start + segmentSize * 0.2;
  const holdEnd = start + segmentSize * 0.8;
  const end = Math.min(start + segmentSize, 1);

  const isLast = index === total - 1;

  const opacity = useTransform(
    scrollYProgress,
    isLast
      ? [start, fadeIn, end]
      : [start, fadeIn, holdEnd, end],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    isLast
      ? [start, fadeIn, end]
      : [start, fadeIn, holdEnd, end],
    isLast ? [40, 0, 0] : [40, 0, 0, -30]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      style={{ opacity, y }}
    >
      <span className="font-mono text-[11px] tracking-[0.3em] text-primary mb-4">
        {step.number}
      </span>
      <h3 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground text-center leading-none">
        {step.title}
      </h3>
    </motion.div>
  );
};

export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} style={{ height: `${steps.length * 100}vh` }} id="process">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Section label */}
        <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
            How we work
          </span>
        </div>

        {/* Steps */}
        <div className="relative h-full">
          {steps.map((step, i) => (
            <StepSlide
              key={step.id}
              step={step}
              index={i}
              total={steps.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {steps.map((step, i) => {
            const segmentSize = 1 / steps.length;
            const mid = i * segmentSize + segmentSize * 0.5;
            return (
              <ProgressDot key={step.id} scrollYProgress={scrollYProgress} mid={mid} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ProgressDot = ({
  scrollYProgress,
  mid,
}: {
  scrollYProgress: any;
  mid: number;
}) => {
  const lo = Math.max(0, mid - 0.1);
  const hi = Math.min(1, mid + 0.1);

  const scale = useTransform(
    scrollYProgress,
    [lo, mid, hi],
    [0.6, 1.2, 0.6]
  );
  const opacity = useTransform(
    scrollYProgress,
    [lo, mid, hi],
    [0.25, 1, 0.25]
  );

  return (
    <motion.div
      className="w-2 h-2 rounded-full bg-primary"
      style={{ scale, opacity }}
    />
  );
};
