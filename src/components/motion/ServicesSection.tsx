import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Store, Cog, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const tiers = [
  {
    tier: "01",
    name: "The Brand Storefront",
    category: "High-End Web",
    icon: Store,
    features: ["Headless Shopify (Hydrogen)", "3D Motion & Micro-interactions", "SEO Core Architecture"],
    bestFor: "D2C Brands needing a premium face.",
    accentColor: "hsl(190 90% 55%)",
    accentGlow: "hsl(190 90% 55% / 0.12)",
    popular: false,
  },
  {
    tier: "02",
    name: "The Business Engine",
    category: "Web + Systems",
    icon: Cog,
    features: [
      "Everything in Tier 1",
      "Custom CRM Integrations",
      "WhatsApp & Email Automations",
      "Admin Dashboards & Portals",
    ],
    bestFor: "Operation-heavy businesses needing efficiency.",
    accentColor: "hsl(222 100% 65%)",
    accentGlow: "hsl(222 100% 65% / 0.12)",
    popular: true,
  },
  {
    tier: "03",
    name: "The SaaS Architect",
    category: "Full Product",
    icon: Rocket,
    features: [
      "Python Backends (FastAPI)",
      "Vector DBs & RAG Pipelines",
      "Custom AI Agents",
      "Full SaaS Development",
    ],
    bestFor: "Founders building the next big platform.",
    accentColor: "hsl(270 80% 65%)",
    accentGlow: "hsl(270 80% 65% / 0.12)",
    popular: false,
  },
];

export const ServicesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="services">
      {/* Scanning bar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent scan-bar" />
      </div>

      <div className="container">
        {/* Header */}
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

        {/* Tier Cards */}
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
                {/* Most Popular badge */}
                {tier.popular && (
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full text-[10px] font-mono tracking-[0.15em] uppercase font-medium"
                    style={{
                      background: `linear-gradient(90deg, ${tier.accentColor}, hsl(163 56% 50%))`,
                      color: "hsl(222 40% 6%)",
                      boxShadow: `0 0 20px ${tier.accentGlow}`,
                    }}
                    animate={{ boxShadow: [`0 0 20px ${tier.accentGlow}`, `0 0 30px ${tier.accentColor}40`, `0 0 20px ${tier.accentGlow}`] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Most Popular
                  </motion.div>
                )}

                <Card
                  className="relative overflow-hidden border-0 h-full transition-all duration-500"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, hsl(222 40% 11%), hsl(222 35% 8%))`
                      : `linear-gradient(135deg, hsl(222 40% 9%), hsl(222 35% 6%))`,
                    borderRadius: "1.25rem",
                    boxShadow: isHovered
                      ? `0 0 40px ${tier.accentGlow}, inset 0 1px 0 hsl(0 0% 100% / 0.03)`
                      : "inset 0 1px 0 hsl(0 0% 100% / 0.02)",
                  }}
                >
                  {/* Top accent line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${tier.accentColor}${isHovered ? "60" : "20"}, transparent)`,
                    }}
                  />

                  {/* Grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                      backgroundImage: `linear-gradient(${tier.accentColor}40 1px, transparent 1px), linear-gradient(90deg, ${tier.accentColor}40 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background: `radial-gradient(ellipse 70% 40% at 50% 0%, ${tier.accentGlow}, transparent)`,
                    }}
                  />

                  <CardContent className="relative p-6 sm:p-8 flex flex-col h-full">
                    {/* Tier number + icon */}
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

                    {/* Name */}
                    <h3 className="font-display text-lg sm:text-xl mb-1 group-hover:text-primary transition-colors duration-300">
                      {tier.name}
                    </h3>
                    <p
                      className="text-[11px] font-mono tracking-wider uppercase mb-5"
                      style={{ color: `${tier.accentColor}80` }}
                    >
                      {tier.category}
                    </p>

                    {/* Separator */}
                    <motion.div
                      className="h-px mb-5"
                      style={{
                        background: `linear-gradient(90deg, ${tier.accentColor}25, transparent)`,
                        transformOrigin: "left",
                      }}
                      animate={{ scaleX: isHovered ? 1 : 0.4 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Features */}
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

                    {/* Best for */}
                    <div
                      className="pt-4 mt-auto"
                      style={{
                        borderTop: `1px solid ${tier.accentColor}10`,
                      }}
                    >
                      <p className="text-[10px] font-mono tracking-[0.12em] uppercase text-muted-foreground/40 mb-1">
                        Best for
                      </p>
                      <p className="text-xs text-foreground/60 leading-relaxed">
                        {tier.bestFor}
                      </p>
                    </div>

                    {/* CTA */}
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase mt-5 transition-colors duration-300 group/link"
                      style={{ color: `${tier.accentColor}50` }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = tier.accentColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = `${tier.accentColor}50`)}
                    >
                      <span
                        className="w-4 h-px transition-all duration-300 group-hover/link:w-8"
                        style={{ background: "currentColor" }}
                      />
                      Get Started
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
