import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/demo-chat`;

type Msg = { role: "user" | "assistant"; content: string };

interface TierDemoChatProps {
  onClose: () => void;
}

export const TierDemoChat = ({ onClose }: TierDemoChatProps) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const send = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Msg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setProgress(0);
    setImageUrl(null);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        const increment = Math.max(1, Math.floor((90 - prev) / 10));
        return Math.min(prev + increment, 90);
      });
    }, 500);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      clearInterval(progressInterval);

      if (!resp.ok) {
        const errorText = resp.status === 429
          ? "Too many requests — please wait a moment."
          : resp.status === 402
          ? "Usage limit reached."
          : "Something went wrong. Try again.";
        setMessages((prev) => [...prev, { role: "assistant", content: errorText }]);
        setIsLoading(false);
        setProgress(0);
        return;
      }

      const data = await resp.json();
      
      if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.error }]);
        setProgress(0);
      } else if (data.imageUrl) {
        setProgress(100);
        setImageUrl(data.imageUrl);
        setMessages((prev) => [...prev, { role: "assistant", content: "Demo generated." }]);
      }
    } catch {
      clearInterval(progressInterval);
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
      setProgress(0);
    }

    setIsLoading(false);
  };

  const userMessages = messages.filter((m) => m.role === "user");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20">
            <span className="text-primary text-xs font-bold">C4</span>
          </div>
          <div>
            <span className="text-sm font-display tracking-[0.1em] uppercase text-foreground">
              CUATRE AI
            </span>
            <p className="text-[10px] text-muted-foreground/50 font-mono tracking-wider">
              Interactive Demo Generator
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-muted/20"
          data-cursor="expand"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Main area */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8"
            >
              <Loader2 className="w-8 h-8 animate-spin text-primary/60" />
              <div className="w-full max-w-xs space-y-2">
                <Progress value={progress} className="h-2 bg-muted/20" />
                <p className="text-center text-xs font-mono text-muted-foreground/50 tracking-wider">
                  {progress}% — Generating your demo...
                </p>
              </div>
            </motion.div>
          ) : imageUrl ? (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 overflow-auto"
            >
              <img
                src={imageUrl}
                alt="Generated demo preview"
                className="w-full h-auto block"
              />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            >
              <span className="text-3xl text-primary/20 font-bold font-display">C4</span>
              <p className="text-sm text-muted-foreground/50 max-w-xs text-center">
                Describe what you'd like to see and I'll generate a live preview.
              </p>
              <p className="text-[10px] font-mono text-muted-foreground/25 tracking-wider">
                Try: "A dashboard for tracking sales metrics"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="px-4 pt-2 pb-4 border-t border-primary/10">
        {userMessages.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {userMessages.map((m, i) => (
              <span
                key={i}
                className="text-[10px] px-2.5 py-1 rounded-full truncate max-w-[200px] bg-primary/10 text-primary/70 border border-primary/15"
              >
                {m.content}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            placeholder="Describe your demo..."
            className="flex-1 bg-transparent text-sm px-3 py-2 rounded-lg outline-none placeholder:text-muted-foreground/30 border border-primary/15 focus:border-primary/30 transition-colors"
          />
          <button
            onClick={send}
            disabled={isLoading || !input.trim()}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 bg-primary/15 text-primary"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
