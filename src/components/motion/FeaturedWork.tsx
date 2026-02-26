/**
 * FeaturedWork — Premium "Our Work" gallery with flip cards
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MicroCTA } from "@/components/motion/MicroCTA";
import { ProjectFlipCard } from "@/components/motion/ProjectFlipCard";

import workPapachoa from "@/assets/work-papachoa.png";
import workBazar from "@/assets/work-bazar.png";
import workJewelry from "@/assets/work-jewelry.png";
import workRawpaw from "@/assets/work-rawpaw.png";
import workSystem from "@/assets/work-system.png";
import workArmahas from "@/assets/work-armahas.png";

const PROJECTS = [
  {
    id: "papachoa", title: "Papachoa", image: workPapachoa,
    tag: "E-commerce", context: "Restaurant chain scaling online orders.",
    whatWeDid: "Custom storefront · checkout optimization · SEO",
    outcome: "Improved order flow + page speed + organic reach",
  },
  {
    id: "bazar", title: "Bazar Centenario", image: workBazar,
    tag: "Online Store", context: "Multi-vendor marketplace going digital.",
    whatWeDid: "Product Catalog · Vendor Dashboard · AI Simulator",
    outcome: "Streamlined ops + faster time-to-purchase",
  },
  {
    id: "jewelry", title: "Joyería Centenario", image: workJewelry,
    tag: "Brand & Web", context: "Luxury jewelry brand building online presence.",
    whatWeDid: "Premium Customized Website · Shopify Integration · AOV+ CRO+ Intended Design",
    outcome: "Elevated brand perception + qualified lead flow",
  },
  {
    id: "rawpaw", title: "Raw Paw", image: workRawpaw,
    tag: "D2C Brand", context: "Pet food startup scaling paid traffic.",
    whatWeDid: "Premium Customized Website · AI Integrated Sales System · Customer Dashboard",
    outcome: "Higher ROAS + lower acquisition cost",
  },
  {
    id: "system", title: "Custom System", image: workSystem,
    tag: "CRM / System", context: "Service business replacing manual workflows.",
    whatWeDid: "Custom CRM · automated messaging · internal portal",
    outcome: "Ops automated + team efficiency doubled",
  },
  {
    id: "armahas", title: "Armahas", image: workArmahas,
    tag: "Web Platform", context: "Growing brand needing a lead-gen engine.",
    whatWeDid: "Brand Style Oriented Website · Admin Dashboard · Analytics",
    outcome: "Increased inbound leads + clearer funnel",
  },
];

export const FeaturedWork = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-32 sm:py-40 relative overflow-hidden"
      id="work"
      style={{ minHeight: "100vh" }}
    >
      <div className="container relative z-10">
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
            Our <span className="text-primary">Work.</span>
          </h2>
        </motion.div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 py-8 sm:py-12">
          {PROJECTS.map((project, i) => (
            <ProjectFlipCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            Want yours next?{" "}
            <a href="#contact" className="font-display text-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4">
              Let's talk.
            </a>
          </p>
          <MicroCTA variant="primary" />
        </motion.div>
      </div>
    </section>
  );
};
