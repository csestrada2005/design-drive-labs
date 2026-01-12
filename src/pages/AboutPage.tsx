import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Footer } from "@/components/premium/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Target, Eye, Zap, MessageCircle } from "lucide-react";

const values = [
  { 
    icon: Target, 
    titleEs: "Enfocados", 
    titleEn: "Focused",
    descEs: "Cada decisión tiene un propósito claro.",
    descEn: "Every decision has a clear purpose."
  },
  { 
    icon: Eye, 
    titleEs: "Obsesivos", 
    titleEn: "Obsessive",
    descEs: "Los detalles hacen la diferencia.",
    descEn: "Details make the difference."
  },
  { 
    icon: Zap, 
    titleEs: "Directos", 
    titleEn: "Direct",
    descEs: "Comunicación clara, entregas rápidas.",
    descEn: "Clear communication, fast delivery."
  },
];

const AboutContent = () => {
  const { language } = useLanguage();

  return (
    <main className="pt-28 pb-20 px-4">
      <div className="container max-w-2xl">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <p className="text-accent text-xs font-medium mb-2">
            {language === "es" ? "Sobre nosotros" : "About us"}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl mb-4">
            {language === "es" ? "Diseño que convierte" : "Design that converts"}
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            {language === "es" 
              ? "Creamos sitios web que generan resultados reales para negocios reales."
              : "We create websites that generate real results for real businesses."}
          </p>
        </div>

        {/* Bio */}
        <div className="glass-card p-8 mb-10 text-center">
          <p className="text-foreground/90 leading-relaxed">
            {language === "es" 
              ? "Nos especializamos en landing pages, sitios corporativos y tiendas online. Diseño estratégico enfocado en conversión."
              : "We specialize in landing pages, corporate sites and online stores. Strategic design focused on conversion."}
          </p>
        </div>

        {/* Values */}
        <div className="grid gap-4">
          {values.map((value) => (
            <div 
              key={value.titleEn}
              className="glass-card p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <value.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-base mb-0.5">
                  {language === "es" ? value.titleEs : value.titleEn}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === "es" ? value.descEs : value.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a 
            href="https://wa.me/522213497090"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {language === "es" ? "Hablemos" : "Let's talk"}
          </a>
        </div>
      </div>
    </main>
  );
};

const AboutPage = () => {
  return (
    <LanguageProvider>
      <div className="premium-background min-h-screen relative">
        <div className="premium-glow premium-glow-primary" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative z-10">
          <Header />
          <AboutContent />
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default AboutPage;
