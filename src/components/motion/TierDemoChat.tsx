import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Send, Sparkles, Loader2 } from "lucide-react";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/demo-chat`;

type Msg = { role: "user" | "assistant"; content: string };

interface TierDemoChatProps {
  tierName: string;
  tierKey: string;
  accentColor: string;
  onClose: () => void;
}

export const TierDemoChat = ({ tierName, tierKey, accentColor, onClose }: TierDemoChatProps) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  const extractHTML = (text: string): string | null => {
    // Try to find HTML in code blocks
    const codeBlockMatch = text.match(/```(?:html)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) return codeBlockMatch[1].trim();
    // Try to find a div directly
    const divMatch = text.match(/(<div[\s\S]*<\/div>)/i);
    if (divMatch) return divMatch[1];
    return null;
  };

  const send = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Msg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    scrollToBottom();

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg], tier: tierKey }),
      });

      if (!resp.ok || !resp.body) {
        const errorText = resp.status === 429
          ? "Too many requests — please wait a moment."
          : resp.status === 402
          ? "Usage limit reached."
          : "Something went wrong. Try again.";
        setMessages((prev) => [...prev, { role: "assistant", content: errorText }]);
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      const upsertAssistant = (chunk: string) => {
        assistantSoFar += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          }
          return [...prev, { role: "assistant", content: assistantSoFar }];
        });
        scrollToBottom();
      };

      let streamDone = false;
      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    }

    setIsLoading(false);
  };

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const htmlPreview = lastAssistant ? extractHTML(lastAssistant.content) : null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: `${accentColor}15` }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
          <span className="text-xs font-mono tracking-[0.15em] uppercase text-foreground/70">
            {tierName} — AI Demo
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-muted/20"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Chat */}
        <div className="flex-1 flex flex-col min-h-0">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
                <Sparkles className="w-8 h-8" style={{ color: `${accentColor}50` }} />
                <p className="text-sm text-muted-foreground/60 max-w-xs">
                  Describe what you'd like to see and I'll create a quick demo for you.
                </p>
                <p className="text-[10px] font-mono text-muted-foreground/30 tracking-wider">
                  Try: "A product card with hover effects"
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed"
                  style={{
                    background: msg.role === "user"
                      ? `${accentColor}15`
                      : "hsl(222 40% 12% / 0.5)",
                    border: `1px solid ${msg.role === "user" ? `${accentColor}20` : "hsl(222 100% 65% / 0.06)"}`,
                    color: "hsl(220 15% 75%)",
                  }}
                >
                  <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-xl" style={{ background: "hsl(222 40% 12% / 0.5)" }}>
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground/40" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t" style={{ borderColor: `${accentColor}10` }}>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Describe your demo..."
                className="flex-1 bg-transparent text-sm px-3 py-2 rounded-lg outline-none placeholder:text-muted-foreground/30"
                style={{ border: `1px solid ${accentColor}15` }}
              />
              <button
                onClick={send}
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: `${accentColor}15`, color: accentColor }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Preview panel */}
        {htmlPreview && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "50%" }}
            transition={{ duration: 0.4 }}
            className="hidden md:flex border-l flex-col"
            style={{ borderColor: `${accentColor}10` }}
          >
            <div className="px-4 py-2 border-b" style={{ borderColor: `${accentColor}10` }}>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground/40">
                Live Preview
              </span>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center overflow-auto">
              <iframe
                srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0;box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a14;color:#e0e0e0}</style></head><body>${htmlPreview}</body></html>`}
                className="w-full h-full rounded-lg"
                style={{ border: "1px solid hsl(222 100% 65% / 0.06)", minHeight: "200px", background: "#0a0a14" }}
                sandbox="allow-scripts"
                title="Demo Preview"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
