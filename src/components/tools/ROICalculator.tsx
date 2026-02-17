import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const formatCurrency = (n: number) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

const AnimatedValue = ({ value, className }: { value: number; className?: string }) => {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef(0);
  const startRef = useRef(display);

  useEffect(() => {
    startRef.current = display;
    const start = Date.now();
    const duration = 600;
    const from = startRef.current;
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
  const [visitors, setVisitors] = useState(10000);
  const [convRate, setConvRate] = useState(1.5);
  const [aov, setAov] = useState(80);
  const [agencyImpact, setAgencyImpact] = useState(false);

  const currentRevenue = visitors * (convRate / 100) * aov * 12;

  const projectedConvRate = agencyImpact ? convRate + 0.5 : convRate;
  const projectedAov = agencyImpact ? aov * 1.15 : aov;
  const projectedRevenue = visitors * (projectedConvRate / 100) * projectedAov * 12;

  const extraRevenue = projectedRevenue - currentRevenue;

  const formatVisitors = (v: number) => v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k` : String(v);

  return (
    <div className="relative">
      {/* Sliders */}
      <div className="space-y-6 mb-8">
        {/* Visitors */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">
              Monthly Visitors
            </label>
            <span className="text-sm font-mono text-primary">{formatVisitors(visitors)}</span>
          </div>
          <input
            type="range"
            min={1000}
            max={100000}
            step={1000}
            value={visitors}
            onChange={(e) => setVisitors(Number(e.target.value))}
            className="w-full accent-primary h-1 bg-muted/30 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary 
              [&::-webkit-slider-thumb]:shadow-[0_0_12px_hsl(222_100%_65%/0.4)]
              [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full 
              [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
          />
          <div className="flex justify-between text-[9px] text-muted-foreground/30 font-mono mt-1">
            <span>1k</span><span>100k</span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">
              Conversion Rate
            </label>
            <span className="text-sm font-mono text-primary">{convRate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={convRate}
            onChange={(e) => setConvRate(Number(e.target.value))}
            className="w-full accent-primary h-1 bg-muted/30 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary 
              [&::-webkit-slider-thumb]:shadow-[0_0_12px_hsl(222_100%_65%/0.4)]
              [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full 
              [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
          />
          <div className="flex justify-between text-[9px] text-muted-foreground/30 font-mono mt-1">
            <span>0.1%</span><span>5%</span>
          </div>
        </div>

        {/* AOV */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">
              Average Order Value
            </label>
            <span className="text-sm font-mono text-primary">${aov}</span>
          </div>
          <input
            type="range"
            min={10}
            max={500}
            step={5}
            value={aov}
            onChange={(e) => setAov(Number(e.target.value))}
            className="w-full accent-primary h-1 bg-muted/30 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary 
              [&::-webkit-slider-thumb]:shadow-[0_0_12px_hsl(222_100%_65%/0.4)]
              [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full 
              [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
          />
          <div className="flex justify-between text-[9px] text-muted-foreground/30 font-mono mt-1">
            <span>$10</span><span>$500</span>
          </div>
        </div>
      </div>

      {/* Agency Impact Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-medium text-foreground/70">Agency Impact</p>
          <p className="text-[9px] text-muted-foreground/40 font-mono tracking-wider">
            +0.5% CR lift · +15% AOV lift
          </p>
        </div>
        <button
          onClick={() => setAgencyImpact(!agencyImpact)}
          className="relative w-12 h-6 rounded-full transition-all duration-300"
          style={{
            background: agencyImpact
              ? "linear-gradient(90deg, hsl(222 100% 65%), hsl(163 56% 50%))"
              : "hsl(222 20% 18%)",
            boxShadow: agencyImpact ? "0 0 20px hsl(222 100% 65% / 0.3)" : "none",
          }}
        >
          <motion.div
            className="absolute top-1 w-4 h-4 rounded-full bg-foreground"
            animate={{ left: agencyImpact ? 28 : 4 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      {/* Revenue Display */}
      <div
        className="relative p-6 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(222 40% 10% / 0.6), hsl(222 35% 7% / 0.4))",
          border: "1px solid hsl(222 100% 65% / 0.08)",
        }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(222 100% 65% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(222 100% 65% / 0.4) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative grid sm:grid-cols-2 gap-6">
          {/* Current */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/50 mb-1">
              Current Yearly Revenue
            </p>
            <AnimatedValue
              value={currentRevenue}
              className="font-display text-2xl sm:text-3xl text-foreground/70"
            />
          </div>

          {/* Projected */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/50 mb-1">
              Projected Yearly Revenue
            </p>
            <AnimatedValue
              value={projectedRevenue}
              className="font-display text-2xl sm:text-3xl text-foreground"
            />
          </div>
        </div>

        {/* Extra Revenue */}
        {agencyImpact && extraRevenue > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mt-6 pt-4"
          >
            <div
              className="h-px mb-4"
              style={{ background: "linear-gradient(90deg, hsl(163 56% 50% / 0.3), transparent)" }}
            />
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: "hsl(163 56% 50%)" }}
                animate={{ boxShadow: ["0 0 0 hsl(163 56% 50% / 0)", "0 0 14px hsl(163 56% 50% / 0.5)", "0 0 0 hsl(163 56% 50% / 0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div>
                <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-[hsl(163_56%_50%)]/70 mb-0.5">
                  Extra Yearly Revenue
                </p>
                <AnimatedValue
                  value={extraRevenue}
                  className="font-display text-xl sm:text-2xl text-[hsl(163_56%_50%)]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
