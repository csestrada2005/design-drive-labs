import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const StatsStrip = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
  { label: "Avg delivery: 15 days" },
  { label: "Conversion-first" },
  { label: "Mobile-first" },
  { label: "SEO-ready" }];


  return;
























};