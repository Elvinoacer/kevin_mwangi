"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ScrubText } from "@/components/fx/scrub-text";
import { VelocityMarquee } from "@/components/fx/velocity-marquee";

const STATEMENT =
  "I design software the way it should be designed — understand the problem before writing a line, model the data before building the interface, test the assumptions before shipping the feature. Every system I build is honest about what it is, and every line is written for the engineer who comes after me.";

const MARQUEE_WORDS = ["Full-Stack", "Backend", "Cloud", "TypeScript", "Systems"];

/**
 * Manifesto — the scroll-scrubbed statement between hero and work.
 * Words illuminate one-by-one as the reader scrolls, followed by a
 * velocity-reactive marquee strip.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      id="manifesto"
      ref={ref}
      data-chapter="signal"
      data-chapter-index="1"
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="Manifesto"
    >
      {/* Ambient */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3ddc97]/6 blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[100rem] px-5 md:px-10">
        <motion.p
          className="label text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          01 / Manifesto
        </motion.p>

        <ScrubText
          text={STATEMENT}
          accents={["understand", "honest", "after"]}
          className="mt-8 max-w-5xl text-[clamp(1.55rem,3.4vw,3.1rem)] font-medium leading-[1.28] tracking-[-0.02em]"
        />

        {/* Signature row */}
        <motion.div
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="font-display text-2xl text-muted-foreground">Kevin Mwangi</span>
          <span className="h-px flex-1 bg-[var(--hairline)]" aria-hidden="true" />
          <span className="label text-muted-foreground">Nairobi — {reduce ? "Kenya" : "1.2921° S, 36.8219° E"}</span>
        </motion.div>
      </div>

      {/* Velocity-reactive marquee */}
      <motion.div
        className="mt-14 hairline-t hairline-b py-5 md:mt-16 md:py-7"
        style={reduce ? undefined : { x: marqueeX }}
        aria-hidden="true"
      >
        <VelocityMarquee items={MARQUEE_WORDS} />
      </motion.div>
    </section>
  );
}
