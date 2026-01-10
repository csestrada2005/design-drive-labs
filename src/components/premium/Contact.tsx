import { useState, useCallback } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, Check, MessageCircle, Mail, MapPin, Clock, Copy, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Simple validation helpers
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidName = (name: string) => name.trim().length >= 2 && name.trim().length <= 100;
const isValidMessage = (message: string) => message.trim().length >= 10 && message.trim().length <= 1000;

interface FieldState {
  value: string;
  touched: boolean;
  error: string;
}

export const Contact = () => {
  const { ref, isVisible } = useReveal();
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const { toast } = useToast();

  const [fields, setFields] = useState<Record<string, FieldState>>({
    name: { value: "", touched: false, error: "" },
    email: { value: "", touched: false, error: "" },
    message: { value: "", touched: false, error: "" },
  });

  const validateField = useCallback((name: string, value: string): string => {
    const trimmed = value.trim();
    switch (name) {
      case "name":
        if (!trimmed) return language === "es" ? "Nombre requerido" : "Name required";
        if (!isValidName(trimmed)) return language === "es" ? "Nombre debe tener 2-100 caracteres" : "Name must be 2-100 characters";
        return "";
      case "email":
        if (!trimmed) return language === "es" ? "Email requerido" : "Email required";
        if (!isValidEmail(trimmed)) return language === "es" ? "Email inválido" : "Invalid email";
        return "";
      case "message":
        if (!trimmed) return language === "es" ? "Mensaje requerido" : "Message required";
        if (!isValidMessage(trimmed)) return language === "es" ? "Mensaje debe tener 10-1000 caracteres" : "Message must be 10-1000 characters";
        return "";
      default:
        return "";
    }
  }, [language]);

  const handleFieldChange = (name: string, value: string) => {
    const error = fields[name].touched ? validateField(name, value) : "";
    setFields((prev) => ({
      ...prev,
      [name]: { value, touched: prev[name].touched, error },
    }));
  };

  const handleFieldBlur = (name: string) => {
    const error = validateField(name, fields[name].value);
    setFields((prev) => ({
      ...prev,
      [name]: { ...prev[name], touched: true, error },
    }));
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("cuatrecasasjosep79@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const newFields = { ...fields };
    let hasError = false;
    Object.keys(newFields).forEach((key) => {
      const error = validateField(key, newFields[key].value);
      newFields[key] = { ...newFields[key], touched: true, error };
      if (error) hasError = true;
    });
    setFields(newFields);

    if (hasError) {
      toast({
        title: language === "es" ? "Error" : "Error",
        description: language === "es" ? "Por favor corrige los errores" : "Please fix the errors",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: fields.name.value.trim(),
          email: fields.email.value.trim(),
          message: fields.message.value.trim(),
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({ title: t("contact.form.success"), description: t("contact.form.response") });
      setTimeout(() => setIsSuccess(false), 3000);
      setFields({
        name: { value: "", touched: false, error: "" },
        email: { value: "", touched: false, error: "" },
        message: { value: "", touched: false, error: "" },
      });
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: language === "es" ? "No se pudo enviar el mensaje. Intenta de nuevo." : "Could not send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 md:py-32">
      <div className="container px-5 sm:px-6">
        {/* Scarcity line */}
        <div
          className={`flex justify-center mb-10 sm:mb-14 transition-all duration-600 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="text-sm sm:text-base font-medium text-accent">
              {t("scarcity.text")}
            </p>
          </div>
        </div>

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
                href="https://wa.me/522213497090?text=Hi!%20I'm%20interested%20in%20your%20service%20%F0%9F%99%82%0A%C2%A1Hola!%20Me%20interesa%20tu%20servicio%0A%0APlease%20reply%20in%20%2F%20Responde%20en%3A%0A%F0%9F%87%AC%F0%9F%87%A7%20English%20%7C%20%F0%9F%87%AA%F0%9F%87%B8%20Espa%C3%B1ol"
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

              <button 
                onClick={handleCopyEmail}
                className="flex items-center gap-3 sm:gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group active:scale-[0.99] w-full text-left"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  {emailCopied ? (
                    <Check className="w-5 h-5 text-accent" />
                  ) : (
                    <Mail className="w-5 h-5 text-accent" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium group-hover:text-accent transition-colors text-sm sm:text-base">{t("contact.email")}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">cuatrecasasjosep79@gmail.com</p>
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium transition-all duration-300 ${emailCopied ? 'text-accent opacity-100' : 'text-muted-foreground opacity-0 group-hover:opacity-100'}`}>
                  {emailCopied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copiar
                    </>
                  )}
                </div>
              </button>

              <div className="flex items-center gap-3 sm:gap-4 p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm sm:text-base">{t("contact.location")}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Dubai, UAE</p>
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
                  value={fields.name.value}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  onBlur={() => handleFieldBlur("name")}
                  className={`w-full h-12 sm:h-14 px-4 sm:px-5 bg-muted/50 border rounded-xl focus:outline-none transition-all text-base ${
                    fields.name.touched && fields.name.error
                      ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                      : fields.name.touched && !fields.name.error && fields.name.value
                      ? "border-green-500/50 focus:border-green-500"
                      : "border-border focus:border-accent"
                  }`}
                />
                {fields.name.touched && fields.name.error && (
                  <p className="mt-1.5 text-xs text-destructive flex items-center gap-1 animate-fade-in">
                    <AlertCircle className="w-3 h-3" />
                    {fields.name.error}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">{t("contact.form.email")}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={fields.email.value}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  onBlur={() => handleFieldBlur("email")}
                  className={`w-full h-12 sm:h-14 px-4 sm:px-5 bg-muted/50 border rounded-xl focus:outline-none transition-all text-base ${
                    fields.email.touched && fields.email.error
                      ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                      : fields.email.touched && !fields.email.error && fields.email.value
                      ? "border-green-500/50 focus:border-green-500"
                      : "border-border focus:border-accent"
                  }`}
                />
                {fields.email.touched && fields.email.error && (
                  <p className="mt-1.5 text-xs text-destructive flex items-center gap-1 animate-fade-in">
                    <AlertCircle className="w-3 h-3" />
                    {fields.email.error}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">{t("contact.form.message")}</label>
                <textarea
                  id="message"
                  name="message"
                  value={fields.message.value}
                  onChange={(e) => handleFieldChange("message", e.target.value)}
                  onBlur={() => handleFieldBlur("message")}
                  rows={4}
                  placeholder={t("contact.form.placeholder")}
                  className={`w-full px-4 sm:px-5 py-3 sm:py-4 bg-muted/50 border rounded-xl focus:outline-none transition-all resize-none text-base ${
                    fields.message.touched && fields.message.error
                      ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20"
                      : fields.message.touched && !fields.message.error && fields.message.value
                      ? "border-green-500/50 focus:border-green-500"
                      : "border-border focus:border-accent"
                  }`}
                />
                {fields.message.touched && fields.message.error && (
                  <p className="mt-1.5 text-xs text-destructive flex items-center gap-1 animate-fade-in">
                    <AlertCircle className="w-3 h-3" />
                    {fields.message.error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="btn-primary touch-target w-full h-14 text-base disabled:opacity-80"
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
