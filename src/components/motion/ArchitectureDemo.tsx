import { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

const CODE_LINES = [
  { indent: 0, text: "export const SaaSApp = () => {" },
  { indent: 1, text: "const [users, setUsers] = useState([])" },
  { indent: 1, text: "const { data } = useQuery('metrics')" },
  { indent: 1, text: "" },
  { indent: 1, text: "return (" },
  { indent: 2, text: "<Dashboard>" },
  { indent: 3, text: "<MetricsPanel data={data} />" },
  { indent: 3, text: "<UserTable users={users} />" },
  { indent: 3, text: "<RevenueChart period='monthly' />" },
  { indent: 2, text: "</Dashboard>" },
  { indent: 1, text: ")" },
  { indent: 0, text: "}" },
];

export const ArchitectureDemo = () => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  // Quick transition: show laptop briefly, then switch to code and stay
  useEffect(() => {
    if (!isInView) { setRevealed(false); return; }
    const timer = setTimeout(() => setRevealed(true), 1500);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <div ref={ref} className="relative py-6 flex flex-col items-center min-h-[280px] select-none">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="laptop"
            className="flex flex-col items-center"
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.3 }}
          >
            {/* Laptop screen */}
            <div
              className="relative w-56 h-36 sm:w-64 sm:h-40 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(0 40% 12%), hsl(0 40% 8%))",
                border: "2px solid hsl(0 100% 50% / 0.15)",
                borderRadius: "0.75rem 0.75rem 0 0",
                boxShadow: "0 0 40px hsl(0 100% 50% / 0.08), inset 0 1px 0 hsl(0 0% 100% / 0.03)",
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(hsl(0 100% 50% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(0 100% 50% / 0.4) 1px, transparent 1px)`,
                  backgroundSize: "16px 16px",
                  borderRadius: "0.75rem 0.75rem 0 0",
                }}
              />
              <div className="flex flex-col items-center gap-2 relative z-10">
                <svg viewBox="0 0 40 40" className="w-10 h-10" style={{ color: "hsl(0 100% 50%)" }}>
                  <rect x="4" y="8" width="32" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="4" y1="14" x2="36" y2="14" stroke="currentColor" strokeWidth="0.8" />
                  <circle cx="8" cy="11" r="1" fill="currentColor" opacity="0.5" />
                  <circle cx="12" cy="11" r="1" fill="currentColor" opacity="0.5" />
                  <circle cx="16" cy="11" r="1" fill="currentColor" opacity="0.5" />
                  <rect x="8" y="18" width="10" height="4" rx="1" fill="currentColor" opacity="0.15" />
                  <rect x="8" y="24" width="14" height="4" rx="1" fill="currentColor" opacity="0.1" />
                  <rect x="22" y="18" width="10" height="10" rx="1" fill="currentColor" opacity="0.08" />
                </svg>
                <motion.p
                  className="text-xs font-mono text-primary/70 tracking-wider"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  SaaS Dashboard
                </motion.p>
              </div>
            </div>
            {/* Laptop base */}
            <div
              className="w-72 h-3 sm:w-80"
              style={{
                background: "linear-gradient(180deg, hsl(0 30% 18%), hsl(0 30% 14%))",
                borderRadius: "0 0 0.5rem 0.5rem",
                borderTop: "1px solid hsl(0 100% 50% / 0.08)",
              }}
            />
            <div className="w-20 h-1 rounded-b-full" style={{ background: "hsl(0 30% 20%)" }} />
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.4, type: "spring", damping: 20 }}
            className="w-full max-w-sm"
          >
            <div
              className="relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(0 40% 10% / 0.8), hsl(0 40% 6% / 0.6))",
                border: "1px solid hsl(0 100% 50% / 0.12)",
                borderRadius: "0.75rem",
                boxShadow: "0 12px 40px hsl(0 100% 10% / 0.4)",
              }}
            >
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b" style={{ borderColor: "hsl(0 100% 50% / 0.06)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "hsl(0 70% 55%)" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "hsl(45 80% 55%)" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "hsl(140 60% 45%)" }} />
                <span className="ml-3 text-[9px] font-mono text-muted-foreground/30 tracking-wider">app.tsx</span>
              </div>
              <div className="p-4 space-y-0.5 font-mono text-[10px] sm:text-[11px] leading-relaxed">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    style={{ paddingLeft: `${line.indent * 16}px` }}
                    className="whitespace-pre"
                  >
                    <span className="text-muted-foreground/20 mr-3 select-none inline-block w-4 text-right">
                      {i + 1}
                    </span>
                    {line.text ? (
                      <span style={{ color: line.text.includes("export") || line.text.includes("const") || line.text.includes("return")
                        ? "hsl(0 80% 65%)"
                        : line.text.startsWith("<") || line.text.startsWith("</")
                        ? "hsl(350 90% 60%)"
                        : line.text.includes("'") || line.text.includes('"')
                        ? "hsl(15 80% 55%)"
                        : "hsl(220 15% 65%)"
                      }}>
                        {line.text}
                      </span>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
