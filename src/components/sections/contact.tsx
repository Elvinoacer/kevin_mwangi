"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { profile } from "@/data/profile";
import { scrollToSection } from "@/components/providers";
import { Magnetic } from "@/components/fx/magnetic";
import { EASE } from "@/lib/motion";

const bigLines = [
  { text: "Looking for a", accent: false },
  { text: "graduate engineer", accent: true },
  { text: "who builds and learns fast?", accent: false },
];

/**
 * Contact — the closing statement: monumental masked lines over a
 * parallax Nairobi nightscape, a live Nairobi clock, and the
 * magnetic email CTA.
 */
export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("--:--:--");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-16%", "0%"]);

  // Live Nairobi clock (EAT, UTC+3)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Africa/Nairobi",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.links[2].handle ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      data-chapter="contact"
      data-chapter-index="7"
      className="relative flex min-h-svh flex-col overflow-hidden py-28"
      aria-label="Contact"
    >
      {/* Parallax nightscape */}
      <motion.div style={{ y: reduce ? 0 : bgY }} className="absolute inset-[-16%_0_0_0]" aria-hidden="true">
        <Image
          src="/images/nairobi-night.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/96" aria-hidden="true" />
      <div className="noise absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[100rem] flex-1 flex-col justify-center px-5 py-10 md:px-10">
        <motion.p
          className="label text-[#3ddc97]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          09 / Contact — {time} EAT, Nairobi
        </motion.p>

        {/* Monumental lines */}
        <h2 className="mt-6 md:mt-8">
          {bigLines.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-[0.08em] -mb-[0.04em]">
              <motion.span
                className={
                  line.accent
                    ? "display-1 font-display block normal-case text-[#3ddc97]"
                    : "display-1 block uppercase"
                }
                initial={reduce ? { y: 0 } : { y: "112%", rotate: 2 }}
                whileInView={{ y: "0%", rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.1 + i * 0.13, ease: EASE }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Open to graduate software engineering, backend, full-stack, cloud and
          technical trainee opportunities — remote or on-site.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4 md:gap-6"
        >
          <Magnetic>
            <a
              href={`mailto:${profile.links[2].handle}`}
              className="group inline-flex h-13 items-center gap-3 rounded-full bg-[#3ddc97] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-[#04130c] transition-shadow duration-500 hover:shadow-[0_0_48px_-8px_rgba(61,220,151,0.85)]"
            >
              Email Kevin
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </Magnetic>

          <Magnetic strength={0.3}>
            <button
              onClick={() => scrollToSection("projects")}
              className="inline-flex h-13 items-center gap-3 rounded-full border border-[var(--hairline)] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-500 hover:border-[#3ddc97]/70 hover:text-[#3ddc97]"
            >
              Revisit the work
            </button>
          </Magnetic>
        </motion.div>

        {/* Email copy chip + socials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-9 flex flex-wrap items-center gap-6"
        >
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-3 rounded-full border border-[var(--hairline)] py-1.5 pl-5 pr-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Copy email address to clipboard"
          >
            {profile.links[2].handle}
            <span className="grid size-7 place-items-center rounded-full bg-card transition-colors group-hover:bg-[#3ddc97]/15">
              {copied ? <Check className="size-3.5 text-[#3ddc97]" /> : <Copy className="size-3.5" />}
            </span>
          </button>

          {profile.links.slice(0, 2).map((l) => (
            <a
              key={l.platform}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep text-sm text-foreground/80"
            >
              {l.platform}
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 text-xs text-muted-foreground"
        >
          Based in Kenya · Open to remote and on-site graduate roles · Response
          time — usually within a day
        </motion.p>
      </div>
    </section>
  );
}
