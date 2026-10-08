"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { SplitText } from "./split-text";

/**
 * GhostHeading — section header: an oversized ghost numeral bleeding
 * off the left edge, mono index label, and a display-scale title
 * with masked word reveal. The signature section entrance.
 */
export function GhostHeading({
  index,
  title,
  accent,
  meta,
  id,
}: {
  index: string;
  title: string;
  /** trailing italic serif accent word */
  accent?: string;
  meta?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative hairline-b pb-8 md:pb-12" id={id}>
      {/* Ghost numeral */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[0.55em] left-0 select-none font-semibold leading-none text-ghost text-[clamp(6.5rem,22vw,24rem)]"
        initial={reduce ? { opacity: 1 } : { opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        {index}
      </motion.span>

      <div className="relative flex flex-wrap items-end justify-between gap-x-10 gap-y-4 pt-16 md:pt-24">
        <div className="max-w-3xl">
          <motion.p
            className="label text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {index} / {meta ?? "Section"}
          </motion.p>

          <h2 className="mt-4">
            <SplitText
              text={title}
              as="span"
              className="display-2 block"
              stagger={0.05}
            />
            {accent && (
              <SplitText
                text={accent}
                as="span"
                className="display-2 font-display block text-[#3ddc97]"
                stagger={0.06}
                delay={0.18}
              />
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}
