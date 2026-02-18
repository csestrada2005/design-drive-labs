import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface CustomCursorProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const CustomCursor = ({ containerRef }: CustomCursorProps) => {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isText, setIsText] = useState(false);

  const dotX = useSpring(0, { stiffness: 500, damping: 28 });
  const dotY = useSpring(0, { stiffness: 500, damping: 28 });
  const ringX = useSpring(0, { stiffness: 120, damping: 20 });
  const ringY = useSpring(0, { stiffness: 120, damping: 20 });
  const ringScale = useSpring(1, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";
    el.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, [data-cursor='expand']"
      );
      const textEl = target.closest("h1, h2, h3, h4, p, span, li");

      if (interactive) {
        setIsHovering(true);
        setIsText(false);
        ringScale.set(2.5);
      } else if (textEl) {
        setIsHovering(false);
        setIsText(true);
        ringScale.set(1.8);
      } else {
        setIsHovering(false);
        setIsText(false);
        ringScale.set(1);
      }
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => {
      setVisible(false);
      setIsHovering(false);
      setIsText(false);
      ringScale.set(1);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.style.cursor = "";
      el.style.cursor = "";
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef, dotX, dotY, ringX, ringY, ringScale]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: isHovering
            ? "hsl(0 100% 50%)"
            : "hsl(var(--foreground))",
          scale: isHovering ? 0 : 1,
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
          border: isHovering
            ? "1.5px solid hsl(0 100% 50% / 0.6)"
            : isText
            ? "1px solid hsl(var(--foreground) / 0.5)"
            : "1px solid hsl(var(--foreground) / 0.3)",
          backgroundColor: isHovering
            ? "hsl(0 100% 50% / 0.08)"
            : "transparent",
          mixBlendMode: isText ? "difference" : isHovering ? "normal" : "difference",
        }}
      />
    </div>
  );
};
