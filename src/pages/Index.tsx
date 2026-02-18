import { useState, useCallback, useRef } from "react";
import { LoadingScreen } from "@/components/motion/LoadingScreen";
import { HeroSection } from "@/components/motion/HeroSection";
import { MarqueeTicker } from "@/components/motion/MarqueeTicker";
import { StatsStrip } from "@/components/motion/StatsStrip";
import { ServicesSection } from "@/components/motion/ServicesSection";
import { DesignLab } from "@/components/motion/DesignLab";
import { ProcessSection } from "@/components/motion/ProcessSection";
import { GrowthImpact } from "@/components/motion/GrowthImpact";
import { FeaturedWork } from "@/components/motion/FeaturedWork";
import { BigCTA } from "@/components/motion/BigCTA";
import { ContactSection } from "@/components/motion/ContactSection";
import { DramaticFooter } from "@/components/motion/DramaticFooter";
import { BottomNav } from "@/components/motion/BottomNav";
import { SoundToggle } from "@/components/motion/SoundToggle";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { CornerCrosses } from "@/components/motion/CornerCrosses";
import { ChatWidget } from "@/components/motion/ChatWidget";
import { ScrollRevealText } from "@/components/motion/ScrollRevealText";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const cursorZoneRef = useRef<HTMLDivElement>(null);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!isLoaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {isLoaded && (
        <>
          <SoundToggle />
          <CustomCursor containerRef={cursorZoneRef} />
          <CornerCrosses />
          <ChatWidget />
          <main ref={cursorZoneRef}>
            <HeroSection />
            <MarqueeTicker />
            <StatsStrip />

            <section className="py-20 sm:py-28 relative overflow-hidden">
              <div className="container max-w-4xl">
                <ScrollRevealText
                  text="WE BUILD DIGITAL EXPERIENCES THAT TURN VISITORS INTO CUSTOMERS."
                  highlightWords={["DIGITAL", "VISITORS", "CUSTOMERS"]}
                />
              </div>
            </section>

            <ServicesSection />
            <DesignLab />
            <ProcessSection />
            <GrowthImpact />
            <FeaturedWork />
            <BigCTA />
            <ContactSection />
            <DramaticFooter />
          </main>
          <BottomNav />
        </>
      )}
    </div>
  );
};

export default Index;
