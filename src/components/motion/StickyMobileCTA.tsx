import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * StickyMobileCTA — persistent bottom bar on mobile only.
 * Appears after scrolling past the hero, hides near the contact section.
 */
export const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const contactEl = document.getElementById("contact");
      const contactTop = contactEl ? contactEl.getBoundingClientRect().top + scrollY : Infinity;

      // Show after hero (1 viewport), hide when contact section is near
      setVisible(scrollY > vh * 0.8 && scrollY < contactTop - vh * 0.5);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden safe-bottom"
          style={{
            background: "linear-gradient(to top, hsl(var(--background)) 70%, hsl(var(--background) / 0))",
            paddingTop: 20,
          }}
        >
          <div className="px-4 pb-4 flex gap-2">
            <a
              href="#contact"
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm active:scale-95 transition-transform"
              style={{ boxShadow: "0 4px 20px -4px hsl(0 100% 50% / 0.4)" }}
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/522213497090"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white active:scale-95 transition-transform"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.707-1.398A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.586-.826-6.32-2.207l-.18-.146-3.065.91.853-3.143-.157-.187A9.949 9.949 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
