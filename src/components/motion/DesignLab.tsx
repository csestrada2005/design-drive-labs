import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, AnimatePresence, useSpring } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import domePapachoa from "@/assets/dome-papachoa.jpg";
import domeRawPaw from "@/assets/dome-rawpaw.jpg";
import domeJewelry from "@/assets/dome-jewelry.jpg";
import domePawnshop from "@/assets/dome-pawnshop.jpg";
import { BlackSandReveal } from "@/components/motion/BlackSandReveal";
import { KineticType } from "@/components/motion/KineticType";


/* ─────────────────────────────────────
   LIQUID GLASS WRAPPER
───────────────────────────────────────*/
const GlassCard = ({
  children,
  className = "",
  minH = 200
}: {children: React.ReactNode;className?: string;minH?: number;}) =>
<div
  className={`relative overflow-hidden rounded-2xl ${className}`}
  style={{
    minHeight: minH,
    background:
    "linear-gradient(135deg, hsl(0 0% 100% / 0.09) 0%, hsl(0 0% 100% / 0.04) 50%, hsl(0 0% 100% / 0.07) 100%)",
    backdropFilter: "blur(22px) saturate(1.4)",
    WebkitBackdropFilter: "blur(22px) saturate(1.4)",
    boxShadow:
    "inset 0 1px 0 hsl(0 0% 100% / 0.18), inset 0 -1px 0 hsl(0 0% 0% / 0.08), inset 1px 0 0 hsl(0 0% 100% / 0.08), 0 8px 40px hsl(0 0% 0% / 0.22), 0 2px 8px hsl(0 0% 0% / 0.12)"
  }}>
    <div
    aria-hidden="true"
    className="absolute pointer-events-none"
    style={{
      inset: 0,
      background:
      "linear-gradient(115deg, hsl(0 0% 100% / 0.13) 0%, transparent 40%, transparent 60%, hsl(0 0% 100% / 0.06) 100%)",
      borderRadius: "inherit"
    }} />
    {children}
  </div>;


/* ─────────────────────────────────────
   DEMO 1 — TRUE FOCUS
───────────────────────────────────────*/
const TrueFocus = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);
  const [userHovering, setUserHovering] = useState(false);
  const autoRef = useRef<number>(0);
  const isInView = useInView(containerRef, { margin: "-100px" });

  const update = useCallback((cx: number, cy: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (cx - rect.left) / rect.width * 100,
      y: (cy - rect.top) / rect.height * 100
    });
  }, []);

  useEffect(() => {
    if (userHovering || !isInView) {
      cancelAnimationFrame(autoRef.current);
      return;
    }
    setActive(true);
    let t = 0;
    const tick = () => {
      t += 0.008;
      setPos({
        x: 50 + Math.sin(t * 1.3) * 30,
        y: 50 + Math.cos(t * 0.9) * 25
      });
      autoRef.current = requestAnimationFrame(tick);
    };
    autoRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoRef.current);
  }, [userHovering, isInView]);

  const focusR = 82;

  return (
    <GlassCard>
      <div
        ref={containerRef}
        className="flex items-center justify-center min-h-[200px] select-none cursor-none"
        style={{ touchAction: "none" }}
        onMouseMove={(e) => {setUserHovering(true);setActive(true);update(e.clientX, e.clientY);}}
        onMouseEnter={() => setUserHovering(true)}
        onMouseLeave={() => setUserHovering(false)}
        onTouchMove={(e) => {e.preventDefault();setUserHovering(true);setActive(true);update(e.touches[0].clientX, e.touches[0].clientY);}}
        onTouchEnd={() => setUserHovering(false)}>
        <p
          className="font-display text-3xl sm:text-4xl text-foreground leading-none text-center pointer-events-none absolute"
          style={{ filter: "blur(9px)", userSelect: "none" }}
          aria-hidden>
          NEBU<br />STUDIO
        </p>
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            WebkitMaskImage: active ?
            `radial-gradient(circle ${focusR}px at ${pos.x}% ${pos.y}%, black 55%, transparent 100%)` :
            "none",
            maskImage: active ?
            `radial-gradient(circle ${focusR}px at ${pos.x}% ${pos.y}%, black 55%, transparent 100%)` :
            "none"
          }}>
          <p className="font-display text-3xl sm:text-4xl text-foreground leading-none text-center" style={{ userSelect: "none" }}>
            NEBU<br />STUDIO
          </p>
        </div>
        {active &&
        <div
          className="absolute pointer-events-none"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: focusR * 2, height: focusR * 2, transform: "translate(-50%,-50%)" }}>
            <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary" />
            <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary" />
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary" />
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary" />
          </div>
        }
      </div>
    </GlassCard>);
};

/* ─────────────────────────────────────
   DEMO 2 — GRADUAL BLUR
───────────────────────────────────────*/
const GradualBlur = () => {
  const [phase, setPhase] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  useEffect(() => {
    if (!isInView) { setPhase(0); return; }
    const cycle = () => {
      setPhase(1);
      const t2 = setTimeout(() => setPhase(2), 1400);
      const t3 = setTimeout(() => setPhase(0), 2600);
      return () => {clearTimeout(t2);clearTimeout(t3);};
    };
    let cleanup = cycle();
    const iv = setInterval(() => {cleanup();cleanup = cycle();}, 3200);
    return () => {clearInterval(iv);cleanup();};
  }, [isInView]);

  const blurVal = phase === 1 ? 0 : 14;
  const opacityVal = phase === 1 ? 1 : 0.25;

  return (
    <GlassCard>
      <div ref={ref}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 0% / 0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px"
        }} />
      <div className="relative flex items-center justify-center min-h-[200px]">
        <motion.p
          className="font-display text-4xl sm:text-5xl text-foreground text-center leading-none pointer-events-none"
          animate={{ filter: `blur(${blurVal}px)`, opacity: opacityVal }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          style={{ userSelect: "none" }}>
          CLARITY<br />EMERGES
        </motion.p>
      </div>
      </div>
    </GlassCard>);
};

/* ─────────────────────────────────────
   DEMO 3 — CURSOR TRAILS
   Enhanced with aurora, neon, and ember modes
───────────────────────────────────────*/
type TrailMode = "aurora" | "neon" | "ember";

const TRAIL_MODES: {id: TrailMode;icon: string;label: string;}[] = [
{ id: "aurora", icon: "✦", label: "Aurora" },
{ id: "neon", icon: "⚡", label: "Neon" },
{ id: "ember", icon: "🔥", label: "Ember" }];

const AuroraParticle = ({ x, y, size, opacity, idx }: {x: number;y: number;size: number;opacity: number;idx: number;}) => {
  const hue = (idx * 37 + 180) % 360;
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      initial={{ opacity: 0.8, scale: 1.2 }}
      animate={{ opacity: 0, scale: 0.05, rotate: 120 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
        width: size * 2.2,
        height: size * 2.2,
        background: `radial-gradient(circle, hsl(${hue} 80% 70% / 0.7), hsl(${(hue + 60) % 360} 70% 50% / 0.3), transparent)`,
        boxShadow: `0 0 ${size * 2}px hsl(${hue} 90% 65% / 0.6), 0 0 ${size * 4}px hsl(${hue} 80% 50% / 0.3)`,
        filter: "blur(1px)"
      }} />
  );
};

const NeonParticle = ({ x, y, size, opacity, idx }: {x: number;y: number;size: number;opacity: number;idx: number;}) => {
  const colors = ["hsl(280 100% 65%)", "hsl(200 100% 60%)", "hsl(320 100% 55%)"];
  const color = colors[idx % colors.length];
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 0.1, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
        width: size * 0.6,
        height: size * 2.5,
        background: color,
        borderRadius: size,
        boxShadow: `0 0 ${size}px ${color}, 0 0 ${size * 3}px ${color}`,
        transform: `rotate(${(idx * 45) % 180}deg)`
      }} />
  );
};

const EmberParticle = ({ x, y, size, opacity, idx, total }: {x: number;y: number;size: number;opacity: number;idx: number;total: number;}) => {
  const progress = idx / Math.max(total - 1, 1);
  const r = 255;
  const g = Math.round(progress * 120 + 40);
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      initial={{ opacity: 1, scale: 1.3 }}
      animate={{ opacity: 0, scale: 0.05, y: -(20 + Math.random() * 40) }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
        width: size * (1 + progress * 1.5),
        height: size * (1 + progress * 1.5),
        background: `radial-gradient(circle, rgb(${r},${g},0) 0%, rgb(200,20,0) 60%, transparent 100%)`,
        boxShadow: `0 0 ${size * 2}px rgb(${r},${g},0), 0 0 ${size * 4}px hsl(0 100% 50% / 0.7), 0 0 ${size * 8}px hsl(20 100% 40% / 0.4)`,
      }} />
  );
};

const GhostCursor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<TrailMode>("aurora");
  const [trails, setTrails] = useState<{id: number;x: number;y: number;size: number;}[]>([]);
  const idRef = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const [isOver, setIsOver] = useState(false);

  const minDist = mode === "ember" ? 4 : mode === "neon" ? 8 : 10;
  const maxTrail = mode === "ember" ? 40 : mode === "neon" ? 30 : 22;
  const ttl = mode === "ember" ? 700 : mode === "neon" ? 600 : 1200;
  const baseSize = mode === "ember" ? 18 : mode === "neon" ? 12 : 14;

  const handleMove = useCallback((cx: number, cy: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = cx - rect.left;
    const y = cy - rect.top;
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    if (Math.sqrt(dx * dx + dy * dy) < minDist) return;
    lastPos.current = { x, y };
    const id = ++idRef.current;
    const speed = Math.sqrt(dx * dx + dy * dy);
    const size = Math.min(baseSize * 2, baseSize + speed * 0.25);
    setTrails((t) => [...t.slice(-maxTrail), { id, x, y, size }]);
    setTimeout(() => setTrails((t) => t.filter((p) => p.id !== id)), ttl);
  }, [minDist, maxTrail, ttl, baseSize]);

  const clearTrails = () => {setTrails([]);};

  return (
    <GlassCard>
      <div className="absolute top-3 left-3 z-20 flex gap-1.5">
        {TRAIL_MODES.map((m) =>
        <button
          key={m.id}
          onClick={() => {setMode(m.id);clearTrails();}}
          title={m.label}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all duration-200"
          style={{
            background: mode === m.id ?
            "hsl(0 100% 50% / 0.15)" :
            "hsl(0 0% 0% / 0.05)",
            boxShadow: mode === m.id ?
            "inset 0 0 0 1px hsl(0 100% 50% / 0.4)" :
            "inset 0 0 0 1px hsl(0 0% 0% / 0.08)",
            transform: mode === m.id ? "scale(1.1)" : "scale(1)"
          }}>
            {m.icon}
          </button>
        )}
      </div>

      <div
        ref={containerRef}
        className="relative flex items-center justify-center min-h-[200px] cursor-none overflow-hidden rounded-2xl"
        style={{ touchAction: "none" }}
        onMouseMove={(e) => {setIsOver(true);handleMove(e.clientX, e.clientY);}}
        onMouseEnter={() => setIsOver(true)}
        onMouseLeave={() => setIsOver(false)}
        onTouchMove={(e) => {e.preventDefault();handleMove(e.touches[0].clientX, e.touches[0].clientY);}}>

        <p className="font-display text-2xl sm:text-3xl text-foreground pointer-events-none select-none text-center">
          CURSOR<br />TRAILS
        </p>

        {/* ambient glow for ember */}
        {mode === "ember" && trails.length > 3 &&
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: "radial-gradient(circle at 50% 50%, hsl(0 100% 30% / 0.06), transparent 70%)"
          }} />
        }

        {trails.map((t, i) =>
        mode === "aurora" ?
        <AuroraParticle key={t.id} x={t.x} y={t.y} size={t.size} opacity={0.8} idx={i} /> :
        mode === "neon" ?
        <NeonParticle key={t.id} x={t.x} y={t.y} size={t.size} opacity={1} idx={i} /> :
        <EmberParticle key={t.id} x={t.x} y={t.y} size={t.size} opacity={1} idx={i} total={trails.length} />
        )}

        {!isOver &&
        <motion.p
          className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono tracking-widest text-foreground/30"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}>
            MOVE CURSOR TO DRAW
          </motion.p>
        }

        <button
          onClick={clearTrails}
          className="absolute top-3 right-3 text-foreground/20 hover:text-foreground/60 transition-colors"
          aria-label="Reset">
          <RotateCcw size={12} />
        </button>
      </div>
    </GlassCard>);
};

/* ─────────────────────────────────────
   DEMO 4 — THROW CARDS
───────────────────────────────────────*/
const throwCards = [
{ label: "PAPACHOA", img: domePapachoa, color: "hsl(14 70% 40%)" },
{ label: "RAW PAW", img: domeRawPaw, color: "hsl(200 60% 32%)" },
{ label: "JEWELRY", img: domeJewelry, color: "hsl(45 65% 38%)" },
{ label: "PAWN SHOP", img: domePawnshop, color: "hsl(270 40% 38%)" }];

const restPositions = [
{ x: 18, y: 22 },
{ x: 56, y: 14 },
{ x: 12, y: 60 },
{ x: 62, y: 55 }];

const ThrowCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [hint, setHint] = useState(true);

  return (
    <GlassCard minH={300}>
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ minHeight: 300 }}>

        {throwCards.map((card, i) => {
          const rest = restPositions[i];
          const isFlipped = flipped === i;
          return (
            <motion.div
              key={i}
              drag
              dragConstraints={containerRef}
              dragElastic={0.18}
              dragTransition={{ bounceStiffness: 280, bounceDamping: 22 }}
              whileDrag={{ scale: 1.08, zIndex: 30, cursor: "grabbing" }}
              whileHover={{ scale: 1.05 }}
              onDrag={() => {if (hint) setHint(false);}}
              onClick={() => setFlipped(isFlipped ? null : i)}
              className="absolute cursor-grab select-none"
              style={{
                left: `${rest.x}%`,
                top: `${rest.y}%`,
                width: 90,
                height: 120,
                zIndex: 10 + i
              }}
              initial={{ opacity: 0, scale: 0.7, rotate: i % 2 === 0 ? -6 : 5 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: [i % 2 === 0 ? -4 : 3, i % 2 === 0 ? -1 : 6, i % 2 === 0 ? -4 : 3],
                y: [0, -4 - i * 2, 0]
              }}
              transition={{
                type: "spring", stiffness: 200, damping: 20, delay: i * 0.07,
                rotate: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                y: { duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
              }}>

              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d", perspective: 600 }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}>

                {/* Front — photo only, no label */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    borderRadius: 14,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    boxShadow: "0 10px 40px hsl(0 0% 0% / 0.28), inset 0 1px 0 hsl(0 0% 100% / 0.22)"
                  }}>
                  <img src={card.img} alt={card.label} className="w-full h-full object-cover" draggable={false} />
                  <div
                    className="absolute top-0 left-0 right-0 pointer-events-none"
                    style={{
                      height: "40%",
                      background: "linear-gradient(to bottom, hsl(0 0% 100% / 0.22), transparent)",
                      borderRadius: "14px 14px 0 0"
                    }} />
                </div>

                {/* Back — color panel */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1"
                  style={{
                    borderRadius: 14,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: `linear-gradient(135deg, ${card.color}cc, ${card.color}44)`,
                    boxShadow: "0 10px 40px hsl(0 0% 0% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.2)"
                  }}>
                  <div className="w-8 h-px" style={{ background: "hsl(0 0% 0% / 0.3)" }} />
                  <p className="text-[7px] font-mono tracking-[0.25em] text-black/80 text-center px-2 mt-1">
                    NEBU<br />PROJECT
                  </p>
                  <div className="w-8 h-px mt-1" style={{ background: "hsl(0 0% 0% / 0.3)" }} />
                </div>
              </motion.div>
            </motion.div>);
        })}

        {hint &&
        <motion.p
          className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-mono tracking-widest text-foreground/30 pointer-events-none"
          animate={{ opacity: [0.3, 0.75, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}>
            DRAG · THROW · CLICK TO FLIP
          </motion.p>
        }

        <button
          onClick={() => {setFlipped(null);}}
          className="absolute top-3 right-3 text-foreground/20 hover:text-foreground/60 transition-colors z-40"
          aria-label="Reset">
          <RotateCcw size={12} />
        </button>
      </div>
    </GlassCard>);
};

/* ─────────────────────────────────────
   DEMO 5 — CARD SWAP
───────────────────────────────────────*/
const cardData = [
{ label: "SMOOTH", sub: "60fps spring physics", hue: 220 },
{ label: "CUSTOMIZABLE", sub: "Any stack, any depth", hue: 14 },
{ label: "RELIABLE", sub: "Tested at scale", hue: 160 }];

const CardSwap = () => {
  const [top, setTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const iv = setInterval(() => setTop((t) => (t + 1) % cardData.length), 1600);
    return () => clearInterval(iv);
  }, [isInView]);

  const getOrder = (i: number) =>
  ((i - top) % cardData.length + cardData.length) % cardData.length;

  return (
    <GlassCard>
      <div ref={ref} className="relative flex items-center justify-center min-h-[200px]" style={{ perspective: 1000 }}>
        <div className="relative w-48 h-28">
          {cardData.map((card, i) => {
            const order = getOrder(i);
            return (
              <motion.div
                key={i}
                className="absolute inset-0 flex flex-col justify-between p-4 rounded-xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, hsl(${card.hue} 40% 96%), hsl(${card.hue} 20% 88%))`,
                  boxShadow:
                  "0 8px 40px hsl(0 0% 0% / 0.12), inset 0 1px 0 hsl(0 0% 100% / 0.8), 0 0 0 1px hsl(0 0% 0% / 0.06)",
                  zIndex: cardData.length - order
                }}
                animate={{
                  y: order * 10,
                  scale: 1 - order * 0.07,
                  opacity: order === 2 ? 0.35 : order === 1 ? 0.65 : 1,
                  rotateX: order * 2
                }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(115deg, hsl(0 0% 100% / 0.5) 0%, transparent 50%)",
                    borderRadius: "inherit"
                  }} />
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ background: `hsl(${card.hue} 70% 60% / 0.6)` }} />
                <div>
                  <p className="font-display text-[10px] tracking-[0.2em] text-foreground">{card.label}</p>
                  <p className="text-[9px] text-foreground/70 mt-0.5 font-mono">{card.sub}</p>
                </div>
              </motion.div>);
          })}
        </div>
      </div>
    </GlassCard>);
};

/* ─────────────────────────────────────
   DEMO 6 — INK REVEAL (Black screen, mouse reveals)
───────────────────────────────────────*/
const InkReveal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(0);

  const paint = useCallback((cx: number, cy: number) => {
    const canvas = canvasRef.current;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!canvas || !rect) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const x = cx - rect.left;
    const y = cy - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    const r = 40 + Math.random() * 20;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(0,0,0,1)");
    grad.addColorStop(0.5, "rgba(0,0,0,0.85)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {if (data[i] < 128) transparent++;}
    setRevealed(Math.round(transparent / (canvas.width * canvas.height) * 100));
  }, []);

  const reset = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "hsl(0 0% 3%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setRevealed(0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    reset();
  }, [reset]);

  return (
    <GlassCard>
      <div
        ref={containerRef}
        className="relative flex items-center justify-center min-h-[200px]"
        style={{ touchAction: "none" }}>

        {/* revealed layer — content underneath the black */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            background: "linear-gradient(135deg, hsl(0 100% 50% / 0.15), hsl(280 80% 50% / 0.1), hsl(200 80% 50% / 0.1))"
          }}>
          <p className="font-display text-3xl sm:text-4xl text-primary leading-none text-center">
            NEBU<br />BUILDS
          </p>
        </div>

        {/* Black canvas mask — user reveals by moving mouse */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full rounded-2xl"
          onMouseMove={(e) => paint(e.clientX, e.clientY)}
          onTouchMove={(e) => {e.preventDefault();paint(e.touches[0].clientX, e.touches[0].clientY);}}
          style={{ cursor: "crosshair" }} />

        <div className="absolute top-3 left-3 text-[9px] font-mono text-white/50 pointer-events-none z-10">
          {revealed}% revealed
        </div>

        {revealed < 3 &&
        <motion.p
          className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono tracking-widest pointer-events-none text-white/50 z-10"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}>
            MOVE TO REVEAL
          </motion.p>
        }

        <button
          onClick={reset}
          className="absolute top-3 right-3 text-white/30 hover:text-white/70 transition-colors z-10"
          aria-label="Reset">
          <RotateCcw size={12} />
        </button>
      </div>
    </GlassCard>);
};

/* ─────────────────────────────────────
   DEMO CONFIGS
───────────────────────────────────────*/
type DemoType = "interactive" | "auto";
interface DemoConfig {
  id: string;title: string;desc: string;type: DemoType;component: React.ComponentType;
}

const demos: DemoConfig[] = [
{ id: "focus", title: "TRUE FOCUS", desc: "Focus window follows your cursor through blurred text", type: "interactive", component: TrueFocus },
{ id: "blur", title: "GRADUAL BLUR", desc: "Text assembles from blur to clarity in cinematic motion", type: "auto", component: GradualBlur },
{ id: "ghost", title: "CURSOR TRAILS", desc: "Pick a trail style — aurora, neon or blazing ember", type: "interactive", component: GhostCursor },
{ id: "throw", title: "THROW CARDS", desc: "Drag, throw and flip the project cards — pure physics", type: "interactive", component: ThrowCards },
{ id: "swap", title: "CARD SWAP", desc: "Stack of glass cards swaps forward with spring depth", type: "auto", component: CardSwap },
{ id: "ink", title: "INK REVEAL", desc: "Move your cursor to reveal what's hiding in the dark", type: "interactive", component: InkReveal }];


/* ─────────────────────────────────────
   DEMO TILE WRAPPER — no scroll animation
───────────────────────────────────────*/
const DemoTile = ({ demo, index }: {demo: DemoConfig;index: number;}) => {
  const DemoComponent = demo.component;
  return (
    <div>
      {/* header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[11px] font-mono tracking-[0.22em] text-foreground font-medium">{demo.title}</span>
        <div className="h-px flex-1" style={{ background: "hsl(0 0% 0% / 0.1)" }} />
        <span
          className="text-[8px] font-mono tracking-[0.2em] px-2 py-0.5 rounded-full"
          style={{
            background: demo.type === "interactive" ? "hsl(0 100% 50% / 0.1)" : "hsl(0 0% 0% / 0.06)",
            color: demo.type === "interactive" ? "hsl(0 100% 38%)" : "hsl(0 0% 30%)"
          }}>
          {demo.type === "interactive" ? "INTERACTIVE" : "AUTO DEMO"}
        </span>
      </div>
      <DemoComponent />
    </div>);
};

/* ─────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────*/
export const DesignLab = () => {
  return (
    <section className="relative" id="lab">
        <div className="container relative z-10 py-32 sm:py-40">
          {/* heading */}
          <div className="mb-24 sm:mb-32">
            <KineticType
              text="DESIGN LAB"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-5 text-foreground"
              delay={0.15}
              wordDelay={0.12} />
            <p
              className="text-foreground/45 text-sm max-w-sm leading-relaxed font-mono tracking-wide">
              Interactive UI components that enhance and personalize your web applications.
            </p>
          </div>

          {/* layout */}
          <div className="space-y-16 sm:space-y-20">
            <div className="grid md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20">
              <DemoTile demo={demos[0]} index={0} />
              <DemoTile demo={demos[1]} index={1} />
            </div>
            <div className="grid md:grid-cols-5 gap-10 sm:gap-14">
              <div className="md:col-span-3"><DemoTile demo={demos[2]} index={2} /></div>
              <div className="md:col-span-2"><DemoTile demo={demos[3]} index={3} /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20">
              <DemoTile demo={demos[4]} index={4} />
              <DemoTile demo={demos[5]} index={5} />
            </div>
          </div>
        </div>
    </section>);
};
