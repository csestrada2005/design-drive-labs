import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-3 pb-safe-bottom">
      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={`touch-target w-14 h-14 rounded-full bg-background border border-border shadow-lg flex items-center justify-center transition-all duration-300 active:scale-95 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Quick contact */}
      <a
        href="#contacto"
        className="touch-target w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg glow flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Contactar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </a>
    </div>
  );
};
