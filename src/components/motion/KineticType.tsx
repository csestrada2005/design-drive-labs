import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * KineticType — words assemble one-by-one from subtle letter-spacing + opacity + vertical drift.
 * Clean, premium, no glitch, no neon.
 */
interface KineticTypeProps {
  text: string;
  className?: string;
  delay?: number;          // initial delay before first word
  wordDelay?: number;      // stagger between words
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  once?: boolean;
}

export const KineticType = ({
  text,
  className = "",
  delay = 0,
  wordDelay = 0.08,
  as: Tag = "h2",
  once = true,
}: KineticTypeProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: "-80px",
  });

  const words = text.split(" ");

  return (
    <Tag
      // @ts-expect-error — ref type varies by tag
      ref={ref}
      className={`${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.28em" }}
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={{
              opacity: 0,
              y: 28,
              letterSpacing: "0.18em",
            }}
            animate={
              isInView
                ? { opacity: 1, y: 0, letterSpacing: "inherit" }
                : { opacity: 0, y: 28, letterSpacing: "0.18em" }
            }
            transition={{
              duration: 0.55,
              delay: delay + i * wordDelay,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
