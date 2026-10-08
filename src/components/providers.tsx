"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

/**
 * App providers: theme (dark-first) + Lenis smooth scrolling.
 * Lenis is skipped when the user prefers reduced motion.
 */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Expose for anchor scrolling from nav
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

/** Smooth-scroll to a section id, cooperating with Lenis when present. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.4 });
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
