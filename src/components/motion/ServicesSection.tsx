import { useRef, useCallback, useState } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    title: "WEBSITES",
    subtitle: "High-converting",
    bullets: ["Custom design systems", "Conversion-optimized UX", "Performance-first builds"],
    geometry: "hex",
  },
  {
    title: "E-COMMERCE",
    subtitle: "Shopify & Custom",
    bullets: ["Product page optimization", "Checkout flow design", "Inventory integration"],
    geometry: "square",
  },
  {
    title: "SYSTEMS",
    subtitle: "CRM / Portals / Automations",
    bullets: ["Custom dashboards", "Workflow automation", "API integrations"],
    geometry: "circle",
  },
  {
    title: "LANDING PAGES",
    subtitle: "Campaign-ready",
    bullets: ["A/B test ready", "Lead capture flows", "Analytics integration"],
    geometry: "triangle",
  },
];

const AnimatedGeometry = ({ type, className = "" }: { type: string; className?: string }) => (
  <motion.svg
    viewBox="0 0 60 60"
    className={`w-14 h-14 ${className}`}
    aria-hidden="true"
    animate={{ rotate: 360 }}
    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
  >
    {type === "hex" && (
      <>
        <polygon points="30,6 54,18 54,42 30,54 6,42 6,18" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <polygon points="30,16 44,24 44,38 30,46 16,38 16,24" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" />
      </>
    )}
    {type === "square" && (
      <>
        <rect x="8" y="8" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <rect x="18" y="18" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" />
      </>
    )}
    {type === "circle" && (
      <>
        <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 4" />
      </>
    )}
    {type === "triangle" && (
      <>
        <polygon points="30,6 54,52 6,52" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <polygon points="30,22 42,46 18,46" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" />
      </>
    )}
  </motion.svg>
);

export const ServicesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="services">
      {/* Scanning bars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent scan-bar" />
      </div>

      <div className="container">
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
            Services
          </motion.p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            WHAT WE <span className="text-primary">BUILD</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md">
            Strategic digital products designed around your business goals.
          </p>
        </motion.div>

        {/* Fluid grid — no cards, no borders */}
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-14">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative group cursor-default"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Hover light sweep */}
              <motion.div
                className="absolute -inset-6 rounded-3xl pointer-events-none"
                animate={{
                  opacity: hoveredIdx === i ? 1 : 0,
                  background: hoveredIdx === i
                    ? "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(222 100% 65% / 0.06), transparent)"
                    : "none",
                }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl mb-1 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">{service.subtitle}</p>
                  </div>
                  <AnimatedGeometry
                    type={service.geometry}
                    className="text-primary/15 group-hover:text-primary/40 transition-colors duration-500"
                  />
                </div>

                {/* Separator line — not a box border */}
                <motion.div
                  className="h-px mb-5"
                  style={{ background: "linear-gradient(90deg, hsl(222 100% 65% / 0.2), transparent)", transformOrigin: "left" }}
                  animate={{ scaleX: hoveredIdx === i ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                />

                <ul className="space-y-2.5">
                  {service.bullets.map((bullet, bi) => (
                    <motion.li
                      key={bullet}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.12 + bi * 0.06 + 0.3 }}
                    >
                      <div className="w-1 h-1 rounded-full bg-primary/50 flex-shrink-0 group-hover:bg-primary transition-colors" />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
