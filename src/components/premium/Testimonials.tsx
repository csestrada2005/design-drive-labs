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
      intro: language === "es" 
        ? "Sophie tiene una cafetería en Creek Harbour, Dubai — este fue su mensaje:"
        : "Sophie has a coffee shop in Creek Harbour, Dubai — this was her message:",
      text: language === "es"
        ? "Quedó increíble. Se siente premium y ahora la gente entiende rápido qué hacemos. Gracias 🙏"
        : "It looks amazing. It feels premium and now people quickly understand what we do. Thanks 🙏",
      name: "Sophie Al-Rashid",
      role: language === "es" ? "Cafetería • Creek Harbour, Dubai" : "Coffee Shop • Creek Harbour, Dubai",
      initials: "SA",
      color: "bg-emerald-500",
    },
    {
      id: 2,
      intro: null,
      text: language === "es"
        ? "Super profesionales. La web se ve seria y ya nos escriben más por WhatsApp. Exactly what I needed 👌"
        : "Super professional. The website looks serious and we get more WhatsApp messages now. Exactly what I needed 👌",
      name: "Khalid Mansour",
      role: language === "es" ? "Barbería • Business Bay, Dubai" : "Barbershop • Business Bay, Dubai",
      initials: "KM",
      color: "bg-amber-500",
    },
    {
      id: 3,
      intro: null,
      text: language === "es"
        ? "Antes nadie entendía qué hacíamos. Ahora el sitio lo explica solo y es más fácil cotizar. Muy atentos a los detalles."
        : "Before, nobody understood what we did. Now the site explains itself and it's easier to quote. Very detail-oriented.",
      name: "Andrea Velázquez",
      role: language === "es" ? "Agencia de eventos • CDMX, México" : "Event Agency • CDMX, Mexico",
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
    <section id="testimonios" ref={ref as React.RefObject<HTMLElement>} className="py-12 sm:py-20 md:py-28">
      <div className="container px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <p className={`text-accent font-medium mb-2 text-center text-xs sm:text-sm transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {t("testimonials.title")}
          </p>
          <h2 className={`font-display text-lg sm:text-xl md:text-2xl text-center mb-6 sm:mb-10 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
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
                    <div className="glass-card p-4 sm:p-6">
                      {/* WhatsApp indicator */}
                      <div className="flex items-center gap-1.5 mb-3 sm:mb-4 text-[#25D366]">
                        <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="text-[10px] sm:text-xs font-medium">WhatsApp</span>
                      </div>

                      {/* Intro line if exists */}
                      {testimonial.intro && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 italic">
                          {testimonial.intro}
                        </p>
                      )}

                      <blockquote className="font-display text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${testimonial.color} flex items-center justify-center text-white font-semibold text-xs sm:text-sm`}>
                          {testimonial.initials}
                        </div>
                        <div>
                          <p className="font-medium text-xs sm:text-sm">{testimonial.name}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
              <button 
                onClick={prev} 
                className="touch-target w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-card flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-6 bg-accent" : "w-1.5 bg-foreground/15"
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={next} 
                className="touch-target w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-card flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};