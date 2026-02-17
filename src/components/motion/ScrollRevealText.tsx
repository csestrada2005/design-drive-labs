import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

export const ScrollRevealText = ({ text, className = "", highlightWords = [] }: ScrollRevealTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <p className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] flex flex-wrap gap-x-[0.3em] gap-y-1">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          const isHighlight = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));

          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]} isHighlight={isHighlight}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
};

const Word = ({
  children,
  progress,
  range,
  isHighlight,
}: {
  children: string;
  progress: any;
  range: [number, number];
  isHighlight: boolean;
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block transition-colors duration-300 ${isHighlight ? "text-primary" : ""}`}
    >
      {children}
    </motion.span>
  );
};
