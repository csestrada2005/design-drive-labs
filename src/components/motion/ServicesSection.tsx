import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Store, Cog, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollPaint } from "@/hooks/useScrollPaint";

const tiers = [
  {
    tier: "01",
    name: "Brand Storefront",
    category: "High-End Web",
    icon: Store,
    features: ["Premium Online Store", "Eye-Catching Animations", "Built to Rank on Google"],
    bestFor: "D2C Brands needing a premium face.",
    accentColor: "hsl(350 100% 60%)",
    accentGlow: "hsl(350 100% 60% / 0.12)",
    popular: false,
  },
  {
    tier: "02",
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
    accentColor: "hsl(0 100% 50%)",
    accentGlow: "hsl(0 100% 50% / 0.12)",
    popular: true,
  },
  {
    tier: "03",
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
    accentColor: "hsl(15 100% 55%)",
    accentGlow: "hsl(15 100% 55% / 0.12)",
    popular: false,
  },
];

/* Hex grid background pattern */
const HexGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hex-pattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          <polygon
            points="30,2 55,15 55,37 30,50 5,37 5,15"
            fill="none"
            stroke="hsl(0 100% 50% / 0.06)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-pattern)" />
    </svg>
    {/* Pulsing hex highlights */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${15 + (i % 3) * 30}%`,
          top: `${20 + Math.floor(i / 3) * 40}%`,
          width: 60,
          height: 52,
        }}
        animate={{
          opacity: [0, 0.15, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3 + i * 0.5,
          repeat: Infinity,
          delay: i * 0.6,
          ease: "easeInOut",
        }}
      >
        <svg width="60" height="52" viewBox="0 0 60 52">
          <polygon
            points="30,2 55,15 55,37 30,50 5,37 5,15"
            fill="hsl(0 100% 50% / 0.05)"
            stroke="hsl(0 100% 50% / 0.15)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    ))}
  </div>
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    },
  },
};

export const ServicesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const headerPaint = useScrollPaint({ xDrift: 20 });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="services">
      <HexGrid />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent scan-bar" />
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={headerPaint.ref}
          style={headerPaint.style}
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
            Three distinct engagement levels. Choose the tier that matches your ambition.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            const isHovered = hoveredIdx === i;

            return (
              <motion.div
                key={tier.tier}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative group"
                data-cursor="expand"
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
                    clipPath: "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)",
                    boxShadow: isHovered ? `0 0 40px ${tier.accentGlow}` : "none",
                  }}
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${tier.accentColor}${isHovered ? "60" : "20"}, transparent)` }}
                  />
                  <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `linear-gradient(${tier.accentColor}40 1px, transparent 1px), linear-gradient(90deg, ${tier.accentColor}40 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
                  <motion.div className="absolute inset-0 pointer-events-none" animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.4 }} style={{ background: `radial-gradient(ellipse 70% 40% at 50% 0%, ${tier.accentGlow}, transparent)` }} />

                  <CardContent className="relative p-6 sm:p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: `${tier.accentColor}80` }}>Tier {tier.tier}</span>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300" style={{ background: `${tier.accentColor}10`, border: `1px solid ${tier.accentColor}${isHovered ? "30" : "15"}` }}>
                        <Icon className="w-4 h-4" style={{ color: tier.accentColor }} />
                      </div>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl mb-1 group-hover:text-primary transition-colors duration-300 relative overflow-hidden">
                      {tier.name}
                      <motion.span
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(105deg, transparent 40%, ${tier.accentColor}55 50%, rgba(255,255,255,0.15) 55%, transparent 65%)`,
                          backgroundSize: "200% 100%",
                        }}
                        animate={{ backgroundPosition: ["200% 0", "-100% 0"] }}
                        transition={{
                          duration: 1.2,
                          delay: i * 1.2 + 2,
                          repeat: Infinity,
                          repeatDelay: 4,
                          ease: "easeInOut",
                        }}
                      />
                    </h3>
                    <p className="text-[11px] font-mono tracking-wider uppercase mb-5" style={{ color: `${tier.accentColor}80` }}>{tier.category}</p>
                    <motion.div className="h-px mb-5" style={{ background: `linear-gradient(90deg, ${tier.accentColor}25, transparent)`, transformOrigin: "left" }} animate={{ scaleX: isHovered ? 1 : 0.4 }} transition={{ duration: 0.5 }} />
                    <ul className="space-y-3 mb-6 flex-1">
                      {tier.features.map((feature, fi) => (
                        <motion.li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors" initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.15 + fi * 0.06 + 0.3 }}>
                          <div className="w-1 h-1 rounded-full flex-shrink-0 mt-2 group-hover:scale-150 transition-transform" style={{ background: `${tier.accentColor}60` }} />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="pt-4 mt-auto" style={{ borderTop: `1px solid ${tier.accentColor}10` }}>
                      <p className="text-[10px] font-mono tracking-[0.12em] uppercase text-muted-foreground/70 mb-1">Best for</p>
                      <p className="text-xs text-foreground/80 leading-relaxed">{tier.bestFor}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
