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
      text: "Bro, quedó increíble. Se siente premium y ahora la gente entiende rápido qué hacemos. Gracias 🙏",
      name: "Sophie Al-Rashid",
      role: language === "es" ? "Cafetería • Creek Harbour, Dubai" : "Coffee Shop • Creek Harbour, Dubai",
    },
    {
      id: 2,
      intro: null,
      text: language === "es"
        ? "Super profesionales. La web se ve seria y ya nos escriben más por WhatsApp. Exactly what I needed 👌"
        : "Super professional. The website looks serious and we get more WhatsApp messages now. Exactly what I needed 👌",
      name: "Khalid Mansour",
      role: language === "es" ? "Barbería • Business Bay, Dubai" : "Barbershop • Business Bay, Dubai",
    },
    {
      id: 3,
      intro: null,
      text: language === "es"
        ? "Antes nadie entendía qué hacíamos. Ahora el sitio lo explica solo y es más fácil cotizar. Muy atentos a los detalles."
        : "Before, nobody understood what we did. Now the site explains itself and it's easier to quote. Very detail-oriented.",
      name: "Andrea Velázquez",
      role: language === "es" ? "Agencia de eventos • CDMX, México" : "Event Agency • CDMX, Mexico",
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
    <section id="testimonios" ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 md:py-32">
      <div className="container px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <p className={`text-accent font-medium mb-3 sm:mb-4 text-center text-sm sm:text-base transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {t("testimonials.title")}
          </p>
          <h2 className={`font-display text-xl sm:text-2xl md:text-3xl text-center mb-8 sm:mb-12 text-muted-foreground transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {t("testimonials.headline")}
          </h2>

          {/* Carousel */}
          <div
            className={`transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="overflow-hidden -mx-2">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 md:p-10">
                      {/* WhatsApp style indicator */}
                      <div className="flex items-center gap-2 mb-5 sm:mb-6 text-[#25D366]">
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium">WhatsApp</span>
                      </div>

                      {/* Intro line if exists */}
                      {testimonial.intro && (
                        <p className="text-sm text-muted-foreground mb-4 italic">
                          {testimonial.intro}
                        </p>
                      )}

                      <blockquote className="font-display text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 sm:mb-8">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Author */}
                      <div>
                        <p className="font-medium text-sm sm:text-base">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button onClick={prev} className="touch-target w-12 h-12 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors active:scale-95">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-accent" : "w-2 bg-border"}`}
                  />
                ))}
              </div>
              <button onClick={next} className="touch-target w-12 h-12 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors active:scale-95">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};