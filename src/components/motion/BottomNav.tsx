import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const BottomNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      {/* Bottom bar */}
      <nav
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
        aria-label="Main navigation"
      >
        <div className="glass-nav rounded-full px-3 py-2 flex items-center gap-2 shadow-lg shadow-background/50">
          {/* Menu */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-primary/10 transition-colors text-sm font-medium group"
            aria-label="Open menu"
          >
            <div className="w-5 h-5 rounded bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center transition-colors">
              <Menu className="w-3 h-3 text-primary" />
            </div>
            <span className="hidden sm:inline text-xs">Menu</span>
          </button>

          {/* Logo */}
          <a href="#hero" className="font-display text-sm px-3 hover:text-primary transition-colors">
            CUATRE
          </a>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            Contact
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            {/* Decorative grid */}
            <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

            {/* Decorative corner shapes */}
            <motion.svg
              className="absolute top-[15%] right-[10%] w-32 h-32 text-primary/[0.06]"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </motion.svg>

            {/* Header */}
            <div className="relative flex items-center justify-between px-6 py-5">
              <span className="font-display text-lg">CUATRE</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="relative flex-1 flex flex-col justify-center px-8 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group font-display text-3xl sm:text-5xl py-3 border-b border-border/15 flex items-center justify-between hover:text-primary transition-colors relative overflow-hidden"
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground/50 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                      className="w-2 h-2 rounded-full bg-primary"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                  </div>
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-primary/[0.03] translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </motion.a>
              ))}
            </nav>

            {/* Bottom */}
            <motion.div
              className="relative px-8 pb-8 safe-bottom"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary w-full py-4 text-center text-sm"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
