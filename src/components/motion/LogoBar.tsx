import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LOGOS = [
  "Papachoa", "Bazar Centenario", "Joyería Centenario",
  "Raw Paw", "Armahas", "Client Logo", "Client Logo", "Client Logo",
];

export const LogoBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="py-10 sm:py-14 overflow-hidden">
      <div className="container">
        <motion.p
          className="text-center text-xs sm:text-xs font-mono tracking-[0.25em] uppercase text-muted-foreground/50 mb-8"
           initial={{ opacity: 0 }}
           animate={isInView ? { opacity: 1 } : {}}
           transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          Trusted by teams building for performance
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 gap-y-4">
          {LOGOS.map((name, i) => (
            <motion.div
              key={`${name}-${i}`}
               className="flex items-center justify-center h-8 px-3"
               initial={{ opacity: 0, y: 6 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs sm:text-sm font-display tracking-wider text-muted-foreground whitespace-nowrap">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
