import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BlackSandReveal } from "@/components/motion/BlackSandReveal";
import { KineticType } from "@/components/motion/KineticType";
import { useGlassParallax } from "@/hooks/useGlassParallax";

const standards = [
  {
    id: "mobile",
    label: "Mobile-First",
    desc: "Every element is designed for thumb-first interaction before scaling up.",
  },
  {
    id: "speed",
    label: "Speed & Performance",
    desc: "Sub-2s load times, optimized assets, Core Web Vitals in the green.",
  },
  {
    id: "cro",
    label: "CRO Foundations",
    desc: "Hierarchy, trust signals, and friction removal baked into every layout.",
  },
  {
    id: "analytics",
    label: "Analytics Tracking",
    desc: "Events, funnels, and heatmaps configured from day one.",
  },
  {
    id: "seo",
    label: "SEO Baseline",
    desc: "Semantic HTML, meta structure, schema markup, and crawlability.",
  },
  {
    id: "handoff",
    label: "Clean Handoff",
    desc: "You get the keys. Full documentation, zero black boxes.",
  },
];

export const StandardsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { sectionRef, bgY, lightX, lightOp } = useGlassParallax(28);

  return (
    <section
      ref={(el) => {
        // bind both refs
        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="py-24 sm:py-32 relative overflow-hidden"
      id="standards"
    >
      {/* Glass Depth Parallax — background drift layer */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, hsl(0 100% 50% / 0.03), transparent 70%)",
        }}
      />

      {/* Glass light sweep */}
      <motion.div
        aria-hidden
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          x: lightX,
          opacity: lightOp,
          width: "35%",
          background:
            "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.035) 40%, hsl(0 0% 100% / 0.06) 50%, hsl(0 0% 100% / 0.035) 60%, transparent)",
        }}
      />

      <div className="container relative z-10">
        {/* Header — TEXT-ONLY Black Sand Reveal */}
        <div className="mb-16 sm:mb-20 max-w-2xl">
          <BlackSandReveal mode="text" delay={100}>
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4">
                Standards
              </p>
              <KineticType
                text="THINGS WE DON'T NEGOTIATE ON."
                as="h2"
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 text-foreground"
                delay={0.2}
                wordDelay={0.07}
              />
              <motion.p
                className="text-muted-foreground text-sm leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                These aren't features you unlock on a higher tier. They're the baseline — 
                the floor, not the ceiling.
              </motion.p>
            </div>
          </BlackSandReveal>
        </div>

        {/* Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ border: "1px solid hsl(0 0% 100% / 0.07)" }}
        >
          {standards.map((item, i) => (
            <motion.div
              key={item.id}
              className="group relative p-7 sm:p-8 hover:bg-primary/[0.04] transition-colors duration-300"
              style={{
                borderRight: "1px solid hsl(0 0% 100% / 0.07)",
                borderBottom: "1px solid hsl(0 0% 100% / 0.07)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              {/* Number */}
              <span className="block font-mono text-[10px] tracking-[0.25em] text-primary/40 mb-4 group-hover:text-primary/70 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Label */}
              <h3 className="font-display text-lg sm:text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {item.label}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{ transformOrigin: "left", width: "100%" }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
