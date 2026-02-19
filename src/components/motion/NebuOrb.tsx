import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const WA_NUMBER = "522213497090";

const waMessages = {
  es: "Hola, me gustaría saber más sobre lo que pueden hacer por mi marca 🙌",
  en: "Hello, I want to learn more about what you can do for my brand 🙌",
};

const openWhatsApp = (lang: "es" | "en") => {
  const msg = encodeURIComponent(waMessages[lang]);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
};

export const NebuOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);

  return (
    <>
      {/* Floating orb */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="orb"
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 sm:bottom-20 right-5 z-[60] flex flex-col items-center gap-1 group"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            aria-label="Talk to NEBU"
          >
            {/* Orb */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid hsl(0 100% 50% / 0.4)" }}
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "1px solid hsl(0 100% 50% / 0.2)" }}
                animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4, ease: "easeOut" }}
              />

              {/* Core */}
              <motion.div
                className="relative w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "hsl(var(--primary))" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* N logo */}
                <span className="font-display text-sm text-primary-foreground font-bold">N</span>
              </motion.div>
            </div>

            {/* Label */}
            <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
              Talk to NEBU
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="fixed bottom-20 sm:bottom-20 right-5 z-[80] w-[300px] max-w-[calc(100vw-2.5rem)] overflow-hidden"
              style={{
                background: "hsl(0 10% 5% / 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid hsl(0 0% 100% / 0.1)",
                borderRadius: 16,
                boxShadow: "0 30px 70px -15px hsl(0 0% 0% / 0.7), 0 0 30px hsl(0 100% 50% / 0.08)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(var(--primary))" }}
                  >
                    <span className="font-display text-xs text-primary-foreground font-bold">N</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">NEBU Studio</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-muted-foreground">Ready to build</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { setIsOpen(false); setShowLangPicker(false); }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  style={{ border: "1px solid hsl(0 0% 100% / 0.1)" }}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Message */}
              <div className="px-5 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hey! We build premium websites, landing pages, e-commerce, and systems.
                  Let's talk about your project.
                </p>
              </div>

              {/* CTAs */}
              <div className="px-5 pb-5 flex flex-col gap-2">
                <AnimatePresence mode="wait">
                  {!showLangPicker ? (
                    <motion.button
                      key="cta"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowLangPicker(true)}
                      className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all w-full"
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                      }}
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.707-1.398A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.586-.826-6.32-2.207l-.18-.146-3.065.91.853-3.143-.157-.187A9.949 9.949 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                      </svg>
                      <span className="flex-1 text-left">Contactar por WhatsApp</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </motion.button>
                  ) : (
                    <motion.div
                      key="lang"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-2"
                    >
                      <p className="text-xs text-muted-foreground text-center pb-1">
                        ¿En qué idioma prefieres hablar? / Choose your language
                      </p>
                      <button
                        onClick={() => { openWhatsApp("es"); setIsOpen(false); setShowLangPicker(false); }}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                        style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                      >
                        <span>🇲🇽 Español</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { openWhatsApp("en"); setIsOpen(false); setShowLangPicker(false); }}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all"
                        style={{ border: "1px solid hsl(0 0% 100% / 0.15)", color: "hsl(0 0% 85%)" }}
                      >
                        <span>🇺🇸 English</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowLangPicker(false)}
                        className="text-xs text-muted-foreground text-center py-1 hover:text-foreground transition-colors"
                      >
                        ← Volver / Back
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
