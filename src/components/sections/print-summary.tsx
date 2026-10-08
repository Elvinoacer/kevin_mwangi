"use client";

import { profile } from "@/data/profile";
import { skillGroups, capabilities } from "@/data/skills";
import { projects } from "@/data/projects";
import { experience, education } from "@/data/experience";

/**
 * Print-only recruiter summary (spec §45).
 * Hidden on screen; `window.print()` from the nav/hero/contact renders this
 * as a clean, one-page candidate brief.
 */
export function PrintSummary() {
  const strongest = [
    "Final-year software platform (Campus Services Discovery)",
    "Backend/API project (E-Commerce API, 18 endpoints)",
    "Database design (9-entity normalized schema, migrations)",
    `Internship (${experience.startDate}–${experience.endDate}, Nairobi)`,
    "Deployed applications (Vercel, CI-checked)",
  ];

  return (
    <div className="print-only" aria-hidden="true">
      <div style={{ borderBottom: "2px solid #111", paddingBottom: "10pt" }}>
        <h1 style={{ fontSize: "20pt", fontWeight: 700, margin: 0 }}>
          {profile.fullName}
        </h1>
        <p style={{ fontSize: "11pt", margin: "2pt 0 0" }}>{profile.role}</p>
        <p style={{ fontSize: "9.5pt", color: "#444", margin: "2pt 0 0" }}>
          {education.degree} · {education.institution} · {profile.location} ·
          kevin.mwangi@example.com · github.com/ · linkedin.com/
        </p>
      </div>

      <section style={{ marginTop: "10pt" }}>
        <h2 style={{ fontSize: "11pt", fontWeight: 700, letterSpacing: "0.5pt", textTransform: "uppercase" }}>
          Core Focus
        </h2>
        <p style={{ margin: "2pt 0 0", fontSize: "10.5pt" }}>
          Full Stack · Backend · Cloud
        </p>
      </section>

      <section style={{ marginTop: "8pt" }}>
        <h2 style={{ fontSize: "11pt", fontWeight: 700, letterSpacing: "0.5pt", textTransform: "uppercase" }}>
          Strongest Evidence
        </h2>
        <ul style={{ margin: "3pt 0 0 14pt", fontSize: "10pt", lineHeight: 1.45 }}>
          {strongest.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "8pt" }}>
        <h2 style={{ fontSize: "11pt", fontWeight: 700, letterSpacing: "0.5pt", textTransform: "uppercase" }}>
          Core Stack
        </h2>
        <p style={{ margin: "2pt 0 0", fontSize: "10.5pt" }}>
          TypeScript · React · Next.js · Node.js · PostgreSQL · Prisma
        </p>
      </section>

      <section style={{ marginTop: "8pt" }}>
        <h2 style={{ fontSize: "11pt", fontWeight: 700, letterSpacing: "0.5pt", textTransform: "uppercase" }}>
          Key Projects
        </h2>
        <ul style={{ margin: "3pt 0 0 14pt", fontSize: "10pt", lineHeight: 1.45 }}>
          {projects.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <strong>{p.title}</strong> ({p.year}, {p.type}) — {p.tagline}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "8pt" }}>
        <h2 style={{ fontSize: "11pt", fontWeight: 700, letterSpacing: "0.5pt", textTransform: "uppercase" }}>
          Skills (strong)
        </h2>
        <p style={{ margin: "2pt 0 0", fontSize: "10pt" }}>
          {skillGroups
            .flatMap((g) => g.skills.filter((s) => s.proficiency === "strong").map((s) => s.name))
            .join(" · ")}
        </p>
      </section>

      <section style={{ marginTop: "8pt" }}>
        <h2 style={{ fontSize: "11pt", fontWeight: 700, letterSpacing: "0.5pt", textTransform: "uppercase" }}>
          Availability
        </h2>
        <p style={{ margin: "2pt 0 0", fontSize: "10.5pt" }}>
          Open to graduate software-engineering opportunities — full-stack,
          backend, cloud and technical trainee roles.
        </p>
      </section>

      <section style={{ marginTop: "8pt" }}>
        <h2 style={{ fontSize: "11pt", fontWeight: 700, letterSpacing: "0.5pt", textTransform: "uppercase" }}>
          Capability Areas
        </h2>
        <p style={{ margin: "2pt 0 0", fontSize: "10pt" }}>
          {capabilities.map((c) => c.short).join(" · ")}
        </p>
      </section>

      <div
        style={{
          marginTop: "12pt",
          borderTop: "1px solid #999",
          paddingTop: "6pt",
          fontSize: "8.5pt",
          color: "#555",
        }}
      >
        Full case studies, architecture diagrams, data models and test
        strategies: kevinmwangi.dev (portfolio). Links are placeholders until
        verified.
      </div>
    </div>
  );
}
