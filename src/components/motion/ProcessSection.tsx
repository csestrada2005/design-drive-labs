import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

const phases = [
  {
    id: "discovery",
    title: "DESCUBRIMIENTO",
    bullets: ["Entrevistas", "Analisis competitivo", "Definicion de objetivos"],
    description: "Investigamos tu negocio, audiencia y metas para construir sobre una base solida.",
  },
  {
    id: "strategy",
    title: "ESTRATEGIA",
    bullets: ["User journey", "Arquitectura de contenido", "Plan de conversion"],
    description: "Arquitectamos tu sitio alrededor de como los usuarios reales piensan y convierten.",
  },
  {
    id: "design",
    title: "DISENO",
    bullets: ["Direccion visual", "Mockups high-fidelity", "Prototipo"],
    description: "Visuales premium con proposito. Cada pixel sirve a la estrategia.",
  },
  {
    id: "build",
    title: "BUILD",
    bullets: ["Desarrollo", "Animaciones", "Integraciones"],
    description: "Codigo limpio, motion fluido, rendimiento solido. Entregado rapido.",
  },
  {
    id: "polish",
    title: "POLISH",
    bullets: ["QA testing", "Performance tuning", "Refinamiento"],
    description: "Obsesion por el detalle para que tus usuarios no tengan que pensar.",
  },
  {
    id: "launch",
    title: "LAUNCH",
    bullets: ["Deployment", "Analytics", "Documentacion"],
    description: "Lanzamiento con confianza. Handoff completo, cero cabos sueltos.",
  },
];

export const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative" id="process">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-1/3 h-full"
          style={{
            background: "radial-gradient(ellipse at 100% 50%, hsl(0 100% 50% / 0.03), transparent 60%)",
          }}
        />
      </div>

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xs tracking-[0.25em] uppercase mb-4 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-primary/50" />
            How We Work
          </motion.p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            A PROCESS THAT <span className="text-primary">SHIPS.</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mb-6">
            No necesitas tenerlo todo resuelto. Nosotros estructuramos, disenamos, construimos y lanzamos con velocidad y claridad.
          </p>
          <a href="#contact" className="btn-primary text-sm">Schedule Call</a>
        </motion.div>

        {/* Timeline — no cards */}
        <div className="relative mt-16">
          {/* Animated progress line */}
          <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-border/10">
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, hsl(0 100% 50%), hsl(0 100% 50% / 0.2))",
                boxShadow: "0 0 12px hsl(0 100% 50% / 0.3)",
              }}
            />
          </div>

          <div className="space-y-8">
            {phases.map((phase, i) => {
              const isExpanded = expandedId === phase.id;
              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex gap-6 sm:gap-8 group cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : phase.id)}
                >
                  {/* Circle indicator — luminous node */}
                  <div className={`relative z-10 flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isExpanded
                      ? "scale-110"
                      : "group-hover:scale-105"
                  }`}
                    style={{
                      background: isExpanded
                        ? "radial-gradient(circle, hsl(0 100% 50% / 0.3), hsl(0 100% 50% / 0.05))"
                        : "radial-gradient(circle, hsl(0 100% 50% / 0.1), transparent)",
                      boxShadow: isExpanded
                        ? "0 0 20px hsl(0 100% 50% / 0.3), 0 0 40px hsl(0 100% 50% / 0.1)"
                        : "none",
                      border: isExpanded
                        ? "1px solid hsl(0 100% 50% / 0.5)"
                        : "1px solid hsl(0 10% 15% / 0.5)",
                    }}
                  >
                    <span className={`font-display text-[10px] transition-colors ${
                      isExpanded ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content — no card, just text */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-display text-base sm:text-lg transition-colors ${
                        isExpanded ? "text-primary" : "group-hover:text-primary"
                      }`}>
                        {phase.title}
                      </h3>
                      <motion.svg
                        className="w-4 h-4 text-muted-foreground/50"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path d="M4 6l4 4 4-4" />
                      </motion.svg>
                    </div>

                    {/* Separator */}
                    <div className="h-px mt-3 mb-3" style={{ background: "linear-gradient(90deg, hsl(0 100% 50% / 0.1), transparent 60%)" }} />

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                            {phase.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {phase.bullets.map((bullet) => (
                        <span key={bullet} className="text-muted-foreground/60 text-xs flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-primary/40" />
                          {bullet}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};