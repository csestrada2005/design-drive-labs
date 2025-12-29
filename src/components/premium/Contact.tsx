import { useState } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { Send, Check, MessageCircle, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { ref, isVisible } = useReveal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({ title: "Mensaje enviado", description: "Te responderé pronto." });
    setTimeout(() => setIsSuccess(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section
      id="contacto"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32"
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left */}
          <div>
            <p
              className={`text-accent font-medium mb-4 transition-all duration-600 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Contacto
            </p>
            <h2
              className={`font-display text-3xl md:text-4xl mb-6 transition-all duration-600 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              ¿Hablamos?
            </h2>
            <p
              className={`text-muted-foreground mb-10 transition-all duration-600 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Cuéntame qué necesitas. Respondo en menos de 24 horas.
            </p>

            {/* Direct contact options */}
            <div
              className={`space-y-4 transition-all duration-600 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <a
                href="https://wa.me/34600000000?text=Hola,%20me%20interesa%20un%20proyecto%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-accent transition-colors">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Respuesta rápida</p>
                </div>
              </a>

              <a
                href="mailto:hola@tudominio.com"
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-accent transition-colors">Email</p>
                  <p className="text-sm text-muted-foreground">hola@tudominio.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Ubicación</p>
                  <p className="text-sm text-muted-foreground">Madrid, España</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`transition-all duration-600 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <form onSubmit={handleSubmit} className="card-elevated p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Tu nombre"
                  className="w-full h-14 px-5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full h-14 px-5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  ¿En qué puedo ayudarte?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Cuéntame sobre tu proyecto..."
                  className="w-full px-5 py-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="touch-target w-full h-14 bg-foreground text-background font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors disabled:opacity-80"
              >
                {isSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    Enviado
                  </>
                ) : isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                ) : (
                  <>
                    Enviar
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
