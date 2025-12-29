import { useState } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, Check, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({ title: t("contact.form.success"), description: t("contact.form.response") });
    setTimeout(() => setIsSuccess(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contacto" ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 md:py-32">
      <div className="container px-5 sm:px-6">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 md:gap-20">
          {/* Left */}
          <div>
            <p className={`text-accent font-medium mb-3 sm:mb-4 text-sm sm:text-base transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              {t("contact.title")}
            </p>
            <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {t("contact.headline")}
            </h2>
            <p className={`text-muted-foreground text-sm sm:text-base mb-8 sm:mb-10 transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {t("contact.subtitle")}
            </p>

            {/* Contact options */}
            <div className={`space-y-3 sm:space-y-4 transition-all duration-600 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group active:scale-[0.99]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium group-hover:text-accent transition-colors text-sm sm:text-base">{t("contact.whatsapp")}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{t("contact.whatsapp.desc")}</p>
                </div>
              </a>

              <a href="mailto:hola@danielgarcia.dev" className="flex items-center gap-3 sm:gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group active:scale-[0.99]">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium group-hover:text-accent transition-colors text-sm sm:text-base">{t("contact.email")}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">hola@danielgarcia.dev</p>
                </div>
              </a>

              <div className="flex items-center gap-3 sm:gap-4 p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base">{t("contact.location")}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Madrid, España</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`transition-all duration-600 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <form onSubmit={handleSubmit} className="card-elevated p-5 sm:p-8 space-y-5 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">{t("contact.form.name")}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full h-12 sm:h-14 px-4 sm:px-5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-accent transition-colors text-base"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">{t("contact.form.email")}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full h-12 sm:h-14 px-4 sm:px-5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-accent transition-colors text-base"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">{t("contact.form.message")}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder={t("contact.form.placeholder")}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-accent transition-colors resize-none text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="touch-target w-full h-14 bg-accent text-accent-foreground font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors disabled:opacity-80 active:scale-[0.99] text-base"
              >
                {isSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    {t("contact.form.success")}
                  </>
                ) : isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    {t("contact.form.submit")}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                {t("contact.form.response")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
