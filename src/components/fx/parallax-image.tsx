"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * ParallaxImage — next/image inside an overflow mask.
 * The image drifts vertically at a configurable rate while the
 * mask stays put; optionally reveals via clip + scale on view.
 * Honors reduced motion (static, no clip animation).
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  speed = 14,
  priority = false,
  fillHeight = "aspect-[4/5]",
  grayscale = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  speed?: number;
  priority?: boolean;
  fillHeight?: string;
  grayscale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image is oversized (120% height) so it can drift inside the mask
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed}%`, `${speed}%`]);

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden ${fillHeight} ${className ?? ""}`}
      initial={reduce ? undefined : { clipPath: "inset(12% 8% 12% 8% round 2px)", scale: 0.97 }}
      whileInView={reduce ? undefined : { clipPath: "inset(0% 0% 0% 0% round 2px)", scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <motion.div
        className="absolute inset-x-0 -top-[10%] h-[120%]"
        style={reduce ? undefined : { y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${
            grayscale ? "img-mono" : ""
          } ${imgClassName ?? ""}`}
        />
      </motion.div>
      {grayscale && <div className="img-tint" aria-hidden="true" />}
    </motion.div>
  );
}
