import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollPaint } from "@/hooks/useScrollPaint";

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
  const headerPaint = useScrollPaint({ xDrift: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative" id="process">
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
          ref={headerPaint.ref}
          style={headerPaint.style}
          className="mb-6"
        >
          <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-primary/50" />
            How We Work
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            A PROCESS THAT <span className="text-primary">SHIPS.</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mb-6">
            No necesitas tenerlo todo resuelto. Nosotros estructuramos, disenamos, construimos y lanzamos con velocidad y claridad.
          </p>
          <a href="#contact" className="btn-primary text-sm">Schedule Call</a>
        </motion.div>

        {/* Zigzag Timeline */}
        <div className="relative mt-16">
          {/* Center progress line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/10">
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, hsl(0 100% 50%), hsl(0 100% 50% / 0.2))",
                boxShadow: "0 0 12px hsl(0 100% 50% / 0.3)",
              }}
            />
          </div>
          {/* Mobile left line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-border/10">
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, hsl(0 100% 50%), hsl(0 100% 50% / 0.2))",
                boxShadow: "0 0 12px hsl(0 100% 50% / 0.3)",
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {phases.map((phase, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                  className={`relative flex gap-6 sm:gap-8 md:items-center ${
                    /* Mobile: always left-aligned. Desktop: zigzag */
                    ""
                  }`}
                >
                  {/* Mobile layout */}
                  <div className="md:hidden flex gap-6">
                    {/* Circle */}
                    <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: "radial-gradient(circle, hsl(0 100% 50% / 0.15), transparent)",
                        border: "1px solid hsl(0 100% 50% / 0.25)",
                      }}
                    >
                      <span className="font-display text-[10px] text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <h3 className="font-display text-base sm:text-lg text-foreground mb-1">{phase.title}</h3>
                      <div className="h-px mb-3" style={{ background: "linear-gradient(90deg, hsl(0 100% 50% / 0.15), transparent 60%)" }} />
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{phase.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {phase.bullets.map((bullet) => (
                          <span key={bullet} className="text-muted-foreground/60 text-xs flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-primary/40" />
                            {bullet}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desktop zigzag layout */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-start w-full">
                    {/* Left content or spacer */}
                    <div className={isLeft ? "" : "order-3"}>
                      <div className={`${isLeft ? "text-right pr-4" : "text-left pl-4"}`}>
                        <h3 className="font-display text-lg text-foreground mb-1">{phase.title}</h3>
                        <div className="h-px mb-3 ml-auto" style={{
                          background: isLeft
                            ? "linear-gradient(270deg, hsl(0 100% 50% / 0.15), transparent 60%)"
                            : "linear-gradient(90deg, hsl(0 100% 50% / 0.15), transparent 60%)",
                          maxWidth: "200px",
                          marginLeft: isLeft ? "auto" : "0",
                        }} />
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{phase.description}</p>
                        <div className={`flex flex-wrap gap-x-4 gap-y-1 ${isLeft ? "justify-end" : ""}`}>
                          {phase.bullets.map((bullet) => (
                            <span key={bullet} className="text-muted-foreground/60 text-xs flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-primary/40" />
                              {bullet}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Center circle */}
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center order-2"
                      style={{
                        background: "radial-gradient(circle, hsl(0 100% 50% / 0.15), transparent)",
                        border: "1px solid hsl(0 100% 50% / 0.25)",
                        boxShadow: "0 0 20px hsl(0 100% 50% / 0.1)",
                      }}
                    >
                      <span className="font-display text-[10px] text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Right spacer or content */}
                    <div className={isLeft ? "order-3" : ""} />
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
