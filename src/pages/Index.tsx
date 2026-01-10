import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Hero } from "@/components/premium/Hero";
import { Process } from "@/components/premium/Process";
import { Methodology } from "@/components/premium/Methodology";
import { Testimonials } from "@/components/premium/Testimonials";
import { About } from "@/components/premium/About";
import { Contact } from "@/components/premium/Contact";
import { Footer } from "@/components/premium/Footer";
import { FloatingButtons } from "@/components/premium/FloatingButtons";
import { ScrollProgress } from "@/components/premium/ScrollProgress";
import { StickyCTA } from "@/components/premium/StickyCTA";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="premium-background min-h-screen relative">
        {/* Background layers */}
        <div className="premium-glow premium-glow-primary" aria-hidden="true" />
        <div className="premium-glow premium-glow-secondary" aria-hidden="true" />
        <div className="animated-gradient" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
        
        {/* Content */}
        <div className="relative z-10">
          <ScrollProgress />
          <Header />
          <main>
            <Hero />
            <Process />
            <Methodology />
            <Testimonials />
            <About />
            <Contact />
          </main>
          <Footer />
          <FloatingButtons />
          <StickyCTA />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Index;