import { useRef, lazy, Suspense } from "react";

// ── Critical above-fold (eager load) ────────────────────────────────────────
import { HeroSection } from "@/components/motion/HeroSection";
import { MarqueeTicker } from "@/components/motion/MarqueeTicker";
import { SoundToggle } from "@/components/motion/SoundToggle";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { CornerCrosses } from "@/components/motion/CornerCrosses";
import { SectionNav } from "@/components/motion/SectionNav";
import { HeroTransition } from "@/components/motion/HeroTransition";

// ── Below-fold sections (lazy loaded) ────────────────────────────────────────
const BuildModes        = lazy(() => import("@/components/motion/BuildModes").then(m => ({ default: m.BuildModes })));
const DesignLab         = lazy(() => import("@/components/motion/DesignLab").then(m => ({ default: m.DesignLab })));
const ProcessSection    = lazy(() => import("@/components/motion/ProcessSection").then(m => ({ default: m.ProcessSection })));
const GrowthImpact      = lazy(() => import("@/components/motion/GrowthImpact").then(m => ({ default: m.GrowthImpact })));
const FeaturedWork      = lazy(() => import("@/components/motion/FeaturedWork").then(m => ({ default: m.FeaturedWork })));
const StandardsSection  = lazy(() => import("@/components/motion/StandardsSection").then(m => ({ default: m.StandardsSection })));
const ChoosePathContact = lazy(() => import("@/components/motion/ChoosePathContact").then(m => ({ default: m.ChoosePathContact })));
const DramaticFooter    = lazy(() => import("@/components/motion/DramaticFooter").then(m => ({ default: m.DramaticFooter })));
const SectionSeparator  = lazy(() => import("@/components/motion/SectionSeparator").then(m => ({ default: m.SectionSeparator })));

// Minimal skeleton while lazy chunks load
const SectionSkeleton = () => (
  <div className="py-24 sm:py-32 flex items-center justify-center" aria-hidden="true">
    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary/60 animate-spin" />
  </div>
);

const Index = () => {
  const cursorZoneRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen text-foreground">
      <SoundToggle />
      <CustomCursor containerRef={cursorZoneRef} />
      <CornerCrosses />
      <SectionNav />
      <HeroTransition />

      <main ref={cursorZoneRef}>
        {/* Above fold — eager */}
        <HeroSection />
        <MarqueeTicker />

        {/* Below fold — lazy with Suspense boundaries per section */}
        <Suspense fallback={<SectionSkeleton />}>
          <BuildModes />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <DesignLab />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ProcessSection />
          <SectionSeparator />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <GrowthImpact />
          <SectionSeparator />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <FeaturedWork />
          <SectionSeparator />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <StandardsSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ChoosePathContact />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <DramaticFooter />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
