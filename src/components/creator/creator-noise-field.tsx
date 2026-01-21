"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Dot = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  color: string;
  seed: number;
};

function hash(n: number) {
  n = n ^ 61 ^ (n >>> 16);
  n = n + (n << 3);
  n = n ^ (n >>> 4);
  n = n * 0x27d4eb2d;
  return n ^ (n >>> 15);
}

function rand01(seed: number) {
  return (hash(seed) >>> 0) / 4294967295;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function valueNoise2D(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const h00 = rand01(seed + xi * 374761 + yi * 668265);
  const h10 = rand01(seed + (xi + 1) * 374761 + yi * 668265);
  const h01 = rand01(seed + xi * 374761 + (yi + 1) * 668265);
  const h11 = rand01(seed + (xi + 1) * 374761 + (yi + 1) * 668265);

  const u = fade(xf);
  const v = fade(yf);

  const x1 = lerp(h00, h10, u);
  const x2 = lerp(h01, h11, u);
  return lerp(x1, x2, v);
}

function fbm2D(x: number, y: number, seed: number, octaves = 4) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let norm = 0;

  for (let i = 0; i < octaves; i += 1) {
    value +=
      valueNoise2D(x * frequency, y * frequency, seed + i * 1013) * amplitude;
    norm += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return value / Math.max(1e-6, norm);
}

function cssVar(root: HTMLElement, name: string, fallback: string) {
  const value = getComputedStyle(root).getPropertyValue(name).trim();
  return value || fallback;
}

function toRgb(color: string, probe: HTMLElement) {
  probe.style.color = color;
  const computed = getComputedStyle(probe).color;
  return computed || "rgb(160,255,180)";
}

function lumaFromRgbString(rgb: string) {
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!m) return 1;
  const r = Number(m[1] ?? 255) / 255;
  const g = Number(m[2] ?? 255) / 255;
  const b = Number(m[3] ?? 255) / 255;
  // sRGB relative luminance approximation
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function CreatorNoiseField({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const grainId = `creator-grain-${React.useId().replaceAll(":", "")}`;
  const [reduceMotionPref, setReduceMotionPref] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const canvasEl: HTMLCanvasElement = canvas;
    const ctx2d: CanvasRenderingContext2D = ctx;

    const host =
      (canvasEl.closest("[data-handle]") as HTMLElement | null) ??
      document.documentElement;

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const probe = document.createElement("span");
    probe.style.position = "fixed";
    probe.style.opacity = "0";
    probe.style.pointerEvents = "none";
    document.body.appendChild(probe);

    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let dots: Dot[] = [];
    let raf = 0;
    let lastDraw = 0;
    let reducedMotion = motionMq.matches;
    setReduceMotionPref(reducedMotion);

    const seedBase = 930_117;

    function buildDots() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvasEl.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));

      canvasEl.width = Math.max(1, Math.floor(w * dpr));
      canvasEl.height = Math.max(1, Math.floor(h * dpr));

      const accent = toRgb(
        cssVar(host, "--creator-accent", "oklch(0.88 0.23 145 / 1)"),
        probe,
      );
      const btn = toRgb(
        cssVar(host, "--creator-btn-bg", "oklch(0.86 0.18 145 / 1)"),
        probe,
      );
      const text = toRgb(cssVar(host, "--creator-text", "#111111"), probe);
      const bg = toRgb(cssVar(host, "--creator-bg", "#ffffff"), probe);

      const isDark = lumaFromRgbString(bg) < 0.45;

      const palette = isDark
        ? [accent, btn, "rgb(240,240,240)"]
        : [accent, btn, text];

      const area = w * h;
      const target = Math.round(Math.min(2400, Math.max(900, area / 1350)));
      const cell = Math.max(18, Math.min(32, Math.sqrt(area / target)));

      const xCells = Math.max(1, Math.floor(w / cell));
      const yCells = Math.max(1, Math.floor(h / cell));

      const next: Dot[] = [];
      let i = 0;

      for (let cy = 0; cy <= yCells; cy += 1) {
        for (let cx = 0; cx <= xCells; cx += 1) {
          const seed = seedBase + cx * 9176 + cy * 13849;
          const jx = (rand01(seed + 1) - 0.5) * cell * 0.9;
          const jy = (rand01(seed + 2) - 0.5) * cell * 0.9;
          const x = cx * cell + jx;
          const y = cy * cell + jy;

          const mx = x / Math.max(1, w) - 0.5;
          const my = y / Math.max(1, h) - 0.1;
          const d = Math.sqrt(mx * mx * 1.1 + my * my * 1.8);
          const mask = 1 - smoothstep(0.24, 0.98, d);
          if (mask <= 0) continue;

          const field = fbm2D(x * 0.0026, y * 0.0026, seedBase + 7, 4);
          const density = smoothstep(0.36, 0.8, field) * mask;

          const keep = rand01(seed + 3);
          if (keep > density * 0.92) continue;

          const r = 0.7 + rand01(seed + 4) * 1.15;
          const baseAlpha = (0.03 + density * 0.11) * (0.7 + rand01(seed + 5));
          const color =
            palette[i % Math.max(1, palette.length)] ??
            palette[0] ??
            "rgb(160,255,180)";

          next.push({ x, y, r, baseAlpha, color, seed });
          i += 1;
        }
      }

      dots = next;
    }

    function draw(t: number) {
      if (t - lastDraw < 33) {
        if (!reducedMotion) raf = window.requestAnimationFrame(draw);
        return;
      }
      lastDraw = t;

      const rect = canvasEl.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const time = t / 1000;

      ctx2d.clearRect(0, 0, canvasEl.width, canvasEl.height);
      ctx2d.save();
      ctx2d.scale(dpr, dpr);

      const bg = toRgb(cssVar(host, "--creator-bg", "#ffffff"), probe);
      const isDark = lumaFromRgbString(bg) < 0.45;
      ctx2d.globalCompositeOperation = isDark ? "screen" : "multiply";

      for (const d of dots) {
        const drift =
          fbm2D(
            d.x * 0.0102 + time * 0.06,
            d.y * 0.0102 - time * 0.045,
            seedBase + d.seed,
            3,
          ) *
            2 -
          1;

        const phase = (d.seed % 97) / 97;
        const slowPulse = Math.sin(time * 0.62 + phase * Math.PI * 2);
        const alpha = clamp01(
          d.baseAlpha * (1 + drift * 0.16 + slowPulse * 0.05),
        );
        if (alpha <= 0.002) continue;

        ctx2d.beginPath();
        ctx2d.fillStyle = d.color;
        ctx2d.globalAlpha = alpha;
        ctx2d.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx2d.fill();
      }

      const grad = ctx2d.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(255,255,255,0.18)");
      grad.addColorStop(0.44, "rgba(255,255,255,0)");
      ctx2d.globalCompositeOperation = isDark ? "screen" : "multiply";
      ctx2d.globalAlpha = isDark ? 0.2 : 0.12;
      ctx2d.fillStyle = grad;
      ctx2d.fillRect(0, 0, w, h);

      ctx2d.restore();

      if (!reducedMotion) raf = window.requestAnimationFrame(draw);
    }

    const onResize = () => {
      buildDots();
      draw(performance.now());
    };

    const onMotionChange = () => {
      reducedMotion = motionMq.matches;
      setReduceMotionPref(reducedMotion);
      window.cancelAnimationFrame(raf);
      draw(performance.now());
      if (!reducedMotion) raf = window.requestAnimationFrame(draw);
    };

    buildDots();
    draw(performance.now());
    if (!reducedMotion) raf = window.requestAnimationFrame(draw);

    window.addEventListener("resize", onResize, { passive: true });
    motionMq.addEventListener("change", onMotionChange);

    const ro = new ResizeObserver(onResize);
    ro.observe(canvasEl);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      motionMq.removeEventListener("change", onMotionChange);
      ro.disconnect();
      probe.remove();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-[0.82] mix-blend-multiply dark:mix-blend-screen"
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <filter id={grainId} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
            seed={6}
            stitchTiles="stitch"
          >
            {!reduceMotionPref ? (
              <animate
                attributeName="baseFrequency"
                dur="16s"
                values="0.8;0.9;0.8"
                repeatCount="indefinite"
              />
            ) : null}
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grainId})`} />
      </svg>
    </div>
  );
}
