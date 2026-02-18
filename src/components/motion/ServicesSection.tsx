import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Store, Cog, Rocket, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TierDemoChat } from "./TierDemoChat";

const tiers = [
  {
    tier: "01",
    name: "The Brand Storefront",
    category: "High-End Web",
    icon: Store,
    tierKey: "storefront",
    features: ["Premium Online Store", "Eye-Catching Animations", "Built to Rank on Google"],
    bestFor: "D2C Brands needing a premium face.",
    accentColor: "hsl(350 100% 60%)",
    accentGlow: "hsl(350 100% 60% / 0.12)",
    popular: false,
  },
  {
    tier: "02",
    name: "The Business Engine",
    category: "Web + Systems",
    icon: Cog,
    tierKey: "engine",
    features: [
      "Everything in Tier 1",
      "Customer Management Systems",
      "Automated Messaging (WhatsApp & Email)",
      "Internal Dashboards & Portals",
    ],
    bestFor: "Operation-heavy businesses needing efficiency.",
    accentColor: "hsl(0 100% 50%)",
    accentGlow: "hsl(0 100% 50% / 0.12)",
    popular: true,
  },
  {
    tier: "03",
    name: "The SaaS Architect",
    category: "Full Product",
    icon: Rocket,
    tierKey: "saas",
    features: [
      "Powerful Custom Backends",
      "AI That Understands Your Data",
      "Smart AI Assistants",
      "Full Product Development",
    ],
    bestFor: "Founders building the next big platform.",
    accentColor: "hsl(15 100% 55%)",
    accentGlow: "hsl(15 100% 55% / 0.12)",
    popular: false,
  },
];

export const ServicesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const openPanel = useCallback(() => {
    setShowPanel(true);
    setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, []);

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="services">
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
            Growth Tiers
          </motion.p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            WHAT WE <span className="text-primary">BUILD</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg">
            Three distinct engagement levels. Choose the tier that matches your ambition.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            const isHovered = hoveredIdx === i;

            return (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative group"
              >
                {tier.popular && (
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full text-[10px] font-mono tracking-[0.15em] uppercase font-medium"
                    style={{
                      background: `linear-gradient(90deg, ${tier.accentColor}, hsl(20 100% 55%))`,
                      color: "hsl(0 10% 4%)",
                      boxShadow: `0 0 20px ${tier.accentGlow}`,
                    }}
                    animate={{ boxShadow: [`0 0 20px ${tier.accentGlow}`, `0 0 30px ${tier.accentColor}40`, `0 0 20px ${tier.accentGlow}`] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Most Popular
                  </motion.div>
                )}

                <Card
                  className="relative overflow-hidden border h-full transition-all duration-500"
                  style={{
                    background: "transparent",
                    borderColor: isHovered ? `${tier.accentColor}60` : "hsl(0 100% 50% / 0.25)",
                    borderRadius: "1.25rem",
                    boxShadow: isHovered
                      ? `0 0 40px ${tier.accentGlow}`
                      : "none",
                  }}
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${tier.accentColor}${isHovered ? "60" : "20"}, transparent)`,
                    }}
                  />

                  <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                      backgroundImage: `linear-gradient(${tier.accentColor}40 1px, transparent 1px), linear-gradient(90deg, ${tier.accentColor}40 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background: `radial-gradient(ellipse 70% 40% at 50% 0%, ${tier.accentGlow}, transparent)`,
                    }}
                  />

                  <CardContent className="relative p-6 sm:p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="text-[10px] font-mono tracking-[0.25em] uppercase"
                        style={{ color: `${tier.accentColor}80` }}
                      >
                        Tier {tier.tier}
                      </span>
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={{
                          background: `${tier.accentColor}10`,
                          border: `1px solid ${tier.accentColor}${isHovered ? "30" : "15"}`,
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: tier.accentColor }} />
                      </div>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl mb-1 group-hover:text-primary transition-colors duration-300">
                      {tier.name}
                    </h3>
                    <p
                      className="text-[11px] font-mono tracking-wider uppercase mb-5"
                      style={{ color: `${tier.accentColor}80` }}
                    >
                      {tier.category}
                    </p>

                    <motion.div
                      className="h-px mb-5"
                      style={{
                        background: `linear-gradient(90deg, ${tier.accentColor}25, transparent)`,
                        transformOrigin: "left",
                      }}
                      animate={{ scaleX: isHovered ? 1 : 0.4 }}
                      transition={{ duration: 0.5 }}
                    />

                    <ul className="space-y-3 mb-6 flex-1">
                      {tier.features.map((feature, fi) => (
                        <motion.li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.15 + fi * 0.06 + 0.3 }}
                        >
                          <div
                            className="w-1 h-1 rounded-full flex-shrink-0 mt-2 group-hover:scale-150 transition-transform"
                            style={{ background: `${tier.accentColor}60` }}
                          />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <div
                      className="pt-4 mt-auto"
                      style={{ borderTop: `1px solid ${tier.accentColor}10` }}
                    >
                      <p className="text-[10px] font-mono tracking-[0.12em] uppercase text-muted-foreground/40 mb-1">
                        Best for
                      </p>
                      <p className="text-xs text-foreground/60 leading-relaxed">
                        {tier.bestFor}
                      </p>
                    </div>

                    <button
                      onClick={openPanel}
                      className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase mt-5 transition-colors duration-300 group/link cursor-pointer bg-transparent border-0 p-0"
                      style={{ color: `${tier.accentColor}50` }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = tier.accentColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = `${tier.accentColor}50`)}
                    >
                      <Sparkles className="w-3 h-3" />
                      Prompt a demo with our AI
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 560 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.15 }}
              ref={panelRef}
              className="mt-8 rounded-2xl overflow-hidden border border-primary/10"
              style={{
                background: "linear-gradient(135deg, hsl(0 10% 6%), hsl(0 10% 4%))",
                boxShadow: "0 0 60px hsl(350 100% 60% / 0.08), inset 0 1px 0 hsl(0 0% 100% / 0.03)",
              }}
            >
              <TierDemoChat onClose={() => setShowPanel(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};