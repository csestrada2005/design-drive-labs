import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Route, Cpu, Zap, Shield } from "lucide-react";
import { SystemBlueprint } from "./SystemBlueprint";

/* ── Binary Rain Animation ── */
const BinaryRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const columnsRef = useRef<{ chars: string[]; y: number; speed: number }[]>([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const colCount = Math.floor(rect.width / 14);
    if (columnsRef.current.length === 0) {
      columnsRef.current = Array.from({ length: colCount }, () => ({
        chars: Array.from({ length: 8 }, () => Math.random() > 0.5 ? "1" : "0"),
        y: Math.random() * -rect.height,
        speed: 0.3 + Math.random() * 0.8,
      }));
    }

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.font = "10px monospace";

      columnsRef.current.forEach((col, ci) => {
        col.y += col.speed * (hovered ? 2.5 : 1);
        if (col.y > rect.height + 100) {
          col.y = -80;
          col.chars = col.chars.map(() => Math.random() > 0.5 ? "1" : "0");
        }

        col.chars.forEach((ch, ri) => {
          const x = ci * 14;
          const y = col.y + ri * 12;
          const opacity = Math.max(0, 1 - ri / col.chars.length) * (hovered ? 0.7 : 0.3);
          ctx.fillStyle = ri === 0
            ? `hsla(270, 80%, 70%, ${opacity})`
            : `hsla(270, 60%, 55%, ${opacity * 0.6})`;
          ctx.fillText(ch, x, y);
        });
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, [hovered]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Document icon fading into binary */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="flex items-center gap-3"
          animate={{ opacity: hovered ? 0.15 : 0.4 }}
          transition={{ duration: 0.4 }}
        >
          <svg viewBox="0 0 40 48" className="w-8 h-10" style={{ color: "hsl(270 80% 65%)" }}>
            <path d="M6 2h20l8 10v34H6V2z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M26 2v10h8" fill="none" stroke="currentColor" strokeWidth="0.8" />
            {[16, 22, 28, 34].map(y => (
              <line key={y} x1="12" y1={y} x2={28 - (y % 8)} y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            ))}
          </svg>
          <motion.span
            className="text-[10px] font-mono text-muted-foreground/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            → 0x7F...
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

/* ── Privacy Badge ── */
const PrivacyBadge = () => (
  <div className="flex items-center gap-1.5 mt-4">
    <Shield className="w-3 h-3 text-muted-foreground/30" />
    <span className="text-[8px] font-mono tracking-[0.15em] uppercase text-muted-foreground/25">
      Proprietary Architecture / Confidential Client
    </span>
  </div>
);

/* ── System Cards Config ── */
const systemCards = [
  {
    id: "logistics",
    icon: Route,
    title: "Autonomous Logistics CRM",
    subtitle: "",
    stat: "Automated 90% of driver dispatching.",
    accentColor: "hsl(190 90% 55%)",
    accentGlow: "hsl(190 90% 55% / 0.15)",
    heroType: "blueprint" as const,
  },
  {
    id: "rag",
    icon: Cpu,
    title: "SaaS Powered with AI",
    subtitle: "",
    stat: "Smart automation that scales with your business growth.",
    accentColor: "hsl(270 80% 65%)",
    accentGlow: "hsl(270 80% 65% / 0.15)",
    heroType: "binary" as const,
  },
  {
    id: "ecom",
    icon: Zap,
    title: "Headless Commerce Core",
    subtitle: "",
    stat: "+15% average order value through smart product recommendations.",
    accentColor: "hsl(163 56% 50%)",
    accentGlow: "hsl(163 56% 50% / 0.15)",
    heroType: "stats" as const,
  },
];

/* ── Main Section ── */
export const FeaturedWork = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="work">
      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 30%, hsl(222 100% 65% / 0.03), transparent)" }}
        aria-hidden="true"
      />

      <div className="container relative">
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
            Systems Portfolio
          </motion.p>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            ALL <span className="text-primary">POSSIBILITIES</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mt-4 leading-relaxed">
            Production-grade systems engineered for scale. No templates. No shortcuts — just results.
          </p>
        </motion.div>

        {/* System Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {systemCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative"
              >
                {/* Hero content area */}
                <div
                  className="relative aspect-[4/3] overflow-hidden mb-5"
                  style={{
                    borderRadius: "1.25rem",
                    background: "linear-gradient(135deg, hsl(222 40% 10%), hsl(222 35% 7%))",
                  }}
                >
                  {/* Subtle grid */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(hsl(222 100% 65% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(222 100% 65% / 0.4) 1px, transparent 1px)`,
                      backgroundSize: "16px 16px",
                    }}
                  />

                  {/* Hero animation */}
                  {card.heroType === "blueprint" && (
                    <div className="absolute inset-3">
                      <SystemBlueprint compact />
                    </div>
                  )}
                  {card.heroType === "binary" && (
                    <div className="absolute inset-0">
                      <BinaryRain />
                    </div>
                  )}
                  {card.heroType === "stats" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-center"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <span
                          className="font-display text-5xl sm:text-6xl font-bold"
                          style={{ color: card.accentColor, textShadow: `0 0 40px ${card.accentGlow}` }}
                        >
                          +15%
                        </span>
                        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/40 mt-2">
                          AOV Increase
                        </p>
                      </motion.div>
                    </div>
                  )}

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${card.accentGlow}, transparent 70%)`,
                    }}
                  />
                </div>

                {/* Icon + Title */}
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${card.accentColor}15, ${card.accentColor}08)`,
                      border: `1px solid ${card.accentColor}20`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: card.accentColor }} />
                  </div>
                  <div>
                    <h3 className="font-display text-sm sm:text-base group-hover:text-primary transition-colors duration-300">
                      {card.title}
                    </h3>
                    {card.subtitle && (
                      <p className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/40">
                        {card.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stat line */}
                <div className="ml-11">
                  <motion.div
                    className="h-px mb-3"
                    style={{
                      background: `linear-gradient(90deg, ${card.accentColor}30, transparent)`,
                      transformOrigin: "left",
                    }}
                    animate={{ scaleX: isInView ? 1 : 0 }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.8 }}
                  />
                  <p className="text-xs text-muted-foreground/60 leading-relaxed">
                    {card.stat}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
