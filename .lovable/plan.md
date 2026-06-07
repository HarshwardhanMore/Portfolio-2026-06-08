
## Goal

Replace the current "Terminal precision" portfolio with a faithful TanStack-Start port of the uploaded `portfolio.html` — same palette, fonts, layout, animations, and content structure. Same single-page route, same data files (re-wired), nothing about backend/data layer changes.

## Visual system (overwrite `src/styles.css` portfolio block)

- Palette tokens: `--color-bg #0a0a0a`, `--color-surface #111`, `--color-surface2 #161616`, `--color-border #1c1c1c`, `--color-border-lt #2a2a2a`, `--color-text #dedad2`, `--color-text-sec #7a786f`, `--color-text-mut #3e3e3a`, `--color-accent #00e676` (green, replacing the blue).
- Fonts: swap Inter → **Figtree** (body), keep **JetBrains Mono**, add **Syne** (display). Load via `<link>` in `__root.tsx`, register `--font-display`, `--font-sans`, `--font-mono` in `@theme`.
- Global: SVG noise overlay on `body::after`, thin custom scrollbar, `::selection` accent, square (zero radius) UI everywhere.
- Keyframes: `up`, `tline`, `blink`, `scroll`, `pulse`, `float`.

## Components (rebuild 1:1 with the HTML)

- **CustomCursor** (`components/CustomCursor.tsx`) — two fixed dots (`#cur`, `#curR`), lerp follow via `requestAnimationFrame`, `.hov` class toggled on hover targets (`a, button, .stat, .pcard, .stag, .ttag`). Disabled below `md` (cursor:none only on desktop).
- **Navbar** — fixed; `hm.dev` logo (mono accent); links Work/Projects/Skills/Contact; "Say Hello →" CTA; `.scrolled` class added past 50px scroll; active link highlight via IntersectionObserver.
- **Hero** — two-column grid (`1fr 440px`):
  - Left: eyebrow "Available for new opportunities", name with green "More." span, role line, description with `<em>` accents, two CTAs (View Work, GitHub, LinkedIn).
  - Right: **Terminal card** with traffic-light dots, `engineer.profile.ts` title, syntax-colored TS object (role, experience, microservices, latency, coverage, stack array, status), blinking caret. Staggered `tl` line fade-ins.
  - Background: radial-dot grid mask on the right side.
- **Marquee** — top+bottom bordered strip, single track duplicated, accent items highlighted, 28s linear scroll.
- **Stats** — 4-column grid with 1px gap revealing border color; on-view IntersectionObserver triggers count-up animation (`data-n`, `data-sfx`) with eased tick.
- **Experience** — vertical timeline rows (`220px 1fr`): left = company/date/optional "Current" badge; right = role + arrow bullet list (`→` accent) + tech tag chips. Adds **Education** row (VIT, B.Tech CSE, 8.8 CGPA).
- **Projects** — 2-col grid, `01 / Personal Project` numbering, project name (Syne 800), em-dash subtitle, description, `▸` highlights list, footer with tag chips + `GitHub →` link, top accent gradient bar revealed on hover.
- **Skills** — 3-col grid of 6 groups (Core Backend, Messaging & Queues, Cloud & Infra, Databases & ORM, Observability & Testing, Languages & Misc), `.stag` chips with `.core` variant for primary skills.
- **Contact** — centered: large Syne headline with accent `<em>Something Great</em>`, body copy, green email button, mono link row (LinkedIn / GitHub / phone).
- **Footer** — mono line with pulsing green dot "Open to new opportunities".

## Data updates (`src/data/*.ts`)

- Rewrite `experience.ts` to include the **Education** row and add the optional `badge: "Current"` field.
- Rewrite `projects.ts`: drop cover images (the new design has none), add `number`, `subtitle`, `highlights[]`.
- Rewrite `skills.ts` to the 6-group `.stag`/`.core` model (drop the old "skillGroups + skillsExtended" split, drop dot/level fields).
- `stats.ts`: add `n` (number) and `sfx` (suffix) for animated counters; keep labels: Years experience, Microservices, Latency reduction, Test coverage.
- `marquee.ts`: add `accent: boolean` per item.
- `profile.ts`: keep email/github/linkedin/phone; update status to "Available for new opportunities".

## Files

- New: `src/components/CustomCursor.tsx`, `src/components/sections/Terminal.tsx` (extracted).
- Rewrite: every existing section component + `Navbar` + `Footer` + `styles.css` portfolio block + all `src/data/*.ts`.
- Delete: `src/assets/heimdall-cover.jpg`, `src/assets/collaboro-cover.jpg` (unused after redesign).
- `src/routes/index.tsx`: same component composition order — Navbar → Hero → Marquee → Stats → Experience → Projects → Skills → Contact → Footer → CustomCursor. Keep existing SEO meta (just tweak title/description if you want).
- `src/routes/__root.tsx`: replace Google Fonts link with Syne + Figtree + JetBrains Mono.

## Out of scope

No backend, no data fetching, no new routes, no shadcn token changes. Pure presentation port.
