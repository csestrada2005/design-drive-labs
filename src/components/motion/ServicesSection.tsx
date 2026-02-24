import { useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Store, Cog, Rocket } from "lucide-react";

const tiers = [
  {
    tier: 0,
    name: "Brand Storefront",
    category: "High-End Web",
    icon: Store,
    features: ["Premium Online Store", "Eye-Catching Animations", "Built to Rank on Google"],
    bestFor: "D2C Brands needing a premium face.",
    hue: 350,
  },
  {
    tier: 1,
    name: "Business Engine",
    category: "Web + Systems",
    icon: Cog,
    features: [
      "Everything in Tier 1",
      "Customer Management Systems",
      "Automated Messaging (WhatsApp & Email)",
      "Internal Dashboards & Portals",
    ],
    bestFor: "Operation-heavy businesses needing efficiency.",
    hue: 0,
  },
  {
    tier: 2,
    name: "SaaS Architect",
    category: "Full Product",
    icon: Rocket,
    features: [
      "Custom Backends",
      "Personalized AI Solutions & Integrations",
      "Smart AI Assistants",
      "Full Product Development",
    ],
    bestFor: "Founders building the next big platform.",
    hue: 15,
  },
];

/* ── Organic floating particles background ── */
const AmbientParticles = ({ hue }: { hue: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: 120 + i * 60,
          height: 120 + i * 60,
          left: `${10 + i * 18}%`,
          top: `${20 + (i % 3) * 25}%`,
          background: `radial-gradient(circle, hsl(${hue} 80% 50% / 0.06), transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 20 * (i % 2 === 0 ? 1 : -1), 0],
          y: [0, -15 + i * 5, 0],
        }}
        transition={{
          duration: 8 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

/* ── Interactive Dial Selector ── */
const DialSelector = ({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) => {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 72;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer ring — SVG stroke */}
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="hsl(var(--muted-foreground) / 0.15)"
          strokeWidth="1"
        />
        {/* Active arc indicator */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${(2 * Math.PI * r) / 3} ${(2 * Math.PI * r * 2) / 3}`}
          style={{ filter: "drop-shadow(0 0 6px hsl(0 100% 50% / 0.5))" }}
          animate={{ rotate: active * 120 - 90 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          transform-origin={`${cx} ${cy}`}
        />
      </svg>

      {/* Tier buttons positioned on the ring */}
      {tiers.map((tier, i) => {
        const angle = (i * 120 - 90) * (Math.PI / 180);
        const bx = cx + r * Math.cos(angle);
        const by = cy + r * Math.sin(angle);
        const Icon = tier.icon;
        const isActive = active === i;

        return (
          <motion.button
            key={i}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              left: bx - 20,
              top: by - 20,
              width: 40,
              height: 40,
              background: isActive
                ? `hsl(${tier.hue} 100% 50% / 0.15)`
                : "hsl(var(--secondary))",
              border: `1px solid ${isActive ? `hsl(${tier.hue} 100% 50% / 0.5)` : "hsl(var(--border))"}`,
              boxShadow: isActive
                ? `0 0 20px hsl(${tier.hue} 100% 50% / 0.25)`
                : "none",
            }}
            onClick={() => onSelect(i)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label={`Select ${tier.name}`}
          >
            <Icon
              className="w-4 h-4"
              style={{ color: isActive ? `hsl(${tier.hue} 100% 55%)` : "hsl(var(--muted-foreground))" }}
            />
          </motion.button>
        );
      })}

      {/* Center label */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/60">
          Tier
        </span>
        <motion.span
          className="font-display text-2xl text-foreground"
          key={active}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          0{active + 1}
        </motion.span>
      </div>
    </div>
  );
};

export const ServicesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(1);
  const tier = tiers[active];

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="services">
      {/* Ambient lighting that shifts with active tier */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tier.hue}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          aria-hidden="true"
        >
          <AmbientParticles hue={tier.hue} />
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            WHAT WE <span className="text-primary">BUILD</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg">
            Three distinct engagement levels. Interact with the dial to explore.
          </p>
        </motion.div>

        {/* Dial + Content layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Dial */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <DialSelector active={active} onSelect={setActive} />
          </motion.div>

          {/* Active tier content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="flex-1 min-w-0"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-[10px] font-mono tracking-[0.25em] uppercase"
                  style={{ color: `hsl(${tier.hue} 100% 55% / 0.7)` }}
                >
                  {tier.category}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                {tier.name}
              </h3>

              {/* Feature list */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, fi) => (
                  <motion.li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-foreground/80"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: fi * 0.08 + 0.15 }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{
                        background: `hsl(${tier.hue} 100% 55%)`,
                        boxShadow: `0 0 8px hsl(${tier.hue} 100% 50% / 0.4)`,
                      }}
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* Best for */}
              <div
                className="pt-4"
                style={{ borderTop: "1px solid hsl(var(--border))" }}
              >
                <p className="text-[10px] font-mono tracking-[0.12em] uppercase text-muted-foreground mb-1">
                  Best for
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {tier.bestFor}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tier quick-switch pills (mobile friendly) */}
        <div className="flex justify-center gap-2 mt-12 lg:hidden">
          {tiers.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-full transition-all duration-300"
              style={{
                background: active === i ? `hsl(${t.hue} 100% 50% / 0.12)` : "transparent",
                border: `1px solid ${active === i ? `hsl(${t.hue} 100% 50% / 0.4)` : "hsl(var(--border))"}`,
                color: active === i ? `hsl(${t.hue} 100% 55%)` : "hsl(var(--muted-foreground))",
              }}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
