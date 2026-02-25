import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  color: string;
  glow: string;
}

const nodes: Node[] = [
  { id: "storefront", label: "Online Store", sublabel: "", x: 50, y: 8, color: "hsl(350 100% 60%)", glow: "hsl(350 100% 60% / 0.3)" },
  { id: "ai", label: "AI Engine", sublabel: "", x: 88, y: 50, color: "hsl(15 100% 55%)", glow: "hsl(15 100% 55% / 0.3)" },
  { id: "db", label: "Database", sublabel: "", x: 50, y: 92, color: "hsl(20 100% 55%)", glow: "hsl(20 100% 55% / 0.3)" },
  { id: "auto", label: "Messaging", sublabel: "", x: 12, y: 50, color: "hsl(0 100% 50%)", glow: "hsl(0 100% 50% / 0.3)" },
];

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 0], [0, 2], [1, 3],
];

interface Props {
  compact?: boolean;
}

export const SystemBlueprint = ({ compact = false }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const particlesRef = useRef<{ x: number; y: number; progress: number; conn: number; speed: number; color: string }[]>([]);

  const initParticles = useCallback(() => {
    const particles: typeof particlesRef.current = [];
    connections.forEach((conn, ci) => {
      const count = compact ? 1 : 2;
      for (let i = 0; i < count; i++) {
        const fromNode = nodes[conn[0]];
        particles.push({
          x: 0, y: 0,
          progress: Math.random(),
          conn: ci,
          speed: 0.003 + Math.random() * 0.004,
          color: fromNode.color,
        });
      }
    });
    particlesRef.current = particles;
  }, [compact]);

  useEffect(() => {
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const w = rect.width;
      const h = rect.height;

      connections.forEach(([from, to]) => {
        const fx = (nodes[from].x / 100) * w;
        const fy = (nodes[from].y / 100) * h;
        const tx = (nodes[to].x / 100) * w;
        const ty = (nodes[to].y / 100) * h;

        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = "hsla(0, 60%, 40%, 0.08)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      particlesRef.current.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const conn = connections[p.conn];
        const from = nodes[conn[0]];
        const to = nodes[conn[1]];
        const fx = (from.x / 100) * w;
        const fy = (from.y / 100) * h;
        const tx = (to.x / 100) * w;
        const ty = (to.y / 100) * h;

        p.x = fx + (tx - fx) * p.progress;
        p.y = fy + (ty - fy) * p.progress;

        const size = compact ? 2 : 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = compact ? 6 : 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, [compact]);

  const sz = compact ? "w-full h-full" : "w-full aspect-square max-w-md mx-auto";

  return (
    <div className={`relative ${sz}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex flex-col items-center"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 * i, type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: compact ? 28 : 44,
              height: compact ? 28 : 44,
              border: `1px solid ${node.color}`,
              opacity: 0.2,
            }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
          />

          <div
            className="rounded-full relative z-10"
            style={{
              width: compact ? 10 : 16,
              height: compact ? 10 : 16,
              background: node.color,
              boxShadow: `0 0 ${compact ? 10 : 20}px ${node.glow}`,
            }}
          />

          {!compact && (
            <div className="mt-2 text-center whitespace-nowrap">
              <p className="text-[10px] font-mono tracking-wider text-foreground/80">{node.label}</p>
              <p className="text-[8px] font-mono tracking-wider text-muted-foreground">{node.sublabel}</p>
            </div>
          )}
        </motion.div>
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <motion.div
          className="w-2 h-2 rounded-full mx-auto mb-1"
          style={{ background: "hsl(20 100% 55%)" }}
          animate={{ boxShadow: ["0 0 0px hsl(20 100% 55% / 0)", "0 0 14px hsl(20 100% 55% / 0.5)", "0 0 0px hsl(20 100% 55% / 0)"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        {!compact && (
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            All Systems Active
          </span>
        )}
      </div>
    </div>
  );
};