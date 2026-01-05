import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Hero } from "@/components/premium/Hero";
import { Process } from "@/components/premium/Process";
import { Portfolio } from "@/components/premium/Portfolio";
import { Testimonials } from "@/components/premium/Testimonials";
import { About } from "@/components/premium/About";
import { Contact } from "@/components/premium/Contact";
import { Footer } from "@/components/premium/Footer";
import { FloatingButtons } from "@/components/premium/FloatingButtons";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Portfolio />
          <Process />
          <Testimonials />
          <About />
          <Contact />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </LanguageProvider>
  );
};

export default Index;
