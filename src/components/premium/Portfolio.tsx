import { useState, useCallback } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  summaryKey: string;
  highlightsKeys: string[];
  resultsKey?: string;
  images: string[];
  isPlaceholder?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "BUMBA",
    type: "E-commerce",
    summaryKey: "portfolio.bumba.summary",
    highlightsKeys: [
      "Shopify Checkout",
      "Carrito persistente",
      "Multi-moneda",
      "Chatbot soporte",
      "Animaciones premium",
      "Mobile-first"
    ],
    resultsKey: "portfolio.bumba.results",
    images: [bumba1, bumba2, bumba3, bumba4],
  },
  {
    id: 2,
    title: "Boutique Elegance",
    type: "E-commerce",
    summaryKey: "portfolio.boutique.summary",
    highlightsKeys: ["Pasarela de pagos", "Inventario en tiempo real", "Wishlist integrada", "Analytics avanzado"],
    images: [portfolio1],
  },
  {
    id: 3,
    title: "TechFlow SaaS",
    type: "Plataforma web",
    summaryKey: "portfolio.techflow.summary",
    highlightsKeys: ["Dashboard interactivo", "API REST", "Autenticación segura", "Reportes automatizados"],
    images: [portfolio2],
  },
];

const ProjectCarousel = ({ images, title, t }: { images: string[]; title: string; t: (key: string) => string }) => {
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
          alt={`${title} - Preview`}
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
                  alt={`${title} - ${index + 1}`}
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
        aria-label={t("portfolio.prev")}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
        aria-label={t("portfolio.next")}
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
            aria-label={`${t("portfolio.goto")} ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile swipe hint - only shows briefly */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs text-background/70 bg-foreground/50 px-3 py-1 rounded-full sm:hidden animate-fade-in">
        {t("portfolio.swipe")}
      </div>
    </div>
  );
};

export const Portfolio = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();

  return (
    <section id="trabajo" ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 md:py-32 bg-muted/30">
      <div className="container px-5 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-10 sm:mb-16">
          <p className={`text-accent font-medium mb-3 text-sm tracking-wide uppercase transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {t("portfolio.title")}
          </p>
          <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl mb-4 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {t("portfolio.headline")}
          </h2>
          <p className={`text-muted-foreground text-base sm:text-lg transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {t("portfolio.subtitle")}
          </p>
        </div>

        {/* Projects Grid - 3 per row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                <ProjectCarousel images={project.images} title={project.title} t={t} />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                {/* Badge + Title */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider px-2 py-0.5 bg-accent/10 rounded-full">
                    {project.type}
                  </span>
                </div>
                
                <h3 className="font-display text-xl sm:text-2xl mb-2">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                  {t(project.summaryKey)}
                </p>

                {/* Highlights chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.highlightsKeys.slice(0, 4).map((highlight, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/80 font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                  {project.highlightsKeys.length > 4 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      +{project.highlightsKeys.length - 4}
                    </span>
                  )}
                </div>

                {/* Results block (only for BUMBA) */}
                {project.resultsKey && (
                  <p className="text-xs text-foreground/70 italic mb-4 border-l-2 border-accent/30 pl-3 line-clamp-2">
                    {t(project.resultsKey)}
                  </p>
                )}

              </div>
            </article>
          ))}
        </div>

        {/* Privacy notice */}
        <div className={`mt-10 sm:mt-14 text-center transition-all duration-600 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-sm text-muted-foreground/70 italic max-w-2xl mx-auto">
            🔒 Por motivos de confidencialidad y acuerdos de privacidad con las marcas, el acceso directo a los proyectos no está disponible públicamente.
          </p>
        </div>
      </div>
    </section>
  );
};
