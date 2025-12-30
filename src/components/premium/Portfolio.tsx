import { useState, useCallback } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";

// BUMBA images
import bumba1 from "@/assets/bumba-1.png";
import bumba2 from "@/assets/bumba-2.png";
import bumba3 from "@/assets/bumba-3.png";
import bumba4 from "@/assets/bumba-4.png";

// Placeholder images
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";

interface Project {
  id: number;
  title: string;
  type: string;
  summary: string;
  highlights: string[];
  implementation?: string[];
  results?: string;
  images: string[];
  isPlaceholder?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "BUMBA",
    type: "E-commerce",
    summary: "Tienda online de mentas energéticas y de enfoque para emprendedores. Construida en React e integrada con Shopify para una experiencia rápida, premium y orientada a conversión.",
    highlights: [
      "Shopify Checkout",
      "Carrito persistente",
      "Multi-moneda",
      "Chatbot soporte",
      "Animaciones premium",
      "Mobile-first"
    ],
    implementation: [
      "Packs 1/3/5 con indicador 'best value'",
      "Sistema de reviews con estrellas",
      "Páginas de beneficios, ingredientes, FAQ y políticas"
    ],
    results: "Optimizado para conversión: jerarquía clara, CTA directo y flujo de compra sin fricción.",
    images: [bumba1, bumba2, bumba3, bumba4],
  },
  {
    id: 2,
    title: "Studio Landing",
    type: "Landing page",
    summary: "Concepto de diseño — disponible para personalización. Landing minimalista con enfoque en captación de leads y estética editorial.",
    highlights: ["Diseño responsive", "Formulario integrado", "SEO optimizado"],
    images: [portfolio1],
    isPlaceholder: true,
  },
  {
    id: 3,
    title: "Luxe Store",
    type: "E-commerce",
    summary: "Concepto de diseño — disponible para personalización. Tienda online con experiencia de compra premium y checkout optimizado.",
    highlights: ["Carrito dinámico", "Galería de producto", "Checkout rápido"],
    images: [portfolio2],
    isPlaceholder: true,
  },
];

const ProjectCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Subscribe to select event
  useState(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  });

  if (images.length === 1) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        <img
          src={images[0]}
          alt={`${title} - Vista previa`}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Carousel container */}
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={image}
                  alt={`${title} - Captura ${index + 1}`}
                  className="w-full h-full object-cover object-top transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - visible on desktop hover */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-accent w-6"
                : "bg-background/60 hover:bg-background/80"
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile swipe hint - only shows briefly */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs text-background/70 bg-foreground/50 px-3 py-1 rounded-full sm:hidden animate-fade-in">
        Desliza para ver más
      </div>
    </div>
  );
};

export const Portfolio = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="trabajo" ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 md:py-32 bg-muted/30">
      <div className="container px-5 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-10 sm:mb-16">
          <p className={`text-accent font-medium mb-3 text-sm tracking-wide uppercase transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            Trabajo
          </p>
          <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl mb-4 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Proyectos seleccionados
          </h2>
          <p className={`text-muted-foreground text-base sm:text-lg transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Una muestra de cómo diseñamos para que convierta.
          </p>
        </div>

        {/* Projects Grid - 2 per row */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Image / Carousel */}
              <div className="p-3 sm:p-4">
                <ProjectCarousel images={project.images} title={project.title} />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                {/* Badge + Title */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider px-2 py-0.5 bg-accent/10 rounded-full">
                    {project.type}
                  </span>
                  {project.isPlaceholder && (
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 py-0.5 bg-muted rounded-full">
                      Demo
                    </span>
                  )}
                </div>
                
                <h3 className="font-display text-xl sm:text-2xl mb-2">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                {/* Highlights chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.highlights.slice(0, 4).map((highlight, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/80 font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                  {project.highlights.length > 4 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      +{project.highlights.length - 4}
                    </span>
                  )}
                </div>

                {/* Results block (only for BUMBA) */}
                {project.results && (
                  <p className="text-xs text-foreground/70 italic mb-4 border-l-2 border-accent/30 pl-3 line-clamp-2">
                    {project.results}
                  </p>
                )}

                {/* CTA */}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2 group/btn hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                >
                  Ver caso
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
