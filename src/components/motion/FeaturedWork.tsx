import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const projects = [
  { name: "Project Alpha", tags: ["WEB", "UI/UX", "CRO"], status: "online" as const },
  { name: "Project Beta", tags: ["ECOMMERCE", "SHOPIFY"], status: "online" as const },
  { name: "Project Gamma", tags: ["LANDING PAGE", "CAMPAIGNS"], status: "concept" as const },
  { name: "Project Delta", tags: ["SYSTEM", "CRM", "PORTAL"], status: "online" as const },
];

const FloatingShapes = ({ index }: { index: number }) => {
  const configs = [
    [
      { type: "hex", x: "75%", y: "15%", size: 50, rotation: 15, delay: 0 },
      { type: "circle-dotted", x: "85%", y: "60%", size: 30, rotation: 0, delay: 1 },
      { type: "line", x: "10%", y: "80%", size: 40, rotation: -30, delay: 0.5 },
    ],
    [
      { type: "square", x: "80%", y: "20%", size: 35, rotation: 45, delay: 0.3 },
      { type: "triangle", x: "15%", y: "70%", size: 28, rotation: 0, delay: 0.8 },
      { type: "circle-dotted", x: "70%", y: "75%", size: 45, rotation: 0, delay: 0 },
    ],
    [
      { type: "diamond", x: "82%", y: "30%", size: 32, rotation: 0, delay: 0.2 },
      { type: "hex", x: "8%", y: "25%", size: 40, rotation: 30, delay: 0.7 },
      { type: "line", x: "90%", y: "70%", size: 50, rotation: 60, delay: 0 },
    ],
    [
      { type: "circle-dotted", x: "78%", y: "25%", size: 55, rotation: 0, delay: 0 },
      { type: "square", x: "12%", y: "65%", size: 25, rotation: 20, delay: 0.6 },
      { type: "triangle", x: "85%", y: "70%", size: 30, rotation: 180, delay: 0.4 },
    ],
  ];

  const shapes = configs[index % configs.length];

  return (
    <>
      {shapes.map((shape, i) => (
        <motion.svg
          key={i}
          className="absolute text-primary/[0.12] pointer-events-none"
          style={{ left: shape.x, top: shape.y, width: shape.size, height: shape.size }}
          viewBox="0 0 40 40"
          aria-hidden="true"
          animate={{ rotate: [shape.rotation, shape.rotation + 360] }}
          transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear", delay: shape.delay }}
        >
          {shape.type === "hex" && <polygon points="20,4 36,12 36,28 20,36 4,28 4,12" fill="none" stroke="currentColor" strokeWidth="0.6" />}
          {shape.type === "square" && <rect x="6" y="6" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="0.6" />}
          {shape.type === "circle-dotted" && <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 4" />}
          {shape.type === "triangle" && <polygon points="20,4 36,36 4,36" fill="none" stroke="currentColor" strokeWidth="0.6" />}
          {shape.type === "diamond" && <polygon points="20,4 36,20 20,36 4,20" fill="none" stroke="currentColor" strokeWidth="0.6" />}
          {shape.type === "line" && <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" />}
        </motion.svg>
      ))}
    </>
  );
};

export const FeaturedWork = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const yValues = [y1, y2, y3, y1];

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="work">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1000 800">
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <line
                key={i}
                x1="500" y1="400"
                x2={500 + Math.cos(angle) * 600}
                y2={400 + Math.sin(angle) * 600}
                stroke="currentColor" strokeWidth="0.5" className="text-primary" strokeDasharray="4 8"
              />
            );
          })}
        </svg>
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-xs tracking-[0.25em] uppercase mb-4 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-primary/50" />
            Portfolio
          </motion.p>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            FEATURED <span className="text-primary">WORK</span>
          </h2>
        </motion.div>

        {/* No cards — organic clip-path reveals */}
        <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{ y: yValues[i] }}
              className="group relative"
            >
              {/* Image placeholder — organic shape, no rectangular border */}
              <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{
                  borderRadius: "1.5rem 0.5rem 1.5rem 0.5rem",
                }}
              >
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: `linear-gradient(${135 + i * 20}deg, hsl(222 40% 14%), hsl(222 35% 10%))`,
                  }}
                />

                {/* Grid pattern inside */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(79,124,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(79,124,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Floating geometry */}
                <FloatingShapes index={i} />

                {/* Hover overlay — glow halo */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, hsl(222 100% 65% / 0.15), hsl(222 47% 9% / 0.8) 70%)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span className="text-xs font-medium tracking-wider uppercase text-foreground/80 flex items-center gap-2">
                    View
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="font-display text-base mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] tracking-wider uppercase text-muted-foreground/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {project.status === "online" && (
                  <span
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider shrink-0"
                    style={{ color: "hsl(330 80% 65%)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    ONLINE
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
