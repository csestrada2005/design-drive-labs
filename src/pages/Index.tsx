import { useState, useCallback, useRef, useMemo } from "react";
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
import { useFullScreenTransitions, TransitionSection } from "@/components/motion/SectionTransition";

const TRANSITION_SECTIONS = [
  { id: "services", variant: "shutter" as const },
  { id: "designlab", variant: "circuit" as const },
  { id: "process", variant: "data" as const },
  { id: "growth", variant: "shutter" as const },
  { id: "work", variant: "circuit" as const },
  { id: "cta-contact", variant: "data" as const },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const cursorZoneRef = useRef<HTMLDivElement>(null);
  const { registerRef, OverlayPortal } = useFullScreenTransitions(TRANSITION_SECTIONS);

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
          <OverlayPortal />
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

            <TransitionSection registerRef={registerRef(0)}>
              <ServicesSection />
            </TransitionSection>
            <TransitionSection registerRef={registerRef(1)}>
              <DesignLab />
            </TransitionSection>
            <TransitionSection registerRef={registerRef(2)}>
              <ProcessSection />
            </TransitionSection>
            <TransitionSection registerRef={registerRef(3)}>
              <GrowthImpact />
            </TransitionSection>
            <TransitionSection registerRef={registerRef(4)}>
              <FeaturedWork />
            </TransitionSection>
            <TransitionSection registerRef={registerRef(5)}>
              <BigCTA />
              <ContactSection />
              <DramaticFooter />
            </TransitionSection>
          </main>
          <BottomNav />
        </>
      )}
    </div>
  );
};

export default Index;
