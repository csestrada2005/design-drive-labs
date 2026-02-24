import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MetricsHUDProps {
  tags: string[];
  sectionId: string;
  position?: "top-right" | "bottom-left";
}

const tagVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, delay: i * 0.08, ease: "easeOut" as const },
  }),
  exit: { opacity: 0, y: -4, scale: 0.96, transition: { duration: 0.15 } },
};

export const MetricsHUD = ({
  tags,
  sectionId,
  position = "top-right",
}: MetricsHUDProps) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const shownRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect mobile — show max 2 tags on mobile
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 640;
  const displayTags = isMobile ? tags.slice(0, 2) : tags;

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shownRef.current) {
          shownRef.current = true;
          setVisible(true);
          setCollapsed(false);
          setDismissed(false);

          // After 2.5s, collapse to a pill
          timerRef.current = setTimeout(() => {
            setCollapsed(true);
          }, 2500);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sectionId]);

  const posClass =
    position === "top-right"
      ? "top-6 right-4 sm:right-6"
      : "bottom-6 left-4 sm:left-6";

  if (dismissed || !visible) return null;

  return (
    <div
      className={`fixed ${posClass} z-40 pointer-events-auto`}
      style={{ isolation: "isolate" }}
    >
      <AnimatePresence mode="wait">
        {!collapsed ? (
          /* Expanded HUD */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col gap-1.5"
          >
            {/* Section label */}
            <motion.p
              className="text-[8px] font-mono tracking-[0.3em] uppercase mb-0.5 text-right"
              style={{ color: "hsl(0 0% 40%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
            >
              {sectionId}
            </motion.p>

            {displayTags.map((tag, i) => (
              <motion.div
                key={tag}
                custom={i}
                variants={tagVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm"
                style={{
                  background: "hsl(0 0% 100% / 0.07)",
                  boxShadow:
                    "0 1px 8px hsl(0 0% 0% / 0.12), inset 0 0 0 0.5px hsl(0 0% 100% / 0.12)",
                }}
              >
                {/* Pulse dot */}
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full"
                    style={{ background: "hsl(0 100% 50%)" }}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ background: "hsl(0 100% 50%)" }}
                  />
                </span>

                <span
                  className="font-mono text-[10px] tracking-[0.18em] uppercase font-medium"
                  style={{ color: "hsl(0 0% 88%)" }}
                >
                  {tag}
                </span>
              </motion.div>
            ))}

            {/* Dismiss */}
            <motion.button
              className="text-[8px] font-mono tracking-widest uppercase mt-1 text-right opacity-30 hover:opacity-70 transition-opacity"
              style={{ color: "hsl(0 0% 60%)" }}
              onClick={() => setDismissed(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5 }}
            >
              dismiss
            </motion.button>
          </motion.div>
        ) : (
          /* Collapsed pill */
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            onClick={() => {
              setCollapsed(false);
              timerRef.current = setTimeout(() => setCollapsed(true), 3000);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm"
            style={{
              background: "hsl(0 0% 100% / 0.06)",
              boxShadow:
                "0 1px 6px hsl(0 0% 0% / 0.1), inset 0 0 0 0.5px hsl(0 0% 100% / 0.1)",
            }}
          >
            <span
              className="h-1 w-1 rounded-full flex-shrink-0"
              style={{ background: "hsl(0 100% 50%)" }}
            />
            <span
              className="font-mono text-[8px] tracking-[0.2em] uppercase"
              style={{ color: "hsl(0 0% 60%)" }}
            >
              {displayTags.join(" · ")}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
