import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const startTime = useRef(Date.now());

  useEffect(() => {
    let raf: number;
    const duration = 2400;

    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const raw = Math.min(elapsed / duration, 1);
      // Ease-in-out cubic
      const eased = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
      setProgress(Math.floor(eased * 100));

      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("done");
        setTimeout(onComplete, 600);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const systemLines = [
    "INITIALIZING SYSTEMS...",
    "LOADING ASSETS [OK]",
    "CONNECTING MODULES...",
    "RENDERING PIPELINE [OK]",
    "READY.",
  ];

  const visibleLines = systemLines.slice(0, Math.floor((progress / 100) * systemLines.length) + 1);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "hsl(0 0% 2%)" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(0 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(0 100% 50% / 0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* System text */}
          <div className="relative z-10 font-mono text-xs sm:text-sm max-w-md w-full px-8">
            {visibleLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.15 }}
                className="text-muted-foreground mb-1"
              >
                <span className="text-primary mr-2">▸</span>
                {line}
              </motion.p>
            ))}
          </div>

          {/* Counter */}
          <motion.div className="relative z-10 mt-12">
            <span
              className="font-display text-7xl sm:text-9xl tabular-nums"
              style={{
                color: "hsl(0 100% 50%)",
                textShadow: "0 0 60px hsl(0 100% 50% / 0.4), 0 0 120px hsl(0 100% 50% / 0.15)",
              }}
            >
              {String(progress).padStart(3, "0")}
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 mt-8 w-48 h-px bg-muted-foreground/10">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ width: `${progress}%`, boxShadow: "0 0 10px hsl(0 100% 50% / 0.5)" }}
            />
          </div>

          <p className="relative z-10 mt-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 font-mono">
            NEBU STUDIO
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
