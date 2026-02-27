/**
 * FeaturedWork — Premium "Our Work" gallery with flip cards
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MicroCTA } from "@/components/motion/MicroCTA";
import { ProjectFlipCard } from "@/components/motion/ProjectFlipCard";
import { useLanguage } from "@/contexts/LanguageContext";

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
    contextEs: "Cadena de restaurantes escalando pedidos online.",
    whatWeDid: "Custom storefront · checkout optimization · SEO",
    whatWeDidEs: "Tienda personalizada · optimización de checkout · SEO",
    outcome: "Improved order flow + page speed + organic reach",
    outcomeEs: "Mejor flujo de pedidos + velocidad + alcance orgánico",
  },
  {
    id: "bazar", title: "Bazar Centenario", image: workBazar,
    tag: "Online Store", tagEs: "Tienda Online",
    context: "Multi-vendor marketplace going digital.",
    contextEs: "Marketplace multi-vendedor digitalizándose.",
    whatWeDid: "Product Catalog · Vendor Dashboard · AI Simulator",
    whatWeDidEs: "Catálogo de Productos · Panel de Vendedor · Simulador IA",
    outcome: "Streamlined ops + faster time-to-purchase",
    outcomeEs: "Operaciones optimizadas + compra más rápida",
  },
  {
    id: "jewelry", title: "Joyería Centenario", image: workJewelry,
    tag: "Brand & Web", tagEs: "Marca y Web",
    context: "Luxury jewelry brand building online presence.",
    contextEs: "Marca de joyería de lujo construyendo presencia online.",
    whatWeDid: "Premium Customized Website · Shopify Integration · AOV+ CRO+ Intended Design",
    whatWeDidEs: "Sitio Web Premium Personalizado · Integración Shopify · Diseño AOV+ CRO+",
    outcome: "Elevated brand perception + qualified lead flow",
    outcomeEs: "Percepción de marca elevada + flujo de leads calificados",
  },
  {
    id: "rawpaw", title: "Raw Paw", image: workRawpaw,
    tag: "D2C Brand", tagEs: "Marca D2C",
    context: "Pet food startup scaling paid traffic.",
    contextEs: "Startup de comida para mascotas escalando tráfico pagado.",
    whatWeDid: "Premium Customized Website · AI Integrated Sales System · Customer Dashboard",
    whatWeDidEs: "Sitio Web Premium Personalizado · Sistema de Ventas con IA · Panel de Cliente",
    outcome: "Higher ROAS + lower acquisition cost",
    outcomeEs: "Mayor ROAS + menor costo de adquisición",
  },
  {
    id: "system", title: "Custom System", image: workSystem,
    tag: "CRM / System", tagEs: "CRM / Sistema",
    context: "Service business replacing manual workflows.",
    contextEs: "Negocio de servicios reemplazando procesos manuales.",
    whatWeDid: "Custom CRM · automated messaging · internal portal",
    whatWeDidEs: "CRM personalizado · mensajería automatizada · portal interno",
    outcome: "Ops automated + team efficiency doubled",
    outcomeEs: "Operaciones automatizadas + eficiencia duplicada",
  },
  {
    id: "armahas", title: "Armahas", image: workArmahas,
    tag: "Web Platform", tagEs: "Plataforma Web",
    context: "Growing brand needing a lead-gen engine.",
    contextEs: "Marca en crecimiento necesitando un motor de leads.",
    whatWeDid: "Brand Style Oriented Website · Admin Dashboard · Analytics",
    whatWeDidEs: "Sitio Web Orientado a Marca · Panel de Admin · Analítica",
    outcome: "Increased inbound leads + clearer funnel",
    outcomeEs: "Más leads entrantes + embudo más claro",
  },
];

export const FeaturedWork = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  const localizedProjects = PROJECTS.map((p) => ({
    ...p,
    tag: language === "es" && p.tagEs ? p.tagEs : p.tag,
    context: language === "es" ? p.contextEs : p.context,
    whatWeDid: language === "es" ? p.whatWeDidEs : p.whatWeDid,
    outcome: language === "es" ? p.outcomeEs : p.outcome,
  }));

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
            {t("work.title")} <span className="text-primary">{t("work.titleAccent")}</span>
          </h2>
        </motion.div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 md:gap-10 py-8 sm:py-12">
          {localizedProjects.map((project, i) => (
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
            {t("work.wantNext")}{" "}
            <a href="#contact" className="font-display text-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4">
              {t("work.letsTalk")}
            </a>
          </p>
          <MicroCTA variant="primary" />
        </motion.div>
      </div>
    </section>
  );
};
