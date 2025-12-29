import { useReveal } from "@/hooks/useAnimations";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M4 12h24" stroke="currentColor" strokeWidth="2" />
        <circle cx="8" cy="9" r="1" fill="currentColor" />
        <circle cx="12" cy="9" r="1" fill="currentColor" />
        <rect x="8" y="16" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Landing Pages",
    description: "Páginas de aterrizaje diseñadas con estrategia para maximizar conversiones y generar leads cualificados.",
    features: ["Diseño persuasivo", "Optimización CRO", "A/B Testing"],
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="2" />
        <path d="M16 5v3M16 24v3M5 16h3M24 16h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Sitios Web",
    description: "Presencia digital profesional que refleja la esencia de tu marca y conecta con tu audiencia ideal.",
    features: ["Diseño único", "SEO optimizado", "Rendimiento superior"],
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M6 8a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="2" />
        <path d="M10 26h12M16 22v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="12" y="10" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "E-commerce",
    description: "Tiendas online diseñadas para vender. Experiencia de compra fluida que convierte visitantes en compradores.",
    features: ["UX optimizada", "Checkout rápido", "Gestión sencilla"],
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
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span
            className={`inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Servicios
          </span>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-serif mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Soluciones diseñadas
            <br />
            <span className="text-gradient">para convertir</span>
          </h2>
          <p
            className={`text-muted-foreground text-lg transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Cada proyecto es único. Mi enfoque combina estrategia, diseño y
            tecnología para crear soluciones que generan resultados reales.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group p-8 md:p-10 bg-card rounded-3xl border border-border shadow-soft card-hover transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-serif mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
