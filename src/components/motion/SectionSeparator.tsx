import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SectionSeparator — single red line that grows on scroll down and shrinks on scroll up.
 */
export const SectionSeparator = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Line width directly tied to scroll progress through the separator
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="h-16 flex items-center overflow-hidden relative">
      <motion.div
        className="h-[2px] rounded-full"
        style={{
          width,
          background: "linear-gradient(90deg, hsl(0 100% 50%), hsl(0 100% 50% / 0.3))",
          boxShadow: "0 0 12px hsl(0 100% 50% / 0.5), 0 0 40px hsl(0 100% 50% / 0.15)",
        }}
      />
    </div>
  );
};
