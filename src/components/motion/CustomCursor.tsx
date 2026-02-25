import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface CustomCursorProps {
  containerRef?: React.RefObject<HTMLElement>;
}

export const CustomCursor = ({ containerRef }: CustomCursorProps) => {
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

   const glowX = useSpring(0, { stiffness: 100, damping: 20, mass: 1 });
   const glowY = useSpring(0, { stiffness: 100, damping: 20, mass: 1 });

  useEffect(() => {
    // Detect touch devices — return null behavior
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [glowX, glowY, visible, isTouchDevice]);

  if (isTouchDevice || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[49] hidden md:block">
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 160,
          height: 160,
          background:
            "radial-gradient(circle, hsl(0 88% 40% / 0.08) 0%, hsl(0 88% 40% / 0.03) 45%, transparent 70%)",
        }}
      />
    </div>
  );
};
