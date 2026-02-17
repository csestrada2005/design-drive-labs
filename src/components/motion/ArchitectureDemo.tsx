import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <div className="relative py-6 flex flex-col items-center min-h-[280px] select-none">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="laptop"
            className="cursor-pointer flex flex-col items-center"
            onClick={() => setRevealed(true)}
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.4 }}
          >
            {/* Laptop screen */}
            <div
              className="relative w-56 h-36 sm:w-64 sm:h-40 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(222 40% 12%), hsl(222 40% 8%))",
                border: "2px solid hsl(222 100% 65% / 0.15)",
                borderRadius: "0.75rem 0.75rem 0 0",
                boxShadow: "0 0 40px hsl(222 100% 65% / 0.08), inset 0 1px 0 hsl(0 0% 100% / 0.03)",
              }}
            >
              {/* Grid bg */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(hsl(222 100% 65% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(222 100% 65% / 0.4) 1px, transparent 1px)`,
                  backgroundSize: "16px 16px",
                  borderRadius: "0.75rem 0.75rem 0 0",
                }}
              />
              {/* SaaS icon */}
              <div className="flex flex-col items-center gap-2 relative z-10">
                <svg viewBox="0 0 40 40" className="w-10 h-10" style={{ color: "hsl(222 100% 65%)" }}>
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
                  Click on me
                </motion.p>
              </div>
            </div>
            {/* Laptop base */}
            <div
              className="w-72 h-3 sm:w-80"
              style={{
                background: "linear-gradient(180deg, hsl(222 30% 18%), hsl(222 30% 14%))",
                borderRadius: "0 0 0.5rem 0.5rem",
                borderTop: "1px solid hsl(222 100% 65% / 0.08)",
              }}
            />
            {/* Laptop bottom edge */}
            <div
              className="w-20 h-1 rounded-b-full"
              style={{ background: "hsl(222 30% 20%)" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.5, type: "spring", damping: 20 }}
            className="w-full max-w-sm cursor-pointer"
            onClick={() => setRevealed(false)}
          >
            {/* Code editor */}
            <div
              className="relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(222 40% 10% / 0.8), hsl(222 40% 6% / 0.6))",
                border: "1px solid hsl(222 100% 65% / 0.1)",
                borderRadius: "0.75rem",
                boxShadow: "0 12px 40px hsl(222 100% 10% / 0.4)",
              }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b" style={{ borderColor: "hsl(222 100% 65% / 0.06)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "hsl(0 70% 55%)" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "hsl(45 80% 55%)" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "hsl(140 60% 45%)" }} />
                <span className="ml-3 text-[9px] font-mono text-muted-foreground/30 tracking-wider">app.tsx</span>
              </div>
              {/* Code */}
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
                        ? "hsl(270 80% 70%)"
                        : line.text.startsWith("<") || line.text.startsWith("</")
                        ? "hsl(190 90% 60%)"
                        : line.text.includes("'") || line.text.includes('"')
                        ? "hsl(163 56% 55%)"
                        : "hsl(220 15% 65%)"
                      }}>
                        {line.text}
                      </span>
                    ) : null}
                  </motion.div>
                ))}
              </div>
              {/* Bottom hint */}
              <motion.p
                className="text-center text-[8px] font-mono text-muted-foreground/20 tracking-[0.2em] uppercase pb-3"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Click to go back
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
