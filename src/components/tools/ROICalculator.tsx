import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const formatCurrency = (n: number) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

const AnimatedValue = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2000;
    const from = display;
    const to = value;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(from + (to - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span className={className}>{formatCurrency(display)}</span>;
};

export const ROICalculator = () => {
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [projectedRevenue, setProjectedRevenue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const t1 = setTimeout(() => setCurrentRevenue(144000), 300);
    const t2 = setTimeout(() => setProjectedRevenue(248400), 600);

    const interval = setInterval(() => {
      setCurrentRevenue((prev) => prev + Math.floor(Math.random() * 800 + 200));
      setProjectedRevenue((prev) => prev + Math.floor(Math.random() * 1400 + 600));
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="relative p-8 overflow-hidden"
      style={{
        border: "1px solid hsl(0 100% 50% / 0.12)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 100% 50% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(0 100% 50% / 0.4) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative grid sm:grid-cols-2 gap-8">
        <div>
          <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/50 mb-2">
            Current Revenue
          </p>
          <AnimatedValue
            value={currentRevenue}
            className="font-display text-3xl sm:text-4xl text-foreground/70"
          />
          <motion.div
            className="mt-3 h-1"
            style={{
              background:
                "linear-gradient(90deg, hsl(0 100% 50% / 0.3), hsl(0 100% 50% / 0.08))",
            }}
            animate={{ scaleX: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div>
          <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/50 mb-2">
            Projected Value With Us
          </p>
          <AnimatedValue
            value={projectedRevenue}
            className="font-display text-3xl sm:text-4xl text-primary"
          />
          <motion.div
            className="mt-3 h-1"
            style={{
              background:
                "linear-gradient(90deg, hsl(20 100% 55% / 0.4), hsl(20 100% 55% / 0.08))",
            }}
            animate={{ scaleX: [0.6, 1, 0.6] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </div>

      <motion.div
        className="relative mt-6 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div
          className="h-px mb-4"
          style={{
            background:
              "linear-gradient(90deg, hsl(20 100% 55% / 0.3), transparent)",
          }}
        />
        <div className="flex items-center gap-3">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: "hsl(20 100% 55%)" }}
            animate={{
              boxShadow: [
                "0 0 0 hsl(20 100% 55% / 0)",
                "0 0 14px hsl(20 100% 55% / 0.5)",
                "0 0 0 hsl(20 100% 55% / 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-[hsl(20_100%_55%)]/70">
            Revenue grows faster with strategic design & technology
          </p>
        </div>
      </motion.div>
    </div>
  );
};
