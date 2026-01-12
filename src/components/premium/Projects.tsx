import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReveal } from "@/hooks/useAnimations";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";

// Project images - using existing assets
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

interface Project {
  id: string;
  name: string;
  description: { es: string; en: string };
  tags: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: "la-mesa",
    name: "La Mesa",
    description: {
      es: "Menú QR desde la mesa: explorar, personalizar, carrito, dividir cuenta y pago simulado sin descargar app.",
      en: "QR menu from the table: browse, customize, cart, split bill and simulated payment without downloading an app."
    },
    tags: ["QR Menu", "Mobile UX", "Checkout", "Split Bill"],
    image: portfolio1
  },
  {
    id: "raw-paw",
    name: "Raw Paw",
    description: {
      es: "E-commerce local BARF en Puebla: cobertura por CP, recomendador con IA, suscripción y pedidos directos por WhatsApp.",
      en: "Local BARF e-commerce in Puebla: coverage by ZIP, AI recommender, subscription and direct WhatsApp orders."
    },
    tags: ["E-commerce", "AI Recommender", "Subscription", "WhatsApp"],
    image: portfolio2
  },
  {
    id: "bumba",
    name: "BUM'BA",
    description: {
      es: "Tienda premium para suplemento en mints: packs, multi-moneda, reviews, animaciones y checkout integrado.",
      en: "Premium store for supplement mints: packs, multi-currency, reviews, animations and integrated checkout."
    },
    tags: ["Shopify", "Multi-Currency", "CRO", "Premium UI"],
    image: portfolio3
  }
];

export const Projects = () => {
  const { language } = useLanguage();
  const { ref, isVisible } = useReveal();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section
      id="proyectos"
      ref={ref}
      className={`py-24 md:py-32 px-6 reveal ${isVisible ? "visible" : ""}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
            {language === "es" ? "Portfolio" : "Portfolio"}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
            {language === "es" ? "Proyectos seleccionados" : "Selected Projects"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === "es" 
              ? "Algunos productos que hemos diseñado y construido end-to-end."
              : "Some products we've designed and built end-to-end."}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {projects.map((project, index) => (
                <CarouselItem 
                  key={project.id} 
                  className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <ProjectCard 
                    project={project} 
                    language={language}
                    index={index}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Desktop arrows */}
            <div className="hidden md:block">
              <CarouselPrevious 
                className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 h-12 w-12 glass border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all"
              />
              <CarouselNext 
                className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 h-12 w-12 glass border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all"
              />
            </div>
          </Carousel>

          {/* Mobile dots */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile swipe hint */}
          <p className="text-center text-sm text-muted-foreground mt-4 md:hidden">
            {language === "es" ? "Desliza para ver más →" : "Swipe to see more →"}
          </p>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  language: "es" | "en";
  index: number;
}

const ProjectCard = ({ project, language, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="group glass-card overflow-hidden h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionDelay: `${index * 50}ms`
      }}
    >
      {/* Image container with parallax */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 animate-pulse" />
        )}
        
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-110" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          style={{
            transform: isHovered ? "scale(1.1) translateY(-8px)" : "scale(1)"
          }}
        />

        {/* Gradient overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-60"
          }`} 
        />

        {/* Glow effect on hover */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle at 50% 100%, hsl(var(--primary) / 0.15), transparent 70%)"
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
          {project.name}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          {project.description[language]}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
