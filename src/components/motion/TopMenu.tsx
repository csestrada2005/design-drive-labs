import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { anchorScrollTo } from "@/lib/anchorScroll";

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

export const TopMenu = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();

  // Scrollspy: track which section is in view
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = "hero";
      for (const link of menuLinks) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= scrollPos) {
          current = link.id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    anchorScrollTo(id, lenis, { delay: 300 });
  };

  return (
    <>
      {/* Header bar — fixed top with CTA */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6"
        style={{ height: 56 }}
        initial={prefersReducedMotion ? {} : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Logo */}
        <motion.span
          className="font-display text-xs sm:text-sm tracking-[0.15em] text-foreground/80"
          style={{ opacity: scrolled ? 1 : 0, transition: "opacity 0.3s" }}
        >
          NEBU
        </motion.span>

        <div className="flex items-center gap-2">
          {/* Header CTA — visible after scroll */}
          <button
            onClick={(e) => { e.preventDefault(); anchorScrollTo("contact", lenis); }}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              boxShadow: "0 2px 12px hsl(0 100% 50% / 0.3)",
              opacity: scrolled ? 1 : 0,
              pointerEvents: scrolled ? "auto" : "none",
              transition: "opacity 0.3s",
            }}
          >
            Book a Call
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Hamburger */}
          <motion.button
            onClick={() => setOpen(true)}
            className="w-11 h-11 flex items-center justify-center rounded-full"
            style={{
              background: "hsl(0 0% 0%)",
              boxShadow: "0 2px 12px hsl(0 0% 0% / 0.5)",
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.header>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{
              background: "hsl(var(--background) / 0.97)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-8" style={{ height: 56 }}>
              <span className="font-display text-sm tracking-[0.15em] text-foreground">
                NEBU STUDIO
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-[18px] h-[18px] text-foreground" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-0">
              {menuLinks.map((link, i) => {
                const isActive = activeId === link.id;
                return (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className={`group text-left font-display text-2xl sm:text-4xl md:text-5xl py-3 sm:py-4 border-b flex items-center justify-between transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                    style={{ borderColor: "hsl(0 0% 100% / 0.07)" }}
                  >
                    <span className="flex items-center gap-4">
                      {/* Active dot indicator */}
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-primary scale-100 opacity-100"
                            : "bg-primary/0 scale-0 opacity-0 group-hover:bg-primary/40 group-hover:scale-75 group-hover:opacity-100"
                        }`}
                      />
                      {link.label}
                    </span>
                    <span className={`text-[10px] font-mono tracking-[0.2em] transition-colors duration-300 ${
                      isActive ? "text-primary/70" : "text-muted-foreground/40 group-hover:text-primary/60"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.button>
                );
              })}
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
                Book a Strategy Call
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
