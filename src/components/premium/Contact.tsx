import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, Check, MessageCircle, Mail, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

interface FieldState {
  value: string;
  touched: boolean;
  error: string;
}

export const Contact = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
        if (!trimmed) return language === "es" ? "Requerido" : "Required";
        return "";
      case "email":
        if (!trimmed) return language === "es" ? "Requerido" : "Required";
        if (!isValidEmail(trimmed)) return language === "es" ? "Email inválido" : "Invalid email";
        return "";
      case "message":
        if (!trimmed) return language === "es" ? "Requerido" : "Required";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFields = { ...fields };
    let hasError = false;
    Object.keys(newFields).forEach((key) => {
      const error = validateField(key, newFields[key].value);
      newFields[key] = { ...newFields[key], touched: true, error };
      if (error) hasError = true;
    });
    setFields(newFields);

    if (hasError) return;

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
      toast({ 
        title: language === "es" ? "¡Enviado!" : "Sent!", 
        description: language === "es" ? "Te respondo pronto" : "I'll respond soon" 
      });
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
        description: language === "es" ? "No se pudo enviar" : "Could not send",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container max-w-lg">
        {/* Section divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-border" />
          <h1 className="font-display text-2xl sm:text-3xl">
            {language === "es" ? "Contacto" : "Contact"}
          </h1>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Quick options */}
        <div className="flex gap-3 mb-8">
          <a
            href="https://wa.me/522213497090"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 glass-card p-4 flex items-center justify-center gap-2 text-sm font-medium hover:border-[#25D366]/50 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            WhatsApp
          </a>
          <a
            href="mailto:cuatrecasasjosep79@gmail.com"
            className="flex-1 glass-card p-4 flex items-center justify-center gap-2 text-sm font-medium hover:border-accent/50 transition-colors"
          >
            <Mail className="w-4 h-4 text-accent" />
            Email
          </a>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder={language === "es" ? "Nombre" : "Name"}
              value={fields.name.value}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              onBlur={() => handleFieldBlur("name")}
              className={`w-full h-12 px-4 glass-input rounded-xl text-sm ${
                fields.name.touched && fields.name.error ? "border-destructive" : ""
              }`}
            />
            {fields.name.touched && fields.name.error && (
              <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {fields.name.error}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={fields.email.value}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleFieldBlur("email")}
              className={`w-full h-12 px-4 glass-input rounded-xl text-sm ${
                fields.email.touched && fields.email.error ? "border-destructive" : ""
              }`}
            />
            {fields.email.touched && fields.email.error && (
              <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {fields.email.error}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder={language === "es" ? "Cuéntame sobre tu proyecto..." : "Tell me about your project..."}
              value={fields.message.value}
              onChange={(e) => handleFieldChange("message", e.target.value)}
              onBlur={() => handleFieldBlur("message")}
              rows={4}
              className={`w-full px-4 py-3 glass-input rounded-xl resize-none text-sm ${
                fields.message.touched && fields.message.error ? "border-destructive" : ""
              }`}
            />
            {fields.message.touched && fields.message.error && (
              <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {fields.message.error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="btn-primary w-full h-12 text-sm disabled:opacity-80"
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4" />
                {language === "es" ? "Enviado" : "Sent"}
              </>
            ) : isSubmitting ? (
              <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
            ) : (
              <>
                {language === "es" ? "Enviar" : "Send"}
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
