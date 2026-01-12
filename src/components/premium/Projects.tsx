import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReveal } from "@/hooks/useAnimations";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Project images
import projectLaMesa from "@/assets/project-lamesa.png";
import projectRawPaw from "@/assets/project-rawpaw.png";
import projectBumba from "@/assets/project-bumba-1.png";

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
    image: projectLaMesa
  },
  {
    id: "raw-paw",
    name: "Raw Paw",
    description: {
      es: "E-commerce local BARF en Puebla: cobertura por CP, recomendador con IA, suscripción y pedidos directos por WhatsApp.",
      en: "Local BARF e-commerce in Puebla: coverage by ZIP, AI recommender, subscription and direct WhatsApp orders."
    },
    tags: ["E-commerce", "AI Recommender", "Subscription", "WhatsApp"],
    image: projectRawPaw
  },
  {
    id: "bumba",
    name: "BUM'BA",
    description: {
      es: "Tienda premium para suplemento en mints: packs, multi-moneda, reviews, animaciones y checkout integrado.",
      en: "Premium store for supplement mints: packs, multi-currency, reviews, animations and integrated checkout."
    },
    tags: ["Shopify", "Multi-Currency", "CRO", "Premium UI"],
    image: projectBumba
  }
];

export const Projects = () => {
  const { language } = useLanguage();
  const { ref, isVisible } = useReveal();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

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
      className={`py-12 sm:py-20 md:py-28 px-4 sm:px-6 reveal ${isVisible ? "visible" : ""}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-primary bg-primary/10 rounded-full">
            {language === "es" ? "Portfolio" : "Portfolio"}
          </span>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">
            {language === "es" ? "Proyectos seleccionados" : "Selected Projects"}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            {language === "es" 
              ? "Algunos productos que hemos diseñado y construido end-to-end."
              : "Some products we've designed and built end-to-end."}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            plugins={[autoplayPlugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onMouseEnter={() => autoplayPlugin.current.stop()}
            onMouseLeave={() => autoplayPlugin.current.play()}
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {projects.map((project, index) => (
                <CarouselItem 
                  key={project.id} 
                  className="pl-3 sm:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3"
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
            <div className="hidden lg:block">
              <CarouselPrevious 
                className="absolute -left-4 lg:-left-10 top-1/2 -translate-y-1/2 h-10 w-10 glass border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all"
              />
              <CarouselNext 
                className="absolute -right-4 lg:-right-10 top-1/2 -translate-y-1/2 h-10 w-10 glass border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all"
              />
            </div>
          </Carousel>

          {/* Mobile dots */}
          <div className="flex justify-center gap-1.5 mt-5 lg:hidden">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "w-6 bg-primary" 
                    : "w-1.5 bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 animate-pulse" />
        )}
        
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />

        <div 
          className={`absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-50"
          }`} 
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="font-display text-base sm:text-lg mb-1 group-hover:text-primary transition-colors duration-300">
          {project.name}
        </h3>
        
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 flex-1 line-clamp-2">
          {project.description[language]}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
              +{project.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
