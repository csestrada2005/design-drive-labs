import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

/* ─────────────────────────────────────────────
   DEMO 1 — TRUE FOCUS (Interactive)
   Cursor/finger moves a sharp focus window over blurred text
───────────────────────────────────────────────*/
const TrueFocus = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const rawX = useSpring(50, { stiffness: 180, damping: 22 });
  const rawY = useSpring(50, { stiffness: 180, damping: 22 });

  const update = useCallback((cx: number, cy: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((cx - rect.left) / rect.width) * 100;
    const y = ((cy - rect.top) / rect.height) * 100;
    rawX.set(x);
    rawY.set(y);
    setPos({ x, y });
  }, [rawX, rawY]);

  const onMouseMove = (e: React.MouseEvent) => { setActive(true); update(e.clientX, e.clientY); };
  const onTouchMove = (e: React.TouchEvent) => { e.preventDefault(); setActive(true); update(e.touches[0].clientX, e.touches[0].clientY); };

  const focusR = 80; // px radius
  const fxPct = pos.x;
  const fyPct = pos.y;

  const reset = () => { rawX.set(50); rawY.set(50); setPos({ x: 50, y: 50 }); setActive(false); };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center min-h-[200px] select-none overflow-hidden rounded-2xl cursor-none"
      style={{ background: "hsl(0 0% 4%)", touchAction: "none" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchMove={onTouchMove}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setActive(false)}
    >
      {/* fully blurred text layer */}
      <p
        className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-none text-center pointer-events-none"
        style={{ filter: "blur(8px)", userSelect: "none" }}
        aria-hidden="true"
      >
        NEBU<br />STUDIO
      </p>

      {/* sharp reveal window using clip-path mask trick */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          WebkitMaskImage: active
            ? `radial-gradient(circle ${focusR}px at ${fxPct}% ${fyPct}%, black 60%, transparent 100%)`
            : "none",
          maskImage: active
            ? `radial-gradient(circle ${focusR}px at ${fxPct}% ${fyPct}%, black 60%, transparent 100%)`
            : "none",
        }}
      >
        <p className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-none text-center" style={{ userSelect: "none" }}>
          NEBU<br />STUDIO
        </p>
      </div>

      {/* Corner reticle brackets — follow cursor */}
      {active && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${fxPct}%`,
            top: `${fyPct}%`,
            width: focusR * 2,
            height: focusR * 2,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* TL */}
          <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary" />
          {/* TR */}
          <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary" />
          {/* BL */}
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary" />
          {/* BR */}
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary" />
        </motion.div>
      )}

      {/* Hint */}
      {!active && (
        <motion.p
          className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono tracking-widest text-white/30"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          MOVE CURSOR TO FOCUS
        </motion.p>
      )}

      {/* Reset */}
      <button
        onClick={reset}
        className="absolute top-3 right-3 text-white/20 hover:text-white/60 transition-colors"
        aria-label="Reset"
      >
        <RotateCcw size={12} />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────
   DEMO 2 — GRADUAL BLUR (Auto Demo + Play/Pause)
───────────────────────────────────────────────*/
const GradualBlur = () => {
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState(0); // 0=blurred, 1=sharp, 2=blurring back

  useEffect(() => {
    if (!playing) return;
    let t1: ReturnType<typeof setTimeout>, t2: ReturnType<typeof setTimeout>, t3: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setPhase(1);
      t2 = setTimeout(() => setPhase(2), 1400);
      t3 = setTimeout(() => { setPhase(0); }, 2600);
    };
    cycle();
    const interval = setInterval(cycle, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(interval); };
  }, [playing]);

  const blurVal = phase === 0 ? 14 : phase === 1 ? 0 : 14;
  const opacityVal = phase === 0 ? 0.25 : phase === 1 ? 1 : 0.25;

  return (
    <div
      className="relative flex items-center justify-center min-h-[200px] overflow-hidden rounded-2xl"
      style={{ background: "hsl(0 0% 5%)" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100% / 0.04) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <motion.p
        className="font-display text-4xl sm:text-5xl md:text-6xl text-white text-center leading-none pointer-events-none"
        animate={{ filter: `blur(${blurVal}px)`, opacity: opacityVal }}
        transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
        style={{ userSelect: "none" }}
      >
        CLARITY<br />EMERGES
      </motion.p>

      {/* Play/Pause */}
      <button
        onClick={() => { setPlaying(p => !p); if (!playing) setPhase(0); }}
        className="absolute inset-0 flex items-center justify-center group"
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
              style={{ background: "hsl(0 0% 100% / 0.08)", backdropFilter: "blur(8px)" }}
            >
              <Play size={18} className="text-white ml-0.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {playing && (
        <button
          onClick={() => { setPlaying(false); setPhase(0); }}
          className="absolute top-3 right-3 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Pause"
        >
          <Pause size={12} />
        </button>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   DEMO 3 — GHOST CURSOR TRAIL (Interactive)
───────────────────────────────────────────────*/
const GhostCursor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const idRef = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const [isOver, setIsOver] = useState(false);

  const handleMove = useCallback((cx: number, cy: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = cx - rect.left;
    const y = cy - rect.top;
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 8) return;
    lastPos.current = { x, y };
    const id = ++idRef.current;
    const size = Math.min(18, 6 + dist * 0.4);
    setTrails(t => [...t.slice(-18), { id, x, y, size }]);
    setTimeout(() => setTrails(t => t.filter(p => p.id !== id)), 700);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
  const onTouchMove = (e: React.TouchEvent) => { e.preventDefault(); handleMove(e.touches[0].clientX, e.touches[0].clientY); };

  const reset = () => { setTrails([]); };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center min-h-[200px] overflow-hidden rounded-2xl cursor-none"
      style={{ background: "hsl(0 0% 4%)", touchAction: "none" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => { setIsOver(false); }}
      onTouchMove={onTouchMove}
    >
      <p className="font-display text-2xl sm:text-3xl text-white/80 pointer-events-none select-none text-center">
        DRAW<br />YOUR PATH
      </p>

      {trails.map((t, i) => (
        <motion.div
          key={t.id}
          className="absolute rounded-full pointer-events-none"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            left: t.x,
            top: t.y,
            width: t.size,
            height: t.size,
            translateX: "-50%",
            translateY: "-50%",
            background: `hsl(0 100% 50% / ${0.4 + (i / trails.length) * 0.5})`,
            boxShadow: `0 0 ${t.size}px hsl(0 100% 50% / 0.3)`,
          }}
        />
      ))}

      {!isOver && (
        <motion.p
          className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono tracking-widest text-white/30"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          MOVE CURSOR TO DRAW
        </motion.p>
      )}

      <button onClick={reset} className="absolute top-3 right-3 text-white/20 hover:text-white/60 transition-colors" aria-label="Reset">
        <RotateCcw size={12} />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────
   DEMO 4 — DOME GALLERY (Interactive parallax tiles)
───────────────────────────────────────────────*/
const tiles = [
  { label: "PAPACHOA", accent: "hsl(14 80% 45%)" },
  { label: "RAW PAW", accent: "hsl(200 60% 30%)" },
  { label: "JEWELRY", accent: "hsl(45 70% 40%)" },
  { label: "PAWN SHOP", accent: "hsl(270 40% 40%)" },
];

const DomeGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[200px] flex items-center justify-center overflow-hidden rounded-2xl"
      style={{ background: "hsl(0 0% 4%)" }}
      onMouseMove={handleMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
    >
      <div className="flex gap-3 sm:gap-4 p-4 flex-wrap justify-center">
        {tiles.map((tile, i) => {
          const depth = (i % 3 + 1) * 0.5;
          return (
            <motion.div
              key={i}
              className="relative flex items-end p-3 overflow-hidden shrink-0 cursor-pointer"
              style={{
                width: 80,
                height: 110,
                borderRadius: 20,
                background: `linear-gradient(135deg, ${tile.accent}33, hsl(0 0% 8%))`,
                boxShadow: "0 8px 30px hsl(0 0% 0% / 0.4)",
              }}
              animate={{
                x: mouse.x * depth * -8,
                y: mouse.y * depth * -6,
                rotateX: mouse.y * depth * -3,
                rotateY: mouse.x * depth * 3,
              }}
              whileHover={{ scale: 1.08, boxShadow: `0 16px 50px hsl(0 0% 0% / 0.5), 0 0 20px ${tile.accent}44` }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.7), transparent 55%)" }} />
              <span className="relative text-[8px] font-mono tracking-wider text-white/80 leading-tight">{tile.label}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {expanded !== null && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer rounded-2xl"
            style={{ backdropFilter: "blur(16px)", background: "hsl(0 0% 0% / 0.75)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(null)}
          >
            <motion.div
              className="text-center p-8"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
            >
              <p className="font-display text-3xl text-white mb-2">{tiles[expanded].label}</p>
              <p className="text-[10px] font-mono text-white/40 tracking-widest">TAP TO CLOSE</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono tracking-widest text-white/25 pointer-events-none">
        MOVE + CLICK TO EXPAND
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────
   DEMO 5 — CARD SWAP (Auto Demo + Play/Pause)
───────────────────────────────────────────────*/
const cardData = [
  { label: "SMOOTH", sub: "60fps spring physics", hue: 220 },
  { label: "CUSTOMIZABLE", sub: "Any stack, any depth", hue: 14 },
  { label: "RELIABLE", sub: "Tested at scale", hue: 160 },
];

const CardSwap = () => {
  const [playing, setPlaying] = useState(false);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setTop(t => (t + 1) % cardData.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [playing]);

  const getOrder = (i: number) => {
    const rel = ((i - top) % cardData.length + cardData.length) % cardData.length;
    return rel; // 0=front, 1=mid, 2=back
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-[200px] overflow-hidden rounded-2xl"
      style={{ background: "hsl(0 0% 5%)", perspective: 1000 }}
    >
      <div className="relative w-48 h-28">
        {cardData.map((card, i) => {
          const order = getOrder(i);
          const zIndex = cardData.length - order;
          const yOffset = order * 10;
          const scale = 1 - order * 0.07;
          const opacityVal = order === 2 ? 0.3 : order === 1 ? 0.65 : 1;

          return (
            <motion.div
              key={i}
              className="absolute inset-0 flex flex-col justify-between p-4 rounded-xl"
              style={{
                background: `linear-gradient(135deg, hsl(${card.hue} 40% 14%), hsl(${card.hue} 20% 8%))`,
                boxShadow: "0 8px 40px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.06)",
                zIndex,
              }}
              animate={{ y: yOffset, scale, opacity: opacityVal, rotateX: order * 2 }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            >
              <div
                className="w-5 h-5 rounded-full"
                style={{ background: `hsl(${card.hue} 80% 55% / 0.5)` }}
              />
              <div>
                <p className="font-display text-[10px] tracking-[0.2em] text-white/90">{card.label}</p>
                <p className="text-[9px] text-white/35 mt-0.5 font-mono">{card.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Play/Pause */}
      <button
        onClick={() => setPlaying(p => !p)}
        className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white/30 hover:text-white/70 transition-colors"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause size={11} /> : <Play size={11} />}
        <span className="text-[9px] font-mono tracking-wider">{playing ? "PAUSE" : "PLAY"}</span>
      </button>

      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="w-11 h-11 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer"
            style={{ background: "hsl(0 0% 100% / 0.07)", backdropFilter: "blur(8px)" }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setPlaying(true)}
          >
            <Play size={16} className="text-white ml-0.5" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   DEMO 6 — INK REVEAL (Interactive brush mask)
───────────────────────────────────────────────*/
const InkReveal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPainting = useRef(false);
  const [revealed, setRevealed] = useState(0);
  const animFrameRef = useRef<number>();

  const getCtx = () => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext("2d") : null;
  };

  const paint = useCallback((cx: number, cy: number) => {
    const canvas = canvasRef.current;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!canvas || !rect) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const x = cx - rect.left;
    const y = cy - rect.top;

    // Use destination-out to erase the black overlay (reveal beneath)
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

    // Measure revealed %
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) transparent++;
    }
    setRevealed(Math.round((transparent / (canvas.width * canvas.height)) * 100));
  }, []);

  const reset = () => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "hsl(0, 0%, 4%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setRevealed(0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    reset();
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { isPainting.current = true; paint(e.clientX, e.clientY); };
  const onMouseMove = (e: React.MouseEvent) => { if (isPainting.current) paint(e.clientX, e.clientY); };
  const onMouseUp = () => { isPainting.current = false; };

  const onTouchStart = (e: React.TouchEvent) => { e.preventDefault(); isPainting.current = true; paint(e.touches[0].clientX, e.touches[0].clientY); };
  const onTouchMove = (e: React.TouchEvent) => { e.preventDefault(); if (isPainting.current) paint(e.touches[0].clientX, e.touches[0].clientY); };
  const onTouchEnd = () => { isPainting.current = false; };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center min-h-[200px] overflow-hidden rounded-2xl"
      style={{ background: "hsl(0 0% 4%)", touchAction: "none" }}
    >
      {/* Revealed layer beneath */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="font-display text-3xl sm:text-4xl md:text-5xl text-primary leading-none text-center">
          NEBU<br />BUILDS
        </p>
      </div>

      {/* Canvas overlay (ink mask) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-2xl"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ cursor: "crosshair" }}
      />

      {/* % counter */}
      <div className="absolute top-3 left-3 text-[9px] font-mono text-white/30 pointer-events-none">
        {revealed}% revealed
      </div>

      {/* Hint */}
      {revealed < 3 && (
        <motion.p
          className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono tracking-widest pointer-events-none"
          style={{ color: "hsl(0 0% 100% / 0.3)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          BRUSH TO REVEAL
        </motion.p>
      )}

      <button
        onClick={reset}
        className="absolute top-3 right-3 text-white/20 hover:text-white/60 transition-colors z-10"
        aria-label="Reset"
      >
        <RotateCcw size={12} />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────
   DEMO WRAPPER — shared tile UI
───────────────────────────────────────────────*/
type DemoType = "interactive" | "auto";

interface DemoConfig {
  id: string;
  title: string;
  desc: string;
  type: DemoType;
  component: React.ComponentType;
}

const demos: DemoConfig[] = [
  { id: "focus",   title: "TRUE FOCUS",    desc: "Focus window follows your cursor through blurred text",    type: "interactive", component: TrueFocus },
  { id: "blur",    title: "GRADUAL BLUR",  desc: "Text assembles from blur to clarity in cinematic motion",  type: "auto",        component: GradualBlur },
  { id: "ghost",   title: "GHOST CURSOR",  desc: "Your movement leaves an ink-red ghost trail behind",       type: "interactive", component: GhostCursor },
  { id: "dome",    title: "DOME GALLERY",  desc: "Parallax tiles drift with cursor — click to expand",       type: "interactive", component: DomeGallery },
  { id: "swap",    title: "CARD SWAP",     desc: "Stack of cards swaps forward with spring depth",           type: "auto",        component: CardSwap },
  { id: "ink",     title: "INK REVEAL",    desc: "Brush away darkness to reveal what's underneath",          type: "interactive", component: InkReveal },
];

const DemoTile = ({ demo, index }: { demo: DemoConfig; index: number }) => {
  const DemoComponent = demo.component;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[11px] font-mono tracking-[0.22em] text-white font-medium">{demo.title}</span>
        <div className="h-px flex-1" style={{ background: "hsl(0 0% 100% / 0.09)" }} />
        <span
          className="text-[8px] font-mono tracking-[0.2em] px-2 py-0.5 rounded-full"
          style={{
            background: demo.type === "interactive" ? "hsl(0 100% 50% / 0.12)" : "hsl(0 0% 100% / 0.07)",
            color: demo.type === "interactive" ? "hsl(0 100% 65%)" : "hsl(0 0% 60%)",
          }}
        >
          {demo.type === "interactive" ? "INTERACTIVE" : "AUTO DEMO"}
        </span>
      </div>

      {/* Demo canvas */}
      <DemoComponent />

      {/* Footer desc */}
      <p className="mt-2.5 text-[10px] text-white/35 font-mono tracking-wide leading-relaxed">
        {demo.desc}
      </p>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────*/
export const DesignLab = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const redOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 0.92, 0.92, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" id="lab">
      {/* Scroll-driven dark-to-red wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "hsl(0 60% 6%)", opacity: useTransform(redOpacity, v => v * 0.45) }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(0 100% 20% / 0.1) 0%, transparent 70%)",
          opacity: redOpacity,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 py-32 sm:py-40">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-24 sm:mb-32"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-5">
            <span className="text-primary">DESIGN</span>{" "}
            <span className="text-white">LAB</span>
          </h2>
          <p className="text-white/55 text-sm max-w-sm leading-relaxed font-mono tracking-wide">
            Six live demos. Move, click, brush, play — every effect ships with your project.
          </p>
        </motion.div>

        {/* Flowing 2-col layout */}
        <div className="space-y-16 sm:space-y-20">
          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20">
            <DemoTile demo={demos[0]} index={0} />
            <DemoTile demo={demos[1]} index={1} />
          </div>

          {/* Row 2 — asymmetric: 3/5 + 2/5 */}
          <div className="grid md:grid-cols-5 gap-10 sm:gap-14">
            <div className="md:col-span-3">
              <DemoTile demo={demos[2]} index={2} />
            </div>
            <div className="md:col-span-2">
              <DemoTile demo={demos[3]} index={3} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20">
            <DemoTile demo={demos[4]} index={4} />
            <DemoTile demo={demos[5]} index={5} />
          </div>
        </div>
      </div>
    </section>
  );
};
