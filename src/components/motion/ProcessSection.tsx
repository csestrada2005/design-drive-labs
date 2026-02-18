import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const phases = [
  {
    id: "discovery",
    number: "01",
    title: "DESCUBRIMIENTO",
    description: "Investigamos tu negocio, audiencia y metas para construir sobre una base solida.",
  },
  {
    id: "strategy",
    number: "02",
    title: "ESTRATEGIA",
    description: "Arquitectamos tu sitio alrededor de como los usuarios reales piensan y convierten.",
  },
  {
    id: "design",
    number: "03",
    title: "DISEÑO",
    description: "Visuales premium con proposito. Cada pixel sirve a la estrategia.",
  },
  {
    id: "build",
    number: "04",
    title: "BUILD",
    description: "Codigo limpio, motion fluido, rendimiento solido. Entregado rapido.",
  },
  {
    id: "polish",
    number: "05",
    title: "POLISH",
    description: "Obsesion por el detalle para que tus usuarios no tengan que pensar.",
  },
  {
    id: "launch",
    number: "06",
    title: "LAUNCH",
    description: "Lanzamiento con confianza. Handoff completo, cero cabos sueltos.",
  },
];

export const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const totalPhases = phases.length;
  // Each phase gets 100vh of scroll + 1 for the title screen
  const stickyHeight = `${(totalPhases + 1) * 100}vh`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Title: visible in [0, 1/(n+1)], then fades out
  const titleEnd = 1 / (totalPhases + 1);
  const titleOpacity = useTransform(scrollYProgress, [0, titleEnd * 0.7, titleEnd], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, titleEnd], [0, -80]);
  const titleScale = useTransform(scrollYProgress, [0, titleEnd], [1, 0.85]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      id="process"
      style={{ height: stickyHeight }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Title screen */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
        >
          <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-primary/50" />
            How We Work
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center">
            A PROCESS THAT <span className="text-primary">SHIPS.</span>
          </h2>
        </motion.div>

        {/* Individual phases */}
        {phases.map((phase, i) => {
          const phaseStart = (i + 1) / (totalPhases + 1);
          const phaseEnd = (i + 2) / (totalPhases + 1);
          const phaseMid = (phaseStart + phaseEnd) / 2;

          return (
            <PhaseSlide
              key={phase.id}
              phase={phase}
              scrollYProgress={scrollYProgress}
              fadeInStart={phaseStart}
              peak={phaseMid}
              fadeOutEnd={phaseEnd}
              isLast={i === totalPhases - 1}
            />
          );
        })}

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [1, 0.3, 0.3, 0]),
          }}
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
          <motion.div
            className="w-px h-6 bg-primary/50"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

/* ── Individual phase slide ── */
const PhaseSlide = ({
  phase,
  scrollYProgress,
  fadeInStart,
  peak,
  fadeOutEnd,
  isLast,
}: {
  phase: (typeof phases)[number];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  fadeInStart: number;
  peak: number;
  fadeOutEnd: number;
  isLast: boolean;
}) => {
  // Fade in from fadeInStart to peak, hold, then fade out to fadeOutEnd
  // Last phase stays visible until scroll ends
  const opacity = useTransform(
    scrollYProgress,
    isLast
      ? [fadeInStart, fadeInStart + (peak - fadeInStart) * 0.6, fadeOutEnd]
      : [fadeInStart, fadeInStart + (peak - fadeInStart) * 0.6, peak + (fadeOutEnd - peak) * 0.4, fadeOutEnd],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    isLast
      ? [fadeInStart, fadeInStart + (peak - fadeInStart) * 0.6, fadeOutEnd]
      : [fadeInStart, fadeInStart + (peak - fadeInStart) * 0.6, peak + (fadeOutEnd - peak) * 0.4, fadeOutEnd],
    isLast ? [60, 0, 0] : [60, 0, 0, -40]
  );
  const scale = useTransform(
    scrollYProgress,
    isLast
      ? [fadeInStart, fadeInStart + (peak - fadeInStart) * 0.6]
      : [fadeInStart, fadeInStart + (peak - fadeInStart) * 0.6],
    [0.9, 1]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
      style={{ opacity, y, scale }}
    >
      {/* Phase number */}
      <motion.span
        className="font-display text-8xl sm:text-9xl text-primary/20 mb-4 select-none"
      >
        {phase.number}
      </motion.span>

      {/* Phase title */}
      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-center">
        {phase.title}
      </h3>

      {/* Separator line */}
      <div
        className="w-16 h-px mb-6"
        style={{ background: "linear-gradient(90deg, transparent, hsl(0 100% 50% / 0.5), transparent)" }}
      />

      {/* Description */}
      <p className="text-muted-foreground text-sm sm:text-base max-w-md text-center leading-relaxed px-6">
        {phase.description}
      </p>
    </motion.div>
  );
};
