import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  {
    titleEs: "Landing Pages",
    titleEn: "Landing Pages",
    descEs: "Páginas enfocadas en una acción. Ideales para campañas, lanzamientos y captación de leads.",
    descEn: "Pages focused on one action. Perfect for campaigns, launches and lead capture.",
  },
  {
    titleEs: "Sitios Corporativos",
    titleEn: "Corporate Sites",
    descEs: "Presencia digital profesional que genera confianza y posiciona tu marca en el mercado.",
    descEn: "Professional digital presence that builds trust and positions your brand in the market.",
  },
  {
    titleEs: "E-commerce",
    titleEn: "E-commerce",
    descEs: "Tiendas online optimizadas para vender. Experiencia de compra fluida y segura.",
    descEn: "Online stores optimized to sell. Smooth and secure shopping experience.",
  },
];

export const Services = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section header - editorial style */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-16 sm:mb-20">
          <h2 className="font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.05]">
            {language === "es" ? (
              <>
                Diseñado para<br />
                Ayudarte a Hacer<br />
                Más <span className="italic font-normal text-muted-foreground">Con Menos</span>
              </>
            ) : (
              <>
                Designed to<br />
                Help You Do<br />
                More <span className="italic font-normal text-muted-foreground">With Less</span>
              </>
            )}
          </h2>
          <div className="flex items-end">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md">
              {language === "es" 
                ? "Nuestro enfoque está construido para negocios modernos que quieren estar organizados, enfocados y en control de su presencia digital."
                : "Our approach is built for modern businesses who want to stay organized, focused, and in control of their digital presence."}
            </p>
          </div>
        </div>

        {/* Services grid - clean cards with glowing border on hover */}
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div 
              key={service.titleEn} 
              className="group relative p-6 -m-6 rounded-xl transition-all duration-500 hover:bg-accent/[0.03]"
            >
              {/* Glowing border effect on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-xl border border-accent/20" />
                <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-accent/10 via-transparent to-transparent opacity-50" />
              </div>
              
              <div className="relative">
                <h3 className="font-display text-base sm:text-lg mb-3 group-hover:text-accent transition-colors">
                  {language === "es" ? service.titleEs : service.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === "es" ? service.descEs : service.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
