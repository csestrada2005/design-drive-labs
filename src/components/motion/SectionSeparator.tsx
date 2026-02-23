import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SectionSeparator — red lines at top and bottom of the gap between sections.
 * Two lines sweep inward (top from left, bottom from right) creating the
 * sensation that content is rising up through a gate.
 */
export const SectionSeparator = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollDir(currentY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={ref} className="h-28 flex flex-col justify-between overflow-hidden relative">
      {/* Top red line — sweeps from left when scrolling down, from right when up */}
      <motion.div
        className="h-[2px] rounded-full"
        style={{
          width: useTransform(progress, (v) => `${v * 100}%`),
          marginLeft: scrollDir === "up" ? "auto" : undefined,
          transformOrigin: scrollDir === "down" ? "left" : "right",
          background: "linear-gradient(90deg, hsl(0 100% 50%), hsl(0 100% 50% / 0.3))",
          boxShadow: "0 0 12px hsl(0 100% 50% / 0.5), 0 0 40px hsl(0 100% 50% / 0.15)",
        }}
      />

      {/* Center subtle glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(0 100% 50% / 0.04), transparent 70%)",
          opacity: useTransform(progress, [0, 0.5, 1], [0, 1, 0]),
        }}
      />

      {/* Bottom red line — sweeps opposite direction */}
      <motion.div
        className="h-[2px] rounded-full"
        style={{
          width: useTransform(progress, (v) => `${v * 100}%`),
          marginLeft: scrollDir === "down" ? "auto" : undefined,
          transformOrigin: scrollDir === "down" ? "right" : "left",
          background: "linear-gradient(270deg, hsl(0 100% 50%), hsl(0 100% 50% / 0.3))",
          boxShadow: "0 0 12px hsl(0 100% 50% / 0.5), 0 0 40px hsl(0 100% 50% / 0.15)",
        }}
      />
    </div>
  );
};
