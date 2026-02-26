import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence, useSpring } from "framer-motion";
import { RotateCcw, Sparkles, Menu, X, ChevronLeft, ChevronRight, Grip, Layers, Zap } from "lucide-react";
import { KineticType } from "@/components/motion/KineticType";
import { useLanguage } from "@/contexts/LanguageContext";

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
  titleKey: string;
  categoryKey: string;
  type: DemoType;
  icon: React.ReactNode;
  component: React.ComponentType;
}

const DemoTile = ({ demo }: { demo: DemoConfig }) => {
  const DemoComponent = demo.component;
  const { t } = useLanguage();
  return (
    <div className="flex flex-col h-full">
      {/* Card header */}
      <div className="flex items-center gap-2.5 mb-3 px-1">
        <span className="text-foreground/40">{demo.icon}</span>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-mono tracking-[0.2em] text-foreground font-medium block leading-tight">
            {t(demo.titleKey)}
          </span>
          <span className="text-[9px] font-mono tracking-wider text-foreground/30">{t(demo.categoryKey)}</span>
        </div>
        <span
          className="text-[8px] font-mono tracking-[0.18em] px-2 py-0.5 rounded-full shrink-0"
          style={{
            background: demo.type === "interactive" ? "hsl(0 100% 50% / 0.1)" : "hsl(0 0% 100% / 0.06)",
            color: demo.type === "interactive" ? "hsl(0 100% 50%)" : "hsl(0 0% 100% / 0.4)",
          }}
        >
          {demo.type === "interactive" ? t("lab.interactive") : t("lab.autoDemo")}
        </span>
      </div>
      {/* Card body */}
      <div className="flex-1">
        <DemoComponent />
      </div>
    </div>
  );
};

/* ── Small label components that use translations ── */
const GlassLabel = () => {
  const { t } = useLanguage();
  return (
    <>
      <p className="font-display text-lg tracking-[0.15em] text-foreground mb-1">{t("lab.glassSurface")}</p>
      <p className="text-[10px] font-mono text-foreground/30">{t("lab.glassSub")}</p>
    </>
  );
};
const GridScanLabel = ({ hovering }: { hovering: boolean }) => {
  const { t } = useLanguage();
  return (
    <>
      <p className="font-display text-lg tracking-[0.15em] text-foreground mb-1">{t("lab.gridScan")}</p>
      <p className="text-[10px] font-mono text-foreground/30">{hovering ? t("lab.gridScanAccel") : t("lab.gridScanHover")}</p>
    </>
  );
};
const ImageTrailLabel = ({ enabled }: { enabled: boolean }) => {
  const { t } = useLanguage();
  return (
    <>
      <p className="font-display text-lg tracking-[0.15em] text-foreground mb-1">{t("lab.imageTrail")}</p>
      <p className="text-[10px] font-mono text-foreground/30">{enabled ? t("lab.imageTrailSub") : t("lab.imageTrailOff")}</p>
    </>
  );
};
const MagnetLabel = () => {
  const { t } = useLanguage();
  return <span className="relative z-10">{t("lab.magnet")}</span>;
};
const MagnetSublabel = ({ reduced }: { reduced: boolean }) => {
  const { t } = useLanguage();
  return (
    <p className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono text-foreground/25">
      {reduced ? t("lab.magnetTap") : t("lab.magnetSub")}
    </p>
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
          <GlassLabel />
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
          <GridScanLabel hovering={hovering} />
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
          <ImageTrailLabel enabled={enabled} />
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
            <MagnetLabel />
          </motion.button>
        </motion.div>

        <MagnetSublabel reduced={reduced} />
      </div>
    </GlassCard>
  );
};

/* ═══════════════════════════════════════
   DEMO 5 — STAGGERED MENU (Components)
   Premium menu overlay with bold stagger + line decorations
═══════════════════════════════════════ */
const menuItemKeys = ["lab.menu.projects", "lab.menu.about", "lab.menu.services", "lab.menu.process", "lab.menu.contact"];

const StaggeredMenu = () => {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { t } = useLanguage();

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
      <div className="relative flex flex-col items-center justify-center p-6" style={{ minHeight: 240 }}>
        {/* Open button — centered with pulse ring */}
        {!open && (
          <motion.button
            onClick={() => setOpen(true)}
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center z-20"
            style={{
              background: "hsl(0 0% 100% / 0.06)",
              boxShadow: "inset 0 0 0 1px hsl(0 0% 100% / 0.1)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Open menu"
            aria-expanded={false}
          >
            <Menu size={20} className="text-foreground/60" />
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ border: "1px solid hsl(var(--primary) / 0.3)" }}
              animate={reduced ? {} : { scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.button>
        )}

        {/* Menu overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-start justify-center rounded-2xl overflow-hidden"
              style={{ background: "hsl(0 0% 3% / 0.96)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button — top right, safe area */}
              <motion.button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center z-30"
                style={{
                  background: "hsl(0 100% 50% / 0.12)",
                  boxShadow: "inset 0 0 0 1px hsl(0 100% 50% / 0.25)",
                }}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ delay: 0.15, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.1, background: "hsl(0 100% 50% / 0.2)" }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
              >
                <X size={14} className="text-primary" />
              </motion.button>

              {/* Decorative vertical line */}
              <motion.div
                className="absolute left-8 top-0 bottom-0 w-px pointer-events-none"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: "hsl(0 0% 100% / 0.06)", transformOrigin: "top" }}
              />

              {/* Menu items */}
              <div className="flex flex-col gap-1 pl-12 pr-16 w-full">
                {menuItemKeys.map((key, i) => (
                  <motion.button
                    key={key}
                    className="group relative text-left py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, x: -30, filter: "blur(8px)" }}
                    animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, x: 20, filter: "blur(4px)" }}
                    transition={{
                      delay: 0.08 + i * 0.1,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                  >
                    {/* Item number */}
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-[8px] font-mono text-foreground/15 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Dot indicator */}
                    <motion.span
                      className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 400, damping: 15 }}
                    />
                    <span className="font-display text-lg sm:text-xl tracking-[0.18em] text-foreground/70 group-hover:text-primary transition-colors duration-200">
                      {t(key)}
                    </span>
                    {/* Hover underline */}
                    <motion.div
                      className="absolute bottom-1 left-0 right-0 h-px bg-primary/30 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Bottom label */}
              <motion.p
                className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-mono text-foreground/15 tracking-[0.3em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {t("lab.navDemo")}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <p className="absolute bottom-3 text-[10px] font-mono text-foreground/25 text-center">
            {t("lab.staggerSub")}
          </p>
        )}
      </div>
    </GlassCard>
  );
};

/* ═══════════════════════════════════════
   DEMO 6 — CARD SWAP (Components)
   Premium 3D card stack with rich animations
═══════════════════════════════════════ */
const swapCardKeys = [
  { labelKey: "lab.swap.strategy", subKey: "lab.swap.strategySub", hue: 0, emoji: "◆" },
  { labelKey: "lab.swap.design", subKey: "lab.swap.designSub", hue: 220, emoji: "◇" },
  { labelKey: "lab.swap.develop", subKey: "lab.swap.developSub", hue: 160, emoji: "○" },
];

const CardSwapDemo = () => {
  const { t } = useLanguage();
  const [top, setTop] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const reduced = useReducedMotion();
  const dragStartX = useRef(0);
  const [dragX, setDragX] = useState(0);

  const next = useCallback(() => {
    if (isSwapping) return;
    setIsSwapping(true);
    setTop((t) => (t + 1) % swapCardKeys.length);
    setTimeout(() => setIsSwapping(false), 400);
  }, [isSwapping]);

  const prev = useCallback(() => {
    if (isSwapping) return;
    setIsSwapping(true);
    setTop((t) => (t - 1 + swapCardKeys.length) % swapCardKeys.length);
    setTimeout(() => setIsSwapping(false), 400);
  }, [isSwapping]);

  const getOrder = (i: number) => ((i - top) % swapCardKeys.length + swapCardKeys.length) % swapCardKeys.length;

  return (
    <GlassCard>
      <div
        ref={ref}
        className="relative flex items-center justify-center p-6"
        style={{ minHeight: 240, perspective: 500, perspectiveOrigin: "50% 35%" }}
      >
        {/* Ambient glow behind cards */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 180,
            height: 100,
            left: "50%",
            top: "45%",
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            background: `radial-gradient(ellipse, hsl(${swapCardKeys[top].hue} 50% 30% / 0.12), transparent 70%)`,
          }}
          transition={{ duration: 0.6 }}
        />

        <div className="relative" style={{ width: 220, height: 130, transformStyle: "preserve-3d" }}>
          {swapCardKeys.map((card, i) => {
            const order = getOrder(i);
            const isTop = order === 0;
            const tiltY = isTop && !reduced ? dragX * 0.2 : 0;
            const tiltX = isTop && !reduced ? 3 : order * 4;

            return (
              <motion.div
                key={card.labelKey}
                className="absolute inset-0 flex flex-col justify-between p-5 rounded-2xl cursor-grab active:cursor-grabbing select-none overflow-hidden"
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDrag={(_, info) => {
                  if (isTop) setDragX(info.offset.x);
                }}
                onDragStart={(_, info) => {
                  dragStartX.current = info.point.x;
                }}
                onDragEnd={(_, info) => {
                  setDragX(0);
                  const dx = info.point.x - dragStartX.current;
                  if (Math.abs(dx) > 40) {
                    dx > 0 ? prev() : next();
                  }
                }}
                onClick={() => {
                  if (isTop) next();
                }}
                style={{
                  background: `linear-gradient(145deg, hsl(${card.hue} 30% 16%), hsl(${card.hue} 20% 9%))`,
                  boxShadow: isTop
                    ? `inset 0 1px 0 hsl(0 0% 100% / 0.15), 0 8px 40px -8px hsl(${card.hue} 40% 20% / 0.4), 0 2px 8px hsl(0 0% 0% / 0.2)`
                    : `inset 0 1px 0 hsl(0 0% 100% / 0.08), 0 4px 16px hsl(0 0% 0% / 0.15)`,
                  zIndex: swapCardKeys.length - order,
                  transformStyle: "preserve-3d",
                  border: isTop ? "0.5px solid hsl(0 0% 100% / 0.1)" : "0.5px solid hsl(0 0% 100% / 0.04)",
                }}
                animate={
                  reduced
                    ? { y: order * 10, opacity: isTop ? 1 : 0.35 }
                    : {
                        y: order * 16,
                        scale: 1 - order * 0.08,
                        opacity: order === 2 ? 0.2 : order === 1 ? 0.5 : 1,
                        rotateX: tiltX,
                        rotateY: tiltY,
                      }
                }
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
              >
                {/* Animated shine sweep on top card */}
                {isTop && !reduced && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                    key={top}
                    style={{
                      background: "linear-gradient(105deg, transparent 30%, hsl(0 0% 100% / 0.06) 45%, hsl(0 0% 100% / 0.12) 50%, hsl(0 0% 100% / 0.06) 55%, transparent 70%)",
                      width: "60%",
                    }}
                  />
                )}
                {/* Static subtle shine */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background: isTop
                      ? "linear-gradient(115deg, hsl(0 0% 100% / 0.08) 0%, transparent 40%)"
                      : "linear-gradient(115deg, hsl(0 0% 100% / 0.03) 0%, transparent 50%)",
                  }}
                />
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="font-display text-sm tracking-[0.25em] text-foreground">{t(card.labelKey)}</p>
                    <p className="text-[9px] text-foreground/35 mt-1.5 font-mono">{t(card.subKey)}</p>
                  </div>
                  <motion.span
                    className="text-foreground/20 text-xs"
                    animate={isTop && !reduced ? { rotate: [0, 180, 360] } : {}}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    {card.emoji}
                  </motion.span>
                </div>
                {isTop && (
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex gap-1">
                      {swapCardKeys.map((_, idx) => (
                        <motion.div
                          key={idx}
                          className="rounded-full"
                          style={{
                            width: idx === top ? 12 : 4,
                            height: 4,
                            background: idx === top ? "hsl(var(--primary))" : "hsl(0 0% 100% / 0.15)",
                          }}
                          layout
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono text-foreground/20 tabular-nums">
                      {String(top + 1).padStart(2, "0")}/{String(swapCardKeys.length).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Prev/Next — improved buttons */}
        <div className="absolute bottom-3 right-3 flex gap-1.5 z-10">
          <motion.button
            onClick={prev}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "hsl(0 0% 100% / 0.05)",
              border: "0.5px solid hsl(0 0% 100% / 0.08)",
            }}
            whileHover={{ background: "hsl(0 0% 100% / 0.1)", scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous card"
          >
            <ChevronLeft size={14} className="text-foreground/40" />
          </motion.button>
          <motion.button
            onClick={next}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "hsl(0 0% 100% / 0.05)",
              border: "0.5px solid hsl(0 0% 100% / 0.08)",
            }}
            whileHover={{ background: "hsl(0 0% 100% / 0.1)", scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next card"
          >
            <ChevronRight size={14} className="text-foreground/40" />
          </motion.button>
        </div>
      </div>
    </GlassCard>
  );};

/* ═══════════════════════════════════════
   DEMOS CONFIG
═══════════════════════════════════════ */
const demos: DemoConfig[] = [
  { id: "glass", titleKey: "lab.demo.glass.title", categoryKey: "lab.demo.glass.cat", type: "interactive", icon: <Sparkles size={12} />, component: GlassSurface },
  { id: "grid", titleKey: "lab.demo.grid.title", categoryKey: "lab.demo.grid.cat", type: "interactive", icon: <Grip size={12} />, component: GridScan },
  { id: "trail", titleKey: "lab.demo.trail.title", categoryKey: "lab.demo.trail.cat", type: "interactive", icon: <Zap size={12} />, component: ImageTrail },
  { id: "magnet", titleKey: "lab.demo.magnet.title", categoryKey: "lab.demo.magnet.cat", type: "interactive", icon: <Zap size={12} />, component: MagnetDemo },
  { id: "stagger", titleKey: "lab.demo.stagger.title", categoryKey: "lab.demo.stagger.cat", type: "interactive", icon: <Menu size={12} />, component: StaggeredMenu },
  { id: "swap", titleKey: "lab.demo.swap.title", categoryKey: "lab.demo.swap.cat", type: "interactive", icon: <Layers size={12} />, component: CardSwapDemo },
];

/* ═══════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════ */
export const DesignLab = () => {
  const { t } = useLanguage();
  return (
    <section className="relative" id="lab">
      <div className="relative z-10 mx-auto px-5 sm:px-8" style={{ maxWidth: 1280 }}>
        <div className="py-12 sm:py-16 md:py-20">
          <div className="mb-14 sm:mb-18 md:mb-20">
            <KineticType
              text={t("lab.title")}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 text-foreground"
              delay={0.15}
              wordDelay={0.12}
            />
            <p className="text-foreground/40 text-sm max-w-md leading-relaxed font-mono tracking-wide">
              {t("lab.subtitle")}
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
