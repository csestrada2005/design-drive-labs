import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type Phase = 0 | 1 | 2 | 3 | 4;

const SumiReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const wasVisible = useRef(false);
  const [phase, setPhase] = useState<Phase>(0);
  const [reEntry, setReEntry] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; dy: number; delay: number }>>([]);
  const [hoverShimmer, setHoverShimmer] = useState(false);
  const cooldown = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    if (!wasVisible.current) {
      wasVisible.current = true;
      const t1 = setTimeout(() => setPhase(1), 50);
      const t2 = setTimeout(() => setPhase(2), 700);
      const t3 = setTimeout(() => setPhase(3), 950);
      const t4 = setTimeout(() => setPhase(4), 1300);
      timersRef.current = [t1, t2, t3, t4];
      return () => timersRef.current.forEach(clearTimeout);
    } else {
      setReEntry(true);
      const t = setTimeout(() => setReEntry(false), 800);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  const handleInteract = useCallback(() => {
    if (cooldown.current || phase < 4) return;
    cooldown.current = true;
    setHoverShimmer(true);
    setTimeout(() => setHoverShimmer(false), 700);
    setParticles(
      Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: 8 + Math.random() * 84,
        dy: -(16 + Math.random() * 22),
        delay: Math.random() * 0.35,
      }))
    );
    setTimeout(() => setParticles([]), 1600);
    setTimeout(() => { cooldown.current = false; }, 2500);
  }, [phase]);

  const pathMain = "M 6 7 Q 70 4 140 8 T 290 7 T 440 8 T 592 7";
  const pathThin = "M 4 9 Q 70 6 140 10 T 290 9 T 440 10 T 594 9";
  const pathDry = "M 420 10 Q 490 7 594 11";
  const underlineBreath = reEntry || hoverShimmer;

  return (
    <div
      ref={ref}
      className="relative select-none cursor-default"
      style={{ paddingTop: "4rem", paddingBottom: "6rem" }}
      onMouseEnter={handleInteract}
      onTouchStart={handleInteract}
      aria-label="NEBU STUDIO"
    >
      <div className="flex justify-center overflow-hidden" style={{ lineHeight: 1 }}>
        <div className="relative inline-block" style={{ fontSize: "clamp(2.2rem, 9vw, 8.5rem)", lineHeight: 1.05 }}>
          <span className="font-display block whitespace-nowrap" style={{ color: "hsl(var(--foreground) / 0.28)", letterSpacing: "-0.01em" }} aria-hidden="true">
            NEBU STUDIO
          </span>
          <motion.div
            className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none"
            initial={{ width: "0%" }}
            animate={{ width: phase >= 1 ? "100%" : "0%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              WebkitMaskImage: phase < 4 ? "linear-gradient(to right, black 82%, rgba(0,0,0,0.4) 92%, transparent 100%)" : "none",
              maskImage: phase < 4 ? "linear-gradient(to right, black 82%, rgba(0,0,0,0.4) 92%, transparent 100%)" : "none",
            }}
          >
            <span className="font-display block whitespace-nowrap" style={{ color: "hsl(var(--foreground) / 0.93)", letterSpacing: "-0.01em" }}>
              NEBU STUDIO
            </span>
          </motion.div>

          <AnimatePresence>
            {phase === 2 && (
              <motion.div key="sweep-first" className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div className="absolute inset-y-0 w-[38%]" style={{ background: "linear-gradient(108deg, transparent 15%, hsl(0 0% 100% / 0.13) 48%, hsl(0 0% 100% / 0.06) 55%, transparent 80%)" }} initial={{ left: "-42%" }} animate={{ left: "145%" }} transition={{ duration: 0.58, ease: [0.25, 1, 0.5, 1] }} />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {reEntry && (
              <motion.div key="sweep-reentry" className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div className="absolute inset-y-0 w-[30%]" style={{ background: "linear-gradient(108deg, transparent 15%, hsl(0 0% 100% / 0.08) 50%, transparent 80%)" }} initial={{ left: "-35%" }} animate={{ left: "135%" }} transition={{ duration: 0.42, ease: [0.25, 1, 0.5, 1] }} />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {hoverShimmer && (
              <motion.div key="sweep-hover" className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div className="absolute inset-y-0 w-[26%]" style={{ background: "linear-gradient(108deg, transparent 10%, hsl(0 0% 100% / 0.09) 50%, transparent 80%)" }} initial={{ left: "5%" }} animate={{ left: "75%" }} transition={{ duration: 0.48, ease: "easeOut" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center" style={{ marginTop: "-0.35em" }}>
        <svg viewBox="0 0 600 22" className="w-full overflow-visible" style={{ maxWidth: "min(90%, 820px)", height: "auto" }} aria-hidden="true">
          <motion.path d={pathMain} stroke="hsl(0 100% 48%)" strokeWidth="3.8" strokeLinecap="round" fill="none" style={{ opacity: 0.74 }} initial={{ pathLength: 0, opacity: 0 }} animate={phase >= 3 ? { pathLength: 1, opacity: underlineBreath ? 0.88 : 0.74 } : { pathLength: 0, opacity: 0 }} transition={phase === 3 ? { duration: 0.62, ease: [0.22, 1, 0.36, 1] } : { duration: 0.3 }} />
          <motion.path d={pathThin} stroke="hsl(0 100% 48%)" strokeWidth="1.6" strokeLinecap="round" fill="none" style={{ opacity: 0.36 }} initial={{ pathLength: 0, opacity: 0 }} animate={phase >= 3 ? { pathLength: 1, opacity: 0.36 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.7, delay: phase === 3 ? 0.09 : 0, ease: [0.22, 1, 0.36, 1] }} />
          <motion.path d={pathDry} stroke="hsl(0 100% 48%)" strokeWidth="1.0" strokeLinecap="round" fill="none" style={{ opacity: 0.19 }} initial={{ pathLength: 0, opacity: 0 }} animate={phase >= 3 ? { pathLength: 1, opacity: 0.19 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.38, delay: phase === 3 ? 0.36 : 0, ease: "easeOut" }} />
        </svg>
      </div>

      <AnimatePresence>
        {particles.map((p) => (
          <motion.div key={p.id} className="absolute rounded-full pointer-events-none" style={{ width: 3 + Math.random() * 3, height: 3 + Math.random() * 3, left: `${p.x}%`, top: "38%", background: "hsl(0 100% 50%)" }} initial={{ opacity: 0.75, y: 0, x: 0, scale: 1 }} animate={{ opacity: 0, y: p.dy, x: (Math.random() - 0.5) * 18, scale: 0.2 }} exit={{ opacity: 0 }} transition={{ duration: 0.85 + p.delay, ease: "easeOut", delay: p.delay * 0.6 }} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export const DramaticFooter = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  const links = [
    { label: t("footer.services"), href: "#services" },
    { label: t("footer.work"), href: "#work" },
    { label: t("footer.process"), href: "#process" },
    { label: t("footer.contact"), href: "#contact" },
  ];

  return (
    <footer ref={ref} className="relative overflow-hidden pt-16 pb-20 sm:pb-10">
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        aria-hidden="true"
      />

      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-primary/20 font-light select-none pointer-events-none"
          style={{ fontSize: `${12 + i * 5}px`, left: `${10 + (i * 15) % 80}%`, top: `${5 + (i * 14) % 60}%` }}
          animate={{ y: [0, -4, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6 + i * 0.8, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
          aria-hidden="true"
        >
          +
        </motion.span>
      ))}

      <div className="container relative z-10">
        <SumiReveal />

        <div className="border-t pt-10" style={{ borderColor: "hsl(var(--foreground) / 0.08)" }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-4xl sm:text-5xl mb-2 text-foreground">NEBU STUDIO</h2>
              <p className="text-muted-foreground text-xs tracking-wider">{t("footer.tagline")}</p>
            </motion.div>
            <nav className="flex gap-6" aria-label="Footer navigation">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>
          </div>
          <p className="text-center text-muted-foreground/60 text-xs mt-10 tracking-wider">
            © {new Date().getFullYear()} NEBU STUDIO. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
