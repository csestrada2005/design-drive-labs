import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * SectionSeparator — single red line that fills left→right on scroll down
 * and stays at 100%. On scroll up it shrinks right→left from where it was.
 */
export const SectionSeparator = () => {
  const ref = useRef<HTMLDivElement>(null);
  const fillProgress = useMotionValue(0);
  const [dir, setDir] = useState<"down" | "up">("down");
  const lastY = useRef(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const currentY = window.scrollY;
    const goingDown = currentY >= lastY.current;
    setDir(goingDown ? "down" : "up");
    lastY.current = currentY;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // How far through the element's visibility range are we?
    // Element enters when rect.bottom > 0, fully passed when rect.top < 0
    const total = vh + rect.height;
    const traveled = vh - rect.top;
    const raw = Math.max(0, Math.min(1, traveled / total));

    if (goingDown) {
      // Only increase — never decrease while going down
      const current = fillProgress.get();
      if (raw > current) fillProgress.set(raw);
    } else {
      // Only decrease — never increase while going up
      const current = fillProgress.get();
      if (raw < current) fillProgress.set(raw);
    }
  }, [fillProgress]);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  const widthStr = useTransform(fillProgress, (v) => `${Math.round(v * 100)}%`);

  return (
    <div ref={ref} className="h-16 flex items-center overflow-hidden relative">
      <motion.div
        className="h-[6px] rounded-full"
        style={{
          width: widthStr,
          marginLeft: dir === "up" ? "auto" : undefined,
          background:
            dir === "down"
              ? "linear-gradient(90deg, hsl(0 100% 50%), hsl(0 100% 50% / 0.3))"
              : "linear-gradient(270deg, hsl(0 100% 50%), hsl(0 100% 50% / 0.3))",
          boxShadow:
            "0 0 16px hsl(0 100% 50% / 0.6), 0 0 50px hsl(0 100% 50% / 0.2)",
        }}
      />
    </div>
  );
};
