import { useRef, useEffect, useState, useMemo } from "react";
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
    <div className="relative">
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
            animate={triggered ? { x: "0%", opacity: 1 } : { x: fromLeft ? "-100%" : "100%", opacity: 0 }}
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
    <div className="relative">
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
        animate={triggered ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ── Data Dissolve — simplified with opacity grid ── */
const DataDissolve = ({ triggered, children }: { triggered: boolean; children: React.ReactNode }) => {
  return (
    <div className="relative">
      {/* Matrix rain overlay */}
      {triggered && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none section-matrix-rain"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
        animate={
          triggered
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.97, filter: "blur(6px)" }
        }
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {/* Pixel grid overlay that dissolves */}
      {triggered && <PixelGrid />}
    </div>
  );
};

const PixelGrid = () => {
  const cols = 16;
  const rows = 8;
  const total = cols * rows;

  const order = useMemo(() => {
    const arr = Array.from({ length: total }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [total]);

  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: total }).map((_, idx) => {
        const delay = (order.indexOf(idx) / total) * 0.5;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.08, delay }}
            style={{ background: "hsl(var(--background))" }}
          />
        );
      })}
    </div>
  );
};

/* ── Main Wrapper ── */
export const SectionTransition = ({ variant, children }: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const [triggered, setTriggered] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (isInView && !triggered) setTriggered(true);
  }, [isInView, triggered]);

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
    <div ref={ref} style={{ position: "relative" }}>
      {variant === "glitch" && <GlitchSlice triggered={triggered}>{children}</GlitchSlice>}
      {variant === "circuit" && <CircuitWipe triggered={triggered}>{children}</CircuitWipe>}
      {variant === "data" && <DataDissolve triggered={triggered}>{children}</DataDissolve>}
    </div>
  );
};
