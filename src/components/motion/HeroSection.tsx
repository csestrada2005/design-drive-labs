import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import heroLogo from "@/assets/hero-logo.jpeg";

/*
  Cinematic "Assemble on Scroll" Hero
  ─────────────────────────────────────
  At rest: each word has loose tracking, low opacity, slight Y offset.
  As the user scrolls 0–20% of the hero section the headline "snaps" into place:
    • opacity → 1
    • letterSpacing → normal
    • y → 0
  A single translucent light-sweep passes across the headline during assembly.
  The subheadline follows 150 ms after the headline locks (scroll ~18–22%).
*/

const WORDS = [
  "WE", "BUILD", "THE", "ENGINE;",   // line 1
  "YOU", "BUILD", "THE",              // line 2
  "EMPIRE.",                          // line 3
];

const LINE_BREAKS = [4, 7]; // word indices where a new line starts

interface WordAnim {
  opacity:  MotionValue<number>;
  y:        MotionValue<number>;
  tracking: MotionValue<number>;
}

const WordSpan = ({ word, anim }: { word: string; anim: WordAnim }) => (
  <span className="inline-block" style={{ marginRight: "0.22em" }}>
    <motion.span
      className="inline-block"
      style={{
        opacity: anim.opacity,
        y: anim.y,
        letterSpacing: anim.tracking,
      }}
    >
      {word}
    </motion.span>
  </span>
);

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* ── Hero exit (existing behaviour) ── */
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sectionScale   = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const sectionY       = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  /* ── Assembly window: scroll 0 → 0.20 ── */
  const TOTAL      = WORDS.length;
  const WIN_START  = 0.0;
  const WIN_END    = 0.20;
  const OVERLAP    = 0.65; // how much words overlap in time

  /* Build per-word motion values — must call hooks at top level */
  const mkWord = (i: number): WordAnim => {
    const span = (WIN_END - WIN_START) / TOTAL;
    const ws   = WIN_START + i * span * OVERLAP;
    const we   = Math.min(WIN_END, ws + span * 1.5);
    return {
      opacity:  useTransform(scrollYProgress, [ws, we], [0.28, 1]),
      y:        useTransform(scrollYProgress, [ws, we], [14, 0]),
      tracking: useTransform(scrollYProgress, [ws, we], [0.2, 0.01]),
    };
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const anims: WordAnim[] = WORDS.map((_, i) => mkWord(i));

  /* ── Light sweep: fires once as scroll crosses 5–14% ── */
  const sweepX  = useTransform(scrollYProgress, [0.04, 0.15], ["-115%", "130%"]);
  const sweepOp = useTransform(scrollYProgress, [0.04, 0.08, 0.13, 0.16], [0, 0.7, 0.7, 0]);

  /* ── Sub-headline: enters at 16–22% ── */
  const subOp = useTransform(scrollYProgress, [0.15, 0.22], [0, 1]);
  const subY  = useTransform(scrollYProgress, [0.15, 0.22], [14, 0]);

  /* ── Render words split into lines ── */
  const renderLine = (from: number, to: number, center = false) => (
    <span className={`block ${center ? "text-center" : ""}`}>
      {WORDS.slice(from, to).map((word, i) => (
        <WordSpan key={from + i} word={word} anim={anims[from + i]} />
      ))}
    </span>
  );

  return (
    <motion.section
      ref={ref}
      className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
      id="hero"
      style={{ opacity: sectionOpacity, scale: sectionScale, y: sectionY }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroLogo})`,
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

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

      {/* ── HEADLINE + SUB ── */}
      <div className="relative z-10 text-center px-6 sm:px-10 select-none">

        {/* Light-sweep container — clipped to headline width */}
        <div className="relative overflow-hidden">
          {/* The sweep bar */}
          <motion.div
            aria-hidden
            className="absolute top-0 bottom-0 pointer-events-none z-10"
            style={{
              x: sweepX,
              opacity: sweepOp,
              width: "32%",
              background:
                "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.055) 40%, hsl(var(--foreground) / 0.11) 50%, hsl(var(--foreground) / 0.055) 60%, transparent)",
            }}
          />

          <h1
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.06] text-foreground"
            aria-label={WORDS.join(" ")}
          >
            {/* Line 1: WE BUILD THE ENGINE; */}
            {renderLine(0, LINE_BREAKS[0])}
            {/* Line 2: YOU BUILD THE */}
            {renderLine(LINE_BREAKS[0], LINE_BREAKS[1])}
            {/* Line 3: EMPIRE. — centered */}
            {renderLine(LINE_BREAKS[1], TOTAL, true)}
          </h1>
        </div>

        {/* Sub-headline */}
        <motion.p
          className="mt-5 text-[11px] sm:text-xs font-mono tracking-[0.35em] uppercase text-muted-foreground max-w-xs mx-auto"
          style={{ opacity: subOp, y: subY }}
        >
          Design · Technology · Growth Systems
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ top: "calc(50vh + 12rem)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.div
            className="w-px bg-foreground/25"
            animate={{ height: [0, 40, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[9px] font-mono tracking-[0.3em] text-foreground/30 uppercase">
            Scroll
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};
