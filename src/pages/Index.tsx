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
      <div className="min-h-screen">
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
    </LanguageProvider>
  );
};

export default Index;
