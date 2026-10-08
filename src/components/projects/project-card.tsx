"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/types";
import { EASE } from "@/lib/motion";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  "full-stack": "Full-Stack",
  backend: "Backend",
  frontend: "Frontend",
  data: "Data",
  security: "Security",
  systems: "Systems",
  ai: "Machine Learning",
};

/**
 * GalleryCard — a tall editorial card for the horizontal work
 * catalogue: gallery-grade image treatment, meta rows, and the
 * custom-cursor "View" label on hover.
 */
export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="group relative flex h-[74vh] w-[82vw] shrink-0 flex-col sm:w-[30rem] md:w-[34rem] lg:w-[36rem]"
      initial={reduce ? undefined : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <button
        onClick={() => onOpen(project)}
        data-cursor="View"
        className="relative flex h-full flex-col text-left focus-visible:outline-2 focus-visible:outline-[#3ddc97]"
        aria-label={`Open case study — ${project.title}`}
      >
        {/* Image */}
        <div className="relative flex-1 overflow-hidden rounded-sm border border-[var(--hairline)]">
          <Image
            src={projectImagePath(project.slug)}
            alt={`${project.title} — project artwork`}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 30rem, 36rem"
            className="object-cover img-mono transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
          />
          <div className="img-tint" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#060809]/85 via-transparent to-transparent"
            aria-hidden="true"
          />

          {/* Index numeral */}
          <span
            className="pointer-events-none absolute right-4 top-3 select-none font-mono text-5xl font-semibold tabular-nums text-ghost"
            aria-hidden="true"
          >
            {project.index}
          </span>

          {/* Meta chips */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="mono-tag rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[#eef1f0] backdrop-blur-sm">
              {CATEGORY_LABEL[project.category]}
            </span>
            <span className="mono-tag rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-muted-foreground backdrop-blur-sm">
              {project.year}
            </span>
          </div>

          {/* Bottom title block */}
          <div className="absolute inset-x-4 bottom-4">
            <h3 className="clamp-2 text-xl font-semibold leading-tight tracking-[-0.02em] text-[#eef1f0] transition-transform duration-500 group-hover:-translate-y-1 md:text-2xl">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Meta rows */}
        <div className="hairline-t mt-4 flex items-center justify-between gap-4 pt-3.5">
          <p className="clamp-2 flex-1 text-[0.82rem] leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--hairline)] transition-all duration-500 group-hover:rotate-45 group-hover:border-[#3ddc97] group-hover:bg-[#3ddc97] group-hover:text-[#04130c]">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        {/* Stack */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="mono-tag rounded-sm border border-[var(--hairline)] px-2 py-1 text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="mono-tag px-1 py-1 text-muted-foreground">
              +{project.stack.length - 5}
            </span>
          )}
        </div>
      </button>
    </motion.article>
  );
}

const IMAGE_MAP: Record<string, string> = {
  "campus-services-platform": "/images/workspace-code.jpg",
  "realtime-chat": "/images/server-tunnel.jpg",
  "ecommerce-api": "/images/server-corridor.jpg",
  "analytics-dashboard": "/images/code-closeup.jpg",
  "rbac-auth-system": "/images/dev-office.jpg",
  "url-shortener": "/images/nairobi-night.jpg",
  "ml-sentiment-classifier": "/images/students-library.jpg",
};

export function projectImagePath(slug: string): string {
  return IMAGE_MAP[slug] ?? "/images/workspace-code.jpg";
}
