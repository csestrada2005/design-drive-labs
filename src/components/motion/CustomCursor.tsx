import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface CustomCursorProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const CustomCursor = ({ containerRef }: CustomCursorProps) => {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dotX = useSpring(0, { stiffness: 300, damping: 25 });
  const dotY = useSpring(0, { stiffness: 300, damping: 25 });
  const ringX = useSpring(0, { stiffness: 120, damping: 20 });
  const ringY = useSpring(0, { stiffness: 120, damping: 20 });
  const ringScale = useSpring(1, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, [data-cursor='expand']");
      if (interactive) {
        setIsHovering(true);
        ringScale.set(2.5);
      } else {
        setIsHovering(false);
        ringScale.set(1);
      }
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => {
      setVisible(false);
      setIsHovering(false);
      ringScale.set(1);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef, dotX, dotY, ringX, ringY, ringScale]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Inner dot - changes to accent color on hover */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: isHovering ? "hsl(222 100% 65%)" : "hsl(var(--foreground))",
          scale: isHovering ? 0 : 1,
        }}
      />
      {/* Outer ring - expands on interactive elements */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
          border: isHovering
            ? "1.5px solid hsl(222 100% 65% / 0.6)"
            : "1px solid hsl(var(--foreground) / 0.3)",
          backgroundColor: isHovering ? "hsl(222 100% 65% / 0.08)" : "transparent",
          mixBlendMode: isHovering ? "normal" : "difference",
        }}
      />
    </div>
  );
};
