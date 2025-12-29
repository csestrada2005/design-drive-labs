import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Rocket, Globe, ShoppingCart } from "lucide-react";

export const Services = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();

  const services = [
    {
      icon: Rocket,
      number: "01",
      title: t("services.landing.title"),
      description: t("services.landing.desc"),
      features: ["Diseño UX/UI", "Optimización CRO", "Análisis A/B"],
    },
    {
      icon: Globe,
      number: "02",
      title: t("services.web.title"),
      description: t("services.web.desc"),
      features: ["SEO optimizado", "Responsive", "CMS integrado"],
    },
    {
      icon: ShoppingCart,
      number: "03",
      title: t("services.ecommerce.title"),
      description: t("services.ecommerce.desc"),
      features: ["Checkout rápido", "Pagos seguros", "Gestión fácil"],
    },
  ];

  return (
    <section id="servicios" ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 md:py-32">
      <div className="container px-5 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-10 sm:mb-16">
          <p
            className={`text-accent font-medium mb-3 sm:mb-4 text-sm sm:text-base transition-all duration-600 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {t("services.title")}
          </p>
          <h2
            className={`font-display text-2xl sm:text-3xl md:text-4xl leading-tight transition-all duration-600 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t("services.headline")}
            <br className="hidden sm:block" />
            <span className="text-muted-foreground"> {t("services.subheadline")}</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.number}
              className={`group p-6 sm:p-8 bg-card rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-500 active:scale-[0.99] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <span className="text-xs text-muted-foreground font-mono">{service.number}</span>
              <h3 className="font-display text-lg sm:text-xl mt-2 mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-5 sm:mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {feature}
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
