import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Project images
import projectLaMesa from "@/assets/project-lamesa.png";
import projectRawPaw from "@/assets/project-rawpaw.png";
import projectBumba from "@/assets/project-bumba-1.png";

interface Project {
  id: string;
  name: string;
  tags: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: "la-mesa",
    name: "La Mesa",
    tags: ["QR Menu", "Mobile"],
    image: projectLaMesa
  },
  {
    id: "raw-paw",
    name: "Raw Paw",
    tags: ["E-commerce", "AI"],
    image: projectRawPaw
  },
  {
    id: "bumba",
    name: "BUM'BA",
    tags: ["E-commerce", "Premium"],
    image: projectBumba
  }
];

export const Projects = () => {
  const { language } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section divider with gradient */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
          <div className="relative">
            <span className="absolute inset-0 blur-lg bg-accent/20 rounded-full" />
            <h2 className="relative font-display text-xl sm:text-2xl px-2">
              {language === "es" ? "Proyectos" : "Projects"}
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          plugins={[autoplayPlugin.current]}
          opts={{ 
            align: "start", 
            loop: true,
            dragFree: true,
            duration: 15,
            skipSnaps: false
          }}
          className="w-full cursor-grab active:cursor-grabbing"
          onMouseEnter={() => autoplayPlugin.current.stop()}
          onMouseLeave={() => autoplayPlugin.current.play()}
        >
          <CarouselContent className="-ml-3">
            {projects.map((project) => (
              <CarouselItem key={project.id} className="pl-3 basis-[80%] sm:basis-1/2 lg:basis-1/3">
                <div className="glass-card overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base mb-2">{project.name}</h3>
                    <div className="flex gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-medium bg-accent/10 text-accent border border-accent/20 rounded-full shadow-[0_0_8px_-2px] shadow-accent/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current ? "w-5 bg-accent" : "w-1.5 bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
