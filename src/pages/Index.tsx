import { MobileNav } from "@/components/mobile/MobileNav";
import { MobileHero } from "@/components/mobile/MobileHero";
import { MobileServices } from "@/components/mobile/MobileServices";
import { MobileWork } from "@/components/mobile/MobileWork";
import { MobileAbout } from "@/components/mobile/MobileAbout";
import { MobileContact } from "@/components/mobile/MobileContact";
import { MobileFooter } from "@/components/mobile/MobileFooter";
import { FloatingActions } from "@/components/mobile/FloatingActions";

const Index = () => {
  return (
    <div className="min-h-screen grain">
      <MobileNav />
      <main>
        <MobileHero />
        <MobileServices />
        <MobileWork />
        <MobileAbout />
        <MobileContact />
      </main>
      <MobileFooter />
      <FloatingActions />
    </div>
  );
};

export default Index;
