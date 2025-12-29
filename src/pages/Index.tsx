import { Header } from "@/components/premium/Header";
import { Hero } from "@/components/premium/Hero";
import { Stats } from "@/components/premium/Stats";
import { Services } from "@/components/premium/Services";
import { Portfolio } from "@/components/premium/Portfolio";
import { Testimonials } from "@/components/premium/Testimonials";
import { About } from "@/components/premium/About";
import { Contact } from "@/components/premium/Contact";
import { Footer } from "@/components/premium/Footer";
import { FloatingButtons } from "@/components/premium/FloatingButtons";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Portfolio />
        <Services />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
