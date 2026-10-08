"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";

type SplitProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** immediate (on mount) or when scrolled into view */
  mode?: "mount" | "inview";
  once?: boolean;
};

/**
 * SplitText — word-by-word masked line reveal.
 * Each word rides up from behind an overflow mask with a soft rotation,
 * the signature editorial entrance.
 */
export function SplitText({
  text,
  as = "div",
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  mode = "inview",
  once = true,
}: SplitProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Tag = motion[as] as typeof motion.div;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };

  const word: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { y: "115%", rotate: 4, opacity: 0.6 },
        visible: {
          y: "0%",
          rotate: 0,
          opacity: 1,
          transition: { duration: 0.85, ease: EASE },
        },
      };

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      {...(mode === "mount"
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once, margin: "-60px" } })}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
          aria-hidden="true"
        >
          <motion.span className={`inline-block will-change-transform ${wordClassName ?? ""}`} variants={word}>
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * AccentText — renders a sentence mixing sans grotesk with italic serif
 * accents. Pass segments as [{ text, accent? }].
 */
export function AccentText({
  segments,
  className,
  accentClassName = "font-display",
}: {
  segments: { text: string; accent?: boolean }[];
  className?: string;
  accentClassName?: string;
}) {
  return (
    <span className={className}>
      {segments.map((seg, i) => (
        <Fragment key={i}>
          <span className={seg.accent ? accentClassName : undefined}>{seg.text}</span>
          {i < segments.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
