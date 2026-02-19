import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

const menuLinks = [
  { label: "Home", id: "hero" },
  { label: "What We Build", id: "modes" },
  { label: "Design Lab", id: "lab" },
  { label: "How We Work", id: "process" },
  { label: "Results", id: "growth" },
  { label: "Our Projects", id: "work" },
  { label: "Standards", id: "standards" },
  { label: "Contact", id: "contact" },
];

export const BottomNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 350);
  };

  return (
    <>
      {/* Bottom bar */}
      <nav
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999]"
        aria-label="Main navigation"
      >
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-full"
          style={{
            background: "hsl(0 0% 8% / 0.92)",
            backdropFilter: "blur(16px) saturate(1.4)",
            WebkitBackdropFilter: "blur(16px) saturate(1.4)",
            boxShadow: "0 4px 24px hsl(0 0% 0% / 0.25)",
          }}
        >
          {/* Menu button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-[18px] h-[18px] text-white" />
          </button>

          {/* Title */}
          <span className="font-display text-xs tracking-[0.15em] text-white/90 px-2 select-none">
            NEBU STUDIO
          </span>

          {/* Contact button */}
          <button
            onClick={() => scrollTo("contact")}
            className="h-8 px-4 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[10000] flex flex-col"
            style={{
              background: "hsl(var(--background) / 0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-8" style={{ height: 56 }}>
              <span className="font-display text-sm tracking-[0.15em] text-foreground">
                NEBU STUDIO
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-[18px] h-[18px] text-foreground" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-0">
              {menuLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group text-left font-display text-2xl sm:text-4xl md:text-5xl py-3 sm:py-4 border-b flex items-center justify-between hover:text-primary transition-colors duration-300"
                  style={{ borderColor: "hsl(0 0% 100% / 0.07)" }}
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/40 group-hover:text-primary/60 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              className="px-8 sm:px-12 pb-8 safe-bottom"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <button
                onClick={() => scrollTo("contact")}
                className="btn-primary w-full py-4 text-center text-sm"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
