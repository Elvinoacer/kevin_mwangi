"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

/**
 * Spotlight — a soft world-tinted glow that trails the pointer in dark
 * mode. The page lights up where you look. Transform-only, spring
 * smoothed, one composited layer. Disabled on touch and reduced motion.
 */
export function Spotlight() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-800);
  const y = useMotionValue(-800);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.7 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () =>
      setEnabled(
        mq.matches &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    update();
    mq.addEventListener("change", update);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("pointermove", onMove);
    };
  }, [x, y]);

  if (!dark || !enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[2] size-[38rem] rounded-full will-change-transform"
      style={{
        x: sx,
        y: sy,
        marginLeft: "-19rem",
        marginTop: "-19rem",
        background:
          "radial-gradient(closest-side, hsl(var(--world-hue) 72% 62% / 0.09), hsl(var(--world-hue) 72% 62% / 0.035) 45%, transparent 72%)",
      }}
    />
  );
}
