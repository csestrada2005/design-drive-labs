import { ArrowUp, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-3">
      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={`touch-target w-14 h-14 rounded-full bg-card border border-border shadow-medium flex items-center justify-center transition-all duration-300 active:scale-95 hover:bg-muted ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Quick contact */}
      <a
        href="#contacto"
        className="touch-target w-14 h-14 rounded-full flex items-center justify-center shadow-glow active:scale-95 transition-transform text-accent-foreground"
        style={{ background: "var(--gradient-primary)" }}
        aria-label="Contactar"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};
