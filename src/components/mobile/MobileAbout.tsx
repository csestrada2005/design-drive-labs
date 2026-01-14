import { useReveal } from "@/hooks/useMobileAnimations";
import { Check } from "lucide-react";

const features = [
  "Diseño 100% responsive",
  "Optimizado para SEO",
  "Carga ultra rápida",
  "Soporte post-lanzamiento",
];

export const MobileAbout = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 px-5"
    >
      <div className={`stagger ${isVisible ? "visible" : ""}`}>
        {/* Header */}
        <span className="text-sm font-medium text-accent uppercase tracking-wider">
          Sobre mí
        </span>
        <h2 className="font-display text-3xl font-bold mt-2 mb-6">
          Diseñador enfocado en resultados
        </h2>

        {/* Bio */}
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Hola, soy [Tu Nombre]. Llevo más de 3 años ayudando a empresas a
          destacar online con sitios web que no solo se ven increíbles, sino
          que también convierten.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { value: "+50", label: "Proyectos" },
            { value: "3+", label: "Años" },
            { value: "100%", label: "Satisfacción" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`text-center p-4 rounded-xl bg-muted/50 transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="font-display text-2xl font-bold text-accent">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-3">
          {features.map((feature) => (
            <div
              key={feature}
              className={`flex items-center gap-3 transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-accent" />
              </div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
