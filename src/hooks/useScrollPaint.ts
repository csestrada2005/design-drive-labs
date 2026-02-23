import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollPaintOptions {
  offsetIn?: string;
  offsetOut?: string;
  xDrift?: number;
  yDrift?: number;
}

interface ScrollPaintResult {
  ref: React.RefObject<HTMLDivElement>;
  style: {
    opacity: MotionValue<number>;
    x: MotionValue<number>;
    y: MotionValue<number>;
    scale: MotionValue<number>;
  };
}

export const useScrollPaint = (options: ScrollPaintOptions = {}): ScrollPaintResult => {
  const {
    xDrift = 30,
    yDrift = 40,
  } = options;

  const ref = useRef<HTMLDivElement>(null!);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.05"],
  });

  // Elements rise strongly from below — aggressive upward feel
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [yDrift * 2.5, 0, 0, -yDrift * 3]);
  const x = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.92, 1, 1, 0.9]);

  return { ref, style: { opacity, x, y, scale } };
};
