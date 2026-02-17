import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Noise grain canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 256;
    canvas.height = 256;
    const imageData = ctx.createImageData(256, 256);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255;
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = 12;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  useEffect(() => {
    const duration = 2400;
    const startTime = Date.now();
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 900);
        }, 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(222 100% 65%) 0%, hsl(222 80% 50%) 40%, hsl(222 47% 9%) 100%)",
          }}
          exit={{ y: "-100%", opacity: 0.8 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grain overlay via canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
            style={{ imageRendering: "pixelated" }}
            aria-hidden="true"
          />

          {/* Animated grid lines */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px"
                style={{
                  top: `${15 + i * 14}%`,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px"
                style={{
                  left: `${15 + i * 14}%`,
                  background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.04), transparent)",
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
              />
            ))}
          </div>

          {/* Corner labels */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-6 left-6 text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase"
          >
            Loading
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-6 right-6 text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase"
          >
            Please Wait
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-6 left-6 text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase"
          >
            Preparing Experience
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 right-6 text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase"
          >
            Loading Assets…
          </motion.span>

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
            aria-hidden="true"
          />

          {/* Counter */}
          <div className="relative flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="font-display text-[clamp(7rem,22vw,16rem)] leading-none tabular-nums"
              style={{
                color: "hsl(222 47% 9%)",
                textShadow: "0 0 80px rgba(79, 124, 255, 0.3)",
              }}
            >
              {String(count).padStart(2, "0")}
            </motion.span>

            {/* Subtitle under counter */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase mt-4"
            >
              CUATRE STUDIOS
            </motion.span>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${count}%`,
                background: "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.6))",
              }}
            />
          </div>

          {/* Decorative floating geometry */}
          <motion.svg
            className="absolute top-[20%] right-[15%] w-20 h-20 text-white/[0.06]"
            viewBox="0 0 80 80"
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <polygon points="40,5 75,25 75,55 40,75 5,55 5,25" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </motion.svg>

          <motion.svg
            className="absolute bottom-[25%] left-[12%] w-14 h-14 text-white/[0.05]"
            viewBox="0 0 60 60"
            aria-hidden="true"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <rect x="10" y="10" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
