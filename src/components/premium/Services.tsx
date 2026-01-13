import { useLanguage } from "@/contexts/LanguageContext";
import { Rocket, Palette, ShoppingBag, Smartphone } from "lucide-react";

const services = [
  {
    icon: Rocket,
    titleEs: "Landing Pages",
    titleEn: "Landing Pages",
    descEs: "Páginas que convierten visitantes en clientes",
    descEn: "Pages that convert visitors into customers",
  },
  {
    icon: Palette,
    titleEs: "Sitios Corporativos",
    titleEn: "Corporate Sites",
    descEs: "Presencia profesional que genera confianza",
    descEn: "Professional presence that builds trust",
  },
  {
    icon: ShoppingBag,
    titleEs: "E-commerce",
    titleEn: "E-commerce",
    descEs: "Tiendas online optimizadas para vender",
    descEn: "Online stores optimized to sell",
  },
  {
    icon: Smartphone,
    titleEs: "Menús QR",
    titleEn: "QR Menus",
    descEs: "Menús digitales para restaurantes",
    descEn: "Digital menus for restaurants",
  },
];

export const Services = () => {
  const { language } = useLanguage();

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-2">
            {language === "es" ? "Servicios" : "Services"}
          </p>
          <h2 className="font-display text-xl sm:text-2xl">
            {language === "es" ? "Lo que hacemos" : "What we do"}
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {services.map((service) => (
            <div
              key={service.titleEn}
              className="glass-card p-4 sm:p-5 text-center group hover:border-accent/30 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <h3 className="font-display text-sm sm:text-base mb-1">
                {language === "es" ? service.titleEs : service.titleEn}
              </h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                {language === "es" ? service.descEs : service.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
