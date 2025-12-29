import { useState } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

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
        ? "Nuestra conversión subió un 200% en el primer mes. Daniel entendió exactamente lo que necesitábamos y lo entregó antes del plazo."
        : "Our conversion went up 200% in the first month. Daniel understood exactly what we needed and delivered ahead of schedule.",
      name: "María García",
      role: "CEO, TechFlow",
      image: testimonial1,
      rating: 5,
    },
    {
      id: 2,
      text: language === "es"
        ? "Profesionalidad total. La web refleja perfectamente nuestra esencia y las reservas no paran de llegar. Muy recomendable."
        : "Total professionalism. The website perfectly reflects our essence and bookings keep coming. Highly recommended.",
      name: "Carlos Rodríguez",
      role: "Director, Wellness Spa",
      image: testimonial2,
      rating: 5,
    },
    {
      id: 3,
      text: language === "es"
        ? "Mi tienda online por fin vende como debería. La experiencia de compra es increíble y la gestión muy sencilla."
        : "My online store finally sells as it should. The shopping experience is amazing and management is very simple.",
      name: "Ana Martínez",
      role: "Fundadora, Moda Luxe",
      image: testimonial3,
      rating: 5,
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
          <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
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
                {testimonials.map((t) => (
                  <div key={t.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 md:p-10">
                      {/* Stars */}
                      <div className="flex gap-1 mb-5 sm:mb-6">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                        ))}
                      </div>

                      <blockquote className="font-display text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 sm:mb-8">
                        "{t.text}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <img src={t.image} alt={t.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-sm sm:text-base">{t.name}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{t.role}</p>
                        </div>
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
