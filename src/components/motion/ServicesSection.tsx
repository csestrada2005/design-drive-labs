import { useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Store, Cog, Rocket, ArrowRight } from "lucide-react";
import { MicroCTA } from "@/components/motion/MicroCTA";
import { useLanguage } from "@/contexts/LanguageContext";

const tierConfigs = [
  { tier: 0, nameKey: "services.ecommerce", anchor: "ecommerce", catKey: "services.ecommerce.cat", icon: Store, bestForKey: "services.ecommerce.bestFor", featureKeys: ["services.ecommerce.f1", "services.ecommerce.f2", "services.ecommerce.f3"], hue: 350 },
  { tier: 1, nameKey: "services.marketing", anchor: "websites", catKey: "services.marketing.cat", icon: Cog, bestForKey: "services.marketing.bestFor", featureKeys: ["services.marketing.f1", "services.marketing.f2", "services.marketing.f3"], hue: 0 },
  { tier: 2, nameKey: "services.systems", anchor: "systems", catKey: "services.systems.cat", icon: Rocket, bestForKey: "services.systems.bestFor", featureKeys: ["services.systems.f1", "services.systems.f2", "services.systems.f3"], hue: 15 },
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
  const { t } = useLanguage();
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 72;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0" viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--muted-foreground) / 0.15)" strokeWidth="1" />
        <motion.circle
          cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"
          strokeDasharray={`${(2 * Math.PI * r) / 3} ${(2 * Math.PI * r * 2) / 3}`}
          style={{ filter: "drop-shadow(0 0 6px hsl(0 100% 50% / 0.5))" }}
          animate={{ rotate: active * 120 - 90 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          transform-origin={`${cx} ${cy}`}
        />
      </svg>

      {tierConfigs.map((tier, i) => {
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
              left: bx - 20, top: by - 20, width: 40, height: 40,
              background: isActive ? `hsl(${tier.hue} 100% 50% / 0.15)` : "hsl(var(--secondary))",
              border: `1px solid ${isActive ? `hsl(${tier.hue} 100% 50% / 0.5)` : "hsl(var(--border))"}`,
              boxShadow: isActive ? `0 0 20px hsl(${tier.hue} 100% 50% / 0.25)` : "none",
            }}
            onClick={() => onSelect(i)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label={t(tier.nameKey)}
          >
            <Icon className="w-4 h-4" style={{ color: isActive ? `hsl(${tier.hue} 100% 55%)` : "hsl(var(--muted-foreground))" }} />
          </motion.button>
        );
      })}

      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary">
          {t("services.tier")}
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
  const [active, setActive] = useState(0);
  const { t } = useLanguage();
  const tier = tierConfigs[active];

  return (
    <section ref={ref} className="py-32 sm:py-40 relative overflow-hidden" id="services">
      {tierConfigs.map(tc => (
        <div key={tc.anchor} id={tc.anchor} className="absolute" style={{ top: 0 }} aria-hidden="true" />
      ))}
      <AnimatePresence mode="wait">
        <motion.div
          key={tier.hue}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <AmbientParticles hue={tier.hue} />
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-10">
        <motion.div
          className="mb-20 sm:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            {t("services.title")} <span className="text-primary">{t("services.titleAccent")}</span>
          </h2>
          <p className="text-foreground/80 text-sm max-w-lg">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <DialSelector active={active} onSelect={setActive} />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="flex-1 min-w-0"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs sm:text-[10px] font-mono tracking-[0.25em] uppercase"
                  style={{ color: `hsl(${tier.hue} 100% 55% / 0.7)` }}
                >
                  {t(tier.catKey)}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                {t(tier.nameKey)}
              </h3>

              <ul className="space-y-4 mb-8">
                {tier.featureKeys.map((fKey, fi) => (
                  <motion.li
                    key={fKey}
                    className="flex items-start gap-3 text-sm text-foreground"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: fi * 0.07 + 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{
                        background: `hsl(${tier.hue} 100% 55%)`,
                        boxShadow: `0 0 8px hsl(${tier.hue} 100% 50% / 0.4)`,
                      }}
                    />
                    {t(fKey)}
                  </motion.li>
                ))}
              </ul>

              <div className="pt-4" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                <p className="text-xs sm:text-[10px] font-mono tracking-[0.12em] uppercase text-muted-foreground mb-1">
                  {t("services.bestFor")}
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {t(tier.bestForKey)}
                </p>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/cta"
                >
                  {t("services.explore")}
                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-12 lg:hidden">
          {tierConfigs.map((tc, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-full transition-all duration-300"
              style={{
                background: active === i ? `hsl(${tc.hue} 100% 50% / 0.12)` : "transparent",
                border: `1px solid ${active === i ? `hsl(${tc.hue} 100% 50% / 0.4)` : "hsl(var(--border))"}`,
                color: active === i ? `hsl(${tc.hue} 100% 55%)` : "hsl(var(--muted-foreground))",
              }}
            >
              0{i + 1}
            </button>
          ))}
        </div>

        <div className="mt-16 sm:mt-20 flex justify-center">
          <MicroCTA variant="both" />
        </div>
      </div>
    </section>
  );
};
