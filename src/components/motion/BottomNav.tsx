import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { anchorScrollTo } from "@/lib/anchorScroll";

const WA_NUMBER = "522213497090";
const waMessages = {
  es: "Hola, me gustaría saber más sobre lo que pueden hacer por mi marca 🙌",
  en: "Hello, I want to learn more about what you can do for my brand 🙌",
};
const openWhatsApp = (lang: "es" | "en") => {
  const msg = encodeURIComponent(waMessages[lang]);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.707-1.398A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.586-.826-6.32-2.207l-.18-.146-3.065.91.853-3.143-.157-.187A9.949 9.949 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

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
  const [showLangPicker, setShowLangPicker] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    anchorScrollTo(id, lenis, { delay: 350 });
  };

  const handleWaClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    setShowLangPicker(true);
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

          {/* WhatsApp button */}
          <motion.button
            onClick={handleWaClick}
            aria-label="Contactar por WhatsApp"
            className="relative w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
            style={{ background: "hsl(var(--primary))" }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid hsl(var(--primary) / 0.6)" }}
              animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <WhatsAppIcon className="w-[18px] h-[18px] text-white" />
          </motion.button>
        </div>
      </nav>

      {/* Language picker overlay */}
      <AnimatePresence>
        {showLangPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10001]"
              onClick={() => setShowLangPicker(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.92 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[10002] w-[280px]"
              style={{
                background: "hsl(0 0% 7% / 0.97)",
                border: "1px solid hsl(0 0% 100% / 0.1)",
                borderRadius: 16,
                boxShadow: "0 24px 60px hsl(0 0% 0% / 0.6), 0 0 0 1px hsl(0 0% 100% / 0.04)",
              }}
            >
              <div className="px-5 pt-5 pb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--primary))" }}>
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">WhatsApp</span>
                </div>
                <button
                  onClick={() => setShowLangPicker(false)}
                  className="w-6 h-6 flex items-center justify-center rounded-full text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="px-5 pb-4 text-xs text-white/40 leading-relaxed">
                ¿En qué idioma prefieres hablar? / Choose your language
              </p>
              <div className="px-4 pb-4 flex flex-col gap-2">
                <button
                  onClick={() => { openWhatsApp("es"); setShowLangPicker(false); }}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: "hsl(var(--primary))", color: "white" }}
                >
                  <span>🇲🇽 Español</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { openWhatsApp("en"); setShowLangPicker(false); }}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                  style={{ border: "1px solid hsl(0 0% 100% / 0.12)", color: "hsl(0 0% 80%)" }}
                >
                  <span>🇺🇸 English</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
                onClick={handleWaClick}
                className="btn-primary w-full py-4 text-center text-sm flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Contactar por WhatsApp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
