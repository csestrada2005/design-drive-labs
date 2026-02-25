import { useRef, lazy, Suspense } from "react";
import { LaserWipeTransition } from "@/components/motion/LaserWipeTransition";

// ── Critical above-fold (eager load) ────────────────────────────────────────
import { HeroSection } from "@/components/motion/HeroSection";

import { MarqueeTicker } from "@/components/motion/MarqueeTicker";
import { SoundToggle } from "@/components/motion/SoundToggle";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { CornerCrosses } from "@/components/motion/CornerCrosses";
import { SectionNav } from "@/components/motion/SectionNav";
import { StickyMobileCTA } from "@/components/motion/StickyMobileCTA";
import { SectionLabelToast } from "@/components/motion/SectionLabelToast";


// ── Below-fold sections (lazy loaded) ────────────────────────────────────────

const DesignLab         = lazy(() => import("@/components/motion/DesignLab").then(m => ({ default: m.DesignLab })));
const ProcessSection    = lazy(() => import("@/components/motion/ProcessSection").then(m => ({ default: m.ProcessSection })));
const GrowthImpact      = lazy(() => import("@/components/motion/GrowthImpact").then(m => ({ default: m.GrowthImpact })));
const FeaturedWork      = lazy(() => import("@/components/motion/FeaturedWork").then(m => ({ default: m.FeaturedWork })));
const StandardsSection  = lazy(() => import("@/components/motion/StandardsSection").then(m => ({ default: m.StandardsSection })));
const ServicesSection   = lazy(() => import("@/components/motion/ServicesSection").then(m => ({ default: m.ServicesSection })));
const ChoosePathContact = lazy(() => import("@/components/motion/ChoosePathContact").then(m => ({ default: m.ChoosePathContact })));
const DramaticFooter    = lazy(() => import("@/components/motion/DramaticFooter").then(m => ({ default: m.DramaticFooter })));
const SectionReveal     = lazy(() => import("@/components/motion/SectionReveal").then(m => ({ default: m.SectionReveal })));
const TestimonialCards  = lazy(() => import("@/components/motion/TestimonialCards").then(m => ({ default: m.TestimonialCards })));
const FAQSection        = lazy(() => import("@/components/motion/FAQSection").then(m => ({ default: m.FAQSection })));

// Minimal skeleton while lazy chunks load
const SectionSkeleton = () => (
  <div className="py-24 sm:py-32 flex items-center justify-center" aria-hidden="true">
    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary/60 animate-spin" />
  </div>
);

const Index = () => {
  const cursorZoneRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen text-foreground relative">
      {/* Dark scrim over bg texture — ensures light text has contrast everywhere */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: "hsl(var(--background) / 0.88)",
        }}
      />

      <SoundToggle />
      <CustomCursor containerRef={cursorZoneRef} />
      <CornerCrosses />
      <SectionNav />
      <StickyMobileCTA />
      <SectionLabelToast />

      <main ref={cursorZoneRef} className="relative z-[1]">
        {/* Above fold — eager */}
        <HeroSection />
        <MarqueeTicker />

        {/* Below fold — fluid section reveals */}
        <Suspense fallback={<SectionSkeleton />}>
          <SectionReveal>
            <ServicesSection />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <SectionReveal>
            <DesignLab />
          </SectionReveal>
        </Suspense>

        {/* Full-screen laser wipe: Design Lab → How We Work */}
        <LaserWipeTransition />

        <Suspense fallback={<SectionSkeleton />}>
          <SectionReveal>
            <ProcessSection />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <SectionReveal>
            <GrowthImpact />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialCards />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <SectionReveal>
            <FeaturedWork />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <SectionReveal>
            <StandardsSection />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <SectionReveal>
            <FAQSection />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <SectionReveal>
            <ChoosePathContact />
          </SectionReveal>
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <DramaticFooter />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
