import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Footer } from "@/components/premium/Footer";
import { Contact } from "@/components/premium/Contact";

const ContactPage = () => {
  return (
    <LanguageProvider>
      <div className="premium-background min-h-screen relative">
        <div className="premium-glow premium-glow-primary" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative z-10">
          <Header />
          <main className="pt-20">
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default ContactPage;
