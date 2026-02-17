import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    title: "WEBSITES",
    subtitle: "High-converting",
    bullets: ["Custom design systems", "Conversion-optimized UX", "Performance-first builds"],
    geometry: "hex",
    accent: true,
  },
  {
    title: "E-COMMERCE",
    subtitle: "Shopify & Custom",
    bullets: ["Product page optimization", "Checkout flow design", "Inventory integration"],
    geometry: "square",
    accent: false,
  },
  {
    title: "SYSTEMS",
    subtitle: "CRM / Portals / Automations",
    bullets: ["Custom dashboards", "Workflow automation", "API integrations"],
    geometry: "circle",
    accent: false,
  },
  {
    title: "LANDING PAGES",
    subtitle: "Campaign-ready",
    bullets: ["A/B test ready", "Lead capture flows", "Analytics integration"],
    geometry: "triangle",
    accent: true,
  },
];

const AnimatedGeometry = ({ type, className = "" }: { type: string; className?: string }) => {
  return (
    <motion.svg
      viewBox="0 0 60 60"
      className={`w-16 h-16 ${className}`}
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {type === "hex" && (
        <>
          <polygon
            points="30,6 54,18 54,42 30,54 6,42 6,18"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <polygon
            points="30,16 44,24 44,38 30,46 16,38 16,24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="2 3"
          />
        </>
      )}
      {type === "square" && (
        <>
          <rect x="8" y="8" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <rect x="18" y="18" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" />
          <line x1="30" y1="8" x2="30" y2="52" stroke="currentColor" strokeWidth="0.3" />
          <line x1="8" y1="30" x2="52" y2="30" stroke="currentColor" strokeWidth="0.3" />
        </>
      )}
      {type === "circle" && (
        <>
          <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 4" />
          <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.3" />
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
};

export const ServicesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="services">
      {/* Scanning bars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent scan-bar" />
        <div className="absolute bottom-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent scan-bar" style={{ animationDelay: "2s" }} />
      </div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 right-10 w-24 h-24 border border-primary/[0.06] rounded-full"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 40, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity } }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-32 left-8 w-16 h-16 border border-primary/[0.04]"
        style={{ transform: "rotate(45deg)" }}
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

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

        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`group relative p-6 sm:p-8 rounded-lg border transition-all duration-500 hover:-translate-y-1.5 overflow-hidden ${
                service.accent
                  ? "bg-primary/[0.06] border-primary/20 hover:border-primary/40"
                  : "bg-card/50 border-border/30 hover:border-primary/30"
              }`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-lg bg-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Corner accent line */}
              <div className="absolute top-0 right-0 w-16 h-px bg-gradient-to-l from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl mb-1 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">{service.subtitle}</p>
                  </div>
                  <AnimatedGeometry
                    type={service.geometry}
                    className="text-primary/20 group-hover:text-primary/50 transition-colors duration-500"
                  />
                </div>

                <ul className="space-y-2.5 mt-5">
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
