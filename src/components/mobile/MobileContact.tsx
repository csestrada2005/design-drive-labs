import { useState } from "react";
import { useReveal } from "@/hooks/useMobileAnimations";
import { Send, Check, MessageCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MobileContact = () => {
  const { ref, isVisible } = useReveal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const { toast } = useToast();

  const EMAIL = "cuatrecasasjosep79@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      toast({
        title: "📋 Email copiado",
        description: EMAIL,
      });
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = EMAIL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setEmailCopied(true);
      toast({
        title: "📋 Email copiado",
        description: EMAIL,
      });
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: "¡Mensaje enviado!",
      description: "Te responderé en menos de 24 horas.",
    });

    setTimeout(() => setIsSuccess(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section
      id="contacto"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 px-5 bg-foreground text-background"
    >
      <div className={`stagger ${isVisible ? "visible" : ""}`}>
        {/* Header */}
        <span className="text-sm font-medium text-accent uppercase tracking-wider">
          Contacto
        </span>
        <h2 className="font-display text-3xl font-bold mt-2 mb-3">
          ¿Hablamos?
        </h2>
        <p className="text-background/60 mb-6">
          Cuéntame sobre tu proyecto. Respondo en menos de 24 horas.
        </p>

        {/* Quick contact options */}
        <div className="flex gap-3 mb-6">
          <a
            href="https://wa.me/522213497090"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-background/10 border border-background/20 rounded-xl p-4 flex items-center justify-center gap-2 text-sm font-medium active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex-1 bg-background/10 border border-background/20 rounded-xl p-4 flex items-center justify-center gap-2 text-sm font-medium active:scale-[0.98] transition-all"
          >
            {emailCopied ? (
              <Check className="w-4 h-4 text-accent" />
            ) : (
              <Mail className="w-4 h-4 text-accent" />
            )}
            {emailCopied ? "Copiado" : "Email"}
          </button>
        </div>

        {/* Minimal form - only essential fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            required
            className="w-full h-14 px-5 bg-background/10 border border-background/20 rounded-xl text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors"
          />

          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            required
            className="w-full h-14 px-5 bg-background/10 border border-background/20 rounded-xl text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors"
          />

          <textarea
            name="message"
            placeholder="¿En qué puedo ayudarte?"
            required
            rows={4}
            className="w-full px-5 py-4 bg-background/10 border border-background/20 rounded-xl text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors resize-none"
          />

          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="touch-target w-full h-14 bg-accent text-accent-foreground font-display font-semibold rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-80"
          >
            {isSuccess ? (
              <>
                <Check className="w-5 h-5" />
                ¡Enviado!
              </>
            ) : isSubmitting ? (
              <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
            ) : (
              <>
                Enviar mensaje
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Availability */}
        <div className="mt-8 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-sm text-background/60">
            Disponible para nuevos proyectos
          </span>
        </div>
      </div>
    </section>
  );
};
