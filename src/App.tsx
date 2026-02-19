import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ReactLenis } from "lenis/react";
import { BottomNav } from "@/components/motion/BottomNav";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { FilmGrain } from "@/components/motion/FilmGrain";
import { LivingBackground } from "@/components/motion/LivingBackground";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <ReactLenis root options={lenisOptions}>
          <div
            id="bg-wrapper"
            className="min-h-screen relative"
            style={{
              backgroundImage: `url(${owlBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            }}
          >
            <LivingBackground />
            <FilmGrain />
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
          <BottomNav />
        </ReactLenis>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
