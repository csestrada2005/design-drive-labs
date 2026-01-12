import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Footer } from "@/components/premium/Footer";
import { Contact } from "@/components/premium/Contact";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactHeader = () => {
  const { language } = useLanguage();
  
  return (
    <div className="pt-24 pb-8 px-4 text-center">
      <div className="container max-w-lg">
        <span className="inline-block w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👋</span>
        </span>
        <h1 className="font-display text-2xl sm:text-3xl mb-2">
          {language === "es" ? "¿Hablamos?" : "Let's talk?"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {language === "es" 
            ? "Cuéntanos sobre tu proyecto. Sin compromiso."
            : "Tell us about your project. No commitment."}
        </p>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <LanguageProvider>
      <div className="premium-background min-h-screen relative">
        <div className="premium-glow premium-glow-primary" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative z-10">
          <Header />
          <ContactHeader />
          <Contact />
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default ContactPage;
