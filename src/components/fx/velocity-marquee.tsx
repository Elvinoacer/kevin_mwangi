"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

/**
 * VelocityMarquee — an oversized text strip whose speed and skew
 * react to live scroll velocity. Direction follows scroll direction.
 * Falls back to a steady CSS marquee under reduced motion.
 */
export function VelocityMarquee({
  items,
  className,
  baseVelocity = 2.4,
}: {
  items: string[];
  className?: string;
  baseVelocity?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
    mass: 0.8,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4.2], {
    clamp: false,
  });
  const skew = useTransform(smoothVelocity, [-1800, 0, 1800], [-3.4, 0, 3.4]);

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  const row = [...items, ...items, ...items, ...items];

  if (reduce) {
    return (
      <div className={`overflow-hidden ${className ?? ""}`} ref={ref}>
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {row.map((item, i) => (
            <MarqueeItem key={i} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x, skewX: skew }}>
        {row.map((item, i) => (
          <MarqueeItem key={i} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

function MarqueeItem({ item }: { item: string }) {
  return (
    <span className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
      <span className="display-2 uppercase">{item}</span>
      <span className="inline-block size-2 md:size-3 shrink-0 rotate-45 bg-[#3ddc97]" aria-hidden="true" />
    </span>
  );
}

/** Wrap a value between min and max (marquee looping). */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}
