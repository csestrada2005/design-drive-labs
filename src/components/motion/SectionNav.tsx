import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
{ id: "hero", label: "Home" },
{ id: "services", label: "Services" },
{ id: "lab", label: "Design Lab" },
{ id: "process", label: "Process" },
{ id: "growth", label: "Impact" },
{ id: "contact", label: "Let's Talk" }];


export const SectionNav = () => {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 200);

      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 200;
          if (scrollY >= top) current = section.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible












































      }
    </AnimatePresence>);

};