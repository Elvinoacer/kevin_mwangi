"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/** Animated count-up that starts when scrolled into view. */
export function Counter({ to, suffix = "", prefix = "", duration = 1600, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);

  // Reduced motion or pre-start: render the final value directly
  const value = display ?? (reduce || inView ? to : 0);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
