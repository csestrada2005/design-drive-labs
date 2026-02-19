import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { KineticType } from "@/components/motion/KineticType";
import { useGlassParallax } from "@/hooks/useGlassParallax";
import { MetricsHUD } from "@/components/motion/MetricsHUD";

const steps = [
{
  id: "audit",
  number: "01",
  title: "Audit & Strategy",
  desc: "We dissect your market, audience, and competitors to build on real insight.",
  outcome: "→ Clear positioning + conversion roadmap"
},
{
  id: "ux",
  number: "02",
  title: "UX Structure",
  desc: "Information architecture designed for how users actually think and move.",
  outcome: "→ Wireframes that reduce friction by design"
},
{
  id: "design",
  number: "03",
  title: "Design System",
  desc: "A premium visual identity built for consistency, speed, and brand authority.",
  outcome: "→ Production-ready UI with zero guesswork"
},
{
  id: "build",
  number: "04",
  title: "Build & Integrations",
  desc: "Clean code, fluid motion, and every integration you need — shipped fast.",
  outcome: "→ Live product, tested on all devices"
},
{
  id: "launch",
  number: "05",
  title: "Launch & Optimize",
  desc: "We don't disappear at go-live. We track, test, and improve what matters.",
  outcome: "→ Conversion-optimized and ready to scale"
}];


const StepRow = ({
  step,
  index,
  total




}: {step: (typeof steps)[number];index: number;total: number;}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div
        className="flex items-start gap-6 sm:gap-10 py-8 cursor-default"
        style={{
          borderBottom:
          index < total - 1 ? "1px solid hsl(0 0% 100% / 0.07)" : "none"
        }}>

        {/* Number */}
        <motion.span
          className="font-mono text-[11px] tracking-[0.25em] flex-shrink-0 w-8 pt-1 transition-colors duration-300"
          animate={{ color: hovered ? "hsl(0 100% 50%)" : "hsl(var(--foreground) / 0.3)" }}>

          {step.number}
        </motion.span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <motion.h3
              className="font-display text-2xl sm:text-3xl md:text-4xl leading-none transition-colors duration-300"
              animate={{ color: hovered ? "hsl(0 100% 50%)" : "hsl(var(--foreground))" }}>

              {step.title}
            </motion.h3>
          </div>

          <AnimatePresence>
            {hovered &&
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden">

                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {step.desc}
                </p>
                <span className="text-[11px] font-mono tracking-wider text-primary">
                  {step.outcome}
                </span>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>

      {/* Progress bar on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-primary"
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        style={{ transformOrigin: "left", width: "100%" }}
        transition={{ duration: 0.4 }} />

    </motion.div>);

};

export const ProcessSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { sectionRef, bgY, lightX, lightOp } = useGlassParallax(32);

  return (
    <section
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="py-24 sm:py-32 relative overflow-hidden"
      id="process">

      <MetricsHUD tags={["CRO", "AOV"]} sectionId="process" position="top-right" />
      {/* Glass Depth Parallax — background drift */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background:
          "radial-gradient(ellipse 60% 50% at 20% 60%, hsl(0 100% 50% / 0.025), transparent 65%)"
        }} />


      {/* Glass light band */}
      <motion.div
        aria-hidden
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          x: lightX,
          opacity: lightOp,
          width: "30%",
          background:
          "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.04) 50%, transparent)"
        }} />


      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 sm:mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>

          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4">
            Process
          </p>
          <KineticType
            text="A PROCESS THAT SHIPS."
            as="h2"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 text-foreground"
            delay={0.1}
            wordDelay={0.08} />

          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">Five phases. Hover each step to see the outcome.

          </p>
        </motion.div>

        {/* Steps */}
        <div>
          {steps.map((step, i) =>
          <StepRow key={step.id} step={step} index={i} total={steps.length} />
          )}
        </div>
      </div>
    </section>);

};