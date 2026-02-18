import { useRef } from "react";
import { HeroSection } from "@/components/motion/HeroSection";
import { MarqueeTicker } from "@/components/motion/MarqueeTicker";
import { DesignLab } from "@/components/motion/DesignLab";
import { ProcessSection } from "@/components/motion/ProcessSection";
import { GrowthImpact } from "@/components/motion/GrowthImpact";
import { FeaturedWork } from "@/components/motion/FeaturedWork";
import { BigCTA } from "@/components/motion/BigCTA";
import { ChoosePathContact } from "@/components/motion/ChoosePathContact";
import { DramaticFooter } from "@/components/motion/DramaticFooter";
import { BottomNav } from "@/components/motion/BottomNav";
import { SoundToggle } from "@/components/motion/SoundToggle";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { CornerCrosses } from "@/components/motion/CornerCrosses";
import { NebuOrb } from "@/components/motion/NebuOrb";
import { SectionSeparator } from "@/components/motion/SectionSeparator";
import { BuildModes } from "@/components/motion/BuildModes";
import { StandardsSection } from "@/components/motion/StandardsSection";
import { SectionNav } from "@/components/motion/SectionNav";
import { HeroTransition } from "@/components/motion/HeroTransition";

const Index = () => {
  const cursorZoneRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen text-foreground">
      <SoundToggle />
      <CustomCursor containerRef={cursorZoneRef} />
      <CornerCrosses />
      <NebuOrb />
      <SectionNav />
      <HeroTransition />
      <main ref={cursorZoneRef}>
        <HeroSection />
        <MarqueeTicker />
        <BuildModes />
        <DesignLab />
        <ProcessSection />
        <SectionSeparator />
        <GrowthImpact />
        <SectionSeparator />
        <FeaturedWork />
        <SectionSeparator />
        <StandardsSection />
        <SectionSeparator />
        <BigCTA />
        <ChoosePathContact />
        <DramaticFooter />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
