"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Lock, Users, AlertTriangle, Lightbulb, TrendingUp, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { ArchitectureDiagram } from "./architecture-diagram";
import Lenis from "lenis";

interface CaseStudyProps {
  project: Project | null;
  onClose: () => void;
}

const methodStyles: Record<string, string> = {
  GET: "bg-blue/15 text-blue border-blue/30",
  POST: "bg-green/15 text-green border-green/30",
  PATCH: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  PUT: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  DELETE: "bg-red-500/15 text-red-400 border-red-500/30",
  WS: "bg-violet/15 text-violet border-violet/30",
};

const accentText = {
  green: "text-green",
  blue: "text-blue",
  violet: "text-violet",
};

function CaseBlock({
  n,
  title,
  icon: Icon,
  children,
  id,
}: {
  n: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="border-t border-border/70 pt-8 md:pt-10 first:border-t-0 first:pt-0"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="mono-tag text-primary/80">{n}</span>
        <h3 className="text-lg md:text-xl font-semibold tracking-tight">{title}</h3>
        {Icon && <Icon className="size-4 text-muted-foreground ml-auto" />}
      </div>
      {children}
    </motion.section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5" role="list">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[0.92rem] leading-relaxed text-foreground/85">
          <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-[2px] bg-primary/70" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudy({ project, onClose }: CaseStudyProps) {
  const reduce = useReducedMotion();

  // Lock body scroll while open (works with Lenis)
  useEffect(() => {
    if (!project) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  // Focus close button on open for keyboard users
  useEffect(() => {
    if (project) {
      document.getElementById("case-close")?.focus();
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${project.title}`}
        >
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-default"
            onClick={onClose}
            aria-label="Close case study"
            tabIndex={-1}
          />

          {/* Panel */}
          <motion.div
            initial={reduce ? { x: 0 } : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduce ? { x: 0, opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative h-full w-full max-w-3xl bg-background border-l overflow-y-auto no-scrollbar shadow-2xl"
          >
            <div className="noise relative">
              {/* ===== Header ===== */}
              <div className="relative bg-card border-b p-6 md:p-10 pt-16 md:pt-16">
                <div className="absolute -top-24 -right-24 size-72 rounded-full bg-green/8 blur-[90px]" aria-hidden="true" />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="mono-tag rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary">
                      {project.type === "final-year"
                        ? "FINAL-YEAR PROJECT"
                        : project.type === "academic"
                          ? "ACADEMIC PROJECT"
                          : "PERSONAL PROJECT"}
                      · {project.year}
                    </span>
                    <span className="mono-tag rounded-full border px-3 py-1 text-muted-foreground">
                      {project.status}
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
                    {project.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-[0.95rem] md:text-base leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>

                  {/* Meta grid */}
                  <dl className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl border bg-border/60 overflow-hidden">
                    {[
                      { k: "Role", v: project.role },
                      { k: "Timeline", v: project.duration },
                      { k: "Team", v: `${project.teamSize} developer${project.teamSize > 1 ? "s" : ""}` },
                      { k: "Category", v: project.category.replace("-", " ") },
                    ].map((m) => (
                      <div key={m.k} className="bg-elevated/60 p-4">
                        <dt className="mono-tag text-muted-foreground">{m.k}</dt>
                        <dd className="mt-1.5 text-[0.82rem] font-semibold capitalize leading-snug">{m.v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="rounded-md border bg-secondary px-2.5 py-1 font-mono text-xs text-foreground/75">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Close */}
                <button
                  id="case-close"
                  onClick={onClose}
                  className="fixed right-5 top-5 z-10 inline-flex size-11 items-center justify-center rounded-full glass-strong text-foreground transition-colors hover:text-primary"
                  aria-label="Close case study (Escape)"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* ===== Body ===== */}
              <div className="relative p-6 md:p-10 space-y-10 md:space-y-14">
                {/* Summary */}
                <CaseBlock n="00" title="Summary">
                  <p className="text-[0.95rem] md:text-base leading-relaxed text-foreground/90">
                    {project.summary}
                  </p>

                  {/* Metrics */}
                  {project.metrics.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="rounded-xl border bg-card p-4">
                          <p className={cn("font-mono text-xl font-semibold", accentText[project.accent])}>
                            {m.value}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CaseBlock>

                {/* 01 Problem */}
                <CaseBlock n="01" title="The Problem" id="case-problem">
                  <p className="text-[0.95rem] leading-relaxed text-foreground/85">
                    {project.problem}
                  </p>
                </CaseBlock>

                {/* 02 Users + 03 Requirements */}
                {project.users.length > 0 && (
                  <CaseBlock n="02" title="Who It Serves" icon={Users}>
                    <div className="grid gap-3">
                      {project.users.map((u) => (
                        <div key={u} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
                          <span className="size-2 rounded-full bg-blue/80" aria-hidden="true" />
                          <p className="text-sm font-medium text-foreground/90">{u}</p>
                        </div>
                      ))}
                    </div>
                  </CaseBlock>
                )}

                {project.requirements.length > 0 && (
                  <CaseBlock n="03" title="Requirements">
                    <Bullets items={project.requirements} />
                  </CaseBlock>
                )}

                {project.constraints.length > 0 && (
                  <CaseBlock n="04" title="Constraints" icon={AlertTriangle}>
                    <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-5">
                      <Bullets items={project.constraints} />
                    </div>
                  </CaseBlock>
                )}

                {/* Architecture */}
                <CaseBlock n="05" title="System Architecture" id="case-architecture">
                  <p className="mb-6 text-[0.95rem] leading-relaxed text-foreground/85">
                    {project.architectureNote}
                  </p>
                  <div className="rounded-2xl border bg-card p-5 md:p-7">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="mono-tag text-muted-foreground">architecture.overview</span>
                      <span className="flex gap-1.5" aria-hidden="true">
                        <i className="window-dot bg-[#ff5f57]" />
                        <i className="window-dot bg-[#febc2e]" />
                        <i className="window-dot bg-[#28c840]" />
                      </span>
                    </div>
                    <ArchitectureDiagram />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span key={s} className="mono-tag rounded-md border bg-secondary px-2.5 py-1 text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </CaseBlock>

                {/* Data model */}
                {project.dataModel.length > 0 && (
                  <CaseBlock n="06" title="Data Model" id="case-schema">
                    <p className="mb-6 text-[0.95rem] leading-relaxed text-foreground/85">
                      The relational core, shown as entities with key fields and
                      relationships. Correctness of this layer decides everything
                      above it.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {project.dataModel.map((entity) => (
                        <div key={entity.name} className="overflow-hidden rounded-xl border bg-card">
                          <div className="flex items-center justify-between border-b bg-elevated/70 px-4 py-2.5">
                            <span className="font-mono text-sm font-semibold text-violet">
                              {entity.name}
                            </span>
                            <span className="mono-tag text-muted-foreground">table</span>
                          </div>
                          <div className="p-4">
                            <table className="w-full text-left">
                              <tbody>
                                {entity.fields.map((f) => (
                                  <tr key={f.name} className="border-b border-border/50 last:border-0">
                                    <td className="py-1.5 pr-3 font-mono text-xs text-foreground/85">
                                      {f.name}
                                      {f.note && (
                                        <span className="ml-2 text-muted-foreground/70">{f.note}</span>
                                      )}
                                    </td>
                                    <td className="py-1.5 font-mono text-xs text-muted-foreground text-right">
                                      {f.type}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {entity.relations && entity.relations.length > 0 && (
                              <div className="mt-3 border-t border-dashed pt-3">
                                {entity.relations.map((r) => (
                                  <p key={r} className="mono-tag text-primary/80">
                                    ↳ {r}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CaseBlock>
                )}

                {/* APIs */}
                {project.apis.length > 0 && (
                  <CaseBlock n="07" title="API Surface" id="case-apis">
                    <p className="mb-6 text-[0.95rem] leading-relaxed text-foreground/85">
                      Representative endpoints. Every mutation validates its input,
                      resolves the session server-side and checks authorization
                      before touching data.
                    </p>
                    <div className="space-y-3">
                      {project.apis.map((api) => (
                        <div
                          key={`${api.method}-${api.path}`}
                          className="rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
                        >
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={cn(
                                "mono-tag rounded-md border px-2.5 py-1 font-bold",
                                methodStyles[api.method] ?? "bg-secondary text-foreground"
                              )}
                            >
                              {api.method}
                            </span>
                            <code className="font-mono text-[0.82rem] text-foreground/90 break-all">
                              {api.path}
                            </code>
                            <span className="ml-auto flex items-center gap-1.5 mono-tag text-muted-foreground">
                              <Lock className="size-3" />
                              {api.auth}
                              {api.role && ` · ${api.role}`}
                            </span>
                          </div>
                          <p className="mt-2.5 text-[0.85rem] leading-relaxed text-muted-foreground">
                            {api.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CaseBlock>
                )}

                {/* Code excerpt */}
                {project.excerpt && (
                  <CaseBlock n="08" title="Code Excerpt" id="case-code">
                    <p className="mb-5 text-[0.95rem] leading-relaxed text-foreground/85">
                      {project.excerpt.caption}
                    </p>
                    <div className="overflow-hidden rounded-xl border bg-[#0d1117]">
                      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
                        <span className="font-mono text-xs text-muted-foreground">
                          {project.excerpt.file}
                        </span>
                        <span className="mono-tag text-muted-foreground">{project.excerpt.language}</span>
                      </div>
                      <pre className="overflow-x-auto p-4 md:p-5 text-[0.8rem] leading-relaxed">
                        <code className="font-mono">
                          {project.excerpt.lines.map((line, i) => (
                            <span key={i} className="block whitespace-pre">
                              <span className="mr-4 inline-block w-6 select-none text-right text-muted-foreground/40">
                                {i + 1}
                              </span>
                              <span className="text-foreground/85">{line}</span>
                            </span>
                          ))}
                        </code>
                      </pre>
                    </div>
                  </CaseBlock>
                )}

                {/* Security */}
                {project.security.length > 0 && (
                  <CaseBlock n="09" title="Security" icon={ShieldCheck}>
                    <div className="rounded-xl border border-primary/25 bg-accent/40 p-5">
                      <Bullets items={project.security} />
                    </div>
                  </CaseBlock>
                )}

                {/* Testing */}
                {project.testing.length > 0 && (
                  <CaseBlock n="10" title="Testing">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {project.testing.map((t) => (
                        <div key={t} className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
                          <span className="pulse-dot size-2 rounded-full bg-green" aria-hidden="true" />
                          <p className="text-sm text-foreground/85">{t}</p>
                        </div>
                      ))}
                    </div>
                  </CaseBlock>
                )}

                {/* Deployment */}
                {project.deployment.length > 0 && (
                  <CaseBlock n="11" title="Deployment" id="case-deployment">
                    <Bullets items={project.deployment} />
                  </CaseBlock>
                )}

                {/* Results */}
                {project.results.length > 0 && (
                  <CaseBlock n="12" title="Results" icon={TrendingUp}>
                    <div className="rounded-xl border bg-card p-5">
                      <Bullets items={project.results} />
                    </div>
                  </CaseBlock>
                )}

                {/* Challenges */}
                {project.challenges.length > 0 && (
                  <CaseBlock n="13" title="What Failed &amp; What Fixed It">
                    <div className="space-y-3">
                      {project.challenges.map((c, i) => (
                        <div key={i} className="rounded-xl border border-blue/25 bg-blue/5 p-4">
                          <p className="text-[0.9rem] leading-relaxed text-foreground/85">{c}</p>
                        </div>
                      ))}
                    </div>
                  </CaseBlock>
                )}

                {/* Lessons */}
                {project.lessons.length > 0 && (
                  <CaseBlock n="14" title="Lessons" icon={Lightbulb}>
                    <div className="rounded-2xl border border-primary/25 bg-accent/50 p-6">
                      {project.lessons.map((l, i) => (
                        <p key={i} className="text-[0.95rem] md:text-base font-medium leading-relaxed first:mt-0 mt-4 text-foreground/90">
                          &ldquo;{l}&rdquo;
                        </p>
                      ))}
                    </div>
                  </CaseBlock>
                )}

                {/* Future */}
                {project.improvements.length > 0 && (
                  <CaseBlock n="15" title="Future Improvements">
                    <div className="flex flex-wrap gap-2">
                      {project.improvements.map((imp) => (
                        <span
                          key={imp}
                          className="rounded-full border border-dashed px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
                        >
                          {imp}
                        </span>
                      ))}
                    </div>
                  </CaseBlock>
                )}

                {/* Honest-note footer */}
                <div className="border-t pt-6 pb-2">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Positioning note — this portfolio separates academic,
                    personal and internship work. Deployment URLs, repository
                    links and metrics are published only once verified with
                    real evidence.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
