import { useState, useRef, useEffect } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "CEO",
    company: "TechFlow",
    content:
      "La landing page que diseñó superó todas nuestras expectativas. Nuestra tasa de conversión aumentó un 200% en el primer mes. Su atención al detalle y comprensión de nuestro negocio fueron excepcionales.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Director",
    company: "Wellness Studio",
    content:
      "Profesionalidad y comunicación excelente. Entendió perfectamente nuestra visión y la transformó en una web que refleja la esencia de nuestro centro. Las reservas online aumentaron un 150%.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Fundadora",
    company: "Moda Luxe",
    content:
      "Mi tienda online ahora es rápida, bonita y vende mucho más. La experiencia de compra que creó es exactamente lo que buscábamos. La mejor inversión para mi negocio.",
    rating: 5,
  },
  {
    id: 4,
    name: "David López",
    role: "CMO",
    company: "Fintech App",
    content:
      "El dashboard que desarrolló transformó la manera en que nuestros clientes interactúan con sus finanzas. UX impecable y rendimiento excepcional. Muy recomendable.",
    rating: 5,
  },
];

export const Testimonials = () => {
  const { ref, isVisible } = useReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, testimonials.length - 1)));
  };

  const goNext = () => goTo(currentIndex + 1);
  const goPrev = () => goTo(currentIndex - 1);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (translateX > 50) goPrev();
    else if (translateX < -50) goNext();
    setTranslateX(0);
  };

  return (
    <section
      id="testimonios"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32"
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span
              className={`inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Testimonios
            </span>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-serif transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Lo que dicen
              <span className="text-gradient"> mis clientes</span>
            </h2>
          </div>

          {/* Navigation - Desktop */}
          <div
            className={`hidden md:flex items-center gap-3 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === testimonials.length - 1}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className={`relative overflow-hidden transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-0 md:px-4"
              >
                <div className="bg-card rounded-3xl border border-border shadow-soft p-8 md:p-12">
                  <Quote className="w-10 h-10 text-accent/20 mb-6" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-xl md:text-2xl font-serif leading-relaxed mb-8">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-xl font-serif text-accent">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div
          className={`flex justify-center gap-2 mt-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-accent" : "bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
