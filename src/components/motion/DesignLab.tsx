import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence, useSpring } from "framer-motion";
import { RotateCcw, Sparkles, Menu, X, ChevronLeft, ChevronRight, Grip, Layers, Zap } from "lucide-react";
import { KineticType } from "@/components/motion/KineticType";

/* ─── REDUCED MOTION HOOK ─── */
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
};

/* ─── GLASS CARD WRAPPER ─── */
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`relative overflow-hidden rounded-2xl ${className}`}
    style={{
      background:
        "linear-gradient(135deg, hsl(0 0% 100% / 0.07) 0%, hsl(0 0% 100% / 0.03) 50%, hsl(0 0% 100% / 0.05) 100%)",
      boxShadow:
        "inset 0 1px 0 hsl(0 0% 100% / 0.14), inset 0 -1px 0 hsl(0 0% 0% / 0.06), 0 8px 32px hsl(0 0% 0% / 0.2), 0 2px 6px hsl(0 0% 0% / 0.1)",
    }}
  >
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(115deg, hsl(0 0% 100% / 0.1) 0%, transparent 40%, transparent 60%, hsl(0 0% 100% / 0.04) 100%)",
        borderRadius: "inherit",
      }}
    />
    {children}
  </div>
);

/* ─── DEMO TILE WRAPPER ─── */
type DemoType = "interactive" | "auto";
interface DemoConfig {
  id: string;
  title: string;
  category: string;
  type: DemoType;
  icon: React.ReactNode;
  component: React.ComponentType;
}

const DemoTile = ({ demo }: { demo: DemoConfig }) => {
  const DemoComponent = demo.component;
  return (
    <div className="flex flex-col h-full">
      {/* Card header */}
      <div className="flex items-center gap-2.5 mb-3 px-1">
        <span className="text-foreground/40">{demo.icon}</span>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-mono tracking-[0.2em] text-foreground font-medium block leading-tight">
            {demo.title}
          </span>
          <span className="text-[9px] font-mono tracking-wider text-foreground/30">{demo.category}</span>
        </div>
        <span
          className="text-[8px] font-mono tracking-[0.18em] px-2 py-0.5 rounded-full shrink-0"
          style={{
            background: demo.type === "interactive" ? "hsl(0 100% 50% / 0.1)" : "hsl(0 0% 100% / 0.06)",
            color: demo.type === "interactive" ? "hsl(0 100% 50%)" : "hsl(0 0% 100% / 0.4)",
          }}
        >
          {demo.type === "interactive" ? "INTERACTIVE" : "AUTO DEMO"}
        </span>
      </div>
      {/* Card body */}
      <div className="flex-1">
        <DemoComponent />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   DEMO 1 — GLASS SURFACE (Components)
   Apple VisionOS–style glass with specular highlights
═══════════════════════════════════════ */
const GlassSurface = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const reduced = useReducedMotion();
  const [intensity, setIntensity] = useState<"low" | "high">("low");
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = useCallback(
    (cx: number, cy: number) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPos({
        x: ((cx - rect.left) / rect.width) * 100,
        y: ((cy - rect.top) / rect.height) * 100,
      });
    },
    []
  );

  const mult = intensity === "high" ? 1.8 : 1;
  const specularOpacity = reduced ? 0.06 : 0.18 * mult;
  const shineSize = reduced ? 200 : 160 * mult;

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 40%, hsl(0 0% 100% / 0.04) 100%)",
        backdropFilter: "blur(40px) saturate(1.4)",
        WebkitBackdropFilter: "blur(40px) saturate(1.4)",
        boxShadow:
          "inset 0 0.5px 0 hsl(0 0% 100% / 0.25), inset 0 -0.5px 0 hsl(0 0% 0% / 0.1), 0 1px 3px hsl(0 0% 0% / 0.1), 0 8px 40px hsl(0 0% 0% / 0.25), 0 20px 60px hsl(0 0% 0% / 0.12)",
        border: "0.5px solid hsl(0 0% 100% / 0.12)",
      }}
    >
      <div
        ref={ref}
        className="relative flex flex-col items-center justify-center p-6"
        style={{ minHeight: 220, touchAction: "none" }}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onTouchMove={(e) => {
          e.preventDefault();
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
      >
        {/* Micro noise/grain to prevent banding */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Specular highlight — follows cursor */}
        {isInView && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle ${shineSize}px at ${pos.x}% ${pos.y}%, hsl(0 0% 100% / ${specularOpacity}), hsl(0 0% 100% / ${specularOpacity * 0.3}) 40%, transparent 70%)`,
              transition: reduced ? "none" : "background 0.15s ease-out",
            }}
          />
        )}

        {/* Edge refraction — subtle prismatic rim */}
        {!reduced && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `conic-gradient(from ${(pos.x + pos.y) * 1.5}deg at ${pos.x}% ${pos.y}%, hsl(0 0% 100% / ${0.03 * mult}), hsl(200 80% 70% / ${0.025 * mult}), hsl(0 0% 100% / ${0.02 * mult}), hsl(280 70% 70% / ${0.025 * mult}), transparent)`,
            }}
          />
        )}

        {/* Inner top highlight — Apple-style rim light */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 10%, hsl(0 0% 100% / 0.3) 50%, transparent 90%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, hsl(0 0% 100% / 0.14), hsl(0 0% 100% / 0.04))",
              boxShadow:
                "inset 0 0.5px 0 hsl(0 0% 100% / 0.25), inset 0 -0.5px 0 hsl(0 0% 0% / 0.08), 0 4px 16px hsl(0 0% 0% / 0.2)",
              border: "0.5px solid hsl(0 0% 100% / 0.08)",
            }}
          />
          <p className="font-display text-lg tracking-[0.15em] text-foreground mb-1">GLASS PANEL</p>
          <p className="text-[10px] font-mono text-foreground/30">Move cursor to refract light</p>
        </div>

        {/* Intensity toggle */}
        <div className="absolute bottom-3 right-3 flex gap-1 z-10">
          {(["low", "high"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setIntensity(v)}
              className="text-[8px] font-mono tracking-wider px-2 py-1 rounded-md transition-all"
              style={{
                background: intensity === v ? "hsl(0 100% 50% / 0.15)" : "hsl(0 0% 100% / 0.05)",
                color: intensity === v ? "hsl(0 100% 50%)" : "hsl(0 0% 100% / 0.35)",
                boxShadow: intensity === v ? "inset 0 0 0 1px hsl(0 100% 50% / 0.3)" : "none",
              }}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   DEMO 2 — GRID SCAN (Backgrounds)
   CSS grid with animated scan line
═══════════════════════════════════════ */
const GridScan = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const reduced = useReducedMotion();
  const [scanPos, setScanPos] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isInView || reduced) return;
    let pos = scanPos;
    const tick = () => {
      const s = hovering ? 3 : speed;
      pos = (pos + s * 0.4) % 100;
      setScanPos(pos);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, hovering, speed, reduced]);

  return (
    <GlassCard>
      <div
        ref={ref}
        className="relative flex items-center justify-center p-6 cursor-crosshair"
        style={{ minHeight: 220, touchAction: "none" }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onTouchStart={() => setHovering(true)}
        onTouchEnd={() => setHovering(false)}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(hsl(0 0% 100% / 0.06) 1px, transparent 1px),
              linear-gradient(90deg, hsl(0 0% 100% / 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Scan line */}
        {isInView && !reduced && (
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: `${scanPos}%`,
              height: 2,
              background: `linear-gradient(90deg, transparent, hsl(0 100% 50% / 0.6), hsl(0 100% 50% / 0.8), hsl(0 100% 50% / 0.6), transparent)`,
              boxShadow: "0 0 20px hsl(0 100% 50% / 0.3), 0 0 60px hsl(0 100% 50% / 0.15)",
              transition: hovering ? "none" : undefined,
            }}
          />
        )}
        {/* Glow at scan position */}
        {isInView && !reduced && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 100% 40px at 50% ${scanPos}%, hsl(0 100% 50% / 0.06), transparent)`,
            }}
          />
        )}

        <div className="relative z-10 text-center">
          <p className="font-display text-lg tracking-[0.15em] text-foreground mb-1">GRID SCAN</p>
          <p className="text-[10px] font-mono text-foreground/30">
            {hovering ? "ACCELERATING…" : "Hover to accelerate"}
          </p>
        </div>

        {/* Speed control */}
        <div className="absolute bottom-3 left-3 flex gap-1 z-10">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-mono transition-all"
              style={{
                background: speed === s ? "hsl(0 100% 50% / 0.15)" : "hsl(0 0% 100% / 0.05)",
                color: speed === s ? "hsl(0 100% 50%)" : "hsl(0 0% 100% / 0.3)",
              }}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

/* ═══════════════════════════════════════
   DEMO 3 — IMAGE TRAIL (Animations)
   Cursor trail with thumbnail images
═══════════════════════════════════════ */
/* Random placeholder photos — lightweight, no color frames */
const trailPhotos = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=120&h=160&fit=crop&q=60",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=160&fit=crop&q=60",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=120&h=160&fit=crop&q=60",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=120&h=160&fit=crop&q=60",
  "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=120&h=160&fit=crop&q=60",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=120&h=160&fit=crop&q=60",
];

interface Trail {
  id: number;
  x: number;
  y: number;
  imgIdx: number;
}

const ImageTrail = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const reduced = useReducedMotion();
  const [trails, setTrails] = useState<Trail[]>([]);
  const [enabled, setEnabled] = useState(true);
  const [density, setDensity] = useState<"low" | "high">("low");
  const idRef = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const imgIdx = useRef(0);

  const minDist = density === "high" ? 20 : 40;
  const maxTrails = density === "high" ? 12 : 6;
  const ttl = 800;

  const handleMove = useCallback(
    (cx: number, cy: number) => {
      if (!enabled || !ref.current || reduced) return;
      const rect = ref.current.getBoundingClientRect();
      const x = cx - rect.left;
      const y = cy - rect.top;
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < minDist) return;
      lastPos.current = { x, y };
      const id = ++idRef.current;
      const currentImg = imgIdx.current;
      imgIdx.current = (imgIdx.current + 1) % trailPhotos.length;
      setTrails((t) => [...t.slice(-maxTrails), { id, x, y, imgIdx: currentImg }]);
      setTimeout(() => setTrails((t) => t.filter((p) => p.id !== id)), ttl);
    },
    [enabled, minDist, maxTrails, reduced]
  );

  return (
    <GlassCard>
      <div
        ref={ref}
        className="relative flex items-center justify-center p-6 overflow-hidden"
        style={{ minHeight: 220, touchAction: "none", cursor: enabled ? "none" : "default" }}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onTouchMove={(e) => {
          e.preventDefault();
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
      >
        {/* Trail thumbnails */}
        <AnimatePresence>
          {trails.map((t) => (
            <motion.div
              key={t.id}
              className="absolute pointer-events-none rounded-lg overflow-hidden"
              initial={{ opacity: 0.9, scale: 1, rotate: Math.random() * 12 - 6 }}
              animate={{ opacity: 0, scale: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{
                left: t.x - 28,
                top: t.y - 36,
                width: 56,
                height: 72,
                boxShadow: "0 4px 20px hsl(0 0% 0% / 0.35)",
              }}
            >
              <img
                src={trailPhotos[t.imgIdx]}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="relative z-10 text-center">
          <p className="font-display text-lg tracking-[0.15em] text-foreground mb-1">IMAGE TRAIL</p>
          <p className="text-[10px] font-mono text-foreground/30">
            {enabled ? "Move cursor to spawn" : "Trail disabled"}
          </p>
        </div>

        {/* Controls */}
        <div className="absolute bottom-3 left-3 flex gap-2 z-10">
          <button
            onClick={() => setEnabled(!enabled)}
            className="text-[8px] font-mono tracking-wider px-2 py-1 rounded-md transition-all"
            style={{
              background: enabled ? "hsl(0 100% 50% / 0.15)" : "hsl(0 0% 100% / 0.05)",
              color: enabled ? "hsl(0 100% 50%)" : "hsl(0 0% 100% / 0.35)",
            }}
          >
            {enabled ? "ON" : "OFF"}
          </button>
          <button
            onClick={() => setDensity(density === "low" ? "high" : "low")}
            className="text-[8px] font-mono tracking-wider px-2 py-1 rounded-md"
            style={{
              background: "hsl(0 0% 100% / 0.05)",
              color: "hsl(0 0% 100% / 0.35)",
            }}
          >
            {density.toUpperCase()}
          </button>
        </div>

        <button
          onClick={() => setTrails([])}
          className="absolute top-3 right-3 text-foreground/20 hover:text-foreground/50 transition-colors z-10"
          aria-label="Clear trails"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </GlassCard>
  );
};

/* ═══════════════════════════════════════
   DEMO 4 — MAGNET (Animations)
   Magnetic hover element with spring physics
═══════════════════════════════════════ */
const MagnetDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 180, damping: 14 });
  const y = useSpring(0, { stiffness: 180, damping: 14 });
  const [hovering, setHovering] = useState(false);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!btnRef.current || reduced) return;
      const rect = btnRef.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 120;
      if (dist < radius) {
        const strength = 0.35;
        x.set(dx * strength);
        y.set(dy * strength);
        setHovering(true);
      } else {
        x.set(0);
        y.set(0);
        setHovering(false);
      }
    },
    [x, y, reduced]
  );

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovering(false);
  };

  return (
    <GlassCard>
      <div
        ref={ref}
        className="relative flex items-center justify-center p-6"
        style={{ minHeight: 220 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {/* Magnetic field visualization */}
        {hovering && !reduced && (
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 240,
              height: 240,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              border: "1px solid hsl(0 100% 50% / 0.08)",
              background: "radial-gradient(circle, hsl(0 100% 50% / 0.03), transparent 70%)",
            }}
          />
        )}

        <motion.div
          ref={btnRef}
          className="relative z-10 select-none"
          style={{ x, y }}
        >
          <motion.button
            className="px-8 py-4 rounded-xl font-mono text-sm tracking-[0.15em] text-foreground relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(0 0% 100% / 0.1), hsl(0 0% 100% / 0.04))",
              boxShadow:
                "inset 0 1px 0 hsl(0 0% 100% / 0.2), 0 4px 20px hsl(0 0% 0% / 0.15)",
            }}
            whileHover={reduced ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={hovering && !reduced ? { boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.2), 0 4px 20px hsl(0 100% 50% / 0.15), 0 0 40px hsl(0 100% 50% / 0.08)" } : {}}
          >
            <span className="relative z-10">MAGNETIC</span>
          </motion.button>
        </motion.div>

        <p className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono text-foreground/25">
          {reduced ? "Tap the button" : "Move cursor near the button"}
        </p>
      </div>
    </GlassCard>
  );
};

/* ═══════════════════════════════════════
   DEMO 5 — STAGGERED MENU (Components)
   Menu overlay with stagger animation
═══════════════════════════════════════ */
const menuItems = ["Projects", "About", "Services", "Process", "Contact"];

const StaggeredMenu = () => {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <GlassCard>
      <div className="relative flex flex-col items-center justify-center p-6" style={{ minHeight: 220 }}>
        {/* Toggle button — repositioned when open */}
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
          style={{
            position: open ? "absolute" : "relative",
            top: open ? 12 : undefined,
            right: open ? 12 : undefined,
            zIndex: 30,
            background: open ? "hsl(0 100% 50% / 0.15)" : "hsl(0 0% 100% / 0.08)",
            boxShadow: open
              ? "inset 0 0 0 1px hsl(0 100% 50% / 0.3)"
              : "inset 0 0 0 1px hsl(0 0% 100% / 0.1)",
          }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <X size={16} className="text-primary" />
          ) : (
            <Menu size={16} className="text-foreground/60" />
          )}
        </button>

        {/* Menu overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-2xl"
              style={{
                background: "hsl(0 0% 4% / 0.94)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {menuItems.map((item, i) => (
                <motion.button
                  key={item}
                  className="text-foreground/80 hover:text-primary font-display text-xl tracking-[0.2em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded px-4 py-1.5"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, filter: "blur(6px)" }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -14, filter: "blur(3px)" }}
                  transition={{
                    delay: i * 0.09,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <p className="absolute bottom-3 text-[10px] font-mono text-foreground/25 text-center">
            Tap to open staggered menu
          </p>
        )}
      </div>
    </GlassCard>
  );
};

/* ═══════════════════════════════════════
   DEMO 6 — CARD SWAP (Components)
   Draggable/clickable card stack
═══════════════════════════════════════ */
const swapCards = [
  { label: "STRATEGY", sub: "Research · Analysis · Direction", hue: 0 },
  { label: "DESIGN", sub: "Visual · Motion · Identity", hue: 220 },
  { label: "DEVELOP", sub: "Code · Deploy · Iterate", hue: 160 },
];

const CardSwapDemo = () => {
  const [top, setTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const reduced = useReducedMotion();
  const dragStartX = useRef(0);
  const [dragX, setDragX] = useState(0);

  const next = () => setTop((t) => (t + 1) % swapCards.length);
  const prev = () => setTop((t) => (t - 1 + swapCards.length) % swapCards.length);

  const getOrder = (i: number) => ((i - top) % swapCards.length + swapCards.length) % swapCards.length;

  return (
    <GlassCard>
      <div
        ref={ref}
        className="relative flex items-center justify-center p-6"
        style={{ minHeight: 220, perspective: 600, perspectiveOrigin: "50% 40%" }}
      >
        <div className="relative" style={{ width: 200, height: 120, transformStyle: "preserve-3d" }}>
          {swapCards.map((card, i) => {
            const order = getOrder(i);
            // 3D tilt based on drag for top card
            const tiltY = order === 0 && !reduced ? dragX * 0.15 : 0;
            const tiltX = order === 0 && !reduced ? 2 : order * 3;
            const dynamicShadowBlur = order === 0 ? 32 : 16;
            const dynamicShadowSpread = order === 0 ? -4 : -8;

            return (
              <motion.div
                key={i}
                className="absolute inset-0 flex flex-col justify-between p-5 rounded-xl cursor-grab active:cursor-grabbing select-none"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDrag={(_, info) => {
                  if (order === 0) setDragX(info.offset.x);
                }}
                onDragStart={(_, info) => {
                  dragStartX.current = info.point.x;
                }}
                onDragEnd={(_, info) => {
                  setDragX(0);
                  const dx = info.point.x - dragStartX.current;
                  if (Math.abs(dx) > 50) {
                    dx > 0 ? prev() : next();
                  }
                }}
                onClick={() => {
                  if (order === 0) next();
                }}
                style={{
                  background: `linear-gradient(135deg, hsl(${card.hue} 35% 14%), hsl(${card.hue} 25% 10%))`,
                  boxShadow: `inset 0 1px 0 hsl(0 0% 100% / 0.12), 0 ${4 + order * 2}px ${dynamicShadowBlur}px ${dynamicShadowSpread}px hsl(0 0% 0% / ${0.25 + order * 0.08})`,
                  zIndex: swapCards.length - order,
                  transformStyle: "preserve-3d",
                }}
                animate={
                  reduced
                    ? { y: order * 8, opacity: order === 0 ? 1 : 0.4 }
                    : {
                        y: order * 14,
                        scale: 1 - order * 0.07,
                        opacity: order === 2 ? 0.25 : order === 1 ? 0.55 : 1,
                        rotateX: tiltX,
                        rotateY: tiltY,
                      }
                }
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
              >
                {/* Shine */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-xl"
                  style={{
                    background: order === 0
                      ? "linear-gradient(115deg, hsl(0 0% 100% / 0.1) 0%, transparent 45%)"
                      : "linear-gradient(115deg, hsl(0 0% 100% / 0.05) 0%, transparent 50%)",
                  }}
                />
                <div className="relative z-10">
                  <p className="font-display text-xs tracking-[0.25em] text-foreground">{card.label}</p>
                  <p className="text-[9px] text-foreground/40 mt-1 font-mono">{card.sub}</p>
                </div>
                {order === 0 && (
                  <div className="relative z-10 flex justify-end">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Prev/Next */}
        <div className="absolute bottom-3 right-3 flex gap-1 z-10">
          <button
            onClick={prev}
            className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
            style={{ background: "hsl(0 0% 100% / 0.05)" }}
            aria-label="Previous card"
          >
            <ChevronLeft size={12} className="text-foreground/30" />
          </button>
          <button
            onClick={next}
            className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
            style={{ background: "hsl(0 0% 100% / 0.05)" }}
            aria-label="Next card"
          >
            <ChevronRight size={12} className="text-foreground/30" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

/* ═══════════════════════════════════════
   DEMOS CONFIG
═══════════════════════════════════════ */
const demos: DemoConfig[] = [
  {
    id: "glass",
    title: "GLASS SURFACE",
    category: "Components",
    type: "interactive",
    icon: <Sparkles size={12} />,
    component: GlassSurface,
  },
  {
    id: "grid",
    title: "GRID SCAN",
    category: "Backgrounds",
    type: "interactive",
    icon: <Grip size={12} />,
    component: GridScan,
  },
  {
    id: "trail",
    title: "IMAGE TRAIL",
    category: "Animations",
    type: "interactive",
    icon: <Zap size={12} />,
    component: ImageTrail,
  },
  {
    id: "magnet",
    title: "MAGNET",
    category: "Animations",
    type: "interactive",
    icon: <Zap size={12} />,
    component: MagnetDemo,
  },
  {
    id: "stagger",
    title: "STAGGERED MENU",
    category: "Components",
    type: "interactive",
    icon: <Menu size={12} />,
    component: StaggeredMenu,
  },
  {
    id: "swap",
    title: "CARD SWAP",
    category: "Components",
    type: "interactive",
    icon: <Layers size={12} />,
    component: CardSwapDemo,
  },
];

/* ═══════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════ */
export const DesignLab = () => {
  return (
    <section className="relative" id="lab">
      <div className="relative z-10 mx-auto px-5 sm:px-8" style={{ maxWidth: 1280 }}>
        {/* Padding: desktop 80px, mobile 48px */}
        <div className="py-12 sm:py-16 md:py-20">
          {/* Heading */}
          <div className="mb-14 sm:mb-18 md:mb-20">
            <KineticType
              text="DESIGN LAB"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 text-foreground"
              delay={0.15}
              wordDelay={0.12}
            />
            <p className="text-foreground/40 text-sm max-w-md leading-relaxed font-mono tracking-wide">
              Interactive UI components that enhance and personalize your web applications.
            </p>
          </div>

          {/* 6-card grid: 3 rows × 2 cols on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {demos.map((demo) => (
              <DemoTile key={demo.id} demo={demo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
