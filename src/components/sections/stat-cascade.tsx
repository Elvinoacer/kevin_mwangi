"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";
import { scrollToSection } from "@/components/providers";
import { ArrowDown } from "lucide-react";

/**
 * StatCascade — Chapter 02 / PROOF.
 * The important numbers do not sit in a grid; they LIVE in the scroll.
 * Each stat claims the full frame, counts itself into existence, then
 * dissolves upward as the next arrives. Snappy crossfades, a live
 * counter in the frame chrome, and a glow that breathes with each
 * number — no dead frames between scenes.
 */

const STATS = [
  {
    value: 7,
    pad: 2,
    kicker: "Documented systems",
    line: "Seven complete builds — each opened to the bone: problem, architecture, data model, security, tests, deployment, failures, lessons.",
  },
  {
    value: 3,
    pad: 2,
    kicker: "Auth roles modelled",
    line: "Candidate, recruiter, administrator — permissioned end to end and covered by role-specific test paths.",
  },
  {
    value: 16,
    pad: 2,
    kicker: "Case-study sections",
    line: "Every project unfolds as a reviewable engineering narrative — not a screenshot, an argument.",
  },
  {
    value: 2026,
    pad: 4,
    kicker: "BSc Computer Science",
    line: `${profile.eyebrow}. Graduating into the field I have been training for since line one.`,
  },
] as const;

function CountUp({
  progress,
  window: win,
  value,
  pad,
}: {
  progress: MotionValue<number>;
  window: [number, number];
  value: number;
  pad: number;
}) {
  const num = useTransform(
    progress,
    [win[0], win[0] + (win[1] - win[0]) * 0.14],
    [0, value]
  );
  const rounded = useTransform(num, (v) =>
    Math.round(v).toString().padStart(pad, "0")
  );
  return <motion.span>{rounded}</motion.span>;
}

function StatScene({
  progress,
  index,
  total,
  stat,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  stat: (typeof STATS)[number];
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;
  const enter = start + span * 0.16;
  const exitStart = end - span * 0.16;
  const win: [number, number] = [start, end];

  const opacity = useTransform(
    progress,
    [start, enter, exitStart, end],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    progress,
    [start, enter, exitStart, end],
    [0.9, 1, 1, 1.12]
  );
  const y = useTransform(
    progress,
    [start, enter, exitStart, end],
    [120, 0, 0, -120]
  );
  const glowOpacity = useTransform(
    progress,
    [start, enter, exitStart, end],
    [0, 1, 1, 0]
  );
  const ghostX = useTransform(progress, [start, end], ["6%", "-6%"]);
  // Copy lands a beat after the numeral settles — the number gets the spotlight.
  const copyOpacity = useTransform(
    progress,
    [start + span * 0.08, start + span * 0.3],
    [0, 1]
  );
  const copyY = useTransform(
    progress,
    [start + span * 0.08, start + span * 0.3],
    [30, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity, scale, y }}
    >
      {/* Scene glow — breathes with the number */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3ddc97]/[0.055] blur-[130px]"
        style={{ opacity: glowOpacity }}
      />

      {/* Ghost chapter numeral drifting behind */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-display text-[clamp(16rem,42vw,38rem)] leading-none text-ghost opacity-80"
        style={{ x: ghostX }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <p className="mono-tag relative text-[#3ddc97]">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}{" "}
        — {stat.kicker}
      </p>

      <h3
        className="relative mt-2 font-sans text-[clamp(5.5rem,19vw,17rem)] font-semibold leading-[0.9] tracking-[-0.045em] tabular-nums text-foreground [text-shadow:0_0_90px_rgba(61,220,151,0.22)]"
        aria-label={`${stat.value} ${stat.kicker}`}
      >
        <CountUp
          progress={progress}
          window={win}
          value={stat.value}
          pad={stat.pad}
        />
      </h3>

      <motion.div className="relative max-w-xl" style={{ opacity: copyOpacity, y: copyY }}>
        <p className="label uppercase tracking-[0.3em] text-foreground/85">
          {stat.kicker}
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground/75 md:text-base">
          {stat.line}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function StatCascade() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const cueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const progressX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Live frame counter — always visible, no dead frames between stats.
  const liveIndex = useTransform(scrollYProgress, (v) =>
    String(
      Math.min(STATS.length, Math.floor(v * STATS.length) + 1)
    ).padStart(2, "0")
  );

  if (reduce) {
    // Calm fallback: a strong static stat wall.
    return (
      <section
        id="proof"
        data-chapter="proof"
        data-chapter-index="2"
        className="relative py-24"
        aria-label="Proof by numbers"
      >
        <div className="mx-auto max-w-[100rem] px-5 md:px-10">
          <p className="label text-muted-foreground">02 / Proof</p>
          <h2 className="display-2 mt-4 uppercase">
            The numbers, honest and open.
          </h2>
          <div className="mt-12 grid gap-px border border-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.kicker} className="bg-card p-8">
                <p className="font-sans text-5xl font-medium tabular-nums">
                  {s.value}
                </p>
                <p className="label mt-3 text-[#3ddc97]">{s.kicker}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {s.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="proof"
      ref={ref}
      data-chapter="proof"
      data-chapter-index="2"
      className="relative h-[300vh]"
      aria-label="Proof by numbers"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        {/* Frame chrome */}
        <div className="pointer-events-none absolute left-5 top-6 z-10 flex items-center gap-4 md:left-10 md:top-8">
          <p className="mono-tag text-muted-foreground/70">02 / PROOF</p>
        </div>
        <div className="pointer-events-none absolute right-5 top-6 z-10 flex items-center gap-3 md:right-10 md:top-8">
          <p className="mono-tag text-muted-foreground/70">
            <motion.span className="text-[#3ddc97]">{liveIndex}</motion.span>
            <span className="text-muted-foreground/50"> / {String(STATS.length).padStart(2, "0")}</span>
          </p>
          <span className="h-px w-8 bg-[var(--hairline)]" aria-hidden="true" />
          <p className="mono-tag hidden text-muted-foreground/70 md:block">
            evidence, not adjectives
          </p>
        </div>

        {/* The cascade */}
        <div className="relative h-full w-full">
          {STATS.map((stat, i) => (
            <StatScene
              key={stat.kicker}
              progress={scrollYProgress}
              index={i}
              total={STATS.length}
              stat={stat}
            />
          ))}
        </div>

        {/* Scroll cue at chapter start */}
        <motion.button
          onClick={() => scrollToSection("snapshot")}
          className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-muted-foreground/60 transition-colors hover:text-[#3ddc97]"
          style={{ opacity: cueOpacity }}
          aria-label="Continue the journey"
        >
          <span className="mono-tag text-[0.55rem] uppercase tracking-[0.3em]">
            the proof
          </span>
          <ArrowDown className="size-3.5 animate-pulse" />
        </motion.button>

        {/* Cascade progress hairline */}
        <div className="absolute inset-x-5 bottom-6 z-10 h-px bg-[var(--hairline)] md:inset-x-10">
          <motion.div
            className="h-full bg-[#3ddc97]"
            style={{ width: progressX }}
          />
        </div>
      </div>
    </section>
  );
}
