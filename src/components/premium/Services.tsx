import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Rocket, Globe, ShoppingCart, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Rocket,
    number: "01",
    title: "Landing Pages",
    description:
      "Páginas de aterrizaje diseñadas para convertir. Cada elemento está pensado para guiar al visitante hacia la acción que importa, con diseño premium y estrategia de conversión integrada.",
  },
  {
    icon: Globe,
    number: "02",
    title: "Sitios Web",
    description:
      "Tu presencia digital profesional. Sitios web elegantes que transmiten confianza, cuentan tu historia y posicionan tu marca donde merece estar.",
  },
  {
    icon: ShoppingCart,
    number: "03",
    title: "E-commerce + AI",
    description:
      "Tiendas online inteligentes que venden mientras duermes. Con automatizaciones que recuperan carritos abandonados, responden clientes al instante y optimizan cada venta.",
  },
];

export const Services = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();

  const whatsappUrl = "https://wa.me/34600000000?text=Hola%20Josep,%20me%20gustaría%20agendar%20una%20consultoría%20gratis";
  const emailUrl = "mailto:hola@cuatre.es?subject=Consultoría%20Gratis";

  return (
    <section id="servicios" ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 md:py-32">
      <div className="container px-5 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-8 sm:mb-12">
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

        {/* Consultation Banner */}
        <div
          className={`mb-10 sm:mb-14 p-6 sm:p-8 rounded-2xl bg-accent/5 border border-accent/20 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <p className="font-display text-lg sm:text-xl md:text-2xl mb-2">
                ¿No sabes qué necesitas?
              </p>
              <p className="text-muted-foreground text-sm sm:text-base">
                Te digo qué te conviene en 15 minutos. Sin compromiso.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="group bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Agendar por WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-accent/30 hover:bg-accent/10 hover:border-accent/50"
              >
                <a href={emailUrl}>
                  <Mail className="w-4 h-4 mr-2" />
                  Agendar por Email
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.number}
              className={`group p-6 sm:p-8 bg-card rounded-2xl border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-500 active:scale-[0.99] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <span className="text-xs text-muted-foreground font-mono">{service.number}</span>
              <h3 className="font-display text-lg sm:text-xl mt-2 mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Mini CTA */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
                  Agenda consultoría gratis
                </p>
                <div className="flex gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 group/cta"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/cta:opacity-100 group-hover/cta:translate-x-0 transition-all duration-300" />
                  </a>
                  <a
                    href={emailUrl}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-border text-muted-foreground text-sm font-medium hover:border-accent/50 hover:text-accent transition-all duration-300 group/cta"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/cta:opacity-100 group-hover/cta:translate-x-0 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
