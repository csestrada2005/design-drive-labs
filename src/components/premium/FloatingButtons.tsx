import { MessageCircle, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-5 z-40 flex flex-col gap-3 safe-bottom">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`touch-target w-14 h-14 rounded-full bg-card border border-border shadow-lg flex items-center justify-center transition-all duration-300 active:scale-95 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Subir"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <a
        href="https://wa.me/34600000000?text=Hola,%20me%20interesa%20un%20proyecto%20web"
        target="_blank"
        rel="noopener noreferrer"
        className="touch-target w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};
