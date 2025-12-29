import { useState, useRef } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Nuestra conversión subió un 200% en el primer mes. Entendió exactamente lo que necesitábamos.",
    name: "María García",
    role: "CEO, TechFlow",
  },
  {
    id: 2,
    text: "Profesionalidad total. La web refleja perfectamente nuestra esencia. Las reservas no paran de llegar.",
    name: "Carlos Rodríguez",
    role: "Director, Wellness Studio",
  },
  {
    id: 3,
    text: "Mi tienda online por fin vende como debería. La experiencia de compra es increíble.",
    name: "Ana Martínez",
    role: "Fundadora, Moda Luxe",
  },
];

export const Testimonials = () => {
  const { ref, isVisible } = useReveal();
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) next();
    if (touchEnd - touchStart > 75) prev();
  };

  return (
    <section
      id="testimonios"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32"
    >
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <p
            className={`text-accent font-medium mb-4 text-center transition-all duration-600 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Testimonios
          </p>
          <h2
            className={`font-display text-3xl md:text-4xl text-center mb-12 transition-all duration-600 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Lo que dicen
          </h2>

          {/* Carousel */}
          <div
            className={`transition-all duration-600 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <div key={t.id} className="w-full flex-shrink-0 px-4">
                    <blockquote className="text-center">
                      <p className="font-display text-xl md:text-2xl leading-relaxed mb-8">
                        "{t.text}"
                      </p>
                      <footer>
                        <p className="font-medium">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </footer>
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "w-6 bg-accent" : "bg-border"
                    }`}
                    aria-label={`Ir a testimonio ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
