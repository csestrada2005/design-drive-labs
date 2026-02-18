import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const EasterEgg = () => {
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);

  const holdDuration = 2000;

  const startHold = useCallback(() => {
    if (revealed) return;
    startTimeRef.current = Date.now();
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / holdDuration, 1);
      setProgress(p);
      if (p >= 1) {
        setRevealed(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 16);
  }, [revealed]);

  const endHold = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!revealed) setProgress(0);
  }, [revealed]);

  return (
    <div className="relative flex flex-col items-center gap-4">
      <motion.button
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        className="relative w-16 h-16 rounded-full cursor-pointer select-none touch-none"
        style={{
          background: "radial-gradient(circle, hsl(0 100% 50% / 0.12), transparent)",
          border: "1px solid hsl(0 100% 50% / 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: revealed
            ? "0 0 40px hsl(0 100% 50% / 0.4)"
            : progress > 0
              ? `0 0 ${progress * 30}px hsl(0 100% 50% / ${progress * 0.3})`
              : "none",
        }}
      >
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="29" fill="none" stroke="hsl(0 10% 15% / 0.5)" strokeWidth="2" />
          <motion.circle
            cx="32" cy="32" r="29" fill="none"
            stroke="hsl(0 100% 50%)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${29 * 2 * Math.PI}`}
            strokeDashoffset={29 * 2 * Math.PI * (1 - progress)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-primary/60 text-lg font-display">
          {revealed ? "!" : "+"}
        </span>
      </motion.button>

      <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/30">
        {revealed ? "" : "Press & Hold"}
      </span>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="text-center max-w-xs"
          >
            <p className="text-primary text-xs tracking-[0.2em] uppercase mb-2">Hidden Message</p>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Cada detalle importa. Si llegaste hasta aqui, sabemos que aprecias la artesania digital tanto como nosotros.
            </p>
            <p className="text-muted-foreground/30 text-[10px] mt-3 tracking-wider">
              — Nebu Studio
            </p>
            <button
              onClick={() => { setRevealed(false); setProgress(0); }}
              className="mt-4 text-[9px] tracking-widest uppercase text-muted-foreground/30 hover:text-primary/50 transition-colors"
            >
              Reset
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};