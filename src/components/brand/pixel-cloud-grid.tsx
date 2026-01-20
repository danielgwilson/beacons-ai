"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type PixelPoint = { x: number; y: number };
type Cloud = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  points: PixelPoint[];
  width: number;
  height: number;
  color: string;
  alpha: number;
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

function buildCloudShape(seed: number, w: number, h: number) {
  const points: PixelPoint[] = [];
  const cx = (w - 1) / 2;
  const cy = (h - 1) / 2;

  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const nx = (x - cx) / (cx + 0.001);
      const ny = (y - cy) / (cy + 0.001);
      const d = nx * nx + ny * ny * 1.15;
      const n = rand01(seed + x * 131 + y * 997);
      const jitter = (n - 0.5) * 0.26;
      const threshold = 1.02 + jitter;
      if (d <= threshold) {
        const edge = Math.sqrt(d);
        if (edge > 0.92 && rand01(seed + x * 43 + y * 17) > 0.55) continue;
        points.push({ x, y });
      }
    }
  }

  return points;
}

function cssVar(root: HTMLElement, name: string, fallback: string) {
  const value = getComputedStyle(root).getPropertyValue(name).trim();
  return value || fallback;
}

export function PixelCloudGrid({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl: HTMLCanvasElement = canvas;

    const ctxMaybe = canvasEl.getContext("2d", { alpha: true });
    if (!ctxMaybe) return;
    const ctx: CanvasRenderingContext2D = ctxMaybe;

    const root = document.documentElement;

    const off = document.createElement("canvas");
    const offCtxMaybe = off.getContext("2d", { alpha: true });
    if (!offCtxMaybe) return;
    const offCtx: CanvasRenderingContext2D = offCtxMaybe;

    let reducedMotion = false;
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion = motionMq.matches;

    const colors = () => [
      cssVar(root, "--pixel-cloud-a", "rgba(160,255,180,0.18)"),
      cssVar(root, "--pixel-cloud-b", "rgba(160,220,255,0.16)"),
      cssVar(root, "--pixel-cloud-c", "rgba(255,160,240,0.12)"),
    ];

    let palette = colors();
    let clouds: Cloud[] = [];

    let pixel = 10;
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0;
    let lastT = 0;

    function rebuild() {
      palette = colors();

      const w = window.innerWidth;
      const h = window.innerHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);

      canvasEl.width = Math.max(1, Math.floor(w * dpr));
      canvasEl.height = Math.max(1, Math.floor(h * dpr));

      canvasEl.style.width = `${w}px`;
      canvasEl.style.height = `${h}px`;

      pixel = w < 520 ? 12 : 10;
      const gw = Math.max(1, Math.floor(w / pixel));
      const gh = Math.max(1, Math.floor(h / pixel));

      off.width = gw;
      off.height = gh;

      const count = Math.min(16, Math.max(8, Math.floor((gw * gh) / 11000)));
      const next: Cloud[] = [];

      for (let i = 0; i < count; i += 1) {
        const seed = Math.floor(rand01(i * 999 + gw * 19 + gh * 31) * 1e9);
        const cw = Math.floor(12 + rand01(seed + 1) * 18);
        const ch = Math.floor(7 + rand01(seed + 2) * 12);
        const points = buildCloudShape(seed, cw, ch);

        const px = rand01(seed + 3) * (gw + cw) - cw;
        const py = rand01(seed + 4) * (gh + ch) - ch;

        const slow = 0.65 + rand01(seed + 5) * 1.1;
        const vx = (rand01(seed + 6) > 0.5 ? 1 : -1) * slow * 0.35;
        const vy = (rand01(seed + 7) - 0.5) * 0.06;
        const color =
          palette[i % palette.length] ?? palette[0] ?? "rgba(160,255,180,0.18)";

        next.push({
          x: px,
          y: py,
          vx,
          vy,
          points,
          width: cw,
          height: ch,
          color,
          alpha: 0.9,
        });
      }

      clouds = next;
    }

    function drawFrame(t: number) {
      const dt = Math.min(48, t - lastT || 16) / 16.67;
      lastT = t;

      const gw = off.width;
      const gh = off.height;

      offCtx.clearRect(0, 0, gw, gh);

      for (const cloud of clouds) {
        cloud.x += cloud.vx * dt;
        cloud.y += cloud.vy * dt;

        if (cloud.x > gw + cloud.width + 6) cloud.x = -cloud.width - 6;
        if (cloud.x < -cloud.width - 6) cloud.x = gw + 6;

        if (cloud.y > gh + cloud.height + 6) cloud.y = -cloud.height - 6;
        if (cloud.y < -cloud.height - 6) cloud.y = gh + 6;

        offCtx.globalAlpha = cloud.alpha;
        offCtx.fillStyle = cloud.color;

        const ox = Math.floor(cloud.x);
        const oy = Math.floor(cloud.y);

        for (const p of cloud.points) {
          const x = ox + p.x;
          const y = oy + p.y;
          if (x < -2 || y < -2 || x > gw + 2 || y > gh + 2) continue;
          offCtx.fillRect(x, y, 1, 1);
        }
      }

      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      ctx.imageSmoothingEnabled = false;
      ctx.globalAlpha = 1;
      ctx.drawImage(off, 0, 0, canvasEl.width, canvasEl.height);
    }

    function tick(t: number) {
      drawFrame(t);
      if (!reducedMotion) raf = window.requestAnimationFrame(tick);
    }

    const onResize = () => {
      rebuild();
      drawFrame(performance.now());
    };

    const onMotionChange = () => {
      reducedMotion = motionMq.matches;
      window.cancelAnimationFrame(raf);
      drawFrame(performance.now());
      if (!reducedMotion) raf = window.requestAnimationFrame(tick);
    };

    const onThemeChange = () => {
      palette = colors();
    };

    rebuild();
    drawFrame(performance.now());
    if (!reducedMotion) raf = window.requestAnimationFrame(tick);

    window.addEventListener("resize", onResize, { passive: true });
    motionMq.addEventListener("change", onMotionChange);

    const obs = new MutationObserver(onThemeChange);
    obs.observe(root, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      motionMq.removeEventListener("change", onMotionChange);
      obs.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-background" />

      <div className="absolute inset-0 opacity-90 [mask-image:radial-gradient(60%_60%_at_50%_18%,#000_25%,transparent_75%)]">
        <div className="absolute -left-44 -top-32 h-[520px] w-[520px] rounded-full bg-[oklch(0.88_0.23_145/18%)] blur-3xl" />
        <div className="absolute -right-52 -top-40 h-[620px] w-[620px] rounded-full bg-[oklch(0.9_0.08_225/16%)] blur-3xl" />
        <div className="absolute -bottom-64 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-[oklch(0.67_0.21_330/10%)] blur-3xl" />
      </div>

      <div className="absolute inset-0 pixel-grid opacity-[0.46] dark:opacity-[0.33]" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-[0.86] mix-blend-multiply dark:mix-blend-screen"
      />

      <div className="absolute inset-0 pixel-noise opacity-[0.18] dark:opacity-[0.14]" />
    </div>
  );
}
