import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Hero } from "@/components/premium/Hero";
import { Services } from "@/components/premium/Services";
import { QuickStats } from "@/components/premium/QuickStats";
import { Projects } from "@/components/premium/Projects";
import { Footer } from "@/components/premium/Footer";
import { FloatingButtons } from "@/components/premium/FloatingButtons";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="premium-background min-h-screen relative">
        {/* Background layers */}
        <div className="premium-glow premium-glow-primary" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        
        {/* Content */}
        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <QuickStats />
            <Services />
            <Projects />
          </main>
          <Footer />
          <FloatingButtons />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Index;
