import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SketchRevealProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps content in a scroll-linked "sketch → life" transition.
 * Elements enter as grayscale wireframes and transition to full color
 * as they reach the viewport center — driven by scroll position.
 */
export const SketchReveal = ({ children, className = "" }: SketchRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const grayscale = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Build combined filter string
  const filter = useTransform(
    [grayscale, blur],
    ([g, b]: number[]) => `grayscale(${g}%) blur(${b}px)`
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, filter }}
      className={className}
    >
      {children}

      {/* SVG border reveal overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ borderRadius: "inherit" }}
      >
        <motion.rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="inherit"
          fill="none"
          stroke="hsl(var(--primary) / 0.15)"
          strokeWidth="1"
          style={{
            pathLength: scrollYProgress,
          }}
        />
      </svg>
    </motion.div>
  );
};
