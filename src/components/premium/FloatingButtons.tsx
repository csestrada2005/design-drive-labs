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
        href="https://wa.me/522213497090?text=Hi!%20I'm%20interested%20in%20your%20service%20%F0%9F%99%82%0A%C2%A1Hola!%20Me%20interesa%20tu%20servicio%0A%0APlease%20reply%20in%20%2F%20Responde%20en%3A%0A%F0%9F%87%AC%F0%9F%87%A7%20English%20%7C%20%F0%9F%87%AA%F0%9F%87%B8%20Espa%C3%B1ol"
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
