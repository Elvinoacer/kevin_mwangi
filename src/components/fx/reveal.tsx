"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fadeUp, blurIn, staggerContainer, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: "up" | "blur" | "stagger";
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "span" | "p";
}

/** Scroll-triggered reveal. No-ops (visible) under reduced motion. */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  const variants: Variants = reduce
    ? { hidden: {}, visible: {} }
    : variant === "blur"
      ? blurIn
      : fadeUp;

  return (
    <Comp
      className={className}
      variants={variants}
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      aria-hidden={false}
    >
      {children}
    </Comp>
  );
}

/** Stagger container: children get <RevealItem> wrappers. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : staggerContainer(stagger, delay)}
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      variants={reduce ? { hidden: {}, visible: {} } : fadeUp}
    >
      {children}
    </motion.div>
  );
}
