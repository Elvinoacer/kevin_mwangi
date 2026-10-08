"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

/**
 * ParticleField — the living world behind everything.
 *
 * A single fixed canvas of drifting motes that:
 *  - parallax with scroll at per-mote depth (the world has layers),
 *  - STREAK when you scroll fast (the world reacts to your motion),
 *  - lean away from the pointer (the world notices you),
 *  - shift hue as you travel through the chapters (the world has weather),
 *  - connect into constellations when motes drift close.
 *
 * Performance contract:
 *  - DPR capped at 1.5, particle count scaled to viewport area (40–150),
 *  - one rAF loop, paused when the tab is hidden,
 *  - zero layout reads in the hot path (scroll/pointer cached in refs),
 *  - prefers-reduced-motion renders one static, calm frame.
 */

// [scrollProgress, hue] waypoints — the weather of each chapter.
const HUE_JOURNEY: Array<[number, number]> = [
  [0.0, 160], // arrival — emerald
  [0.12, 187], // signal — cyan
  [0.26, 45], // proof — gold
  [0.44, 160], // works — emerald
  [0.6, 205], // path — ice
  [0.76, 262], // craft — violet
  [0.9, 24], // human — ember
  [1.0, 160], // contact — emerald, home
];

function hueAt(p: number): number {
  if (p <= HUE_JOURNEY[0][0]) return HUE_JOURNEY[0][1];
  for (let i = 1; i < HUE_JOURNEY.length; i++) {
    const [p1, h1] = HUE_JOURNEY[i];
    const [p0, h0] = HUE_JOURNEY[i - 1];
    if (p <= p1) {
      const t = (p - p0) / (p1 - p0);
      return h0 + (h1 - h0) * t;
    }
  }
  return HUE_JOURNEY[HUE_JOURNEY.length - 1][1];
}

type Mote = {
  x: number;
  y: number;
  z: number; // depth 0.25..1
  r: number;
  drift: number; // upward px/s
  wobble: number;
  wobbleAmp: number;
  wobbleSpeed: number;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced =
      reduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let motes: Mote[] = [];
    let raf = 0;
    let running = true;
    let lastTime = performance.now();
    let lastScroll = window.scrollY;
    let scrollVel = 0; // smoothed px/s
    let hue = -999;
    let lastSetHue = -999;
    const mouse = { x: -9999, y: -9999 };
    const darkRef = { v: dark };
    darkRef.v = dark;

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const count = Math.round(
        Math.min(120, Math.max(40, area / 16000))
      );
      motes = Array.from({ length: count }, () => {
        const z = 0.25 + Math.random() * 0.75;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          r: 0.55 + z * 1.6 * (0.7 + Math.random() * 0.6),
          drift: 5 + z * 13,
          wobble: Math.random() * Math.PI * 2,
          wobbleAmp: 4 + Math.random() * 14,
          wobbleSpeed: 0.12 + Math.random() * 0.3,
        };
      });
    };

    const wrapY = (v: number, margin: number) => {
      const span = height + margin * 2;
      let out = ((v % span) + span) % span;
      return out - margin;
    };

    const draw = (t: number, dt: number) => {
      const sy = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, sy / maxScroll)) : 0;
      hue = hueAt(progress);

      // Publish the world hue for other layers (glows, spotlight).
      if (Math.abs(hue - lastSetHue) > 1.5) {
        lastSetHue = hue;
        document.documentElement.style.setProperty(
          "--world-hue",
          String(Math.round(hue))
        );
      }

      const isDark = darkRef.v;
      ctx.clearRect(0, 0, width, height);

      const margin = 40;
      const streakK = 0.045;
      const pts: Array<{ x: number; y: number; z: number; r: number }> = [];

      for (const m of motes) {
        if (!reduced) {
          m.y -= m.drift * dt;
          if (m.y < -margin) {
            m.y = height + margin;
            m.x = Math.random() * width;
          }
        }
        // Depth parallax: deeper motes move less with scroll.
        const par = 0.3 + m.z * 0.45;
        const yScreen = wrapY(m.y - sy * par, margin);
        let xScreen =
          m.x + Math.sin(t * 0.001 * m.wobbleSpeed * 60 + m.wobble) * m.wobbleAmp * 0.35;

        // Pointer repulsion — the world leans away from you.
        if (finePointer && !reduced) {
          const dx = xScreen - mouse.x;
          const dy = yScreen - mouse.y;
          const d2 = dx * dx + dy * dy;
          const R = 130;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 24 * (0.4 + m.z * 0.6);
            xScreen += (dx / d) * f;
            // y offset applied to draw only
            const yOff = (dy / d) * f;
            pts.push({ x: xScreen, y: yScreen + yOff, z: m.z, r: m.r });
            continue;
          }
        }

        pts.push({ x: xScreen, y: yScreen, z: m.z, r: m.r });
      }

      // Constellations — connect near motes. Skipped when streaking
      // (links are invisible at speed anyway) to protect low-end frames.
      const vel = reduced ? 0 : scrollVel;
      const linkDist = isDark ? 92 : 78;
      const linkAlphaBase = isDark ? 0.045 : 0.05;
      const drawLinks = Math.abs(vel) < 700;
      ctx.lineWidth = 1;
      if (drawLinks) {
        for (let i = 0; i < pts.length; i++) {
          const a = pts[i];
          for (let j = i + 1; j < pts.length; j++) {
            const b = pts[j];
            const dx = a.x - b.x;
            if (dx > linkDist || dx < -linkDist) continue;
            const dy = a.y - b.y;
            if (dy > linkDist || dy < -linkDist) continue;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < linkDist) {
              const alpha = (1 - d / linkDist) * linkAlphaBase * (a.z + b.z) * 0.5;
              ctx.strokeStyle = `hsla(${hue}, 60%, ${isDark ? 70 : 38}%, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // Motes — streak with scroll velocity (the warp).
      const dir = vel >= 0 ? -1 : 1; // scrolling down → world moves up
      for (const p of pts) {
        const streak = Math.min(64, Math.abs(vel) * p.z * streakK);
        const alpha =
          (isDark ? 0.3 + p.z * 0.35 : 0.16 + p.z * 0.2) *
          (streak > 2 ? 0.85 : 1);
        const light = isDark ? 68 : 34;
        ctx.strokeStyle = `hsla(${hue}, 65%, ${light}%, ${alpha})`;
        ctx.lineWidth = p.r * 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        if (streak > 2) {
          ctx.lineTo(p.x, p.y + dir * streak);
        }
        ctx.stroke();
      }
    };

    const frame = (t: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (t - lastTime) / 1000));
      lastTime = t;
      if (!reduced) {
        const sy = window.scrollY;
        const instV = (sy - lastScroll) / dt;
        lastScroll = sy;
        scrollVel += (instV - scrollVel) * Math.min(1, dt * 7);
        scrollVel = Math.max(-2600, Math.min(2600, scrollVel));
      }
      draw(t, dt);
      if (running && !reduced) {
        raf = requestAnimationFrame(frame);
      }
    };

    build();

    if (reduced) {
      // One calm frame, no loop, no listeners.
      draw(performance.now(), 0.016);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    let resizeQueued = false;
    const onResize = () => {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(() => {
        resizeQueued = false;
        build();
        if (reduced) draw(performance.now(), 0.016);
      });
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        lastTime = performance.now();
        lastScroll = window.scrollY;
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    if (finePointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, dark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
    />
  );
}
