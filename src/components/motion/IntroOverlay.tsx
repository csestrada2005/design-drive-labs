import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import nebuOwl from "@/assets/nebu-owl.png";
import owlBg from "@/assets/owl-bg.png";

/* ── Preload hook ── */
const CRITICAL_IMAGES = [owlBg, nebuOwl];
const MIN_DURATION = 900;
const MAX_TIMEOUT = 2600;

const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // don't block on failure
    img.src = src;
  });

const usePreload = () => {
  const [ready, setReady] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;

    const doPreload = async () => {
      // Wait for fonts + images in parallel
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      const imagesReady = Promise.all(CRITICAL_IMAGES.map(preloadImage));

      try {
        await Promise.all([fontsReady, imagesReady]);
      } catch {
        // proceed anyway
      }

      if (cancelled) return;

      // Enforce minimum duration
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(() => {
        if (!cancelled) setReady(true);
      }, remaining);
    };

    doPreload();

    // Hard timeout fallback
    const timeout = setTimeout(() => {
      if (!cancelled) setReady(true);
    }, MAX_TIMEOUT);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return ready;
};

/* ── IntroOverlay ── */
export const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const ready = usePreload();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0); // 0=grid, 1=scan, 2=done
  const [exiting, setExiting] = useState(false);
  const hasCompleted = useRef(false);

  // Phase timeline
  useEffect(() => {
    if (reduced) {
      // Minimal: just wait for preload then fade
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 350);  // start scan
    const t2 = setTimeout(() => setPhase(2), 1100);  // scan done
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [reduced]);

  // Exit when ready + phase done
  useEffect(() => {
    if (!ready || hasCompleted.current) return;
    if (reduced || phase >= 2) {
      hasCompleted.current = true;
      setExiting(true);
      const t = setTimeout(() => onComplete(), reduced ? 150 : 320);
      return () => clearTimeout(t);
    }
  }, [ready, phase, reduced, onComplete]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "hsl(240 10% 4%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.3, ease: "easeOut" }}
        >
          {/* Subtle grid */}
          {!reduced && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(0 0% 100% / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.04) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                opacity: phase >= 1 ? 0.6 : 0.3,
                transition: "opacity 0.4s ease",
              }}
            />
          )}

          {/* Micro noise */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Logo wordmark */}
            <motion.div
              className="relative"
              initial={{ opacity: 0.15 }}
              animate={{ opacity: phase >= 1 ? 1 : 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span
                className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.3em] text-foreground select-none"
                style={{
                  textShadow: phase >= 1 ? "0 0 30px hsl(0 100% 50% / 0.15)" : "none",
                  transition: "text-shadow 0.5s ease",
                }}
              >
                NEBU
              </span>

              {/* Laser scan line */}
              {!reduced && phase >= 1 && phase < 2 && (
                <motion.div
                  className="absolute top-0 bottom-0 pointer-events-none"
                  style={{
                    width: 2,
                    background: "linear-gradient(180deg, transparent, hsl(0 100% 50% / 0.9), hsl(0 100% 50% / 0.9), transparent)",
                    boxShadow: "0 0 12px 2px hsl(0 100% 50% / 0.4), 0 0 40px 4px hsl(0 100% 50% / 0.15)",
                  }}
                  initial={{ left: "-10%" }}
                  animate={{ left: "110%" }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}

              {/* Focus lock flash */}
              {!reduced && phase >= 2 && (
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    boxShadow: "inset 0 0 20px hsl(0 100% 50% / 0.1)",
                  }}
                />
              )}
            </motion.div>

            {/* Status text */}
            <motion.p
              className="text-[9px] sm:text-[10px] font-mono tracking-[0.35em] text-foreground/20 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 0.5 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {phase < 2 ? "INITIALIZING…" : "READY"}
            </motion.p>

            {/* Thin progress line */}
            {!reduced && (
              <div className="w-16 h-px relative overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.06)" }}>
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{ background: "hsl(0 100% 50% / 0.6)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: phase >= 2 ? "100%" : phase >= 1 ? "60%" : "15%" }}
                  transition={{ duration: phase >= 2 ? 0.3 : 0.5, ease: "easeOut" }}
                />
              </div>
            )}
          </div>

          {/* Corner markers */}
          {!reduced && (
            <>
              <motion.div
                className="absolute top-6 left-6 w-4 h-4"
                style={{
                  borderTop: "1px solid hsl(0 0% 100% / 0.1)",
                  borderLeft: "1px solid hsl(0 0% 100% / 0.1)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              />
              <motion.div
                className="absolute top-6 right-6 w-4 h-4"
                style={{
                  borderTop: "1px solid hsl(0 0% 100% / 0.1)",
                  borderRight: "1px solid hsl(0 0% 100% / 0.1)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-6 left-6 w-4 h-4"
                style={{
                  borderBottom: "1px solid hsl(0 0% 100% / 0.1)",
                  borderLeft: "1px solid hsl(0 0% 100% / 0.1)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-6 right-6 w-4 h-4"
                style={{
                  borderBottom: "1px solid hsl(0 0% 100% / 0.1)",
                  borderRight: "1px solid hsl(0 0% 100% / 0.1)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.3 }}
              />
            </>
          )}
        </motion.div>
      ) : (
        /* Fading out overlay */
        <motion.div
          key="intro-exit"
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{ background: "hsl(240 10% 4%)" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.3, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
};
