"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  capabilities,
  foundations,
  skillGroups,
  proficiencyLabels,
} from "@/data/skills";
import { education } from "@/data/experience";
import { Marquee } from "@/components/fx/marquee";
import { profile } from "@/data/profile";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * CraftDeck — Chapter 05 / CRAFT.
 * Three linear sections die; one deck is born. Panels stick at rising
 * offsets and shrink + dim as the next slides over — you flip through
 * the craft like cards in a hand. Desktop-only stacking; mobile and
 * reduced-motion get calm editorial blocks.
 */

function useIsDesktop() {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setIs(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return is;
}

const DOT: Record<string, string> = {
  strong: "bg-[#3ddc97]",
  "working-knowledge": "bg-[#7ab8ff]",
  "academic-exposure": "bg-[#a78bfa]",
  "currently-learning": "bg-amber-500",
};

function DeckPanel({
  progress,
  index,
  total,
  isDesktop,
  reduce,
  kicker,
  title,
  accent,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  isDesktop: boolean;
  reduce: boolean;
  kicker: string;
  title: string;
  accent: string;
  children: ReactNode;
}) {
  // Where this panel begins to be covered by the next.
  const settle = (index + 0.92) / (total + 0.6);
  const span = 0.16;
  const scale = useTransform(progress, [settle, settle + span], [1, 0.93]);
  const opacity = useTransform(progress, [settle, settle + span], [1, 0.62]);
  const y = useTransform(progress, [settle, settle + span], [0, -14]);
  const isLast = index === total - 1;
  const stack = isDesktop && !reduce;

  return (
    <div
      className={cn(
        "mb-[4vh] md:mb-[8vh]",
        stack && "sticky"
      )}
      style={stack ? { top: `calc(7vh + ${index * 2.6}rem)` } : undefined}
    >
      <motion.article
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: EASE }}
        style={stack && !isLast ? { scale, opacity, y } : undefined}
        className="origin-top overflow-hidden rounded-lg border border-[var(--hairline)] bg-card shadow-[0_-18px_60px_-30px_rgba(0,0,0,0.7)]"
      >
        {/* Panel header */}
        <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-[var(--hairline)] px-5 py-6 md:px-8 md:py-7">
          <div>
            <p className="mono-tag text-[#3ddc97]">{kicker}</p>
            <h3 className="display-3 mt-2 uppercase">{title}</h3>
          </div>
          <p className="max-w-xs font-display text-[0.98rem] italic leading-snug text-muted-foreground md:text-right">
            {accent}
          </p>
        </header>
        <div className="px-5 py-6 md:px-8 md:py-8">{children}</div>
      </motion.article>
    </div>
  );
}

export function CraftDeck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const courseTags = education.coursework
    .flatMap((g) => g.modules.slice(0, 5))
    .slice(0, 14);

  return (
    <section
      id="craft"
      data-chapter="craft"
      data-chapter-index="5"
      className="relative py-24 md:py-28"
      aria-label="Engineering craft"
    >
      {/* Chapter intro */}
      <div className="mx-auto max-w-[100rem] px-5 md:px-10">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4"
        >
          <div>
            <p className="mono-tag text-muted-foreground">05 / Craft</p>
            <h2 className="display-2 mt-4 uppercase">
              Flip through <span className="font-display normal-case text-[#3ddc97]">the craft.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[0.85rem] leading-relaxed text-muted-foreground">
            Engineering, skills and foundations — stacked, not scattered.
            The panels pile up as you scroll; what matters stays on top.
          </p>
        </motion.div>
      </div>

      {/* The deck */}
      <div
        ref={containerRef}
        className="relative mx-auto mt-12 max-w-[92rem] px-5 md:mt-16 md:px-10"
      >
        {/* 05.1 — Engineering */}
        <DeckPanel
          progress={scrollYProgress}
          index={0}
          total={3}
          isDesktop={isDesktop}
          reduce={!!reduce}
          kicker="05.1 / Engineering"
          title="Five areas, one thread"
          accent="systems that stay understandable as they grow."
        >
          <ul role="list" className="divide-y divide-[var(--hairline)]">
            {capabilities.map((cap, i) => (
              <li
                key={cap.title}
                className="grid gap-2 py-4 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-6 md:py-5"
              >
                <span className="mono-tag text-muted-foreground/50">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-[1.02rem] font-semibold leading-snug">
                    {cap.title}
                  </p>
                  <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">
                    {cap.positioning}
                  </p>
                </div>
                <div className="flex max-w-[16rem] flex-wrap gap-1.5 md:justify-end">
                  {cap.topics.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="mono-tag rounded-sm border border-[var(--hairline)] px-2 py-1 text-[0.55rem] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </DeckPanel>

        {/* 05.2 — Skills */}
        <DeckPanel
          progress={scrollYProgress}
          index={1}
          total={3}
          isDesktop={isDesktop}
          reduce={!!reduce}
          kicker="05.2 / Skills"
          title="No bars. Honest levels."
          accent="strong means shipped. working means productive. learning says so."
        >
          {/* Legend */}
          <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
            {Object.entries(proficiencyLabels).map(([k, label]) => (
              <span
                key={k}
                className="flex items-center gap-2 text-[0.68rem] text-muted-foreground"
              >
                <span className={cn("size-1.5 rounded-full", DOT[k])} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
          <div className="grid gap-x-10 gap-y-6 md:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <p className="label text-foreground/90">{group.title}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5" role="list">
                  {group.skills.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center gap-1.5 rounded-sm border border-[var(--hairline)] bg-background/40 px-2 py-1 text-[0.72rem] text-foreground/80"
                      title={`Proficiency: ${proficiencyLabels[s.proficiency]}`}
                    >
                      <span
                        className={cn("size-1 rounded-full", DOT[s.proficiency])}
                        aria-hidden="true"
                      />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DeckPanel>

        {/* 05.3 — Foundations */}
        <DeckPanel
          progress={scrollYProgress}
          index={2}
          total={3}
          isDesktop={isDesktop}
          reduce={!!reduce}
          kicker="05.3 / Foundations"
          title="Beyond frameworks"
          accent="the degree shows up when the problem needs theory, not a library."
        >
          <div className="grid gap-x-10 gap-y-5 md:grid-cols-3">
            {foundations.map((f, i) => (
              <div
                key={f.title}
                className="border-t border-[var(--hairline)] pt-4"
              >
                <p className="mono-tag text-[#a78bfa]">0{i + 1}</p>
                <p className="mt-2 text-[0.95rem] font-semibold leading-snug">
                  {f.title}
                </p>
                <ul className="mt-2 space-y-1" role="list">
                  {f.topics.slice(0, 4).map((t) => (
                    <li
                      key={t}
                      className="text-[0.74rem] leading-relaxed text-muted-foreground"
                    >
                      · {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* University band */}
          <div className="mt-8 grid items-stretch gap-6 overflow-hidden rounded-md border border-[var(--hairline)] bg-background/50 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="p-5 md:p-7">
              <p className="label text-[#3ddc97]">Education</p>
              <p className="display-3 mt-2 uppercase">{education.institution}</p>
              <p className="mt-1 font-display text-lg italic text-muted-foreground">
                {education.degree}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                <span className="mono-tag text-muted-foreground">{education.school}</span>
                <span className="mono-tag text-muted-foreground">{education.location}</span>
                <span className="mono-tag text-muted-foreground">{education.period}</span>
                <span className="mono-tag text-[#3ddc97]">{education.classification}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {courseTags.map((m) => (
                  <span
                    key={m}
                    className="mono-tag rounded-sm border border-[var(--hairline)] px-2 py-0.5 text-[0.55rem] text-muted-foreground"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative min-h-[11rem]">
              <Image
                src="/images/students-library.jpg"
                alt="Students collaborating in a university library"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover grayscale-[35%] transition-all duration-700 hover:grayscale-0"
              />
            </div>
          </div>
        </DeckPanel>
      </div>

      {/* Practices — the calm exhale after the deck */}
      <div className="mx-auto mt-20 max-w-[92rem] px-5 md:mt-28 md:px-10">
        <div className="hairline-t hairline-b py-2">
          <Marquee
            items={profile.stackMarquee}
            duration={56}
            className="py-1.5"
          />
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <h3 className="display-2 uppercase">
            Habits, <span className="font-display normal-case text-[#3ddc97]">not tutorials.</span>
          </h3>
          <p className="mono-tag text-muted-foreground/60">
            how the work actually gets done
          </p>
        </div>

        <div className="mt-8 grid gap-px border border-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Understand before building",
              blurb:
                "Requirements read twice, restated in my own words, boundaries sketched before a line of code.",
              points: ["Problem-first", "Written restatement", "Scope sketches"],
            },
            {
              title: "Design the data first",
              blurb:
                "Entities, relationships and constraints modelled before interfaces — the data outlives the UI.",
              points: ["ER-first", "Constraints early", "Migration-minded"],
            },
            {
              title: "Small, verifiable increments",
              blurb:
                "Ship slices that run end-to-end. Each step can be demoed, reviewed or reverted without ceremony.",
              points: ["Vertical slices", "Revertible steps", "Demo checkpoints"],
            },
            {
              title: "Test the edges on purpose",
              blurb:
                "Happy paths are easy — the failures, permissions and empty states get written test plans.",
              points: ["Edge cases listed", "Role paths tested", "Failure states"],
            },
            {
              title: "Document for the next engineer",
              blurb:
                "READMEs written as onboarding: why decisions were made, not just what the code does.",
              points: ["Decision logs", "Setup from scratch", "Honest TODOs"],
            },
            {
              title: "Review feedback like data",
              blurb:
                "Critique is telemetry about my blind spots — logged, grouped and acted on.",
              points: ["Feedback log", "Pattern grouping", "Follow-ups"],
            },
          ].map((p, i) => (
            <motion.div
              key={p.title}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
              className="group border-[var(--hairline)] p-6 transition-colors duration-500 hover:bg-card md:p-7 [&:nth-child(3n)]:border-r-0"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="text-base font-semibold tracking-[-0.01em]">
                  {p.title}
                </h4>
                <span className="mono-tag text-muted-foreground/40 transition-colors group-hover:text-[#3ddc97]">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-3 text-[0.86rem] leading-relaxed text-muted-foreground">
                {p.blurb}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {p.points.map((pt) => (
                  <span
                    key={pt}
                    className="flex items-center gap-2 text-[0.72rem] text-foreground/70"
                  >
                    <span
                      className="size-1 rounded-full bg-[#3ddc97]/70"
                      aria-hidden="true"
                    />
                    {pt}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
