import { useReveal } from "@/hooks/useAnimations";

const services = [
  {
    number: "01",
    title: "Landing Pages",
    description: "Páginas enfocadas en un objetivo: convertir. Diseño persuasivo, carga rápida, resultados medibles.",
  },
  {
    number: "02",
    title: "Sitios Web",
    description: "Presencia digital que refleja quién eres. Navegación intuitiva, diseño memorable, rendimiento óptimo.",
  },
  {
    number: "03",
    title: "E-commerce",
    description: "Tiendas que venden. Experiencia de compra sin fricciones, checkout optimizado, gestión sencilla.",
  },
];

export const Services = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section
      id="servicios"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32"
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left - Header */}
          <div>
            <p
              className={`text-accent font-medium mb-4 transition-all duration-600 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Servicios
            </p>
            <h2
              className={`font-display text-3xl md:text-4xl leading-tight transition-all duration-600 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Diseño con propósito.
              <br />
              <span className="text-muted-foreground">Resultados reales.</span>
            </h2>
          </div>

          {/* Right - Services */}
          <div className="space-y-0">
            {services.map((service, index) => (
              <div
                key={service.number}
                className={`py-8 border-b border-border group transition-all duration-600 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-sm text-muted-foreground pt-1">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
