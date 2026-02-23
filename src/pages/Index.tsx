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

        {/* Below fold — lazy with overlap stacking */}
        <Suspense fallback={<SectionSkeleton />}>
          <div className="relative" style={{ zIndex: 10, background: "hsl(var(--background))" }}>
            <SectionSeparator />
            <BuildModes />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <div className="relative -mt-12" style={{ zIndex: 20, background: "hsl(var(--background))" }}>
            <SectionSeparator />
            <DesignLab />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <div className="relative -mt-12" style={{ zIndex: 30, background: "hsl(var(--background))" }}>
            <SectionSeparator />
            <ProcessSection />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <div className="relative -mt-12" style={{ zIndex: 40, background: "hsl(var(--background))" }}>
            <SectionSeparator />
            <GrowthImpact />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <div className="relative -mt-12" style={{ zIndex: 50, background: "hsl(var(--background))" }}>
            <SectionSeparator />
            <FeaturedWork />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <div className="relative -mt-12" style={{ zIndex: 60, background: "hsl(var(--background))" }}>
            <SectionSeparator />
            <StandardsSection />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <div className="relative -mt-12" style={{ zIndex: 70, background: "hsl(var(--background))" }}>
            <SectionSeparator />
            <ChoosePathContact />
          </div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <div className="relative -mt-12" style={{ zIndex: 80, background: "hsl(var(--background))" }}>
            <DramaticFooter />
          </div>
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
