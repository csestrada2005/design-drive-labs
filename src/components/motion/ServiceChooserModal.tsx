import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── WhatsApp config ── */
const WA_NUMBER = "522213497090";

const SERVICE_KEYS = [
  "modal.s1", "modal.s2", "modal.s3", "modal.s4", "modal.s5",
  "modal.s6", "modal.s7", "modal.s8", "modal.s9", "modal.s10", "modal.s11",
] as const;

const SERVICE_MSGS = [
  "Hey! I saw your website and I need a Corporate Website. Can you share the next steps?",
  "Hey! I saw your website and I need a Sales Landing Page. Can you share the next steps?",
  "Hey! I saw your website and I need an Online Store (E-commerce). Can you share the next steps?",
  "Hey! I saw your website and I need a Booking / Reservations Website. Can you share the next steps?",
  "Hey! I saw your website and I need a QR Digital Menu. Can you share the next steps?",
  "Hey! I saw your website and I need Branding (Visual Identity). Can you share the next steps?",
  "Hey! I saw your website and I need SEO (Local + Technical Base). Can you share the next steps?",
  "Hey! I saw your website and I need CRM Setup / Implementation. Can you share the next steps?",
  "Hey! I saw your website and I need Custom Software / SaaS. Can you share the next steps?",
  "Hey! I saw your website and I need Monthly Maintenance. Can you share the next steps?",
  "Hey! I saw your website. I'm not sure what service I need yet—can you help me choose the best option?",
];

const openWhatsApp = (msg: string) => {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

/* ── Context for global open/close ── */
interface ServiceChooserContextType {
  open: () => void;
}

const ServiceChooserContext = createContext<ServiceChooserContextType>({ open: () => {} });

export const useServiceChooser = () => useContext(ServiceChooserContext);

/* ── Provider wraps the app ── */
export const ServiceChooserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ServiceChooserContext.Provider value={{ open: openModal }}>
      {children}
      <ServiceChooserModal isOpen={isOpen} onClose={closeModal} />
    </ServiceChooserContext.Provider>
  );
};

/* ── Modal ── */
const ServiceChooserModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const reduced = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    // Block wheel/touch at the window level so Lenis can't scroll the page
    const blockWheel = (e: WheelEvent) => e.preventDefault();
    const blockTouch = (e: TouchEvent) => {
      // Allow scrolling inside the list, block everything else
      if (listRef.current && listRef.current.contains(e.target as Node)) return;
      e.preventDefault();
    };
    window.addEventListener("wheel", blockWheel, { passive: false });
    window.addEventListener("touchmove", blockTouch, { passive: false });

    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("wheel", blockWheel);
      window.removeEventListener("touchmove", blockTouch);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSelect = (index: number) => {
    onClose();
    setTimeout(() => openWhatsApp(SERVICE_MSGS[index]), 150);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
          style={{ background: "hsl(0 0% 0% / 0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", overscrollBehavior: "contain" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleOverlayClick}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={t("modal.title")}
        >
          <motion.div
            className="relative w-full sm:max-w-lg mx-0 sm:mx-4 rounded-t-3xl sm:rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, hsl(240 8% 8%) 0%, hsl(240 10% 5%) 100%)",
              border: "0.5px solid hsl(0 0% 100% / 0.1)",
              boxShadow: "0 -8px 60px hsl(0 0% 0% / 0.5), 0 0 0 0.5px hsl(0 0% 100% / 0.06) inset",
              maxHeight: "85dvh",
            }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.97 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-foreground/15" />
            </div>

            <div className="flex items-start justify-between px-6 pt-4 sm:pt-6 pb-3">
              <div>
                <h2 className="font-display text-xl sm:text-2xl tracking-[0.1em] text-foreground">
                  {t("modal.title")}
                </h2>
                <p className="text-xs font-mono text-foreground/35 mt-1.5 tracking-wide">
                  {t("modal.subtitle")}
                </p>
              </div>
              <motion.button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: "hsl(0 0% 100% / 0.06)",
                  border: "0.5px solid hsl(0 0% 100% / 0.08)",
                }}
                whileHover={{ scale: 1.08, background: "hsl(0 0% 100% / 0.1)" }}
                whileTap={{ scale: 0.92 }}
                aria-label="Close"
              >
                <X size={15} className="text-foreground/50" />
              </motion.button>
            </div>

            <div
              ref={listRef}
              className="px-4 sm:px-5 pb-6 overflow-y-auto"
              style={{ maxHeight: "calc(85dvh - 120px)", overscrollBehavior: "contain", touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
            >
              <div className="flex flex-col gap-1.5">
                {SERVICE_KEYS.map((key, i) => (
                  <motion.button
                    key={key}
                    onClick={() => handleSelect(i)}
                    className="group relative w-full text-left px-4 sm:px-5 py-3.5 sm:py-3 rounded-xl transition-all duration-200 flex items-center justify-between gap-3"
                    style={{
                      background: "hsl(0 0% 100% / 0.03)",
                      border: "0.5px solid hsl(0 0% 100% / 0.05)",
                      minHeight: 48,
                    }}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.03,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      background: "hsl(0 100% 50% / 0.08)",
                      borderColor: "hsl(0 100% 50% / 0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-foreground/20 tabular-nums w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm sm:text-[13px] font-medium text-foreground/75 group-hover:text-foreground transition-colors">
                        {t(key)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MessageCircle size={12} className="text-emerald-400/70" />
                      <ArrowRight size={12} className="text-foreground/30" />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-mono text-foreground/20 tracking-wider">
                <svg className="w-3.5 h-3.5 text-emerald-400/40" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.707-1.398A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.586-.826-6.32-2.207l-.18-.146-3.065.91.853-3.143-.157-.187A9.949 9.949 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                {t("modal.opensWA")}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
