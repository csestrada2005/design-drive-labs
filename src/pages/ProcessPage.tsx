import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Footer } from "@/components/premium/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Palette, Code, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    <main className="pt-24 pb-16 px-4">
      <div className="container max-w-3xl">
        {/* Page Header - Left aligned, distinctive */}
        <div className="mb-12">
          <span className="inline-block px-3 py-1 text-[10px] font-medium bg-accent/10 text-accent rounded-full mb-4">
            {language === "es" ? "PROCESO" : "PROCESS"}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-3">
            {language === "es" ? "Cómo trabajamos" : "How we work"}
          </h1>
          <p className="text-muted-foreground text-sm max-w-md">
            {language === "es" 
              ? "Cuatro pasos simples hacia tu nuevo sitio web."
              : "Four simple steps to your new website."}
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent hidden sm:block" />
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative flex gap-5 sm:gap-8"
              >
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-accent" />
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-accent/40 font-display text-sm">{step.number}</span>
                    <h2 className="font-display text-lg sm:text-xl">
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
        </div>

        {/* CTA */}
        <div className="mt-14 pt-8 border-t border-border">
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
          >
            {language === "es" ? "Empezar mi proyecto" : "Start my project"}
            <ArrowRight className="w-4 h-4" />
          </Link>
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
