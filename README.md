# Kevin Mwangi — Graduate Software Engineer Portfolio

A state-of-the-art, dark-first editorial portfolio for a Moi University BSc
Computer Science graduate, built to position him for graduate software
engineering, full-stack, backend and cloud roles.

Built with **Next.js 16** · **React 19** · **TypeScript** · **Tailwind CSS 4**
· **Framer Motion** · **Lenis** smooth scroll · **shadcn/ui**.

---

## Quick Start

```bash
# 1. Install dependencies (npm, pnpm or bun)
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

> No environment variables are required — the site is fully static
> (data-driven, no database). A default `prisma/` schema is included but
> unused; delete it if you don't need it.

Deploy to Vercel in one click: push this folder to a GitHub repo and import
it at vercel.com.

---

## What's Inside

| Area | Details |
|------|---------|
| Hero | Masked-line name reveal, B&W portrait with corner ticks, live animated SVG system-architecture diagram, count-up stats, stack marquee |
| Snapshot | 9-cell candidate facts grid |
| Projects | Flagship final-year showcase + 6 project cards. Every card opens a **full-screen case study** (problem → users → requirements → constraints → architecture → data model → APIs → code → security → testing → deployment → results → failures → lessons → roadmap) |
| Experience | Internship spotlight with the honest lessons, plus a 2022→2026 growth timeline with scroll-drawn progress line |
| Capabilities | 5 engineering domains with hover glows |
| Skills | Proficiency-tagged (Strong / Working knowledge / Academic exposure) — no percentage bars |
| Education | Moi University coursework across 6 categories |
| About | Portrait parallax + the engineering philosophy |
| Learning | What's actively being learned, and why |
| Contact | Nairobi-night parallax backdrop, magnetic CTAs, copy-email chip |
| Print | "Download CV" / printer icon triggers a clean one-page recruiter summary via print CSS |
| Theming | Dark-first with light mode toggle; palette, grid, film grain and glassmorphism tokens in `globals.css` |

Motion system: Lenis buttery scrolling, scroll-progress bar, magnetic
buttons, 3D tilt cards, staggered reveals, parallax images, flow-animated
architecture edges — all disabled automatically under
`prefers-reduced-motion`.

## Project Structure

```text
src/
├── app/                  # App Router — layout (SEO + JSON-LD) & page
├── components/
│   ├── fx/               # Reveal, Magnetic, Tilt, Counter, Marquee, SectionHeading
│   ├── hero/             # Hero section
│   ├── layout/           # Nav (progress + active pill + theme) & Footer
│   ├── projects/         # Cards, case-study overlay, architecture diagram
│   └── sections/         # Snapshot, About, Experience, Capabilities,
│   │                     # Skills, Education, Learning, Contact, PrintSummary
├── data/                 # ALL content lives here — edit these files:
│   ├── profile.ts        # Name, headline, links, snapshot, marquee
│   ├── projects.ts       # 7 projects with full case-study content
│   ├── skills.ts         # Skill groups, capabilities, foundations, practices
│   ├── experience.ts     # Internship, education, timeline
│   └── types.ts          # Data model types
└── lib/                  # utils, shared motion variants
public/images/            # Optimized imagery
```

## Customizing for the Real Kevin

1. Replace `/public/images/portrait.jpg` with a real portrait.
2. Edit `src/data/profile.ts` — name, links (GitHub / LinkedIn / email),
   availability and snapshot values.
3. Edit `src/data/projects.ts` — swap placeholder metrics and add real
   repository / demo URLs once verified.
4. Update `src/data/experience.ts` with the verified internship company and
   dates.
5. Update the JSON-LD `Person` schema in `src/app/layout.tsx`.

The spec's honesty rules are baked in: placeholders are marked, no fake
metrics or certifications, and academic / personal / internship work is
clearly separated.

## Scripts

```bash
npm run dev     # Dev server on port 3000
npm run build   # Production build
npm run start   # Serve the production build
npm run lint    # ESLint
```

---

Content framework © Kevin Mwangi. Code structure ready for Vercel deployment.
