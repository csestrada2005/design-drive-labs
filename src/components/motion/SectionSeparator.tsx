import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const SectionSeparator = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Track scroll direction
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
    <div ref={ref} className="h-24 flex items-center overflow-hidden">
      <motion.div
        className="h-2 bg-primary rounded-full"
        style={{
          width: useTransform(progress, (v) => `${v * 100}%`),
          marginLeft: scrollDir === "up" ? "auto" : undefined,
          marginRight: scrollDir === "down" ? "auto" : undefined,
          transformOrigin: scrollDir === "down" ? "left" : "right",
          boxShadow: "0 0 20px hsl(0 100% 50% / 0.4), 0 0 60px hsl(0 100% 50% / 0.15)",
        }}
      />
    </div>
  );
};
