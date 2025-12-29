import { useState } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { Send, Check, ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { ref, isVisible } = useReveal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

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
      className="py-24 md:py-32"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column */}
          <div>
            <span
              className={`inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Contacto
            </span>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-serif mb-6 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              ¿Listo para
              <span className="text-gradient"> empezar</span>?
            </h2>
            <p
              className={`text-muted-foreground text-lg mb-10 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Cuéntame sobre tu proyecto y te enviaré una propuesta personalizada
              en menos de 24 horas.
            </p>

            {/* Contact info */}
            <div
              className={`space-y-6 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:hola@tudominio.com" className="font-medium hover:text-accent transition-colors">
                    hola@tudominio.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="font-medium">Madrid, España</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Disponibilidad</p>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <p className="font-medium">Disponible para proyectos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-3xl border border-border shadow-soft p-8 md:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
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
                    className="w-full h-14 px-5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
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
                    className="w-full h-14 px-5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Cuéntame sobre tu proyecto
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="¿Qué tipo de web necesitas? ¿Cuáles son tus objetivos?"
                  className="w-full px-5 py-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="touch-target w-full h-14 rounded-xl font-medium text-lg flex items-center justify-center gap-2 text-accent-foreground transition-all active:scale-[0.98] disabled:opacity-80"
                style={{ background: "var(--gradient-primary)" }}
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
          </div>
        </div>
      </div>
    </section>
  );
};
