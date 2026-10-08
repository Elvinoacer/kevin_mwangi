"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor — precise dot + trailing ring.
 * Grows over interactive targets; shows an optional label
 * (data-cursor="View") over gallery cards. Rendered only on
 * fine pointers (CSS-gated), listeners skipped under reduced motion.
 */
export function Cursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 260, damping: 28, mass: 0.6 });

  const [variant, setVariant] = useState<"default" | "hover" | "label" | "hidden">("default");
  const [label, setLabel] = useState("");
  const rafRef = useRef<number | null>(null);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.body.dataset.cursor = "on";

    const onMove = (e: MouseEvent) => {
      last.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          dotX.set(last.current.x);
          dotY.set(last.current.y);
          rafRef.current = null;
        });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, select, [role='button']"
      );
      if (!target) {
        setVariant("default");
        setLabel("");
        return;
      }
      const text = target.dataset.cursor;
      if (text && text !== "true") {
        setVariant("label");
        setLabel(text);
      } else if (text === "hidden") {
        setVariant("hidden");
      } else {
        setVariant("hover");
        setLabel("");
      }
    };

    const onLeave = () => {
      dotX.set(-100);
      dotY.set(-100);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      delete document.body.dataset.cursor;
    };
  }, [dotX, dotY]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[190] hidden [@media(pointer:fine)]:block"
      aria-hidden="true"
    >
      {/* Dot */}
      <motion.div
        className="absolute left-0 top-0 size-1.5 rounded-full bg-[#3ddc97]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: variant === "hidden" ? 0 : 1 }}
      />
      {/* Ring / label bubble */}
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-[#3ddc97]/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: variant === "label" ? 84 : variant === "hover" ? 56 : 34,
          height: variant === "label" ? 84 : variant === "hover" ? 56 : 34,
          opacity: variant === "hidden" ? 0 : 1,
          backgroundColor:
            variant === "label" ? "rgba(61,220,151,0.92)" : "rgba(61,220,151,0)",
          borderColor: variant === "label" ? "rgba(61,220,151,0)" : "rgba(61,220,151,0.7)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        {variant === "label" && (
          <span className="label text-[0.55rem] text-[#04130c]">{label}</span>
        )}
      </motion.div>
    </div>
  );
}
