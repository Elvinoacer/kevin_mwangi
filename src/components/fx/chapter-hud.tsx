"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { CHAPTERS } from "@/lib/chapters";
import { scrollToSection } from "@/components/providers";
import { EASE } from "@/lib/motion";

/**
 * ChapterHUD — the journey instrument.
 * Left rail: the live chapter (number + name, morphing as you travel).
 * Right spine: true page-progress fill with chapter ticks at their real
 * positions — click a tick to jump to that chapter.
 * Caches section offsets; scroll handling is rAF-throttled.
 */

type ChapterTick = {
  key: string;
  index: string;
  name: string;
  targetId: string;
  pos: number; // 0..1 along the page
};

export function ChapterHUD() {
  const [ticks, setTicks] = useState<ChapterTick[]>([]);
  const [active, setActive] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const activeRef = useRef(0);
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  // Measure chapter positions.
  useEffect(() => {
    const measure = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const out: ChapterTick[] = [];
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-chapter]")
      );
      for (const c of CHAPTERS) {
        const el =
          els.find((e) => e.dataset.chapter === c.key) ??
          document.getElementById(c.targetId);
        if (!el) continue;
        const top =
          el.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight * 0.5;
        out.push({ ...c, pos: max > 0 ? Math.min(1, top / max) : 0 });
      }
      setTicks(out);
    };
    const t = window.setTimeout(measure, 600); // after intro + layout
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Step aside when a full-screen dialog (case study) locks the body.
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setDialogOpen(document.body.style.overflow.includes("hidden"));
    });
    obs.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => obs.disconnect();
  }, []);

  // Track the active chapter while scrolling.
  useEffect(() => {
    let raf = 0;
    let queued = false;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]")
    );
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(() => {
        queued = false;
        const y = window.scrollY + window.innerHeight * 0.42;
        let idx = 0;
        let best = -Infinity;
        els.forEach((el) => {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= y && top > best) {
            best = top;
            idx = Number(el.dataset.chapterIndex ?? "0");
          }
        });
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const chapter =
    ticks.length > 0
      ? { index: ticks[active]?.index ?? "00", name: ticks[active]?.name ?? "Arrival" }
      : { index: CHAPTERS[active]?.index ?? "00", name: CHAPTERS[active]?.name };

  return (
    <>
      {/* Left rail — the live chapter */}
      <div
        className="chapter-hud pointer-events-none fixed bottom-8 left-6 z-40 hidden select-none transition-opacity duration-500 lg:block"
        style={{ opacity: dialogOpen ? 0 : 1 }}
        aria-hidden="true"
      >
        <div className="flex items-end gap-3 [writing-mode:vertical-rl] rotate-180">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={chapter.index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex items-end gap-3"
            >
              <span className="mono-tag text-[#3ddc97]">{chapter.index}</span>
              <span className="mono-tag uppercase tracking-[0.28em] text-foreground/70">
                {chapter.name}
              </span>
            </motion.div>
          </AnimatePresence>
          <span className="h-10 w-px bg-[var(--hairline)]" />
        </div>
      </div>

      {/* Right spine — true progress + chapter ticks */}
      <nav
        aria-label="Journey progress"
        className="chapter-hud fixed right-4 top-1/2 z-40 hidden h-[38vh] -translate-y-1/2 transition-opacity duration-500 md:block"
        style={{ opacity: dialogOpen ? 0 : 1 }}
      >
        <div className="relative h-full w-px bg-[var(--hairline)]">
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-[#3ddc97]"
            style={{ scaleY: fill }}
            aria-hidden="true"
          />
          {ticks.map((t, i) => (
            <button
              key={t.key}
              onClick={() => scrollToSection(t.targetId)}
              aria-label={`Chapter ${t.index} — ${t.name}`}
              aria-current={i === active ? "true" : undefined}
              className="group absolute -left-[7px] size-[15px] cursor-pointer"
              style={{ top: `calc(${(t.pos * 100).toFixed(2)}% - 7px)` }}
              tabIndex={-1}
            >
              <span
                className={`absolute inset-0 m-auto rounded-full transition-all duration-500 ${
                  i <= active
                    ? "size-[5px] bg-[#3ddc97] shadow-[0_0_8px_rgba(61,220,151,0.8)]"
                    : "size-[3px] bg-muted-foreground/40 group-hover:bg-[#3ddc97]/70"
                }`}
              />
              <span className="mono-tag pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-sm border border-[var(--hairline)] bg-background/90 px-2 py-1 text-[0.55rem] uppercase tracking-[0.2em] text-foreground/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {t.index} · {t.name}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
