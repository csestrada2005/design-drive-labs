import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";

type Variant = "glitch" | "circuit" | "data";

interface SectionTransitionProps {
  variant: Variant;
  children: React.ReactNode;
}

/* ── Glitch Slice ── */
const SLICE_COUNT = 5;

const GlitchSlice = ({ triggered, children }: { triggered: boolean; children: React.ReactNode }) => {
  const sliceHeight = 100 / SLICE_COUNT;

  return (
    <div className="relative overflow-hidden">
      {/* RGB glitch overlay */}
      {triggered && (
        <div className="absolute inset-0 z-20 pointer-events-none section-glitch-rgb" />
      )}

      {Array.from({ length: SLICE_COUNT }).map((_, i) => {
        const fromLeft = i % 2 === 0;
        return (
          <motion.div
            key={i}
            initial={{ x: fromLeft ? "-100%" : "100%", opacity: 0 }}
            animate={triggered ? { x: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            style={{
              clipPath: `inset(${i * sliceHeight}% 0 ${100 - (i + 1) * sliceHeight}% 0)`,
              position: i === 0 ? "relative" : "absolute",
              inset: i === 0 ? undefined : 0,
            }}
          >
            {children}
          </motion.div>
        );
      })}
    </div>
  );
};

/* ── Circuit Wipe ── */
const CircuitWipe = ({ triggered, children }: { triggered: boolean; children: React.ReactNode }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Scan line */}
      {triggered && (
        <motion.div
          className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
          style={{
            background: "hsl(var(--primary))",
            boxShadow: "0 0 15px 4px hsl(var(--primary) / 0.6), 0 0 40px 8px hsl(var(--primary) / 0.3)",
          }}
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={triggered ? { clipPath: "inset(0% 0 0 0)" } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ── Data Dissolve ── */
const GRID_COLS = 16;
const GRID_ROWS = 8;

const DataDissolve = ({ triggered, children }: { triggered: boolean; children: React.ReactNode }) => {
  const maskId = useMemo(() => `dissolve-${Math.random().toString(36).slice(2, 9)}`, []);

  // Pre-compute random order for grid cells
  const cellOrder = useMemo(() => {
    const cells = Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    return cells;
  }, []);

  const [revealedCount, setRevealedCount] = useState(0);
  const totalCells = GRID_COLS * GRID_ROWS;

  useEffect(() => {
    if (!triggered) return;
    const batchSize = 4;
    const interval = 600 / (totalCells / batchSize);
    let count = 0;
    const timer = setInterval(() => {
      count += batchSize;
      if (count >= totalCells) {
        setRevealedCount(totalCells);
        clearInterval(timer);
      } else {
        setRevealedCount(count);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [triggered, totalCells]);

  const cellW = 100 / GRID_COLS;
  const cellH = 100 / GRID_ROWS;

  // Build the revealed set
  const revealedSet = useMemo(() => {
    return new Set(cellOrder.slice(0, revealedCount));
  }, [cellOrder, revealedCount]);

  const allRevealed = revealedCount >= totalCells;

  return (
    <div className="relative overflow-hidden">
      {/* Matrix rain overlay */}
      {triggered && !allRevealed && (
        <div className="absolute inset-0 z-20 pointer-events-none section-matrix-rain" />
      )}

      {allRevealed ? (
        children
      ) : (
        <div style={{ position: "relative" }}>
          <div style={{ visibility: triggered ? "visible" : "hidden" }}>
            <svg
              className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <mask id={maskId}>
                  <rect width="100" height="100" fill="black" />
                  {Array.from({ length: totalCells }).map((_, idx) => {
                    if (!revealedSet.has(idx)) return null;
                    const col = idx % GRID_COLS;
                    const row = Math.floor(idx / GRID_COLS);
                    return (
                      <rect
                        key={idx}
                        x={col * cellW}
                        y={row * cellH}
                        width={cellW + 0.1}
                        height={cellH + 0.1}
                        fill="white"
                      />
                    );
                  })}
                </mask>
              </defs>
            </svg>
            <div
              style={{
                WebkitMaskImage: `url(#${maskId})`,
                maskImage: `url(#${maskId})`,
              }}
            >
              {children}
            </div>
          </div>
          {/* Fallback: just use clip rects with CSS */}
          {!triggered && <div style={{ opacity: 0 }}>{children}</div>}
        </div>
      )}
    </div>
  );
};

/* ── Main Wrapper ── */
export const SectionTransition = ({ variant, children }: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const [triggered, setTriggered] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (isInView && !triggered) setTriggered(true);
  }, [isInView, triggered]);

  // Reduced motion: just fade in
  if (prefersReducedMotion) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={triggered ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref}>
      {variant === "glitch" && <GlitchSlice triggered={triggered}>{children}</GlitchSlice>}
      {variant === "circuit" && <CircuitWipe triggered={triggered}>{children}</CircuitWipe>}
      {variant === "data" && <DataDissolve triggered={triggered}>{children}</DataDissolve>}
    </div>
  );
};
