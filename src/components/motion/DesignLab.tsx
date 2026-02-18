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
   Every demo sits inside this reusable
   glass container — no hard border.
───────────────────────────────────────*/
const GlassCard = ({
  children,
  className = "",
  minH = 200,
}: {
  children: React.ReactNode;
  className?: string;
  minH?: number;
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl ${className}`}
    style={{
      minHeight: minH,
      /* liquid glass base */
      background:
        "linear-gradient(135deg, hsl(0 0% 100% / 0.09) 0%, hsl(0 0% 100% / 0.04) 50%, hsl(0 0% 100% / 0.07) 100%)",
      backdropFilter: "blur(22px) saturate(1.4)",
      WebkitBackdropFilter: "blur(22px) saturate(1.4)",
      /* soft specular rim — no hard border */
      boxShadow:
        "inset 0 1px 0 hsl(0 0% 100% / 0.18), inset 0 -1px 0 hsl(0 0% 0% / 0.08), inset 1px 0 0 hsl(0 0% 100% / 0.08), 0 8px 40px hsl(0 0% 0% / 0.22), 0 2px 8px hsl(0 0% 0% / 0.12)",
    }}
  >
    {/* light refraction streak — top-left to bottom-right */}
    <div
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        inset: 0,
        background:
          "linear-gradient(115deg, hsl(0 0% 100% / 0.13) 0%, transparent 40%, transparent 60%, hsl(0 0% 100% / 0.06) 100%)",
        borderRadius: "inherit",
      }}
    />
    {children}
  </div>
);

/* ─────────────────────────────────────
   DEMO 1 — TRUE FOCUS
───────────────────────────────────────*/
const TrueFocus = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const update = useCallback((cx: number, cy: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((cx - rect.left) / rect.width) * 100,
      y: ((cy - rect.top) / rect.height) * 100,
    });
  }, []);

  const focusR = 82;

  return (
    <GlassCard>
      <div
        ref={containerRef}
        className="flex items-center justify-center min-h-[200px] select-none cursor-none"
        style={{ touchAction: "none" }}
        onMouseMove={(e) => { setActive(true); update(e.clientX, e.clientY); }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onTouchMove={(e) => { e.preventDefault(); setActive(true); update(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchEnd={() => setActive(false)}
      >
        {/* blurred layer */}
        <p
          className="font-display text-3xl sm:text-4xl text-foreground leading-none text-center pointer-events-none absolute"
          style={{ filter: "blur(9px)", userSelect: "none" }}
          aria-hidden
        >
          NEBU<br />STUDIO
        </p>

        {/* sharp reveal mask */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            WebkitMaskImage: active
              ? `radial-gradient(circle ${focusR}px at ${pos.x}% ${pos.y}%, black 55%, transparent 100%)`
              : "none",
            maskImage: active
              ? `radial-gradient(circle ${focusR}px at ${pos.x}% ${pos.y}%, black 55%, transparent 100%)`
              : "none",
          }}
        >
          <p className="font-display text-3xl sm:text-4xl text-foreground leading-none text-center" style={{ userSelect: "none" }}>
            NEBU<br />STUDIO
          </p>
        </div>

        {/* reticle brackets */}
        {active && (
          <div
            className="absolute pointer-events-none"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: focusR * 2, height: focusR * 2, transform: "translate(-50%,-50%)" }}
          >
            <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary" />
            <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary" />
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary" />
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary" />
          </div>
        )}

        {!active && (
          <motion.p
            className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono tracking-widest text-foreground/30"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            MOVE CURSOR TO FOCUS
          </motion.p>
        )}
      </div>
    </GlassCard>
  );
};

/* ─────────────────────────────────────
   DEMO 2 — GRADUAL BLUR
───────────────────────────────────────*/
const GradualBlur = () => {
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const cycle = () => {
      setPhase(1);
      const t2 = setTimeout(() => setPhase(2), 1400);
      const t3 = setTimeout(() => setPhase(0), 2600);
      return () => { clearTimeout(t2); clearTimeout(t3); };
    };
    let cleanup = cycle();
    const iv = setInterval(() => { cleanup(); cleanup = cycle(); }, 3200);
    return () => { clearInterval(iv); cleanup(); };
  }, [playing]);

  const blurVal = phase === 1 ? 0 : 14;
  const opacityVal = phase === 1 ? 1 : 0.25;

  return (
    <GlassCard>
      {/* dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 0% / 0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative flex items-center justify-center min-h-[200px]">
        <motion.p
          className="font-display text-4xl sm:text-5xl text-foreground text-center leading-none pointer-events-none"
          animate={{ filter: `blur(${blurVal}px)`, opacity: opacityVal }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          style={{ userSelect: "none" }}
        >
          CLARITY<br />EMERGES
        </motion.p>

        {/* play overlay */}
        <button
          onClick={() => { setPlaying(p => !p); if (!playing) setPhase(0); }}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={playing ? "Pause" : "Play"}
        >
          <AnimatePresence mode="wait">
            {!playing && (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "hsl(0 0% 0% / 0.1)", backdropFilter: "blur(8px)" }}
              >
                <Play size={18} className="text-foreground ml-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {playing && (
          <button
            onClick={() => { setPlaying(false); setPhase(0); }}
            className="absolute top-3 right-3 text-foreground/30 hover:text-foreground/70 transition-colors"
            aria-label="Pause"
          >
            <Pause size={12} />
          </button>
        )}
      </div>
    </GlassCard>
  );
};

/* ─────────────────────────────────────
   DEMO 3 — CURSOR TRAILS
   3 selectable trail modes
───────────────────────────────────────*/
type TrailMode = "diamond" | "paw" | "lava";

const TRAIL_MODES: { id: TrailMode; icon: string; label: string }[] = [
  { id: "diamond", icon: "◆", label: "Diamond" },
  { id: "paw",     icon: "🐾", label: "Paw" },
  { id: "lava",    icon: "🔴", label: "Lava" },
];

/* SVG diamond shape rendered as data-url for the trail particle */
const DiamondParticle = ({ x, y, size, opacity }: { x: number; y: number; size: number; opacity: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    initial={{ opacity, scale: 1, rotate: 0 }}
    animate={{ opacity: 0, scale: 0.1, rotate: 45 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    style={{
      left: x,
      top: y,
      translateX: "-50%",
      translateY: "-50%",
      width: size,
      height: size,
      background: `hsl(210 80% 70%)`,
      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      boxShadow: `0 0 ${size * 0.8}px hsl(210 100% 80% / 0.8), 0 0 ${size * 2}px hsl(210 100% 70% / 0.4)`,
    }}
  />
);

const PawParticle = ({ x, y, size, opacity }: { x: number; y: number; size: number; opacity: number }) => (
  <motion.div
    className="absolute pointer-events-none select-none"
    initial={{ opacity, scale: 1 }}
    animate={{ opacity: 0, scale: 0.3 }}
    transition={{ duration: 0.85, ease: "easeOut" }}
    style={{
      left: x,
      top: y,
      translateX: "-50%",
      translateY: "-50%",
      fontSize: size * 1.2,
      lineHeight: 1,
    }}
  >
    🐾
  </motion.div>
);

const LavaParticle = ({ x, y, size, opacity, idx, total }: { x: number; y: number; size: number; opacity: number; idx: number; total: number }) => {
  const progress = idx / Math.max(total - 1, 1); // 0=oldest, 1=newest
  const r = Math.round(255);
  const g = Math.round(progress * 80);
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, scale: 0.05 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
        width: size * (1 + progress * 1.8),
        height: size * (1 + progress * 1.8),
        background: `radial-gradient(circle, rgb(${r},${g},0) 0%, rgb(200,0,0) 50%, transparent 100%)`,
        boxShadow: [
          `0 0 ${size * 1.5}px rgb(${r},${g},0)`,
          `0 0 ${size * 3}px hsl(0 100% 50% / 0.8)`,
          `0 0 ${size * 6}px hsl(20 100% 40% / 0.5)`,
        ].join(", "),
        filter: `blur(${progress < 0.5 ? 1 : 0}px)`,
      }}
    />
  );
};

const GhostCursor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<TrailMode>("diamond");
  const [trails, setTrails] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const idRef = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const [isOver, setIsOver] = useState(false);

  const minDist = mode === "paw" ? 28 : mode === "lava" ? 4 : 10;
  const maxTrail = mode === "lava" ? 40 : mode === "paw" ? 10 : 22;
  const ttl = mode === "lava" ? 500 : mode === "paw" ? 900 : 700;
  const baseSize = mode === "lava" ? 22 : mode === "paw" ? 20 : 10;

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
    setTrails(t => [...t.slice(-maxTrail), { id, x, y, size }]);
    setTimeout(() => setTrails(t => t.filter(p => p.id !== id)), ttl);
  }, [minDist, maxTrail, ttl, baseSize]);

  const clearTrails = () => { setTrails([]); };

  return (
    <GlassCard>
      {/* mode selector — 3 buttons top-left */}
      <div className="absolute top-3 left-3 z-20 flex gap-1.5">
        {TRAIL_MODES.map(m => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); clearTrails(); }}
            title={m.label}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all duration-200"
            style={{
              background: mode === m.id
                ? "hsl(0 100% 50% / 0.15)"
                : "hsl(0 0% 0% / 0.05)",
              boxShadow: mode === m.id
                ? "inset 0 0 0 1px hsl(0 100% 50% / 0.4)"
                : "inset 0 0 0 1px hsl(0 0% 0% / 0.08)",
              transform: mode === m.id ? "scale(1.1)" : "scale(1)",
            }}
          >
            {m.icon}
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative flex items-center justify-center min-h-[200px] cursor-none overflow-hidden rounded-2xl"
        style={{ touchAction: "none" }}
        onMouseMove={(e) => { setIsOver(true); handleMove(e.clientX, e.clientY); }}
        onMouseEnter={() => setIsOver(true)}
        onMouseLeave={() => setIsOver(false)}
        onTouchMove={(e) => { e.preventDefault(); handleMove(e.touches[0].clientX, e.touches[0].clientY); }}
      >
        <p className="font-display text-2xl sm:text-3xl text-foreground/70 pointer-events-none select-none text-center">
          CURSOR<br />TRAILS
        </p>

        {/* lava: render glow overlay for extra intensity */}
        {mode === "lava" && trails.length > 3 && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: "radial-gradient(circle at 50% 50%, hsl(0 100% 30% / 0.06), transparent 70%)",
            }}
          />
        )}

        {trails.map((t, i) =>
          mode === "diamond" ? (
            <DiamondParticle key={t.id} x={t.x} y={t.y} size={t.size} opacity={0.4 + (i / trails.length) * 0.5} />
          ) : mode === "paw" ? (
            <PawParticle key={t.id} x={t.x} y={t.y} size={t.size} opacity={0.5 + (i / trails.length) * 0.4} />
          ) : (
            <LavaParticle key={t.id} x={t.x} y={t.y} size={t.size} opacity={1} idx={i} total={trails.length} />
          )
        )}

        {!isOver && (
          <motion.p
            className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono tracking-widest text-foreground/30"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            MOVE CURSOR TO DRAW
          </motion.p>
        )}

        <button
          onClick={clearTrails}
          className="absolute top-3 right-3 text-foreground/20 hover:text-foreground/60 transition-colors"
          aria-label="Reset"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </GlassCard>
  );
};

/* ─────────────────────────────────────
   DEMO 4 — THROW CARDS
   Drag, throw, and watch them spring back
───────────────────────────────────────*/
const throwCards = [
  { label: "PAPACHOA",  img: domePapachoa,  color: "hsl(14 70% 40%)" },
  { label: "RAW PAW",   img: domeRawPaw,    color: "hsl(200 60% 32%)" },
  { label: "JEWELRY",   img: domeJewelry,   color: "hsl(45 65% 38%)" },
  { label: "PAWN SHOP", img: domePawnshop,  color: "hsl(270 40% 38%)" },
];

/* Initial resting positions (% of container) */
const restPositions = [
  { x: 18, y: 22 },
  { x: 56, y: 14 },
  { x: 12, y: 60 },
  { x: 62, y: 55 },
];

const ThrowCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [hint, setHint] = useState(true);

  return (
    <GlassCard minH={300}>
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ minHeight: 300 }}
      >
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
              onDrag={() => { if (hint) setHint(false); }}
              onClick={() => setFlipped(isFlipped ? null : i)}
              className="absolute cursor-grab select-none"
              style={{
                left: `${rest.x}%`,
                top: `${rest.y}%`,
                width: 90,
                height: 120,
                zIndex: 10 + i,
              }}
              initial={{ opacity: 0, scale: 0.7, rotate: (i % 2 === 0 ? -6 : 5) }}
              animate={{ opacity: 1, scale: 1, rotate: (i % 2 === 0 ? -4 : 3) }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.07 }}
            >
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d", perspective: 600 }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                {/* Front — photo */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    borderRadius: 14,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    boxShadow: "0 10px 40px hsl(0 0% 0% / 0.28), inset 0 1px 0 hsl(0 0% 100% / 0.22)",
                  }}
                >
                  <img src={card.img} alt={card.label} className="w-full h-full object-cover" draggable={false} />
                  {/* glass top highlight */}
                  <div
                    className="absolute top-0 left-0 right-0 pointer-events-none"
                    style={{
                      height: "40%",
                      background: "linear-gradient(to bottom, hsl(0 0% 100% / 0.22), transparent)",
                      borderRadius: "14px 14px 0 0",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.6), transparent 50%)" }}
                  />
                  <span className="absolute bottom-2.5 left-0 right-0 text-center text-[8px] font-mono tracking-widest text-white/90">
                    {card.label}
                  </span>
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
                    boxShadow: "0 10px 40px hsl(0 0% 0% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.2)",
                  }}
                >
                  <div className="w-8 h-px" style={{ background: "hsl(0 0% 100% / 0.4)" }} />
                  <p className="text-[7px] font-mono tracking-[0.25em] text-white/80 text-center px-2 mt-1">
                    NEBU<br />PROJECT
                  </p>
                  <div className="w-8 h-px mt-1" style={{ background: "hsl(0 0% 100% / 0.4)" }} />
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Hint */}
        {hint && (
          <motion.p
            className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-mono tracking-widest text-foreground/30 pointer-events-none"
            animate={{ opacity: [0.3, 0.75, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            DRAG · THROW · CLICK TO FLIP
          </motion.p>
        )}

        {/* Reset */}
        <button
          onClick={() => { setFlipped(null); }}
          className="absolute top-3 right-3 text-foreground/20 hover:text-foreground/60 transition-colors z-40"
          aria-label="Reset"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </GlassCard>
  );
};

/* ─────────────────────────────────────
   DEMO 5 — CARD SWAP
───────────────────────────────────────*/
const cardData = [
  { label: "SMOOTH",       sub: "60fps spring physics", hue: 220 },
  { label: "CUSTOMIZABLE", sub: "Any stack, any depth",  hue: 14 },
  { label: "RELIABLE",     sub: "Tested at scale",       hue: 160 },
];

const CardSwap = () => {
  const [playing, setPlaying] = useState(false);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setTop(t => (t + 1) % cardData.length), 1600);
    return () => clearInterval(iv);
  }, [playing]);

  const getOrder = (i: number) =>
    ((i - top) % cardData.length + cardData.length) % cardData.length;

  return (
    <GlassCard>
      <div className="relative flex items-center justify-center min-h-[200px]" style={{ perspective: 1000 }}>
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
                  zIndex: cardData.length - order,
                }}
                animate={{
                  y: order * 10,
                  scale: 1 - order * 0.07,
                  opacity: order === 2 ? 0.35 : order === 1 ? 0.65 : 1,
                  rotateX: order * 2,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
              >
                {/* glass sheen on each card */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(115deg, hsl(0 0% 100% / 0.5) 0%, transparent 50%)",
                    borderRadius: "inherit",
                  }}
                />
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ background: `hsl(${card.hue} 70% 60% / 0.6)` }}
                />
                <div>
                  <p className="font-display text-[10px] tracking-[0.2em] text-foreground/90">{card.label}</p>
                  <p className="text-[9px] text-foreground/40 mt-0.5 font-mono">{card.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={() => setPlaying(p => !p)}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 text-foreground/30 hover:text-foreground/70 transition-colors"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={11} /> : <Play size={11} />}
          <span className="text-[9px] font-mono tracking-wider">{playing ? "PAUSE" : "PLAY"}</span>
        </button>

        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-11 h-11 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer"
              style={{ background: "hsl(0 0% 0% / 0.08)", backdropFilter: "blur(8px)" }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setPlaying(true)}
            >
              <Play size={16} className="text-foreground ml-0.5" />
            </motion.div>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

/* ─────────────────────────────────────
   DEMO 6 — INK REVEAL
───────────────────────────────────────*/
const InkReveal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPainting = useRef(false);
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
    const r = 32 + Math.random() * 16;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(0,0,0,1)");
    grad.addColorStop(0.5, "rgba(0,0,0,0.8)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) { if (data[i] < 128) transparent++; }
    setRevealed(Math.round((transparent / (canvas.width * canvas.height)) * 100));
  }, []);

  const reset = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(240,240,240,0.92)";
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
        style={{ touchAction: "none" }}
      >
        {/* revealed layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="font-display text-3xl sm:text-4xl text-primary leading-none text-center">
            NEBU<br />BUILDS
          </p>
        </div>

        {/* canvas mask */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full rounded-2xl"
          onMouseDown={(e) => { isPainting.current = true; paint(e.clientX, e.clientY); }}
          onMouseMove={(e) => { if (isPainting.current) paint(e.clientX, e.clientY); }}
          onMouseUp={() => { isPainting.current = false; }}
          onMouseLeave={() => { isPainting.current = false; }}
          onTouchStart={(e) => { e.preventDefault(); isPainting.current = true; paint(e.touches[0].clientX, e.touches[0].clientY); }}
          onTouchMove={(e) => { e.preventDefault(); if (isPainting.current) paint(e.touches[0].clientX, e.touches[0].clientY); }}
          onTouchEnd={() => { isPainting.current = false; }}
          style={{ cursor: "crosshair" }}
        />

        <div className="absolute top-3 left-3 text-[9px] font-mono text-foreground/30 pointer-events-none">
          {revealed}% revealed
        </div>

        {revealed < 3 && (
          <motion.p
            className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono tracking-widest pointer-events-none text-foreground/35"
            animate={{ opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            BRUSH TO REVEAL
          </motion.p>
        )}

        <button
          onClick={reset}
          className="absolute top-3 right-3 text-foreground/25 hover:text-foreground/60 transition-colors z-10"
          aria-label="Reset"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </GlassCard>
  );
};

/* ─────────────────────────────────────
   DEMO CONFIGS
───────────────────────────────────────*/
type DemoType = "interactive" | "auto";
interface DemoConfig {
  id: string; title: string; desc: string; type: DemoType; component: React.ComponentType;
}

const demos: DemoConfig[] = [
  { id: "focus", title: "TRUE FOCUS",   desc: "Focus window follows your cursor through blurred text",   type: "interactive", component: TrueFocus },
  { id: "blur",  title: "GRADUAL BLUR", desc: "Text assembles from blur to clarity in cinematic motion", type: "auto",        component: GradualBlur },
  { id: "ghost", title: "CURSOR TRAILS",  desc: "Pick a trail style — diamond, paw or blazing lava",       type: "interactive", component: GhostCursor },
  { id: "throw", title: "THROW CARDS",  desc: "Drag, throw and flip the project cards — pure physics",   type: "interactive", component: ThrowCards },
  { id: "swap",  title: "CARD SWAP",    desc: "Stack of glass cards swaps forward with spring depth",    type: "auto",        component: CardSwap },
  { id: "ink",   title: "INK REVEAL",   desc: "Brush away the surface to reveal what's underneath",      type: "interactive", component: InkReveal },
];

/* ─────────────────────────────────────
   DEMO TILE WRAPPER
───────────────────────────────────────*/
const DemoTile = ({ demo, index }: { demo: DemoConfig; index: number }) => {
  const DemoComponent = demo.component;
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[11px] font-mono tracking-[0.22em] text-foreground font-medium">{demo.title}</span>
        <div className="h-px flex-1" style={{ background: "hsl(0 0% 0% / 0.1)" }} />
        <span
          className="text-[8px] font-mono tracking-[0.2em] px-2 py-0.5 rounded-full"
          style={{
            background: demo.type === "interactive" ? "hsl(0 100% 50% / 0.1)" : "hsl(0 0% 0% / 0.06)",
            color: demo.type === "interactive" ? "hsl(0 100% 38%)" : "hsl(0 0% 30%)",
          }}
        >
          {demo.type === "interactive" ? "INTERACTIVE" : "AUTO DEMO"}
        </span>
      </div>

      <DemoComponent />

      {/* footer desc — negro */}
      <p className="mt-2.5 text-[10px] text-foreground/45 font-mono tracking-wide leading-relaxed">
        {demo.desc}
      </p>
    </motion.div>
  );
};

/* ─────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────*/
export const DesignLab = () => {
  return (
    <section className="relative" id="lab">
      <BlackSandReveal mode="section">
        <div className="container relative z-10 py-32 sm:py-40">
          {/* heading */}
          <div className="mb-24 sm:mb-32">
            <KineticType
              text="DESIGN LAB"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-5 text-foreground"
              delay={0.15}
              wordDelay={0.12}
            />
            <motion.p
              className="text-foreground/45 text-sm max-w-sm leading-relaxed font-mono tracking-wide"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Six live demos. Move, click, brush, play — every effect ships with your project.
            </motion.p>
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
      </BlackSandReveal>
    </section>
  );
};
