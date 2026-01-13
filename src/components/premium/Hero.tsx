import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Import project mockups
import projectLaMesa from "@/assets/project-lamesa.png";
import projectRawPaw from "@/assets/project-rawpaw.png";
import projectBumba from "@/assets/project-bumba-1.png";

export const Hero = () => {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-background">
      {/* Tech-style ambient background */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Ambient gradient - top edge glow */}
        <div 
          className="absolute top-0 left-0 right-0 h-[60%]"
          style={{
            background: `linear-gradient(180deg, 
              hsl(220 70% 45% / 0.08) 0%, 
              hsl(230 60% 40% / 0.04) 30%,
              transparent 100%
            )`,
          }}
        />

        {/* Left edge ambient light */}
        <div 
          className="absolute top-0 left-0 w-[40%] h-full"
          style={{
            background: `linear-gradient(90deg, 
              hsl(210 80% 50% / 0.06) 0%, 
              transparent 100%
            )`,
          }}
        />

        {/* Right edge ambient light */}
        <div 
          className="absolute top-0 right-0 w-[40%] h-full"
          style={{
            background: `linear-gradient(270deg, 
              hsl(250 70% 55% / 0.05) 0%, 
              transparent 100%
            )`,
          }}
        />

        {/* Subtle diagonal gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              hsl(200 80% 50% / 0.03) 0%, 
              transparent 40%,
              transparent 60%,
              hsl(260 70% 50% / 0.03) 100%
            )`,
          }}
        />

        {/* Very subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(220 40% 60%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(220 40% 60%) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-accent/30"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                left: `${8 + (i * 7.5)}%`,
                top: `${10 + ((i * 13) % 70)}%`,
                animation: `float-particle ${15 + (i % 5) * 3}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
                opacity: 0.3 + (i % 3) * 0.15,
              }}
            />
          ))}
        </div>

        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* Particle animation styles */}
      <style>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-25px) translateX(15px);
            opacity: 0.4;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="float-particle"] {
            animation: none !important;
          }
        }
      `}</style>
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 pb-8 px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Eyebrow - italic style with subtle glow */}
          <p className="font-display italic text-sm sm:text-base text-foreground/70 mb-4 tracking-wide">
            {language === "es" ? "Tu web, en perfecta armonía." : "Your web, in perfect harmony."}
          </p>

          {/* Main headline with subtle text shadow */}
          <h1 
            className="font-display text-[clamp(2.5rem,10vw,5rem)] leading-[0.95] tracking-tight mb-5"
            style={{
              textShadow: '0 0 80px hsl(220 80% 60% / 0.2)',
            }}
          >
            {language === "es" ? (
              <>
                Diseño que<br />
                <span className="text-foreground bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">Convierte</span>
              </>
            ) : (
              <>
                Design that<br />
                <span className="text-foreground bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">Converts</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
            {language === "es" 
              ? "Creamos sitios web estratégicos para negocios que quieren destacar. Landing pages, e-commerce y más."
              : "We create strategic websites for businesses that want to stand out. Landing pages, e-commerce and more."}
          </p>

          {/* CTA Button - with shimmer effect */}
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-all duration-300 overflow-hidden"
            style={{
              boxShadow: '0 4px 20px hsl(220 80% 50% / 0.15)',
            }}
          >
            {/* Shimmer effect */}
            <span 
              className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ animationDelay: '1s' }}
            />
            <span className="relative">{language === "es" ? "Empezar proyecto" : "Start project"}</span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Floating mockups with enhanced shadows */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-8">
        <div className="flex justify-center items-end gap-3 sm:gap-6">
          {/* Left mockup */}
          <div className="w-[28%] max-w-[180px] transform -rotate-6 translate-y-4 opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
            <div 
              className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
              style={{
                boxShadow: '0 25px 50px -12px hsl(220 80% 20% / 0.4), 0 0 40px hsl(220 70% 50% / 0.1)',
              }}
            >
              <img 
                src={projectLaMesa} 
                alt="La Mesa project"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Center mockup - larger */}
          <div className="w-[40%] max-w-[260px] transform hover:-translate-y-2 transition-all duration-300 z-10">
            <div 
              className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
              style={{
                boxShadow: '0 30px 60px -15px hsl(220 80% 20% / 0.5), 0 0 60px hsl(220 70% 50% / 0.15)',
              }}
            >
              <img 
                src={projectBumba} 
                alt="Bumba project"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right mockup */}
          <div className="w-[28%] max-w-[180px] transform rotate-6 translate-y-4 opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
            <div 
              className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10"
              style={{
                boxShadow: '0 25px 50px -12px hsl(220 80% 20% / 0.4), 0 0 40px hsl(220 70% 50% / 0.1)',
              }}
            >
              <img 
                src={projectRawPaw} 
                alt="Raw Paw project"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[5]"
        style={{
          background: 'linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)',
        }}
      />
    </section>
  );
};
