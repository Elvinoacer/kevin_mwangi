"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

/**
 * ScrubText — the manifesto effect. A large statement whose words
 * illuminate one-by-one, driven directly by scroll position
 * (not time). Words pass from muted to foreground as the reader
 * scrolls through the block.
 */
export function ScrubText({
  text,
  className,
  accents = [],
}: {
  text: string;
  className?: string;
  /** words rendered in italic display serif + accent color */
  accents?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(" ");
  const accentSet = new Set(accents.map((a) => a.toLowerCase()));

  return (
    <p ref={ref} className={`relative ${className ?? ""}`}>
      {words.map((word, i) => {
        const clean = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        const isAccent = accentSet.has(clean);
        return (
          <ScrubWord
            key={i}
            index={i}
            total={words.length}
            progress={scrollYProgress}
            reduce={!!reduce}
            isAccent={isAccent}
            word={word}
          />
        );
      })}
    </p>
  );
}

function ScrubWord({
  word,
  index,
  total,
  progress,
  reduce,
  isAccent,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
  isAccent: boolean;
}) {
  const start = index / total;
  const end = start + 1 / total;

  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const y = useTransform(progress, [start, end], [reduce ? 0 : 8, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block will-change-transform ${
        isAccent ? "font-display text-[#3ddc97]" : ""
      }`}
    >
      {word}
      {"\u00A0"}
    </motion.span>
  );
}
