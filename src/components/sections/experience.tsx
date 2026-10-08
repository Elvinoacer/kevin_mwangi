"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experience, timeline } from "@/data/experience";
import { GhostHeading } from "@/components/fx/ghost-heading";
import { ParallaxImage } from "@/components/fx/parallax-image";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Experience — Chapter 04 / PATH.
 * Internship spotlight, then the growth timeline: a sticky year rail
 * pins the current year in monumental ghost type while entries flow
 * past a thread that draws itself (and glows) as you travel.
 */

function TimelineEntry({
  entry,
  index,
  active,
  onActive,
  reduce,
}: {
  entry: (typeof timeline)[number];
  index: number;
  active: boolean;
  onActive: () => void;
  reduce: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-48% 0px -48% 0px" });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 1 } : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: 0.04 * index, ease: EASE }}
      className="group relative"
    >
      {/* Node — ignites when its year owns the rail */}
      <span
        className={cn(
          "absolute -left-10 top-1 grid size-[15px] place-items-center rounded-full border bg-background transition-all duration-500 md:-left-14 md:size-[17px]",
          active
            ? "scale-125 border-[#3ddc97] shadow-[0_0_16px_rgba(61,220,151,0.65)]"
            : "border-[#3ddc97]/60 group-hover:border-[#3ddc97]"
        )}
        aria-hidden="true"
      >
        <span className="size-1.5 rounded-full bg-[#3ddc97]" />
      </span>

      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 md:hidden">
        <span className="font-mono text-2xl font-semibold tabular-nums text-[#3ddc97]">
          {entry.year}
        </span>
        <h4 className="text-lg font-semibold tracking-[-0.02em]">
          {entry.title}
        </h4>
      </div>
      <h4 className="hidden text-lg font-semibold tracking-[-0.02em] md:block md:text-xl">
        {entry.title}
      </h4>
              <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-foreground/80">
        {entry.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {entry.tags.map((t) => (
          <span
            key={t}
            className="mono-tag rounded-sm border border-[var(--hairline)] px-2 py-1 text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [activeYear, setActiveYear] = useState(timeline[0]?.year ?? "2022");

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      data-chapter="path"
      data-chapter-index="4"
      className="relative py-24 md:py-32"
      aria-label="Experience and timeline"
    >
      <div className="mx-auto max-w-[100rem] px-5 md:px-10">
        <GhostHeading index="04" title="Experience" accent="the trajectory." meta="Experience" />

        <motion.div
          className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Classroom projects taught me to build. A working engineering team
          taught me how software is actually shipped, reviewed and maintained.
        </motion.div>

        {/* ===== Internship spotlight ===== */}
        <div className="mt-16 grid items-stretch gap-10 md:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ParallaxImage
            src="/images/dev-office.jpg"
            alt="Developers working late in a moody software office"
            fillHeight="min-h-[24rem] lg:min-h-[34rem]"
            className="rounded-sm border border-[var(--hairline)]"
            sizes="(max-width: 1024px) 100vw, 540px"
            speed={9}
          />

          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="mono-tag text-[#7ab8ff]">
                  {experience.type === "internship"
                    ? "Internship"
                    : "Industrial attachment"}
                </span>
                <span className="mono-tag text-muted-foreground">
                  {experience.startDate} — {experience.endDate}
                </span>
                <span className="mono-tag text-muted-foreground">
                  {experience.location}
                </span>
              </div>

              <h3 className="display-3 mt-6 uppercase">{experience.role}</h3>
              <p className="font-display mt-1 text-xl text-muted-foreground md:text-2xl">
                {experience.organization}
              </p>

              <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-foreground/85">
                {experience.summary}
              </p>
            </motion.div>

            <motion.ul
              className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {experience.responsibilities.map((r) => (
                <motion.li
                  key={r}
                  variants={{
                    hidden: { opacity: 0, x: -14 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, ease: EASE },
                    },
                  }}
                  className="flex gap-3 border-b border-[var(--hairline)] pb-3"
                >
                  <span
                    className="mt-[0.5rem] size-1.5 shrink-0 rotate-45 bg-[#7ab8ff]"
                    aria-hidden="true"
                  />
                  <span className="text-[0.88rem] leading-relaxed text-foreground/85">
                    {r}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-8 border-l-2 border-[#3ddc97] pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              <p className="label text-[#3ddc97]">What it taught me</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/90 md:text-base">
                {experience.lesson}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ===== Growth timeline — sticky year rail + glowing thread ===== */}
        <div ref={lineRef} className="relative mt-24 md:mt-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 flex items-center gap-4"
          >
            <span className="mono-tag text-[#3ddc97]">2022 → 2026</span>
            <span className="h-px flex-1 bg-[var(--hairline)]" aria-hidden="true" />
            <span className="label text-muted-foreground">growth trajectory</span>
          </motion.div>

          <div className="relative grid gap-8 md:grid-cols-[15rem_1fr] md:gap-4">
            {/* Sticky year rail — the current year, monumental */}
            <div className="relative hidden md:block" aria-hidden="true">
              <div className="sticky top-[32vh] h-[11rem]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeYear}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="block font-semibold uppercase leading-none tracking-[-0.04em] text-ghost text-[clamp(6rem,9.5vw,9rem)]"
                  >
                    {activeYear}
                  </motion.span>
                </AnimatePresence>
                <span className="mt-5 block h-px w-16 bg-[#3ddc97]" />
                <p className="mono-tag mt-3 text-muted-foreground">
                  in the making
                </p>
              </div>
            </div>

            {/* Entries */}
            <div className="relative pl-10 md:pl-14">
              <div
                className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--hairline)]"
                aria-hidden="true"
              />
              <motion.div
                style={{ scaleY: reduce ? 1 : lineScale }}
                className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-[#3ddc97] shadow-[0_0_14px_rgba(61,220,151,0.55)]"
                aria-hidden="true"
              />

              <div className="space-y-14 md:space-y-[9rem]">
                {timeline.map((entry, i) => (
                  <TimelineEntry
                    key={entry.year}
                    entry={entry}
                    index={i}
                    active={activeYear === entry.year}
                    onActive={() => setActiveYear(entry.year)}
                    reduce={reduce}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
