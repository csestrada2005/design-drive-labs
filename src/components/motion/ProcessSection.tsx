import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

const phases = [
  {
    id: "discovery",
    title: "DISCOVERY",
    bullets: ["Stakeholder interviews", "Competitive analysis", "Goal definition"],
    description: "We dig deep into your business, audience, and goals to build on a foundation that makes sense.",
  },
  {
    id: "strategy",
    title: "STRATEGY",
    bullets: ["User journey mapping", "Content architecture", "Conversion planning"],
    description: "Architecture your site around how real users think, browse, and convert.",
  },
  {
    id: "design",
    title: "DESIGN",
    bullets: ["Visual direction", "High-fidelity mockups", "Prototype review"],
    description: "Premium visuals built with purpose — every pixel serves the strategy.",
  },
  {
    id: "build",
    title: "BUILD",
    bullets: ["Development", "Animations", "Integrations"],
    description: "Clean code, smooth motion, rock-solid performance. Shipped fast.",
  },
  {
    id: "polish",
    title: "POLISH",
    bullets: ["QA testing", "Performance tuning", "Copy refinement"],
    description: "We obsess over the details so your users don't have to think twice.",
  },
  {
    id: "launch",
    title: "LAUNCH",
    bullets: ["Deployment", "Analytics setup", "Handoff documentation"],
    description: "Go live with confidence. Full handoff, zero loose ends.",
  },
];

export const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative" id="process">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-1/3 h-full"
          style={{
            background: "radial-gradient(ellipse at 100% 50%, hsl(222 100% 65% / 0.03), transparent 60%)",
          }}
        />
      </div>

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xs tracking-[0.25em] uppercase mb-4 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-primary/50" />
            How We Work
          </motion.p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            A PROCESS THAT <span className="text-primary">SHIPS.</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mb-6">
            You don't need everything figured out. We structure, design, build, and launch with speed and clarity.
          </p>
          <div className="flex gap-3 items-center">
            <a href="#contact" className="btn-primary text-sm">Schedule Call</a>
            <button
              onClick={() => setViewMode(viewMode === "timeline" ? "grid" : "timeline")}
              className="btn-ghost text-xs px-5 py-2.5 group"
            >
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {viewMode === "timeline" ? (
                    <>
                      <rect x="1" y="1" width="6" height="6" rx="1" />
                      <rect x="9" y="1" width="6" height="6" rx="1" />
                      <rect x="1" y="9" width="6" height="6" rx="1" />
                      <rect x="9" y="9" width="6" height="6" rx="1" />
                    </>
                  ) : (
                    <>
                      <line x1="1" y1="3" x2="15" y2="3" />
                      <line x1="1" y1="8" x2="15" y2="8" />
                      <line x1="1" y1="13" x2="15" y2="13" />
                    </>
                  )}
                </svg>
                {viewMode === "timeline" ? "Re-Arrange" : "Timeline"}
              </span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === "timeline" ? (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative mt-16"
            >
              {/* Animated progress line */}
              <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-border/20">
                <motion.div
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: lineHeight,
                    background: "linear-gradient(to bottom, hsl(222 100% 65%), hsl(222 100% 65% / 0.3))",
                  }}
                />
              </div>

              <div className="space-y-4">
                {phases.map((phase, i) => {
                  const isExpanded = expandedId === phase.id;
                  return (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative flex gap-6 sm:gap-8 group cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : phase.id)}
                    >
                      {/* Circle indicator */}
                      <div className={`relative z-10 flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        isExpanded
                          ? "border-primary bg-primary/20 scale-110"
                          : "border-border/50 bg-background group-hover:border-primary/60"
                      }`}>
                        <span className={`font-display text-[10px] transition-colors ${
                          isExpanded ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                        }`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Card */}
                      <div
                        className={`flex-1 p-5 sm:p-6 rounded-lg border transition-all duration-500 ${
                          isExpanded
                            ? "bg-primary/10 border-primary/30 -translate-y-0.5 shadow-lg shadow-primary/5"
                            : i === 3
                              ? "bg-primary/[0.06] border-primary/20 group-hover:border-primary/30"
                              : "bg-card/40 border-border/30 group-hover:border-primary/20 group-hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className={`font-display text-base sm:text-lg transition-colors ${
                            isExpanded ? "text-primary" : "group-hover:text-primary"
                          }`}>
                            {phase.title}
                          </h3>
                          <motion.svg
                            className="w-4 h-4 text-muted-foreground"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path d="M4 6l4 4 4-4" />
                          </motion.svg>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="text-muted-foreground text-sm mt-3 mb-4 leading-relaxed">
                                {phase.description}
                              </p>
                              <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {phase.bullets.map((bullet) => (
                                  <span key={bullet} className="text-foreground/70 text-xs flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-primary" />
                                    {bullet}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {!isExpanded && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                            {phase.bullets.map((bullet) => (
                              <span key={bullet} className="text-muted-foreground text-xs">
                                {bullet}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-16"
            >
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`p-5 rounded-lg border transition-all hover:border-primary/30 hover:-translate-y-1 duration-300 ${
                    i === 3 ? "bg-primary/10 border-primary/30" : "bg-card/40 border-border/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center">
                      <span className="font-display text-[10px] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <h3 className="font-display text-sm">{phase.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">{phase.description}</p>
                  <div className="space-y-1">
                    {phase.bullets.map((b) => (
                      <p key={b} className="text-muted-foreground/70 text-xs flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary/40" />
                        {b}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
