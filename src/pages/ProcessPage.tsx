import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Footer } from "@/components/premium/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Palette, Code, Rocket } from "lucide-react";

const steps = [
  { 
    icon: Search, 
    number: "01",
    titleEs: "Descubrimiento", 
    titleEn: "Discovery",
    descEs: "Entendemos tu negocio, audiencia y objetivos.",
    descEn: "We understand your business, audience and goals."
  },
  { 
    icon: Palette, 
    number: "02",
    titleEs: "Diseño", 
    titleEn: "Design",
    descEs: "Creamos el diseño visual y la experiencia.",
    descEn: "We create the visual design and experience."
  },
  { 
    icon: Code, 
    number: "03",
    titleEs: "Desarrollo", 
    titleEn: "Development",
    descEs: "Construimos tu sitio con código limpio.",
    descEn: "We build your site with clean code."
  },
  { 
    icon: Rocket, 
    number: "04",
    titleEs: "Lanzamiento", 
    titleEn: "Launch",
    descEs: "Publicamos y optimizamos para resultados.",
    descEn: "We launch and optimize for results."
  },
];

const ProcessContent = () => {
  const { language } = useLanguage();

  return (
    <main className="pt-28 pb-20 px-4">
      <div className="container max-w-2xl">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <p className="text-accent text-xs font-medium mb-2">
            {language === "es" ? "Proceso" : "Process"}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl mb-4">
            {language === "es" ? "Cómo trabajamos" : "How we work"}
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            {language === "es" 
              ? "Cuatro pasos simples hacia tu nuevo sitio web."
              : "Four simple steps to your new website."}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="glass-card p-6 flex items-start gap-5"
            >
              <div className="flex-shrink-0">
                <span className="font-display text-4xl text-accent/20">{step.number}</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-display text-lg">
                    {language === "es" ? step.titleEs : step.titleEn}
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm">
                  {language === "es" ? step.descEs : step.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a href="/contact" className="btn-primary">
            {language === "es" ? "Empezar proyecto" : "Start project"}
          </a>
        </div>
      </div>
    </main>
  );
};

const ProcessPage = () => {
  return (
    <LanguageProvider>
      <div className="premium-background min-h-screen relative">
        <div className="premium-glow premium-glow-primary" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative z-10">
          <Header />
          <ProcessContent />
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default ProcessPage;
