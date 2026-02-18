import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ReactLenis } from "lenis/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { FilmGrain } from "@/components/motion/FilmGrain";

import owlBg from "@/assets/owl-bg.png";

const queryClient = new QueryClient();

const lenisOptions = {
  lerp: 0.07,
  duration: 1.4,
  smoothWheel: true,
  wheelMultiplier: 0.8,
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <ReactLenis root options={lenisOptions}>
          <div
            className="min-h-screen"
            style={{
              backgroundImage: `url(${owlBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            }}
          >
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
        </ReactLenis>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
