"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { scrollToSection } from "@/components/providers";
import { VelocityMarquee } from "@/components/fx/velocity-marquee";
import { EASE } from "@/lib/motion";

/**
 * Footer — the exit: a velocity-reactive name marquee, meta ledger,
 * and a magnetic back-to-top. Ends the way it began — in motion.
 */
export function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--hairline)] no-print" aria-label="Footer">
      {/* Name marquee */}
      <div className="hairline-b py-6 md:py-8" aria-hidden="true">
        <VelocityMarquee
          items={["Kevin Mwangi", "Software Engineer", "Nairobi, Kenya"]}
          baseVelocity={1.6}
        />
      </div>

      <div className="relative mx-auto max-w-[100rem] px-5 pb-12 pt-10 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.6fr]">
          {/* Brand + build note */}
          <div>
            <p className="text-[0.95rem] font-semibold uppercase tracking-[-0.02em]">
              {profile.fullName}
            </p>
            <p className="label mt-1.5 text-muted-foreground">{profile.role}</p>
            <p className="mt-5 max-w-sm text-xs leading-relaxed text-muted-foreground">
              Portfolio built with Next.js 16, TypeScript, Tailwind CSS, Motion
              and Lenis. Dark-first editorial design; content structured for
              recruiters and engineers alike.
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <p className="label mb-4 text-muted-foreground">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5" role="list">
              {[
                { id: "projects", label: "Work" },
                { id: "experience", label: "Experience" },
                { id: "capabilities", label: "Engineering" },
                { id: "about", label: "About" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="link-sweep text-sm text-foreground/75"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to top */}
          <div className="flex items-start justify-start md:justify-end">
            <motion.button
              onClick={() => scrollToSection("hero")}
              className="group grid size-14 place-items-center rounded-full border border-[var(--hairline)]"
              aria-label="Back to top"
              whileHover={reduce ? undefined : { scale: 1.06 }}
              whileTap={reduce ? undefined : { scale: 0.94 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <ArrowUp className="size-5 text-muted-foreground transition-all duration-500 group-hover:-translate-y-1 group-hover:text-[#3ddc97]" />
            </motion.button>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-[var(--hairline)] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.fullName}. Designed and built
            as a portfolio piece — placeholders marked until verified.
          </p>
          <p className="mono-tag text-[0.6rem] text-muted-foreground">
            Moi University · BSc Computer Science · Class of {profile.graduationYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
