import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { VariableProximity } from "./VariableProximity";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const budgetOptions = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
];

export const ContactSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!isValidEmail(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          message: `${form.message.trim()}\n\nPhone: ${form.phone || "N/A"}\nBudget: ${form.budget || "N/A"}`,
        },
      });
      if (error) throw error;

      setIsSuccess(true);
      toast({ title: "Sent!", description: "We'll respond soon." });
      setTimeout(() => setIsSuccess(false), 3000);
      setForm({ name: "", email: "", phone: "", budget: "", message: "" });
      setErrors({});
    } catch {
      toast({ title: "Error", description: "Could not send. Try WhatsApp.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full h-12 px-4 glass-input rounded-lg text-sm bg-card/40 border ${
      errors[field] ? "border-destructive" : "border-border/40"
    } focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground/50`;

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.25 + i * 0.08, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
    }),
  };

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="contact">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(222 100% 65% / 0.06), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl mb-3 leading-[0.95]">
            <VariableProximity
              label="LET'S TALK."
              className="inline-block cursor-default"
              containerRef={ref as React.RefObject<HTMLElement>}
              radius={150}
              fromFontVariationSettings="'wght' 300"
              toFontVariationSettings="'wght' 900"
            />
          </h2>
          <motion.p
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Tell us about your project. We respond within 24 hours.
          </motion.p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { i: 0, el: (
              <div key="name">
                <motion.input
                  custom={0} variants={fieldVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
                  type="text" placeholder="Name *" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass("name")}
                  whileFocus={{ borderColor: "hsl(222 100% 65% / 0.6)", boxShadow: "0 0 20px hsl(222 100% 65% / 0.1)" }}
                />
                {errors.name && <p className="mt-1 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
              </div>
            )},
            { i: 1, el: (
              <div key="email">
                <motion.input
                  custom={1} variants={fieldVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
                  type="email" placeholder="Email *" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass("email")}
                  whileFocus={{ borderColor: "hsl(222 100% 65% / 0.6)", boxShadow: "0 0 20px hsl(222 100% 65% / 0.1)" }}
                />
                {errors.email && <p className="mt-1 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
              </div>
            )},
            { i: 2, el: (
              <motion.input
                key="phone" custom={2} variants={fieldVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
                type="tel" placeholder="WhatsApp / Phone" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass("")}
                whileFocus={{ borderColor: "hsl(222 100% 65% / 0.6)", boxShadow: "0 0 20px hsl(222 100% 65% / 0.1)" }}
              />
            )},
            { i: 3, el: (
              <motion.select
                key="budget" custom={3} variants={fieldVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className={`${inputClass("")} appearance-none`}
              >
                <option value="">Budget (optional)</option>
                {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
              </motion.select>
            )},
            { i: 4, el: (
              <div key="message">
                <motion.textarea
                  custom={4} variants={fieldVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
                  placeholder="Project description *" rows={4} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass("message")} h-auto py-3 resize-none`}
                  whileFocus={{ borderColor: "hsl(222 100% 65% / 0.6)", boxShadow: "0 0 20px hsl(222 100% 65% / 0.1)" }}
                />
                {errors.message && <p className="mt-1 text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
              </div>
            )},
          ].map(({ el }) => el)}

          <motion.button
            custom={5} variants={fieldVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="btn-primary w-full h-12 text-sm disabled:opacity-70"
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(222 100% 65% / 0.25)" }}
            whileTap={{ scale: 0.98 }}
          >
            {isSuccess ? (
              <><Check className="w-4 h-4" /> Sent</>
            ) : isSubmitting ? (
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>Send <Send className="w-4 h-4" /></>
            )}
          </motion.button>
        </form>
      </div>
    </section>
  );
};
