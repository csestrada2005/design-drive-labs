import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import nebuOwl from "@/assets/nebu-owl.png";

type Phase = 0 | 1 | 2 | 3 | 4;

const SumiHeroReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; dy: number; delay: number }>>([]);
  const [hoverShimmer, setHoverShimmer] = useState(false);
  const cooldown = useRef(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1150);
    const t4 = setTimeout(() => setPhase(4), 1500);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

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

  const underlineBreath = hoverShimmer;

  return (
    <div
      ref={ref}
      className="relative select-none cursor-default"
      onMouseEnter={handleInteract}
      onTouchStart={handleInteract}
      aria-label="NEBU STUDIO"
    >
      <div className="flex justify-center overflow-hidden" style={{ lineHeight: 1 }}>
        <div
          className="relative inline-block"
          style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)", lineHeight: 1.05 }}
        >
          {/* Ghost base */}
          <span
            className="font-display block whitespace-nowrap"
            style={{ color: "hsl(var(--foreground) / 0.15)", letterSpacing: "-0.01em" }}
            aria-hidden="true"
          >
            NEBU <span>STUDIO</span>
          </span>

          {/* Ink-filled overlay */}
          <motion.div
            className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none"
            initial={{ width: "0%" }}
            animate={{ width: phase >= 1 ? "100%" : "0%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              WebkitMaskImage: phase < 4
                ? "linear-gradient(to right, black 82%, rgba(0,0,0,0.4) 92%, transparent 100%)"
                : "none",
              maskImage: phase < 4
                ? "linear-gradient(to right, black 82%, rgba(0,0,0,0.4) 92%, transparent 100%)"
                : "none",
            }}
          >
            <span
              className="font-display block whitespace-nowrap"
              style={{ letterSpacing: "-0.01em" }}
            >
              <span style={{ color: "hsl(var(--foreground) / 0.93)" }}>NEBU </span>
              <span className="text-primary">STUDIO</span>
            </span>
          </motion.div>

          {/* Light sweep */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div key="sweep" className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 w-[38%]"
                  style={{
                    background: "linear-gradient(108deg, transparent 15%, hsl(0 0% 100% / 0.13) 48%, hsl(0 0% 100% / 0.06) 55%, transparent 80%)",
                  }}
                  initial={{ left: "-42%" }}
                  animate={{ left: "145%" }}
                  transition={{ duration: 0.58, ease: [0.25, 1, 0.5, 1] }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover shimmer */}
          <AnimatePresence>
            {hoverShimmer && (
              <motion.div key="shimmer" className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 w-[26%]"
                  style={{
                    background: "linear-gradient(108deg, transparent 10%, hsl(0 0% 100% / 0.09) 50%, transparent 80%)",
                  }}
                  initial={{ left: "5%" }}
                  animate={{ left: "75%" }}
                  transition={{ duration: 0.48, ease: "easeOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Red brush underline */}
      <div className="flex justify-center" style={{ marginTop: "-0.35em" }}>
        <svg
          viewBox="0 0 600 22"
          className="w-full overflow-visible"
          style={{ maxWidth: "min(80%, 720px)", height: "auto" }}
          aria-hidden="true"
        >
          <motion.path
            d={pathMain}
            stroke="hsl(0 100% 48%)"
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
            style={{ opacity: 0.74 }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={phase >= 3 ? { pathLength: 1, opacity: underlineBreath ? 0.88 : 0.74 } : { pathLength: 0, opacity: 0 }}
            transition={phase === 3 ? { duration: 0.62, ease: [0.22, 1, 0.36, 1] } : { duration: 0.3 }}
          />
          <motion.path
            d={pathThin}
            stroke="hsl(0 100% 48%)"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={phase >= 3 ? { pathLength: 1, opacity: 0.36 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.7, delay: phase === 3 ? 0.09 : 0, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d={pathDry}
            stroke="hsl(0 100% 48%)"
            strokeWidth="1.0"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={phase >= 3 ? { pathLength: 1, opacity: 0.19 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.38, delay: phase === 3 ? 0.36 : 0, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* Dust particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 3 + Math.random() * 3,
              height: 3 + Math.random() * 3,
              left: `${p.x}%`,
              top: "38%",
              background: "hsl(0 100% 50%)",
            }}
            initial={{ opacity: 0.75, y: 0, x: 0, scale: 1 }}
            animate={{ opacity: 0, y: p.dy, x: (Math.random() - 0.5) * 18, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85 + p.delay, ease: "easeOut", delay: p.delay * 0.6 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, hsl(var(--background) / 0.7) 100%)",
        }}
      />

      {/* Owl logo + Sumi reveal centered */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center">
        <img
          src={nebuOwl}
          alt="Nebu Studio owl logo"
          className="w-48 sm:w-64 md:w-80 lg:w-96 mb-6 sm:mb-8"
        />
        <SumiHeroReveal />
      </div>
    </section>
  );
};
