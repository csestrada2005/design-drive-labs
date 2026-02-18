import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Ritual status lines ────────────────────────────────────────────────────────
const RITUAL_LINES = [
  { label: "CALIBRATING",          status: "OK" },
  { label: "LOADING ASSETS",       status: "OK" },
  { label: "ALIGNING LAYOUT",      status: "OK" },
  { label: "OPTIMIZING PERFORMANCE", status: "OK" },
];

// ── Paper noise texture (SVG turbulence, inline) ──────────────────────────────
const PaperTexture = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.055]" aria-hidden>
    <filter id="paper">
      <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#paper)" />
  </svg>
);

// ── Barely-visible dot grid ────────────────────────────────────────────────────
const DotGrid = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: "radial-gradient(circle, hsl(0 0% 30% / 0.18) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
    }}
    aria-hidden
  />
);

// ── Cinematic vignette ────────────────────────────────────────────────────────
const Vignette = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, hsl(32 18% 88% / 0.55) 100%)",
    }}
    aria-hidden
  />
);

// ── Subtle ambient light sweep (single pass, slow) ────────────────────────────
const AmbientSweep = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    initial={{ x: "-110%" }}
    animate={{ x: "110%" }}
    transition={{ duration: 2.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
    style={{
      width: "45%",
      background:
        "linear-gradient(105deg, transparent, hsl(32 60% 95% / 0.12) 50%, transparent)",
    }}
    aria-hidden
  />
);

// ── The exit transition overlay (glass sweep + ink dissolve) ──────────────────
const ExitOverlay = ({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active && (
      <>
        {/* Glass sheen sweep */}
        <motion.div
          key="sheen"
          className="fixed inset-0 z-[300] pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: "110%" }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          style={{
            width: "50%",
            background:
              "linear-gradient(105deg, transparent, hsl(0 0% 100% / 0.1) 50%, transparent)",
          }}
        />
        {/* Ink dissolve (full paper tone fills in, then fades) */}
        <motion.div
          key="ink"
          className="fixed inset-0 z-[299]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.85, 0] }}
          transition={{ duration: 0.85, times: [0, 0.35, 1], ease: "easeInOut" }}
          style={{ background: "hsl(32 18% 90%)" }}
        />
      </>
    )}
  </AnimatePresence>
);

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const [showSkip, setShowSkip] = useState(false);
  const [exitActive, setExitActive] = useState(false);
  const startTime = useRef(Date.now());
  const doneRef = useRef(false);

  const triggerExit = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase("exiting");
    setExitActive(true);
    setTimeout(onComplete, 950);
  };

  // Show skip after 800ms
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Progress counter — 1.8s total
  useEffect(() => {
    let raf: number;
    const duration = 1200;

    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const raw = Math.min(elapsed / duration, 1);
      // Smooth ease-out
      const eased = 1 - Math.pow(1 - raw, 3);
      const p = Math.floor(eased * 100);
      setProgress(p);

      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // brief hold at 100 before exit
        setTimeout(triggerExit, 220);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Which status lines are visible
  const visibleCount = Math.min(
    RITUAL_LINES.length,
    Math.floor((progress / 100) * (RITUAL_LINES.length + 1))
  );

  return (
    <>
      <ExitOverlay active={exitActive} />

      <AnimatePresence>
        {phase !== "done" && (
          <motion.div
            className="fixed inset-0 z-[250] overflow-hidden"
            style={{ background: "hsl(32 20% 92%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Atmospheric layers */}
            <PaperTexture />
            <DotGrid />
            <Vignette />
            <AmbientSweep />

            {/* ── Top-left: NEBU STUDIO logotype ── */}
            <div className="absolute top-8 left-8 sm:top-10 sm:left-12">
              <p
                className="font-mono text-[9px] tracking-[0.4em] uppercase"
                style={{ color: "hsl(0 0% 10% / 0.5)" }}
              >
                NEBU STUDIO
              </p>
            </div>

            {/* ── Top-right: year / session tag ── */}
            <div className="absolute top-8 right-8 sm:top-10 sm:right-12">
              <p
                className="font-mono text-[9px] tracking-[0.3em] uppercase"
                style={{ color: "hsl(0 0% 10% / 0.3)" }}
              >
                {new Date().getFullYear()} / WEB
              </p>
            </div>

            {/* ── Ritual status lines (top-left body area) ── */}
            <div className="absolute left-8 sm:left-12 top-1/2 -translate-y-[180%]">
              {RITUAL_LINES.slice(0, visibleCount).map((line, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 mb-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {/* Red triangle marker */}
                  <svg width="5" height="6" viewBox="0 0 5 6" fill="none" aria-hidden>
                    <path d="M0 0L5 3L0 6V0Z" fill="hsl(0 90% 44%)" />
                  </svg>
                  <span
                    className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase"
                    style={{ color: "hsl(0 0% 12% / 0.7)" }}
                  >
                    {line.label}
                  </span>
                  {/* Status pill */}
                  <motion.span
                    className="font-mono text-[9px] tracking-[0.18em]"
                    style={{ color: "hsl(0 90% 44%)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.12 }}
                  >
                    / {line.status}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* ── Hero counter ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Kanji watermark — 始 "begin" */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                aria-hidden
                style={{
                  fontSize: "clamp(6rem, 22vw, 17rem)",
                  color: "hsl(0 60% 35% / 0.055)",
                  fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'MS Mincho', serif",
                  lineHeight: 1,
                  transform: "scale(1.15) translateY(2%)",
                  userSelect: "none",
                }}
              >
                始
              </div>

              {/* The big number */}
              <div className="relative select-none">
                {/* Ink-bleed subtle glow behind digits */}
                <div
                  className="absolute inset-0 blur-3xl"
                  style={{
                    background: "hsl(0 80% 45% / 0.08)",
                    transform: "scale(1.4)",
                  }}
                  aria-hidden
                />

                <motion.span
                  className="relative font-display tabular-nums leading-none"
                  style={{
                    fontSize: "clamp(5rem, 18vw, 14rem)",
                    color: "hsl(0 88% 40%)",
                    // Matte stamp ink: no glow, subtle inner texture via mix-blend
                    WebkitTextStroke: "0px",
                    letterSpacing: "-0.02em",
                    // Very faint texture overlay via text shadow stacking
                    textShadow: [
                      "1px 2px 0px hsl(0 90% 28% / 0.25)",
                      "0 0 80px hsl(0 80% 42% / 0.06)",
                    ].join(", "),
                  }}
                  key={progress}
                  animate={{ opacity: 1 }}
                >
                  {String(progress).padStart(3, "0")}
                </motion.span>
              </div>

              {/* Thin progress line */}
              <div
                className="mt-6 sm:mt-8 relative"
                style={{ width: "clamp(180px, 20vw, 280px)", height: "1px" }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: "hsl(0 0% 10% / 0.1)" }}
                />
                <motion.div
                  className="absolute top-0 left-0 h-full"
                  style={{
                    width: `${progress}%`,
                    background: "hsl(0 88% 40%)",
                    transformOrigin: "left",
                  }}
                  transition={{ ease: "linear", duration: 0.05 }}
                />
                {/* Leading dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                  style={{
                    left: `${progress}%`,
                    background: "hsl(0 88% 40%)",
                    marginLeft: "-2px",
                  }}
                />
              </div>

              {/* Percent label under bar */}
              <p
                className="mt-3 font-mono text-[9px] tracking-[0.35em] uppercase"
                style={{ color: "hsl(0 0% 12% / 0.35)" }}
              >
                {progress < 100 ? "INITIALIZING" : "COMPLETE"}
              </p>
            </div>

            {/* ── Bottom horizontal rule + tagline ── */}
            <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3">
              <div
                className="w-16 h-px"
                style={{ background: "hsl(0 0% 10% / 0.15)" }}
              />
              <p
                className="font-mono text-[8px] tracking-[0.45em] uppercase"
                style={{ color: "hsl(0 0% 12% / 0.3)" }}
              >
                WEB · SYSTEMS · AI
              </p>
            </div>

            {/* ── Skip button (appears after 0.8s) ── */}
            <AnimatePresence>
              {showSkip && phase === "loading" && (
                <motion.button
                  key="skip"
                  className="absolute bottom-8 right-8 sm:bottom-10 sm:right-12 font-mono text-[9px] tracking-[0.25em] uppercase cursor-pointer"
                  style={{ color: "hsl(0 0% 12% / 0.3)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={triggerExit}
                >
                  SKIP ›
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
