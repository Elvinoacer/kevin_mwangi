"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { EASE } from "@/lib/motion";

/**
 * Snapshot — the fact sheet. A lean editorial ledger with hairline
 * rows: mono label left, value right. Deliberately quiet after the
 * manifesto — the calm before the work.
 */
export function Snapshot() {
  const reduce = useReducedMotion();

  return (
    <section
      id="snapshot"
      data-chapter="proof"
      data-chapter-index="2"
      className="relative pt-8 py-16 md:py-20"
      aria-label="Candidate snapshot"
    >
      <div className="mx-auto max-w-[100rem] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-baseline justify-between gap-6"
        >
          <p className="label text-muted-foreground">02.2 / Fact sheet</p>
          <p className="mono-tag hidden text-muted-foreground/60 sm:block">
            the short version, before the evidence
          </p>
        </motion.div>

        <div className="mt-6 grid md:grid-cols-2 md:gap-x-16">
          {profile.snapshot.map((item, i) => (
            <motion.div
              key={item.label}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.05, ease: EASE }}
              className="group flex items-baseline justify-between gap-6 border-b border-[var(--hairline)] py-4"
            >
              <span className="label shrink-0 text-muted-foreground transition-colors group-hover:text-[#3ddc97]">
                {item.label}
              </span>
              <span className="text-right text-[0.92rem] font-medium leading-snug">
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-2xl text-xs leading-relaxed text-muted-foreground"
        >
          Every claim on this site is structured the way a reviewer would check
          it — problem first, then system design, data model, security, testing
          and deployment. Placeholders stay visible until each detail is
          verified with real evidence: repositories, deployed links and
          supervisor sign-off.
        </motion.p>
      </div>
    </section>
  );
}
