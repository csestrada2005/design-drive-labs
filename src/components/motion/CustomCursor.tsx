import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface CustomCursorProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const CustomCursor = ({ containerRef }: CustomCursorProps) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<"default" | "hover" | "text">("default");
  const stateRef = useRef<"default" | "hover" | "text">("default");

  // Dot — snaps instantly to cursor
  const dotX = useSpring(0, { stiffness: 2000, damping: 60, mass: 0.1 });
  const dotY = useSpring(0, { stiffness: 2000, damping: 60, mass: 0.1 });

  // Ring — follows with slight lag for elegance
  const ringX = useSpring(0, { stiffness: 280, damping: 28, mass: 0.5 });
  const ringY = useSpring(0, { stiffness: 280, damping: 28, mass: 0.5 });
  const ringScale = useSpring(1, { stiffness: 350, damping: 30 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

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

      let newState: "default" | "hover" | "text" = "default";
      if (interactive) {
        newState = "hover";
        ringScale.set(2.2);
      } else if (textEl) {
        newState = "text";
        ringScale.set(1.6);
      } else {
        ringScale.set(1);
      }

      if (newState !== stateRef.current) {
        stateRef.current = newState;
        setState(newState);
      }
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => {
      setVisible(false);
      stateRef.current = "default";
      setState("default");
      ringScale.set(1);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
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

  const isHover = state === "hover";
  const isText = state === "text";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Inner dot — snappy */}
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHover ? 0 : 6,
          height: isHover ? 0 : 6,
          backgroundColor: isHover ? "transparent" : "hsl(var(--foreground))",
        }}
      />

      {/* Outer ring — elegant lag */}
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 32,
          height: 32,
          scale: ringScale,
          border: isHover
            ? "1.5px solid hsl(0 88% 40% / 0.8)"
            : isText
            ? "1px solid hsl(var(--foreground) / 0.6)"
            : "1px solid hsl(var(--foreground) / 0.35)",
          backgroundColor: isHover
            ? "hsl(0 88% 40% / 0.1)"
            : "transparent",
          mixBlendMode: isText ? "difference" : "normal",
        }}
      />

      {/* Crosshair lines on hover — surgical feel */}
      {isHover && (
        <motion.div
          className="fixed top-0 left-0"
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* H line */}
          <div
            className="absolute"
            style={{
              width: 12,
              height: 1,
              background: "hsl(0 88% 40% / 0.9)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* V line */}
          <div
            className="absolute"
            style={{
              width: 1,
              height: 12,
              background: "hsl(0 88% 40% / 0.9)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
};
