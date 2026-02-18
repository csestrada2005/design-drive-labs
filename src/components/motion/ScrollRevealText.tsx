import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface LineConfig {
  text: string;
  highlightWords?: string[];
}

interface ScrollRevealTextProps {
  lines: LineConfig[];
  className?: string;
}

export const ScrollRevealText = ({ lines, className = "" }: ScrollRevealTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const allWords = lines.flatMap(line => line.text.split(" "));
  const totalWords = allWords.length;
  let wordIndex = 0;

  return (
    <div ref={ref} className={`overflow-hidden text-center ${className}`}>
      {lines.map((line, lineIdx) => {
        const words = line.text.split(" ");
        const highlights = line.highlightWords || [];

        return (
          <p
            key={lineIdx}
            className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 mb-2"
          >
            {words.map((word, i) => {
              const globalIndex = wordIndex++;
              const start = globalIndex / totalWords;
              const end = start + 1 / totalWords;
              const isHighlight = highlights.some(hw => word.toLowerCase().includes(hw.toLowerCase()));

              return (
                <InkWord key={i} progress={scrollYProgress} range={[start, end]} isHighlight={isHighlight}>
                  {word}
                </InkWord>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};

const InkWord = ({
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
  // Weight: 200 (pencil sketch) → 600 (wet ink)
  const fontWeight = useTransform(progress, range, [200, 600]);
  // Opacity: faint pencil → solid ink
  const opacity = useTransform(progress, range, [0.25, 1]);

  return (
    <motion.span
      style={{
        fontWeight,
        opacity,
        display: "inline-block",
      }}
      className={isHighlight ? "text-primary" : "text-foreground"}
    >
      {children}
    </motion.span>
  );
};
