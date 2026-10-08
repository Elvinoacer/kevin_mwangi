"use client";

import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { profile } from "@/data/profile";
import { scrollToSection } from "@/components/providers";
import { Magnetic } from "@/components/fx/magnetic";
import { EASE } from "@/lib/motion";
import { useIntroDone } from "@/lib/intro";
import { AccentText } from "@/components/fx/split-text";

const stats = [
  { value: 7, label: "Documented systems" },
  { value: 3, label: "Auth roles modelled" },
  { value: 16, label: "Case-study sections" },
  { value: 2026, label: "BSc Computer Science", raw: true },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const introDone = useIntroDone();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Layered parallax exit
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 130]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -2.5]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  // The camera — the whole hero pushes through the world on exit.
  const zoomScale = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 1.32]);
  const zoomOpacity = useTransform(scrollYProgress, [0.12, 0.92], [1, 0]);
  const zoomBlur = useTransform(
    scrollYProgress,
    [0.15, 0.92],
    ["blur(0px)", reduce ? "blur(0px)" : "blur(10px)"]
  );

  // Mouse parallax — the world has depth and it notices the pointer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.8 });
  const smy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.8 });
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);
  const portraitMX = useTransform(smx, [-1, 1], [12, -12]);
  const portraitMY = useTransform(smy, [-1, 1], [8, -8]);
  const ghostMX = useTransform(smx, [-1, 1], [30, -30]);
  const nameMX = useTransform(smx, [-1, 1], [7, -7]);

  const nameLines = ["KEVIN", "MWANGI"];

  return (
    <section
      id="hero"
      data-chapter="arrival"
      data-chapter-index="0"
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden noise"
      aria-label="Introduction"
    >
      {/* The camera — everything inside pushes through the world on exit */}
      <motion.div
        className="absolute inset-0 flex flex-col will-change-transform"
        style={{ scale: zoomScale, opacity: zoomOpacity, filter: zoomBlur }}
      >
      {/* Background: grid + aurora glows */}
      <motion.div
        className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_85%_75%_at_50%_28%,black,transparent)]"
        style={{ y: bgY }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -top-48 left-[4%] size-[40rem] rounded-full bg-[#3ddc97]/10 blur-[150px]"
        style={{ opacity: glowOpacity }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 -right-40 size-[34rem] rounded-full bg-[#7ab8ff]/8 blur-[150px]"
        style={{ opacity: glowOpacity }}
        aria-hidden="true"
      />

      {/* Ghost watermark — drifts on scroll, drifts with the pointer */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute right-[-2%] top-[16%] select-none font-display text-[clamp(7rem,20vw,19rem)] leading-none text-ghost opacity-70"
        style={{ x: ghostMX }}
      >
        <motion.span className="block" style={{ x: ghostX }}>
          2026
        </motion.span>
      </motion.span>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[100rem] flex-1 flex-col justify-center px-5 pb-8 pt-28 md:px-10 md:pt-32"
        style={{ y: typeY }}
        variants={container}
        initial="hidden"
        animate={introDone ? "visible" : "hidden"}
      >
        {/* Eyebrow row */}
        <motion.div variants={maskIn} className="overflow-hidden">
          <motion.p
            variants={maskWord}
            className="label flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground"
          >
            <span className="flex items-center gap-2.5">
              <span className="pulse-dot size-1.5 shrink-0 rounded-full bg-[#3ddc97]" aria-hidden="true" />
              Available for graduate roles
            </span>
            <span className="hidden h-px w-10 bg-[var(--hairline)] sm:block" aria-hidden="true" />
            <span className="hidden sm:inline">{profile.eyebrow}</span>
          </motion.p>
        </motion.div>

        {/* ===== The monolith — name + portrait overlap ===== */}
        <motion.div className="relative mt-6 md:mt-8" style={{ x: nameMX }}>
          {/* Name — full-bleed scale, portrait overlaps line two */}
          <h1 className="relative">
            {nameLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.07em] -mb-[0.03em]">
                <motion.span
                  className="block font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-[clamp(4rem,13.5vw,12.5rem)]"
                  variants={{
                    hidden: reduce ? { opacity: 0 } : { y: "112%", rotate: 2.5 },
                    visible: {
                      y: "0%",
                      rotate: 0,
                      opacity: 1,
                      transition: { duration: 1.05, delay: 0.08 + i * 0.13, ease: EASE },
                    },
                  }}
                >
                  {i === 1 ? (
                    <>
                      MWANGI<span className="text-[#3ddc97]">.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Portrait — overlaps the name, breaks the grid, floats on the pointer */}
          <motion.div
            className="relative z-10 -mt-[6vw] ml-auto w-[54%] max-w-[24rem] md:-mt-[7.5vw] md:w-[30%] md:max-w-[26rem] lg:-mt-[8.5vw]"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 60, rotate: 4 }}
            animate={introDone ? { opacity: 1, y: 0, rotate: 1.5 } : {}}
            transition={{ duration: 1.15, delay: 0.55, ease: EASE }}
            style={{ x: portraitMX }}
          >
            <motion.div style={{ y: portraitY, rotate: portraitRotate }}>
            <motion.div style={{ y: portraitMY }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[var(--hairline)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)]">
                <Image
                  src="/images/portrait.jpg"
                  alt="Portrait of Kevin Mwangi, graduate software engineer"
                  fill
                  priority
                  sizes="(max-width: 768px) 54vw, 26rem"
                  className="object-cover grayscale contrast-[1.06] brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060809]/85 via-transparent to-transparent" aria-hidden="true" />
                {/* Corner ticks */}
                <span className="absolute left-3 top-3 size-5 border-l border-t border-[#3ddc97]/70" aria-hidden="true" />
                <span className="absolute right-3 top-3 size-5 border-r border-t border-[#3ddc97]/70" aria-hidden="true" />
                <span className="absolute bottom-3 left-3 size-5 border-b border-l border-[#3ddc97]/70" aria-hidden="true" />
                <span className="absolute bottom-3 right-3 size-5 border-b border-r border-[#3ddc97]/70" aria-hidden="true" />
                <p className="mono-tag absolute bottom-4 left-4 text-[#3ddc97]">Nairobi, Kenya</p>
              </div>

              {/* Rotating badge pinned to the frame */}
              <motion.div
                className="absolute -left-12 top-8 hidden size-28 place-items-center rounded-full border border-[var(--hairline)] bg-background/90 backdrop-blur-sm md:grid"
                initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
                animate={introDone ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.15, duration: 0.7, ease: EASE }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full">
                  <defs>
                    <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                  </defs>
                  <text className="fill-current text-muted-foreground" style={{ fontSize: "8.5px", letterSpacing: "2.6px", fontFamily: "var(--font-geist-mono)" }}>
                    <textPath href="#circlePath">OPEN TO WORK · OPEN TO WORK ·</textPath>
                  </text>
                </svg>
                <span className="size-2 rounded-full bg-[#3ddc97]" />
              </motion.div>
            </motion.div>
            </motion.div>
          </motion.div>

          {/* Role line — sits over the name's baseline grid */}
          <motion.p
            variants={fadeUp}
            className="relative z-20 -mt-[2vw] flex max-w-2xl flex-wrap items-baseline gap-x-2 text-[clamp(1.15rem,2.3vw,1.75rem)] leading-snug text-muted-foreground md:-mt-[1.5vw]"
          >
            <AccentText
              segments={[
                { text: "Graduate", accent: false },
                { text: "software engineer", accent: true },
                { text: "— building", accent: false },
                { text: "reliable systems", accent: true },
                { text: "for the modern web.", accent: false },
              ]}
              accentClassName="font-display text-[1.14em] text-foreground"
            />
          </motion.p>
        </motion.div>

        {/* Supporting + CTAs */}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-8 md:mt-10">
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground md:text-base"
          >
            {profile.supporting}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 md:gap-6">
            <Magnetic>
              <button
                onClick={() => scrollToSection("projects")}
                className="group inline-flex h-13 items-center gap-3 rounded-full bg-[#3ddc97] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-[#04130c] transition-shadow duration-500 hover:shadow-[0_0_48px_-8px_rgba(61,220,151,0.85)]"
              >
                Explore the work
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </Magnetic>

            <button
              onClick={() => window.print()}
              className="link-sweep inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-[#3ddc97]"
            >
              <FileDown className="size-4" />
              Download CV
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* ===== Bottom: stats bar + scroll cue ===== */}
      <motion.div
        className="relative z-10 mt-auto hairline-t"
        initial={{ opacity: 0, y: 30 }}
        animate={introDone ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
      >
        <div className="mx-auto flex max-w-[100rem] items-stretch px-5 md:px-10">
          <div className="grid flex-1 grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={
                  "py-5 pr-6 md:py-6 " + (i !== 0 ? "border-l border-[var(--hairline)] pl-6" : "")
                }
              >
                <p className="font-mono text-2xl font-semibold tabular-nums tracking-[-0.03em] md:text-3xl">
                  {s.raw ? (
                    s.value
                  ) : (
                    <>
                      <span className="text-[#3ddc97]">0</span>
                      {s.value}
                    </>
                  )}
                </p>
                <p className="mt-1.5 label text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Scroll cue — aligned to the content edge */}
          <motion.button
            onClick={() => scrollToSection("manifesto")}
            className="group ml-6 hidden w-14 flex-col items-center justify-center gap-2 border-l border-[var(--hairline)] md:flex"
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : {}}
            transition={{ delay: 1.8, duration: 0.8 }}
            aria-label="Scroll to manifesto"
          >
            <span className="label text-[0.55rem] text-muted-foreground transition-colors group-hover:text-foreground">
              Scroll
            </span>
            <span className="relative h-10 w-px overflow-hidden bg-[var(--hairline)]">
              <motion.span
                className="absolute left-0 top-0 h-4 w-px bg-[#3ddc97]"
                animate={reduce ? undefined : { y: [-16, 40] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <ArrowDown className="size-3 text-muted-foreground transition-colors group-hover:text-[#3ddc97]" />
          </motion.button>
        </div>
      </motion.div>
      </motion.div>
    </section>
  );
}

const maskIn: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const maskWord: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
