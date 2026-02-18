import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Route, Cpu, Zap, Shield } from "lucide-react";
import { SystemBlueprint } from "./SystemBlueprint";
import { useScrollPaint } from "@/hooks/useScrollPaint";

/* ── Binary Rain Animation ── */
const BinaryRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const columnsRef = useRef<{ chars: string[]; y: number; speed: number }[]>([]);

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
        col.y += col.speed;
        if (col.y > rect.height + 100) {
          col.y = -80;
          col.chars = col.chars.map(() => Math.random() > 0.5 ? "1" : "0");
        }
        col.chars.forEach((ch, ri) => {
          const x = ci * 14;
          const y = col.y + ri * 12;
          const opacity = Math.max(0, 1 - ri / col.chars.length) * 0.3;
          ctx.fillStyle = ri === 0 ? `hsla(0, 100%, 50%, ${opacity})` : `hsla(0, 80%, 40%, ${opacity * 0.6})`;
          ctx.fillText(ch, x, y);
        });
      });
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div className="flex items-center gap-3" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}>
          <svg viewBox="0 0 40 48" className="w-8 h-10" style={{ color: "hsl(0 100% 50%)" }}>
            <path d="M6 2h20l8 10v34H6V2z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M26 2v10h8" fill="none" stroke="currentColor" strokeWidth="0.8" />
            {[16, 22, 28, 34].map(y => (
              <line key={y} x1="12" y1={y} x2={28 - (y % 8)} y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            ))}
          </svg>
          <motion.span className="text-[10px] font-mono text-muted-foreground/60" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
            → 0x7F...
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

const PrivacyBadge = () => (
  <div className="flex items-center gap-1.5 mt-4">
    <Shield className="w-3 h-3 text-muted-foreground/60" />
    <span className="text-[8px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">Proprietary Architecture / Confidential Client</span>
  </div>
);

const systemCards = [
  { id: "logistics", icon: Route, title: "Autonomous Logistics CRM", subtitle: "", stat: "Automated 90% of driver dispatching.", heroType: "blueprint" as const },
  { id: "rag", icon: Cpu, title: "SaaS Powered with AI", subtitle: "", stat: "Smart automation that scales with your business growth.", heroType: "binary" as const },
  { id: "ecom", icon: Zap, title: "Headless Commerce Core", subtitle: "", stat: "+15% average order value through smart product recommendations.", heroType: "stats" as const },
];

/* ── Card with black cover reveal ── */
const RevealCard = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative overflow-hidden">
      {children}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ background: "hsl(0 0% 5%)" }}
        initial={{ y: 0 }}
        animate={isInView ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      />
    </div>
  );
};

export const FeaturedWork = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const headerPaint = useScrollPaint({ xDrift: 20 });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="work">
      <div className="container relative">
        <motion.div ref={headerPaint.ref} style={headerPaint.style} className="mb-16">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            ALL <span className="text-primary">POSSIBILITIES</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mt-4 leading-relaxed">
            Production-grade systems engineered for scale. No templates. No shortcuts — just results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {systemCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.id} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} className="group relative">
                <RevealCard delay={i * 0.15}>
                  <div className="p-5">
                    {/* Hero area */}
                    <div className="relative aspect-[4/3] overflow-hidden mb-5">
                      {card.heroType === "blueprint" && <div className="absolute inset-3"><SystemBlueprint compact /></div>}
                      {card.heroType === "binary" && <div className="absolute inset-0"><BinaryRain /></div>}
                      {card.heroType === "stats" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div className="text-center" animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }}>
                            <span className="font-display text-5xl sm:text-6xl font-bold text-primary" style={{ textShadow: "0 0 40px hsl(0 100% 50% / 0.3)" }}>+15%</span>
                            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/70 mt-2">AOV Increase</p>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "hsl(0 100% 50% / 0.08)", border: "1px solid hsl(0 100% 50% / 0.12)" }}>
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm sm:text-base text-foreground group-hover:text-primary transition-colors duration-300">{card.title}</h3>
                        {card.subtitle && <p className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/70">{card.subtitle}</p>}
                      </div>
                    </div>
                    <div className="ml-11">
                      <motion.div className="h-px mb-3" style={{ background: "linear-gradient(90deg, hsl(0 100% 50% / 0.2), transparent)", transformOrigin: "left" }} animate={{ scaleX: isInView ? 1 : 0 }} transition={{ delay: 0.4 + i * 0.15, duration: 0.8 }} />
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">{card.stat}</p>
                    </div>
                  </div>
                </RevealCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
