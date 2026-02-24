import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { id: "audit", number: "01", title: "Audit & Strategy", desc: "We dissect your market, audience, and competitors to build on real insight." },
  { id: "ux", number: "02", title: "UX Structure", desc: "Information architecture designed for how users actually think and move." },
  { id: "design", number: "03", title: "Design System", desc: "A premium visual identity built for consistency, speed, and brand authority." },
  { id: "build", number: "04", title: "Build & Integrations", desc: "Clean code, fluid motion, and every integration you need — shipped fast." },
  { id: "launch", number: "05", title: "Launch & Optimize", desc: "We track, test, and improve what matters after go-live." },
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
  // Reserve first 15% for the title, remaining 85% for steps
  const stepsStart = 0.15;
  const stepsRange = 1 - stepsStart;
  const segmentSize = stepsRange / total;
  const start = stepsStart + index * segmentSize;
  const fadeIn = start + segmentSize * 0.2;
  const holdEnd = start + segmentSize * 0.75;
  const end = Math.min(start + segmentSize, 1);

  const isLast = index === total - 1;

  const opacity = useTransform(
    scrollYProgress,
    isLast ? [start, fadeIn, end] : [start, fadeIn, holdEnd, end],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    isLast ? [start, fadeIn, end] : [start, fadeIn, holdEnd, end],
    isLast ? [40, 0, 0] : [40, 0, 0, -30]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
      style={{ opacity, y }}
    >
      <span className="font-mono text-[11px] tracking-[0.3em] text-primary mb-4">
        {step.number}
      </span>
      <h3 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground text-center leading-none mb-4">
        {step.title}
      </h3>
      <p className="text-muted-foreground text-sm sm:text-base max-w-md text-center leading-relaxed">
        {step.desc}
      </p>
    </motion.div>
  );
};

export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Title fades in at start, fades out as steps begin
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.18], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.05, 0.12, 0.18], [30, 0, 0, -20]);

  return (
    <div ref={containerRef} style={{ height: `${(steps.length + 1) * 100}vh` }} id="process">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Big title — "How we work" */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary text-center leading-none">
            How we work.
          </h2>
        </motion.div>

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
            const stepsStart = 0.15;
            const stepsRange = 1 - stepsStart;
            const segmentSize = stepsRange / steps.length;
            const mid = stepsStart + i * segmentSize + segmentSize * 0.5;
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
  const lo = Math.max(0, mid - 0.08);
  const hi = Math.min(1, mid + 0.08);

  const scale = useTransform(scrollYProgress, [lo, mid, hi], [0.6, 1.2, 0.6]);
  const opacity = useTransform(scrollYProgress, [lo, mid, hi], [0.25, 1, 0.25]);

  return (
    <motion.div
      className="w-2 h-2 rounded-full bg-primary"
      style={{ scale, opacity }}
    />
  );
};
