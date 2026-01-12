import { useState } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

export const Testimonials = () => {
  const { ref, isVisible } = useReveal();
  const { t, language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: language === "es"
        ? "Se siente premium. La gente entiende rápido qué hacemos. 🙏"
        : "It feels premium. People quickly understand what we do. 🙏",
      name: "Sophie A.",
      role: language === "es" ? "Cafetería • Dubai" : "Coffee Shop • Dubai",
      initials: "SA",
      color: "bg-emerald-500",
    },
    {
      id: 2,
      text: language === "es"
        ? "La web se ve seria. Ya nos escriben más por WhatsApp. 👌"
        : "The website looks serious. We get more WhatsApp messages now. 👌",
      name: "Khalid M.",
      role: language === "es" ? "Barbería • Dubai" : "Barbershop • Dubai",
      initials: "KM",
      color: "bg-amber-500",
    },
    {
      id: 3,
      text: language === "es"
        ? "Ahora el sitio explica solo qué hacemos. Más fácil cotizar."
        : "Now the site explains itself. Easier to quote.",
      name: "Andrea V.",
      role: language === "es" ? "Eventos • CDMX" : "Events • CDMX",
      initials: "AV",
      color: "bg-violet-500",
    },
  ];

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) next();
    if (touchEnd - touchStart > 75) prev();
  };

  return (
    <section id="testimonios" ref={ref as React.RefObject<HTMLElement>} className="py-10 sm:py-16 md:py-24">
      <div className="container px-4 sm:px-6">
        <div className="max-w-xl mx-auto">
          {/* Header - Minimal */}
          <p className={`text-accent font-medium mb-1.5 text-center text-xs transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {t("testimonials.title")}
          </p>
          <h2 className={`font-display text-base sm:text-lg text-center mb-5 transition-all duration-500 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {t("testimonials.headline")}
          </h2>

          {/* Carousel */}
          <div
            className={`transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="overflow-hidden -mx-1">
              <div 
                className="flex transition-transform duration-500 ease-out" 
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-1">
                    <div className="glass-card p-3 sm:p-5">
                      {/* WhatsApp indicator */}
                      <div className="flex items-center gap-1 mb-2 text-[#25D366]">
                        <MessageCircle className="w-3 h-3" />
                        <span className="text-[9px] font-medium">WhatsApp</span>
                      </div>

                      <blockquote className="font-display text-sm leading-relaxed mb-3">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Author - Compact */}
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full ${testimonial.color} flex items-center justify-center text-white font-semibold text-[10px]`}>
                          {testimonial.initials}
                        </div>
                        <div>
                          <p className="font-medium text-xs">{testimonial.name}</p>
                          <p className="text-[10px] text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls - Compact */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button 
                onClick={prev} 
                className="touch-target w-8 h-8 rounded-full glass-card flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <div className="flex gap-1">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === current ? "w-4 bg-accent" : "w-1 bg-foreground/15"
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={next} 
                className="touch-target w-8 h-8 rounded-full glass-card flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};