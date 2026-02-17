import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARTICLE_COUNT = 12;

export const ArchitectureDemo = () => {
  const [phase, setPhase] = useState<"idle" | "ingesting" | "done">("idle");
  const [dbHover, setDbHover] = useState(false);

  const startAnimation = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("ingesting");
    setTimeout(() => setPhase("done"), 2200);
  }, [phase]);

  const reset = () => {
    setDbHover(false);
    setPhase("idle");
  };

  return (
    <div className="relative py-8 flex flex-col items-center min-h-[280px] select-none">
      {/* Pipeline row */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 w-full max-w-lg mx-auto relative">
        {/* Step 1: Document */}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <motion.div
            className="w-16 h-20 sm:w-20 sm:h-24 relative cursor-pointer"
            onClick={startAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Document shape */}
            <svg viewBox="0 0 60 72" className="w-full h-full">
              <defs>
                <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(222 100% 65%)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="hsl(222 100% 65%)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M8 2 L42 2 L52 14 L52 70 L8 70 Z"
                fill="url(#docGrad)"
                stroke="hsl(222 100% 65%)"
                strokeWidth="0.6"
                strokeOpacity="0.3"
              />
              <path d="M42 2 L42 14 L52 14" fill="none" stroke="hsl(222 100% 65%)" strokeWidth="0.4" strokeOpacity="0.25" />
              {/* Text lines */}
              {[24, 32, 40, 48].map((y) => (
                <line key={y} x1="16" y1={y} x2={40 - (y % 16)} y2={y} stroke="hsl(222 100% 65%)" strokeWidth="0.5" strokeOpacity="0.15" />
              ))}
            </svg>

            {/* Pulse ring on idle */}
            {phase === "idle" && (
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{ border: "1px solid hsl(222 100% 65% / 0.2)" }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            )}
          </motion.div>
          <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50 font-mono">
            Ingestion
          </span>
        </div>

        {/* Connection line 1 */}
        <div className="flex-1 max-w-[80px] relative h-px">
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(222 100% 65% / 0.2), hsl(222 100% 65% / 0.08))" }} />
          {phase !== "idle" && (
            <motion.div
              className="absolute top-0 left-0 h-full w-4"
              style={{ background: "linear-gradient(90deg, hsl(222 100% 65% / 0.8), transparent)" }}
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 0.6, repeat: phase === "ingesting" ? 3 : 0, ease: "linear" }}
            />
          )}
        </div>

        {/* Step 2: Vectorization - Particles */}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex items-center justify-center">
            {/* Particle cloud */}
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
              const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
              const radius = 20 + (i % 3) * 8;
              return (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i % 3 === 0
                      ? "hsl(222 100% 75%)"
                      : i % 3 === 1
                        ? "hsl(163 56% 55%)"
                        : "hsl(280 80% 65%)",
                    boxShadow: `0 0 6px ${i % 3 === 0 ? "hsl(222 100% 65% / 0.5)" : i % 3 === 1 ? "hsl(163 56% 45% / 0.5)" : "hsl(280 80% 55% / 0.5)"}`,
                  }}
                  animate={
                    phase === "idle"
                      ? { x: 0, y: 0, opacity: 0.15, scale: 0.5 }
                      : phase === "ingesting"
                        ? {
                            x: [0, Math.cos(angle) * radius, Math.cos(angle) * radius * 0.6],
                            y: [0, Math.sin(angle) * radius, Math.sin(angle) * radius * 0.6],
                            opacity: [0, 1, 0.8],
                            scale: [0, 1.2, 0.8],
                          }
                        : {
                            x: Math.cos(angle) * radius * 0.4,
                            y: Math.sin(angle) * radius * 0.4,
                            opacity: [0.8, 0.4, 0.8],
                            scale: [0.8, 1, 0.8],
                          }
                  }
                  transition={
                    phase === "ingesting"
                      ? { duration: 1.2, delay: i * 0.08, ease: "easeOut" }
                      : { duration: 2, repeat: Infinity, delay: i * 0.15 }
                  }
                />
              );
            })}

            {/* Center node */}
            <motion.div
              className="w-3 h-3 rounded-full relative z-10"
              style={{
                background: "hsl(222 100% 65%)",
                boxShadow: "0 0 20px hsl(222 100% 65% / 0.4)",
              }}
              animate={
                phase !== "idle"
                  ? { scale: [1, 1.3, 1], boxShadow: ["0 0 20px hsl(222 100% 65% / 0.4)", "0 0 40px hsl(222 100% 65% / 0.6)", "0 0 20px hsl(222 100% 65% / 0.4)"] }
                  : { scale: 1 }
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50 font-mono">
            Vectorization
          </span>
        </div>

        {/* Connection line 2 */}
        <div className="flex-1 max-w-[80px] relative h-px">
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, hsl(222 100% 65% / 0.08), hsl(163 56% 40% / 0.2))" }} />
          {phase === "done" && (
            <motion.div
              className="absolute top-0 left-0 h-full w-4"
              style={{ background: "linear-gradient(90deg, hsl(163 56% 50% / 0.8), transparent)" }}
              initial={{ left: "0%" }}
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
          )}
        </div>

        {/* Step 3: Vector DB */}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <motion.div
            className="w-16 h-20 sm:w-20 sm:h-24 relative cursor-pointer"
            onMouseEnter={() => phase === "done" && setDbHover(true)}
            onMouseLeave={() => setDbHover(false)}
            whileHover={{ scale: 1.05 }}
          >
            {/* Cylinder DB */}
            <svg viewBox="0 0 60 72" className="w-full h-full">
              <defs>
                <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(163 56% 45%)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="hsl(163 56% 30%)" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              {/* Body */}
              <rect x="10" y="16" width="40" height="40" rx="2" fill="url(#dbGrad)" stroke="hsl(163 56% 45%)" strokeWidth="0.5" strokeOpacity="0.3" />
              {/* Top ellipse */}
              <ellipse cx="30" cy="16" rx="20" ry="8" fill="url(#dbGrad)" stroke="hsl(163 56% 45%)" strokeWidth="0.5" strokeOpacity="0.3" />
              {/* Middle ellipse lines */}
              <ellipse cx="30" cy="30" rx="20" ry="5" fill="none" stroke="hsl(163 56% 45%)" strokeWidth="0.3" strokeOpacity="0.15" />
              <ellipse cx="30" cy="42" rx="20" ry="5" fill="none" stroke="hsl(163 56% 45%)" strokeWidth="0.3" strokeOpacity="0.15" />
              {/* Bottom ellipse */}
              <ellipse cx="30" cy="56" rx="20" ry="8" fill="none" stroke="hsl(163 56% 45%)" strokeWidth="0.5" strokeOpacity="0.3" />
            </svg>

            {/* Glow on done */}
            {phase === "done" && (
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ boxShadow: "0 0 30px hsl(163 56% 45% / 0.2)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
          <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50 font-mono">
            Neural Retrieval
          </span>
        </div>
      </div>

      {/* Chat bubble on DB hover */}
      <AnimatePresence>
        {dbHover && phase === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute bottom-4 right-4 sm:right-12 max-w-[220px]"
            style={{
              background: "linear-gradient(135deg, hsl(222 40% 12% / 0.8), hsl(222 40% 8% / 0.6))",
              backdropFilter: "blur(20px)",
              border: "1px solid hsl(163 56% 45% / 0.15)",
              borderRadius: "1rem 1rem 1rem 0.25rem",
              padding: "12px 16px",
              boxShadow: "0 12px 40px hsl(222 100% 10% / 0.5)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(163_56%_45%)] animate-pulse" />
              <span className="text-[9px] tracking-[0.15em] uppercase text-[hsl(163_56%_55%)]">AI Agent</span>
            </div>
            <p className="text-xs text-foreground/70 leading-relaxed">
              Retrieved 3 relevant chunks from vector store. Confidence: 94.2%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint */}
      {phase === "idle" && (
        <motion.p
          className="absolute bottom-2 text-[9px] tracking-[0.2em] uppercase text-muted-foreground/25"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Click document to start pipeline
        </motion.p>
      )}

      {/* Reset */}
      {phase === "done" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-2 text-[9px] tracking-[0.15em] uppercase text-muted-foreground/30 hover:text-primary/50 transition-colors"
          onClick={reset}
        >
          ↻ Reset
        </motion.button>
      )}
    </div>
  );
};
