import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Footer } from "@/components/premium/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutContent = () => {
  const { language } = useLanguage();

  return (
    <main className="pt-24 pb-16 px-4">
      <div className="container max-w-2xl">
        {/* Hero style header */}
        <div className="text-center mb-14">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-5">
            {language === "es" ? (
              <>Obsesionados con<br /><span className="text-primary">los detalles</span></>
            ) : (
              <>Obsessed with<br /><span className="text-primary">the details</span></>
            )}
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            {language === "es" 
              ? "Somos un estudio pequeño a propósito. Pocos proyectos, atención total."
              : "We're a small studio on purpose. Few projects, total attention."}
          </p>
        </div>

        {/* Stats - Different visual */}
        {/* Mobile: horizontal strips, Desktop: grid */}
        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-3 sm:gap-3 mb-14">
          <div className="glass-card px-4 py-3 sm:p-5 flex items-center justify-between sm:flex-col sm:text-center">
            <p className="text-xs sm:text-xs text-muted-foreground uppercase tracking-wide">
              {language === "es" ? "Proyectos" : "Projects"}
            </p>
            <p className="font-display text-xl sm:text-3xl text-accent">15+</p>
          </div>
          <div className="glass-card px-4 py-3 sm:p-5 flex items-center justify-between sm:flex-col sm:text-center">
            <p className="text-xs sm:text-xs text-muted-foreground uppercase tracking-wide">
              {language === "es" ? "Satisfacción" : "Satisfaction"}
            </p>
            <p className="font-display text-xl sm:text-3xl text-accent">100%</p>
          </div>
          <div className="glass-card px-4 py-3 sm:p-5 flex items-center justify-between sm:flex-col sm:text-center">
            <p className="text-xs sm:text-xs text-muted-foreground uppercase tracking-wide">
              {language === "es" ? "Países" : "Countries"}
            </p>
            <p className="font-display text-xl sm:text-3xl text-accent">2</p>
          </div>
        </div>

        {/* Philosophy - Card */}
        <div className="glass-card p-8 mb-10">
          <h2 className="font-display text-lg mb-4">
            {language === "es" ? "Nuestra filosofía" : "Our philosophy"}
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              {language === "es" 
                ? "Cada sección de tu web tiene un propósito. No diseñamos para que se vea bien — diseñamos para que funcione y convierta."
                : "Every section of your website has a purpose. We don't design to look good — we design to work and convert."}
            </p>
            <p>
              {language === "es" 
                ? "Trabajamos con negocios en crecimiento en Dubái y México."
                : "We work with growing businesses in Dubai and Mexico."}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a 
            href="https://wa.me/522213497090"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle className="w-4 h-4" />
            {language === "es" ? "Hablemos" : "Let's talk"}
          </a>
          <Link
            to="/testimonials"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {language === "es" ? "Ver testimonios" : "See testimonials"}
            <ArrowRight className="w-4 h-4" />
          </Link>
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
