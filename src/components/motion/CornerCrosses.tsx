import { motion } from "framer-motion";

export const CornerCrosses = () => {
  const positions = [
    "top-6 left-6",
    "top-6 right-6",
    "bottom-20 left-6 sm:bottom-6",
    "bottom-20 right-6 sm:bottom-6",
  ];

  return (
    <div className="fixed inset-0 z-[45] pointer-events-none hidden md:block" aria-hidden="true">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} w-4 h-4`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 + i * 0.15 }}
        >
          <svg viewBox="0 0 16 16" className="w-full h-full text-foreground">
            <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="0.8" />
            <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
