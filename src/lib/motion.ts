import type { Variants } from "framer-motion";

/**
 * Shared motion vocabulary — restrained, editorial, deliberate.
 * Everything respects prefers-reduced-motion via useReducedMotion in components.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Masked line reveal — for hero headings. */
export const lineReveal: Variants = {
  hidden: { y: "110%", rotate: 2 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 16 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
