"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { projects, featuredProject } from "@/data/projects";
import type { Project } from "@/data/types";
import { GhostHeading } from "@/components/fx/ghost-heading";
import { ProjectCard } from "./project-card";
import { CaseStudy } from "./case-study";
import { Magnetic } from "@/components/fx/magnetic";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* Flagship scrub steps — copy refined for drama + honesty */
const STEPS = [
  {
    key: "problem",
    label: "The problem",
    heading: "Discovery on campus is broken.",
    body: "Students find barbers, tutors, printers and repair shops through scattered WhatsApp forwards and word of mouth. Recommendations go stale, nothing is comparable, and no single place holds structured, trustworthy information about who actually provides what.",
    stat: null as string | null,
  },
  {
    key: "system",
    label: "The system",
    heading: "One platform, three actors, zero ambiguity.",
    body: "A Next.js application hosting both interface and server layer: server components render discovery pages, server actions and route handlers expose the API, and PostgreSQL remains the single source of truth. Every mutation is authenticated, authorized and validated server-side.",
    stat: "14 API routes",
  },
  {
    key: "data",
    label: "The data",
    heading: "A normalized 9-entity schema.",
    body: "Businesses, services, categories, bookings, reviews and moderation actions — modelled relationally, migration-managed, with distinct user, business-owner and admin roles enforced by the security layer rather than the interface.",
    stat: "9 entities · 3 roles",
  },
  {
    key: "ship",
    label: "The ship",
    heading: "Documented like a reviewer will read it.",
    body: "Deployed publicly with preview and production environments, wired through a CI pipeline, and written up as a full technical case study — including the parts that failed, what they taught, and what I would build differently next time.",
    stat: "Deployed · CI-checked",
  },
];

/** Desktop gate — the pinned scrub layout needs viewport height; mobile uses the static editorial block. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();

  return (
    <section
      id="projects"
      data-chapter="works"
      data-chapter-index="3"
      className="relative py-24 md:py-32"
      aria-label="Selected software work"
    >
      <div className="mx-auto max-w-[100rem] px-5 md:px-10">
        <GhostHeading
          index="03"
          title="Selected Work"
          accent="case studies."
          meta="Work"
        />

        <motion.p
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Seven systems, each documented end-to-end — the problem, the
          architecture, the data model, the security decisions, the tests, the
          deployment, and what actually failed along the way.
        </motion.p>
      </div>

      {/* ===== Flagship — sticky scrub showcase (desktop) ===== */}
      {reduce || !isDesktop ? <FlagshipStatic onOpen={setSelected} /> : <FlagshipScrub onOpen={setSelected} />}

      {/* ===== Catalogue — horizontal scroll gallery ===== */}
      <div className="mx-auto mt-24 max-w-[100rem] md:mt-32">
        <Catalogue onOpen={setSelected} />
      </div>

      {/* Honesty note */}
      <motion.p
        className="mx-auto mt-14 max-w-[100rem] px-5 text-center text-xs leading-relaxed text-muted-foreground md:px-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Academic, personal and internship work are clearly separated — nothing
        is positioned as production engineering it is not.
      </motion.p>

      {/* Case study overlay */}
      <CaseStudy project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ========================================================================== */
/* Flagship — sticky media panel + scrubbed narrative steps                   */
/* ========================================================================== */

function FlagshipScrub({ onOpen }: { onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  const imgScale = useTransform(scrollYProgress, [0, 0.18], [0.84, 1]);
  const imgRotate = useTransform(scrollYProgress, [0, 0.18], [2.5, 0]);
  const mediaY = useTransform(scrollYProgress, [0.2, 1], ["0%", "-10%"]);

  return (
    <div ref={ref} className="relative mt-16 md:mt-24">
      <div className="mx-auto grid max-w-[100rem] gap-16 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Sticky media column — pinned while the steps scroll past */}
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
          <motion.div style={{ scale: imgScale, rotate: imgRotate }} className="w-full">
            <motion.div style={{ y: mediaY }} className="relative aspect-[16/10] overflow-hidden rounded-sm border border-[var(--hairline)]">
              <Image
                src="/images/workspace-code.jpg"
                alt="Dark developer workspace with monitors displaying the Campus Services Platform"
                fill
                sizes="(max-width: 1024px) 90vw, 52vw"
                className="object-cover grayscale contrast-[1.04]"
                priority
              />
              <div className="img-tint" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060809]/70 via-transparent to-transparent" aria-hidden="true" />

              {/* Phase readout */}
              <div className="absolute left-4 top-4 flex items-center gap-3 md:left-5 md:top-5">
                <span className="pulse-dot size-1.5 rounded-full bg-[#3ddc97]" aria-hidden="true" />
                <span className="mono-tag rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[#eef1f0] backdrop-blur-sm">
                  Final-year project · 2026
                </span>
              </div>

              {/* Bottom title + CTA */}
              <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
                <p className="label text-[#3ddc97]">{STEPS[active].label}</p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                  <h3 className="display-3 max-w-xl uppercase text-[#eef1f0]">
                    Campus Services
                  </h3>
                  <Magnetic strength={0.25}>
                    <button
                      onClick={() => onOpen(featuredProject)}
                      className="inline-flex h-12 items-center gap-2.5 rounded-full bg-[#3ddc97] px-6 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#04130c] transition-shadow hover:shadow-[0_0_40px_-8px_rgba(61,220,151,0.8)]"
                    >
                      Case study
                      <ArrowUpRight className="size-4" />
                    </button>
                  </Magnetic>
                </div>
                {/* Step progress */}
                <div className="mt-5 flex gap-1.5">
                  {STEPS.map((s, i) => (
                    <span
                      key={s.key}
                      className={cn(
                        "h-[3px] flex-1 rounded-full transition-colors duration-500",
                        i <= active ? "bg-[#3ddc97]" : "bg-white/15"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Narrative steps — normal flow; each centers in the viewport as it passes the pinned panel */}
        <div className="flex flex-col">
          {STEPS.map((step, i) => (
            <div key={step.key} className="flex min-h-[85vh] items-center py-14 lg:min-h-[92vh] lg:py-0">
              <StepBlock step={step} index={i} onActive={() => setActive(i)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepBlock({
  step,
  index,
  onActive,
}: {
  step: (typeof STEPS)[number];
  index: number;
  onActive: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <motion.div
      ref={ref}
      className="max-w-xl"
      initial={{ opacity: 0.25, y: 30, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ margin: "-40% 0px -40% 0px" }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <p className="label text-[#3ddc97]">
        {String(index + 1).padStart(2, "0")} — {step.label}
      </p>
      <h4 className="mt-4 font-display text-[clamp(1.7rem,3.2vw,2.9rem)] leading-[1.08]">
        {step.heading}
      </h4>
      <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
        {step.body}
      </p>
      {step.stat && (
        <p className="mono-tag mt-6 inline-block border-b border-[#3ddc97]/50 pb-1 text-[#3ddc97]">
          {step.stat}
        </p>
      )}
    </motion.div>
  );
}

/* Reduced-motion flagship — static editorial block */
function FlagshipStatic({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div className="mx-auto mt-16 max-w-[100rem] px-5 md:px-10">
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-[var(--hairline)]">
        <Image
          src="/images/workspace-code.jpg"
          alt="Dark developer workspace with monitors displaying the Campus Services Platform"
          fill
          sizes="90vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060809]/80 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-4">
          <h3 className="display-3 uppercase text-[#eef1f0]">Campus Services</h3>
          <button
            onClick={() => onOpen(featuredProject)}
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-[#3ddc97] px-6 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#04130c]"
          >
            Case study <ArrowUpRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {STEPS.map((step, i) => (
          <div key={step.key}>
            <p className="label text-[#3ddc97]">{String(index0(i))} — {step.label}</p>
            <h4 className="mt-3 font-display text-2xl md:text-3xl">{step.heading}</h4>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function index0(i: number) {
  return String(i + 1).padStart(2, "0");
}

/* ========================================================================== */
/* Catalogue — horizontal scroll gallery driven by vertical scroll             */
/* ========================================================================== */

function Catalogue({ onOpen }: { onOpen: (p: Project) => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [range, setRange] = useState(0);

  const { scrollYProgress } = useScroll({ target: wrapperRef });

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !wrapperRef.current) return;
      const track = trackRef.current.scrollWidth;
      const viewport = wrapperRef.current.offsetWidth;
      setRange(Math.max(0, track - viewport + 40));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0.06, 0.94], [0, -range]);
  // The ghost word drifts against the track — background depth.
  const ghostX = useTransform(scrollYProgress, [0.06, 0.94], ["6%", "-14%"]);

  if (reduce) {
    return (
      <div>
        <CatalogueHeader progress={undefined} />
        <div className="mt-10 flex flex-wrap gap-6">
          {projects.slice(1).map((p) => (
            <ProjectCard key={p.slug} project={p} onOpen={onOpen} />
          ))}
        </div>
      </div>
    );
  }

  const wrapperHeight = `${Math.max(180, range / 8)}vh`;

  // Filmstrip depth — each card sits at its own offset, scale and tilt.
  const DEPTH = [
    { y: -14, scale: 1, rotate: 0 },
    { y: 26, scale: 0.93, rotate: 1.4 },
    { y: -30, scale: 0.96, rotate: -1 },
    { y: 18, scale: 1, rotate: 0.6 },
    { y: -22, scale: 0.94, rotate: -1.2 },
    { y: 30, scale: 0.96, rotate: 1 },
  ];

  return (
    <div ref={wrapperRef} style={{ height: wrapperHeight }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Parallax ghost word — the far layer of the filmstrip */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-semibold uppercase leading-none tracking-[-0.05em] text-ghost text-[clamp(9rem,24vw,22rem)]"
          style={{ x: ghostX }}
        >
          catalogue
        </motion.span>

        <CatalogueHeader progress={scrollYProgress} />

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative mt-10 flex w-max items-start gap-5 px-5 will-change-transform md:gap-8 md:px-10"
        >
          {projects.slice(1).map((p, i) => {
            const d = DEPTH[i % DEPTH.length];
            return (
              <motion.div
                key={p.slug}
                style={{ y: d.y, scale: d.scale, rotate: d.rotate }}
                className="origin-center"
              >
                <ProjectCard project={p} onOpen={onOpen} />
              </motion.div>
            );
          })}
        </motion.div>

        <p className="mt-8 flex items-center gap-3 px-5 text-muted-foreground md:mt-10 md:px-10">
          <span className="grid size-9 place-items-center rounded-full border border-[var(--hairline)]">
            <MoveRight className="size-4 animate-pulse text-[#3ddc97]" aria-hidden="true" />
          </span>
          <span className="label text-muted-foreground">Keep scrolling — the catalogue moves sideways</span>
          <span className="mono-tag hidden text-muted-foreground/50 md:block">→</span>
        </p>
      </div>
    </div>
  );
}

function CatalogueHeader({ progress }: { progress?: MotionValue<number> }) {
  return (
    <div className="px-5 md:px-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="label text-muted-foreground">03.1 / The catalogue</p>
          <h3 className="mt-3 display-3 uppercase">
            Six more <span className="font-display normal-case text-[#3ddc97]">builds.</span>
          </h3>
        </div>
        <p className="mono-tag text-muted-foreground">06 projects</p>
      </div>
      {/* Horizontal progress hairline */}
      <div className="mt-6 h-px w-full bg-[var(--hairline)]">
        {progress ? (
          <motion.div
            className="h-px origin-left bg-[#3ddc97]"
            style={{ scaleX: progress }}
            aria-hidden="true"
          />
        ) : null}
      </div>
    </div>
  );
}
