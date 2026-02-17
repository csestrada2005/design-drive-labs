import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Variant = "shutter" | "circuit" | "data";

interface TransitionSection {
  id: string;
  variant: Variant;
}

interface FullScreenTransitionProviderProps {
  sections: TransitionSection[];
  children: React.ReactNode;
}

/* ── Full-screen overlay variants ── */

const ShutterOverlay = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 700);
    return () => clearTimeout(t);
  }, [onDone]);

  const blinds = 8;
  return (
    <motion.div
      className="fixed inset-0 z-[150] pointer-events-auto"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Vertical blinds snapping shut */}
      {Array.from({ length: blinds }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            left: `${(i / blinds) * 100}%`,
            width: `${100 / blinds + 0.2}%`,
            background: "hsl(var(--background))",
            borderRight: "1px solid hsl(var(--primary) / 0.15)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 0.65,
            delay: i * 0.03,
            times: [0, 0.35, 0.65, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          style-origin="left"
        />
      ))}

      {/* Horizontal accent flash */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2"
        style={{
          background: "hsl(var(--primary))",
          boxShadow: "0 0 20px 4px hsl(var(--primary) / 0.5)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0] }}
        transition={{ duration: 0.55, times: [0, 0.3, 0.6, 1], ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.span
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: 0.65, times: [0, 0.3, 0.6, 1] }}
        >
          ◈ Transitioning
        </motion.span>
      </div>
    </motion.div>
  );
};

const CircuitOverlay = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 700);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] pointer-events-auto overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
      initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      exit={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Electric scan line sweeping down */}
      <motion.div
        className="absolute left-0 right-0 h-[3px]"
        style={{
          background: "hsl(var(--primary))",
          boxShadow: "0 0 20px 6px hsl(var(--primary) / 0.7), 0 0 60px 15px hsl(var(--primary) / 0.3)",
        }}
        initial={{ top: "-2%" }}
        animate={{ top: "102%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Grid lines revealing */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${12.5 * (i + 1)}%`,
              background: "hsl(var(--primary) / 0.08)",
            }}
            initial={{ scaleX: 0, originX: i % 2 === 0 ? 0 : 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${12.5 * (i + 1)}%`,
              background: "hsl(var(--primary) / 0.06)",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.02 }}
          />
        ))}
      </div>

      {/* Corner markers */}
      {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
        <motion.div
          key={pos}
          className={`absolute ${pos} w-3 h-3 border border-primary/30`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 + i * 0.05 }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/50"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          ▸ Rendering
        </motion.span>
      </div>
    </motion.div>
  );
};

const DataOverlay = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 700);
    return () => clearTimeout(t);
  }, [onDone]);

  const cols = 12;
  const rows = 8;
  const total = cols * rows;

  const order = useMemo(() => {
    const arr = Array.from({ length: total }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[150] pointer-events-auto"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Pixel grid that fills in */}
      <div
        className="absolute inset-0"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: total }).map((_, idx) => {
          const delay = (order.indexOf(idx) / total) * 0.4;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05, delay }}
              style={{ background: "hsl(var(--background))" }}
            />
          );
        })}
      </div>

      {/* Matrix characters */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          className="font-mono text-[8px] leading-tight text-primary/20 whitespace-pre text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.4, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {Array.from({ length: 8 }).map((_, row) => (
            <div key={row}>
              {Array.from({ length: 30 }).map(() =>
                String.fromCharCode(0x30A0 + Math.random() * 96)
              ).join("")}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.span
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-foreground/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.2 }}
        >
          Compiling
        </motion.span>
      </div>
    </motion.div>
  );
};

const overlayComponents: Record<Variant, React.FC<{ onDone: () => void }>> = {
  shutter: ShutterOverlay,
  circuit: CircuitOverlay,
  data: DataOverlay,
};

/* ── Scroll-hijacking controller ── */
export const useFullScreenTransitions = (sections: TransitionSection[]) => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeOverlay, setActiveOverlay] = useState<{ variant: Variant; targetIdx: number } | null>(null);
  const isTransitioning = useRef(false);
  const cooldownRef = useRef(false);
  const lastScrollY = useRef(0);

  const registerRef = useCallback((idx: number) => (el: HTMLElement | null) => {
    sectionRefs.current[idx] = el;
  }, []);

  // Detect when user scrolls past a section boundary
  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioning.current || cooldownRef.current) return;

      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY.current ? "down" : "up";
      lastScrollY.current = scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.75;
      const viewportMidUp = scrollY + window.innerHeight * 0.25;

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const el = sectionRefs.current[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const elTop = rect.top + scrollY;
        const elBottom = elTop + rect.height;

        if (direction === "down" && viewportMid >= elTop && viewportMid <= elTop + 80) {
          // Scrolling down, just crossed into this section's top
          triggerTransition(i, sections[i].variant);
          return;
        }

        if (direction === "up" && viewportMidUp <= elBottom && viewportMidUp >= elBottom - 80) {
          // Scrolling up, just crossed this section's bottom going up — go to previous
          const prevIdx = Math.max(0, i);
          triggerTransition(prevIdx, sections[prevIdx].variant);
          return;
        }
      }
    };

    const triggerTransition = (targetIdx: number, variant: Variant) => {
      isTransitioning.current = true;
      // Lock scroll
      document.body.style.overflow = "hidden";
      setActiveOverlay({ variant, targetIdx });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleOverlayDone = useCallback(() => {
    if (!activeOverlay) return;
    const el = sectionRefs.current[activeOverlay.targetIdx];
    if (el) {
      // Instant scroll to target section
      el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    }
    // Small delay then clear
    setTimeout(() => {
      setActiveOverlay(null);
      document.body.style.overflow = "";
      isTransitioning.current = false;
      // Cooldown to prevent re-triggering
      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
        lastScrollY.current = window.scrollY;
      }, 400);
    }, 100);
  }, [activeOverlay]);

  const OverlayPortal = useCallback(() => {
    return (
      <AnimatePresence mode="wait">
        {activeOverlay && (() => {
          const Comp = overlayComponents[activeOverlay.variant];
          return <Comp key={`${activeOverlay.variant}-${activeOverlay.targetIdx}`} onDone={handleOverlayDone} />;
        })()}
      </AnimatePresence>
    );
  }, [activeOverlay, handleOverlayDone]);

  return { registerRef, OverlayPortal };
};

/* ── Section marker component ── */
export const TransitionSection = ({
  children,
  registerRef,
}: {
  children: React.ReactNode;
  registerRef: (el: HTMLElement | null) => void;
}) => {
  return (
    <div ref={registerRef}>
      {children}
    </div>
  );
};
