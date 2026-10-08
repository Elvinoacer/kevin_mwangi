"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/components/providers";
import { EASE } from "@/lib/motion";
import { profile } from "@/data/profile";

const NAV_SECTIONS = [
  { id: "hero", label: "Index", num: "01" },
  { id: "manifesto", label: "Manifesto", num: "02" },
  { id: "projects", label: "Work", num: "03" },
  { id: "experience", label: "Experience", num: "04" },
  { id: "capabilities", label: "Engineering", num: "05" },
  { id: "about", label: "About", num: "06" },
  { id: "contact", label: "Contact", num: "07" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll (and Lenis) while the overlay is open
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToSection(id), 450);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-700 no-print",
          scrolled && !open
            ? "backdrop-blur-md bg-background/70 border-b border-[var(--hairline)]"
            : "bg-transparent"
        )}
      >
        {/* Scroll progress hairline */}
        <motion.div
          className="absolute inset-x-0 top-0 h-px origin-left bg-[#3ddc97]"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />

        <nav
          className="mx-auto flex h-16 md:h-[4.5rem] max-w-[100rem] items-center justify-between px-5 md:px-10"
          aria-label="Primary"
        >
          {/* Wordmark */}
          <button
            onClick={() => go("hero")}
            className="group flex items-baseline gap-2.5"
            aria-label="Back to top — Kevin Mwangi"
          >
            <span className="text-[0.95rem] font-semibold tracking-[-0.02em] uppercase">
              Kevin Mwangi
            </span>
            <span className="label hidden sm:inline text-muted-foreground transition-colors group-hover:text-[#3ddc97]">
              ©2026
            </span>
          </button>

          {/* Status — center */}
          <button
            onClick={() => go("contact")}
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2.5 group"
            aria-label="Currently available — go to contact"
          >
            <span className="pulse-dot size-1.5 rounded-full bg-[#3ddc97]" aria-hidden="true" />
            <span className="label text-muted-foreground group-hover:text-foreground transition-colors">
              Available for work
            </span>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Toggle color theme"
            >
              <Sun className="size-[1.05rem] hidden dark:inline" aria-hidden="true" />
              <Moon className="size-[1.05rem] dark:hidden" aria-hidden="true" />
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="group relative inline-flex h-10 items-center gap-3 overflow-hidden rounded-full border border-[var(--hairline)] px-5 transition-colors hover:border-[#3ddc97]/60"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="label">
                {open ? "Close" : "Menu"}
              </span>
              <span className="relative flex h-2 w-4 flex-col justify-between" aria-hidden="true">
                <motion.span
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="h-px w-full bg-foreground"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="h-px w-full bg-foreground"
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* ===== Full-screen menu overlay ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[95] bg-[#040607] no-print"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            {/* Ambient glow */}
            <div
              className="pointer-events-none absolute -right-40 top-1/4 size-[36rem] rounded-full bg-[#3ddc97]/8 blur-[140px]"
              aria-hidden="true"
            />
            <div className="noise absolute inset-0" aria-hidden="true" />

            <div className="relative flex h-full flex-col justify-between overflow-y-auto px-5 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32">
              <ul className="mx-auto w-full max-w-[100rem] flex flex-col" role="list">
                {NAV_SECTIONS.map(({ id, label, num }, i) => (
                  <li key={id} className="overflow-hidden border-b border-white/10 last:border-b-0">
                    <motion.button
                      onClick={() => go(id)}
                      className="group flex w-full items-baseline justify-between gap-6 py-4 text-left md:py-5"
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "110%", opacity: 0 }}
                      transition={{ duration: 0.65, delay: 0.12 + i * 0.055, ease: EASE }}
                    >
                      <span className="flex items-baseline gap-5 md:gap-8">
                        <span className="label text-[#3ddc97]/70">{num}</span>
                        <span className="display-2 text-[#eef1f0] uppercase transition-transform duration-500 ease-out group-hover:translate-x-4 md:group-hover:translate-x-6">
                          {label}
                        </span>
                      </span>
                      <ArrowUpRight className="size-7 shrink-0 self-center text-[#3ddc97] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-45 md:size-9" />
                    </motion.button>
                  </li>
                ))}
              </ul>

              {/* Meta column */}
              <motion.div
                className="mx-auto mt-12 grid w-full max-w-[100rem] gap-8 border-t border-white/10 pt-8 md:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              >
                <div>
                  <p className="label text-[#8b9296]">Location</p>
                  <p className="mt-2 text-sm text-[#eef1f0]">Nairobi, Kenya</p>
                </div>
                <div>
                  <p className="label text-[#8b9296]">Get in touch</p>
                  <a
                    href={`mailto:${profile.links[2].handle}`}
                    className="link-sweep mt-2 inline-block text-sm text-[#eef1f0]"
                  >
                    {profile.links[2].handle}
                  </a>
                </div>
                <div className="flex gap-6 md:justify-end">
                  {profile.links.slice(0, 2).map((l) => (
                    <a
                      key={l.platform}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-sweep text-sm text-[#eef1f0]"
                    >
                      {l.platform}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
