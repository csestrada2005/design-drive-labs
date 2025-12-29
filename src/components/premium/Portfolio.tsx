import { useState } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Moda Luxe",
    category: "E-commerce",
    description: "Tienda online premium con experiencia de compra inmersiva",
    results: [
      { label: "Conversión", value: "+200%" },
      { label: "Ventas", value: "+180%" },
    ],
    tags: ["Shopify", "UX Design", "Branding"],
    size: "large",
  },
  {
    id: 2,
    title: "TechFlow",
    category: "Landing Page",
    description: "Página de captación para startup SaaS",
    results: [
      { label: "Leads", value: "+350%" },
      { label: "CTR", value: "12%" },
    ],
    tags: ["React", "Animaciones", "CRO"],
    size: "medium",
  },
  {
    id: 3,
    title: "Wellness Studio",
    category: "Sitio Web",
    description: "Web corporativa para centro de bienestar",
    results: [
      { label: "Reservas", value: "+150%" },
      { label: "Tráfico", value: "3x" },
    ],
    tags: ["WordPress", "SEO", "Booking"],
    size: "medium",
  },
  {
    id: 4,
    title: "Fintech App",
    category: "Aplicación Web",
    description: "Dashboard de gestión financiera para empresas",
    results: [
      { label: "Usuarios", value: "50k+" },
      { label: "Retención", value: "85%" },
    ],
    tags: ["React", "Dashboard", "Data Viz"],
    size: "large",
  },
];

export const Portfolio = () => {
  const { ref, isVisible } = useReveal();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="portafolio"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 bg-muted/30"
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span
              className={`inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Portafolio
            </span>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-serif transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Proyectos
              <span className="text-gradient"> seleccionados</span>
            </h2>
          </div>
          <a
            href="#contacto"
            className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-700 delay-200 group ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span>Ver todos los proyectos</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Masonry grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative bg-card rounded-3xl overflow-hidden border border-border shadow-soft transition-all duration-700 cursor-pointer ${
                project.size === "large" ? "md:row-span-2" : ""
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Image placeholder */}
              <div
                className={`relative bg-gradient-to-br from-muted to-muted/50 transition-all duration-500 ${
                  project.size === "large" ? "aspect-[4/5]" : "aspect-[16/10]"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <span className="text-3xl">✦</span>
                  </div>
                </div>

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-foreground/90 flex flex-col justify-end p-8 transition-opacity duration-500 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="text-background/80 mb-4">{project.description}</p>

                  {/* Results */}
                  <div className="flex gap-6 mb-4">
                    {project.results.map((result) => (
                      <div key={result.label}>
                        <p className="text-2xl font-serif font-semibold text-background">
                          {result.value}
                        </p>
                        <p className="text-sm text-background/60">{result.label}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-background font-medium group/link"
                  >
                    Ver caso de estudio
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-accent">{project.category}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
