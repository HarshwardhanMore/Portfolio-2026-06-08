## Plan — Harshwardhan More portfolio (single-page, TanStack Start)

Adapt the "Terminal precision" prototype into this project. Single route (`/`) with sticky nav + anchor-scroll sections. All content lives in typed data modules, sections consume them.

### Stack adaptation

- Routes in `src/routes/` (not Next.js `app/`). Sections are components in `src/components/sections/`.
- Tailwind v4 tokens in `src/styles.css` — copy `--color-bg`, `--color-panel`, `--color-accent`, `--color-success`, `--font-sans`, `--font-mono` from the chosen prototype into `@theme`. Keep the existing shadcn token block untouched so existing UI keeps working; add a `.dark` class to `<html>` (or default the page body to the dark `bg-bg`).
- Fonts (Inter + JetBrains Mono) loaded via `<link>` tags in `__root.tsx` head — never `@import` in CSS.
- Smooth scroll via `html { scroll-behavior: smooth }` in `styles.css`.
- Marquee via CSS `@keyframes` in `styles.css` (no animation library).

### Files

```
src/
  routes/
    index.tsx                    -> renders Navbar + all sections + Footer; route head() updated
    __root.tsx                   -> add font <link> tags (head.links)
  styles.css                     -> add tokens, marquee keyframe, smooth scroll
  data/
    profile.ts                   -> name, role, tagline, status, email, github, linkedin, phone
    stats.ts                     -> 4 metrics (30% latency, 8 microservices, 7+ systems, 85% coverage)
    experience.ts                -> 3 roles from resume (Unique School App ×2, ProducTry)
    projects.ts                  -> Heimdall, Collaboro (real descriptions + stacks + GitHub link)
    skills.ts                    -> grouped (Languages, Backend, Distributed Systems, Observability, Cloud, Databases, Frontend)
    marquee.ts                   -> keyword strip
  components/
    layout/
      Navbar.tsx                 -> sticky top, mono brand "HM_SYSTEMS", anchor links
      Footer.tsx                 -> tiny credit line (separate from Contact section)
    sections/
      Hero.tsx                   -> status pill, big name, tagline, 2 CTAs
      Marquee.tsx                -> infinite CSS marquee
      Stats.tsx                  -> 4 panel cards
      Experience.tsx             -> vertical timeline w/ left rail + dots
      Projects.tsx               -> 2-up cards on `bg-panel/50` rounded section
      Skills.tsx                 -> 3-column grouped lists with dot indicators
      Contact.tsx                -> left: heading + email/github/phone; right: "System Status" panel + Download CV button
    ui/
      Tag.tsx                    -> small mono pill for stack chips
```

### Content (from uploaded resume)

- **Hero**: "Harshwardhan More", "Backend Software Engineer specializing in Node.js, distributed architecture, and high-precision observability." Status pill: "Available for distributed systems engineering".
- **Stats**: ~30% latency reduction · 8 microservices · 7+ backend systems · 85%+ test coverage.
- **Experience**: Software Engineer @ Unique School App India LLP (Jul 2024 – Present), Software Engineer Intern – Backend @ Unique School App (Apr 2024 – Jul 2024), Full Stack Developer Intern @ ProducTry (Jul 2023 – Mar 2024). Bullets + stack pills from resume.
- **Projects**: Heimdall (BullMQ/Redis/Postgres/Prometheus) and Collaboro (Next.js/Postgres/Prisma) with real one-liners. Both link to `https://github.com/HarshwardhanMore`. Project image placeholders in the prototype replaced with generated cover images (Heimdall: dark dashboard w/ glowing blue lines; Collaboro: minimal CRDT/kanban network wireframe).
- **Skills**: 7 groups exactly as listed in the resume.
- **Contact**: `harshawardhanmore14@gmail.com`, `github.com/HarshwardhanMore`, `linkedin.com/in/harshwardhanmore`, `+91-9822608159`. Download CV button → resume PDF (copy upload into `public/` and link).
- **SEO** in `src/routes/index.tsx` head(): title "Harshwardhan More — Backend Software Engineer", matching description + og tags. Single H1 = hero name.

### Composition guardrails (from chosen prototype)

- Keep 2 hero CTAs ("Get in touch" primary white, "View systems" secondary panel-bordered).
- Stats = 4 panel cards (success-green for the latency one, white for the rest).
- Experience = left rail timeline with one accent dot + one muted dot.
- Projects = 2-up grid on rounded `bg-panel/50` section, image card above each project.
- Skills = exactly 3 columns with colored dot per group heading.
- Contact = 2-column with side "System Status" panel and CV button.
- No extra sections (no testimonials, no logo cloud, no blog).

### Non-goals

- No backend, no auth, no DB — pure static front-end.
- No animation libraries — only CSS keyframes (marquee, pulse) and `scroll-behavior: smooth`.
- No changes to existing shadcn tokens or other infra files.