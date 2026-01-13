import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
  { value: "15+", labelEs: "Proyectos", labelEn: "Projects" },
  { value: "100%", labelEs: "Satisfacción", labelEn: "Satisfaction" },
  { value: "<24h", labelEs: "Respuesta", labelEn: "Response" },
];

export const QuickStats = () => {
  const { language } = useLanguage();

  return (
    <section className="py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center gap-6 sm:gap-12">
          {stats.map((stat) => (
            <div key={stat.labelEn} className="text-center">
              <p className="font-display text-2xl sm:text-3xl text-accent mb-1">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">
                {language === "es" ? stat.labelEs : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
