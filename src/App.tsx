import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ReactLenis } from "lenis/react";
import { TopMenu } from "@/components/motion/TopMenu";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { FilmGrain } from "@/components/motion/FilmGrain";
import { LivingBackground } from "@/components/motion/LivingBackground";
import { ServiceChooserProvider } from "@/components/motion/ServiceChooserModal";
import { IntroOverlay } from "@/components/motion/IntroOverlay";
import { LanguageProvider } from "@/contexts/LanguageContext";

import owlBg from "@/assets/owl-bg.png";

const queryClient = new QueryClient();

const lenisOptions = {
  lerp: 0.12,
  duration: 1.0,
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.5,
  infinite: false,
};

const App = () => {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroDone(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <TooltipProvider>
          <ReactLenis root options={lenisOptions}>
            <LanguageProvider>
            <ServiceChooserProvider>
              {/* Intro overlay — covers everything until preload done */}
              {!introDone && <IntroOverlay onComplete={handleIntroComplete} />}

              <div
                id="bg-wrapper"
                className="fixed inset-0 z-[-1] overflow-hidden"
                style={{
                  backgroundImage: `url(${owlBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <LivingBackground />
                <FilmGrain />
              </div>

              <div
                className="relative min-h-screen flex flex-col"
                style={{
                  opacity: introDone ? 1 : 0,
                  transition: "opacity 0.35s ease-out",
                }}
              >
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </div>
              <TopMenu />
            </ServiceChooserProvider>
            </LanguageProvider>
          </ReactLenis>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
