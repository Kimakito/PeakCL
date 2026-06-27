import { useEffect, useRef } from "react";

const COLORS = {
  turquoise: "oklch(0.83 0.14 185)",
  violet: "oklch(0.55 0.27 295)",
  yellow: "oklch(0.89 0.18 95)",
  white: "oklch(0.96 0.01 280)",
};

type Style = "burst" | "ring" | "comet" | "sparkle" | "spiral" | "star";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
  color: string;
  decay: number;
  trail: Array<{ x: number; y: number }>;
  style: Style;
  angle?: number;
  spin?: number;
}

function randomColor(): string {
  const keys = Object.keys(COLORS) as Array<keyof typeof COLORS>;
  return COLORS[keys[Math.floor(Math.random() * keys.length)]];
}

function spawnBurst(cx: number, cy: number, particles: Particle[]) {
  const count = 22 + Math.floor(Math.random() * 12);
  const color = randomColor();
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const speed = 2.5 + Math.random() * 3;
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      radius: 2 + Math.random() * 2,
      color,
      decay: 0.015 + Math.random() * 0.012,
      trail: [],
      style: "burst",
    });
  }
}

function spawnRing(cx: number, cy: number, particles: Particle[]) {
  const count = 32;
  const color = randomColor();
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const speed = 1.8 + Math.random() * 1.2;
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      radius: 1.5 + Math.random() * 1.5,
      color,
      decay: 0.008 + Math.random() * 0.006,
      trail: [],
      style: "ring",
    });
  }
}

function spawnComet(cx: number, cy: number, particles: Particle[]) {
  for (let i = 0; i < 8; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.6;
    const speed = 3.5 + Math.random() * 4;
    particles.push({
      x: cx + (Math.random() - 0.5) * 40,
      y: cy + (Math.random() - 0.5) * 20,
      vx: Math.cos(angle) * speed * 0.3,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      radius: 1.5 + Math.random() * 2,
      color: Math.random() > 0.5 ? COLORS.turquoise : COLORS.white,
      decay: 0.01 + Math.random() * 0.008,
      trail: [],
      style: "comet",
    });
  }
}

function spawnSparkle(cx: number, cy: number, particles: Particle[]) {
  for (let i = 0; i < 18; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 4;
    particles.push({
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      alpha: 1,
      radius: 1 + Math.random() * 2.5,
      color: i % 3 === 0 ? COLORS.yellow : i % 3 === 1 ? COLORS.turquoise : COLORS.violet,
      decay: 0.012 + Math.random() * 0.014,
      trail: [],
      style: "sparkle",
    });
  }
}

function spawnSpiral(cx: number, cy: number, particles: Particle[]) {
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 6;
    const r = i * 0.5;
    particles.push({
      x: cx + Math.cos(angle) * r * 0.1,
      y: cy + Math.sin(angle) * r * 0.1,
      vx: Math.cos(angle) * (1.2 + i * 0.08),
      vy: Math.sin(angle) * (1.2 + i * 0.08),
      alpha: 1,
      radius: 2,
      color: i % 2 === 0 ? COLORS.violet : COLORS.turquoise,
      decay: 0.01 + i * 0.001,
      trail: [],
      style: "spiral",
      spin: angle,
    });
  }
}

function spawnStar(cx: number, cy: number, particles: Particle[]) {
  const points = 5;
  for (let i = 0; i < points * 2; i++) {
    const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const speed = i % 2 === 0 ? 3.5 : 1.8;
    const color = i % 2 === 0 ? COLORS.yellow : COLORS.white;
    for (let j = 0; j < 4; j++) {
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle + (Math.random() - 0.5) * 0.3) * (speed + Math.random()),
        vy: Math.sin(angle + (Math.random() - 0.5) * 0.3) * (speed + Math.random()),
        alpha: 1,
        radius: 1.5 + Math.random() * 2,
        color,
        decay: 0.013 + Math.random() * 0.01,
        trail: [],
        style: "star",
        angle,
      });
    }
  }
}

const STYLES: Style[] = ["burst", "ring", "comet", "sparkle", "spiral", "star"];
const SPAWNERS = { burst: spawnBurst, ring: spawnRing, comet: spawnComet, sparkle: spawnSparkle, spiral: spawnSpiral, star: spawnStar };

export function Fireworks({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let styleIdx = 0;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const fire = () => {
      const cx = w() / 2 + (Math.random() - 0.5) * w() * 0.4;
      const cy = h() / 2 + (Math.random() - 0.5) * h() * 0.4;
      const style = STYLES[styleIdx % STYLES.length];
      styleIdx++;
      SPAWNERS[style](cx, cy, particles);
    };

    fire();
    const interval = setInterval(fire, 1800);

    const tick = () => {
      ctx.clearRect(0, 0, w(), h());
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.vx *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) { particles.splice(i, 1); continue; }

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.trail.length > 1) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.radius * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (const pt of p.trail) ctx.lineTo(pt.x, pt.y);
          ctx.globalAlpha = p.alpha * 0.3;
          ctx.stroke();
          ctx.globalAlpha = p.alpha;
        }

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
