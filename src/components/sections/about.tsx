"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { learningItems } from "@/data/skills";
import { GhostHeading } from "@/components/fx/ghost-heading";
import { ParallaxImage } from "@/components/fx/parallax-image";
import { EASE } from "@/lib/motion";

/**
 * About — Chapter 06 / HUMAN.
 * Split-lane parallax: the copy lane and the portrait lane travel at
 * different speeds — two layers of one story, never one flat column.
 */
export function About() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 26, reduce ? 0 : -26]);
  const imgY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 80, reduce ? 0 : -70]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 2.2, reduce ? 0 : -1.6]);

  return (
    <section
      id="about"
      ref={ref}
      data-chapter="human"
      data-chapter-index="6"
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="About Kevin Mwangi"
    >
      <div
        className="pointer-events-none absolute right-0 top-1/4 size-[28rem] rounded-full bg-[#7ab8ff]/6 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[100rem] px-5 md:px-10">
        <GhostHeading index="06" title="About" accent="the engineer." meta="About" />

        <div className="mt-14 grid items-start gap-14 md:mt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Copy lane — the slow layer */}
          <motion.div className="order-1" style={{ y: copyY }}>
            <motion.h3
              className="display-3 max-w-2xl"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              A graduate engineer who treats{" "}
              <span className="font-display text-[#3ddc97]">systems thinking</span>{" "}
              as the job, not the buzzword.
            </motion.h3>

            <div className="mt-8 space-y-5">
              {profile.about.map((para, i) => (
                <motion.p
                  key={i}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                  className={
                    i === 0
                      ? "text-base leading-relaxed text-foreground/90 md:text-lg"
                      : "text-[0.95rem] leading-relaxed text-muted-foreground"
                  }
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Philosophy pull-quote */}
            <motion.blockquote
              className="mt-12 border-l-2 border-[#3ddc97] pl-6 md:pl-8"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              <p className="font-display max-w-2xl text-[clamp(1.35rem,2.6vw,2.1rem)] leading-[1.25]">
                &ldquo;{profile.philosophy}&rdquo;
              </p>
              <p className="label mt-5 text-[#3ddc97]">Engineering philosophy</p>
            </motion.blockquote>
          </motion.div>

          {/* Portrait lane — the fast layer, drifting on its own track */}
          <motion.div className="order-2 lg:sticky lg:top-28" style={{ y: imgY, rotate: imgRotate }}>
            <ParallaxImage
              src="/images/team-lead.jpg"
              alt="Kevin Mwangi collaborating with teammates over a laptop during a software project"
              fillHeight="aspect-[3/4]"
              className="rounded-sm border border-[var(--hairline)]"
              sizes="(max-width: 1024px) 100vw, 480px"
              speed={10}
            />

            <div className="mt-5 grid grid-cols-3">
              {[
                { k: "Since", v: "2022" },
                { k: "Focus", v: "Full stack" },
                { k: "Base", v: "Kenya" },
              ].map((s) => (
                <div key={s.k} className="border-t border-[var(--hairline)] pt-3">
                  <p className="label text-muted-foreground">{s.k}</p>
                  <p className="mt-1.5 text-sm font-semibold">{s.v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ===== Now learning ledger ===== */}
        <div className="mt-24 md:mt-32">
          <motion.div
            className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 hairline-b pb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="label text-muted-foreground">06.1 / Now learning — the next layer of the stack, already in progress</p>
          </motion.div>

          <div className="grid md:grid-cols-3">
            {learningItems.map((item, i) => (
              <motion.div
                key={item.topic}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                className="group border-b border-[var(--hairline)] p-6 transition-colors duration-500 hover:bg-card md:p-7 md:border-r"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-[1.02rem] font-semibold">{item.topic}</h4>
                  <span className="mono-tag text-muted-foreground/40 transition-colors group-hover:text-[#3ddc97]">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-foreground/80">
                  {item.objective}
                </p>
                <p className="mt-2 text-[0.72rem] leading-relaxed text-muted-foreground">
                  Why — {item.why}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="mt-6 text-xs leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Certifications stay off this page until they are earned and verified
            — no decoration, no anticipation.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
