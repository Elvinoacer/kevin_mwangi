"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { markIntroDone } from "@/lib/intro";

const COUNT_DURATION = 1300;
const HOLD = 260;
const TOTAL = COUNT_DURATION + HOLD;

const noopSubscribe = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

/**
 * Preloader — percentage counter with name reveal, then a
 * two-panel curtain lift. Skips on repeat visits within the session
 * and under prefers-reduced-motion.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(noopSubscribe, getHydrated, getServerHydrated);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const skip = reduce || sessionStorage.getItem("preloaded") === "1";
    if (skip) {
      markIntroDone();
      const raf = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(raf);
    }

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_DURATION);
      // ease-out for satisfying deceleration
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    const finish = window.setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("preloaded", "1");
      markIntroDone();
    }, TOTAL);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(finish);
    };
  }, [reduce]);

  if (!hydrated || done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] no-print"
          aria-hidden="true"
        >
          {/* Curtain panels */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[50.5%] bg-[#040607]"
            exit={{ y: "-101%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[50.5%] bg-[#040607]"
            exit={{ y: "101%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            {/* Name reveal */}
            <p className="overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                className="label block text-[#8b9296]"
              >
                Kevin Mwangi — Portfolio 2026
              </motion.span>
            </p>

            {/* Counter */}
            <p className="font-mono text-6xl font-semibold tabular-nums tracking-[-0.04em] text-[#eef1f0] md:text-7xl">
              {progress}
              <span className="text-[#3ddc97]">%</span>
            </p>

            {/* Progress hairline */}
            <div className="h-px w-40 overflow-hidden bg-[#1c2226]">
              <div
                className="h-full bg-[#3ddc97] transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
