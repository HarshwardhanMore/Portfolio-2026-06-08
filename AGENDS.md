# AGENTS.md

You are a Principal Full-Stack Engineer and a Next.js 16 expert.
Your task is to generate a **complete, exhaustive, enterprise-grade `AGENTS.md` file** for the following project:

- **Project Name:** [PROJECT_NAME]
- **Domain:** [DOMAIN — e.g., EdTech SaaS / FinTech / E-commerce / Healthcare]
- **Next.js Version:** 16.2.x (latest stable as of June 2026)
- **Styling:** [STYLING_CHOICE — e.g., Tailwind CSS v4 + CSS Modules]
- **State Library:** [STATE_LIBRARY — e.g., Zustand]
- **ORM:** [ORM — e.g., Prisma / Drizzle]
- **Auth:** [AUTH_PROVIDER — e.g., Auth.js v5 / Clerk]
- **Database:** [DATABASE — e.g., PostgreSQL]
- **Package Manager:** pnpm
- **Deployment Target:** [DEPLOYMENT_TARGET — e.g., Vercel / AWS]

---

### WHAT IS AGENTS.MD

`AGENTS.md` is the **single authoritative guidance document** for every AI coding agent
(Claude, GitHub Copilot, Cursor, Windsurf, Codex, etc.) working in this codebase.
It is read by agents at the start of every task. Every rule in it must be:
- **Specific** — not "write clean code", but "exported functions must have explicit return types"
- **Actionable** — immediately testable by an agent or linter
- **Justified** — the reason behind non-obvious rules should be stated briefly
- **Exemplified** — non-obvious rules include a ✅ DO and ❌ DON'T code snippet

**Next.js 16.2 automatically scaffolds an `AGENTS.md` via `create-next-app`. This document
replaces and supersedes that scaffold with enterprise-grade depth.**

---

### CRITICAL GENERATION REQUIREMENTS

1. Output **only** the raw `AGENTS.md` content — no preamble, no explanation, no outer code fences.
2. The file starts with a one-line **Agent Directive** in a blockquote at the very top.
3. Use H1 (`#`) for major sections, H2 (`##`) for subsections, H3 (`###`) for individual rules.
4. Every section header must be numbered (e.g., `# 1. Tech Stack`).
5. Use `✅` for correct patterns, `❌` for forbidden patterns, `⚠️` for warnings.
6. Code blocks always include a language identifier (` ```typescript `, ` ```bash `, etc.).
7. The final section is always `# N. Forbidden Patterns` — a flat list of `❌ pattern → ✅ alternative`.
8. Aim for **1500–2500 lines** of dense, actionable content. No filler sentences.
9. The file must be the single source of truth an agent needs to confidently make changes.

---

### GENERATE ALL SECTIONS BELOW — be exhaustive, precise, and unambiguous in every rule:

---

## SECTION 1 — DOCUMENT METADATA

Include:
- `AGENTS.md` version, last updated date, and compatible versions table:
  - Next.js: 16.2.x
  - React: 19.2.x
  - TypeScript: 5.5+
  - Node.js: 20.9+ (hard minimum, Next.js 16.2 requires it)
  - Turbopack: stable (default, Webpack is retired for new projects)
  - pnpm: 9+
- One-line **Agent Directive**: every agent must read this file in full before making any change.
- A note that `proxy.ts` replaces `middleware.ts` in Next.js 16 and must NEVER be confused.

---

## SECTION 2 — TECH STACK

Generate a complete table of the full tech stack with exact version ranges, and the "why" for
key choices (e.g., why Turbopack, why pnpm, why Zustand over Redux). Include:

- Framework: Next.js 16.2.x (App Router only — Pages Router is permanently retired)
- Runtime: React 19.2 (View Transitions, `useEffectEvent`, `Activity`, `use()`, `useOptimistic`, `useActionState`, `useFormStatus`)
- Language: TypeScript 5.5+ (strict mode, no `any`, no `@ts-ignore` without ticket)
- Bundler: Turbopack (stable, default — replaces Webpack)
- React Compiler: stable in Next.js 16 (automatic memoization — `useMemo`/`useCallback`/`React.memo` for performance are retired)
- Styling: Tailwind CSS v4 + CSS Modules for complex components
- Icons: [ICON_LIBRARY — e.g., Lucide React]
- State: Zustand (global client state) + `useActionState` (form state) + URL state via `useSearchParams`
- Data fetching: React Server Components + Cache Components (`'use cache'` directive) + Server Actions
- ORM: Prisma / Drizzle (parameterized queries only — no raw string SQL)
- Auth: Auth.js v5
- Validation: Zod (single schema per resource, reused across Server Action + Client)
- Testing: Vitest + React Testing Library (unit/integration) + Playwright (E2E)
- Linting: ESLint 9 flat config + Prettier (Tailwind plugin for class ordering)
- Error tracking: Sentry
- Logging: Pino (structured JSON)
- CI: GitHub Actions

---

## SECTION 3 — REPOSITORY ARCHITECTURE

Include the **exact canonical folder structure** agents must follow. For every directory:
- What it contains
- What it does NOT contain (anti-colocation rules)
- Whether barrel files (`index.ts`) are allowed (only in `types/` and `constants/` — banned everywhere else due to RSC tree-shaking)

The canonical `src/` structure must be:

```
src/
├── app/                           # ROUTING LAYER ONLY — no business logic
│   ├── (auth)/                    # Route group: unauthenticated pages
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   └── _components/       # Page-private components (underscore = not a route)
│   │   └── register/
│   ├── (dashboard)/               # Route group: authenticated pages
│   │   ├── layout.tsx
│   │   └── [feature]/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── _components/
│   ├── api/                       # Route Handlers only — webhooks, file ops, external integrations
│   │   └── v1/
│   │       └── [resource]/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx                 # Root layout — no data fetching
│   ├── error.tsx                  # Global error boundary
│   ├── not-found.tsx
│   └── page.tsx
├── components/                    # Shared, reusable UI components
│   ├── ui/                        # Primitive/atomic components (Button, Input, Modal, etc.)
│   └── [domain]/                  # Domain-scoped shared components
├── lib/                           # Pure utility functions — no React, no Next.js APIs
│   ├── utils.ts
│   ├── validations/               # Zod schemas (one file per resource)
│   └── [domain]/
├── hooks/                         # Shared custom React hooks (use* prefix enforced)
├── stores/                        # Zustand stores (one store per domain)
├── services/                      # External service clients (DB, payment, email, etc.)
├── actions/                       # Server Actions (one file per domain, 'use server' at top)
├── types/                         # Shared TypeScript types (barrel index.ts allowed here)
├── constants/                     # App-wide constants (barrel index.ts allowed here)
├── config/
│   └── env.ts                     # Zod-validated env var schema — fails fast on startup
└── proxy.ts                       # Network proxy layer (replaces middleware.ts)
```

Rules to generate for this section:
- The `app/` directory contains **only** routing files and page-private components (`_components/`).
- Business logic, data services, and utilities never live inside `app/`.
- Feature-private components use the `_components/` naming — the underscore signals they are not routes.
- A file shared across 2+ features moves from `_components/` to `components/[domain]/`.
- Barrel `index.ts` files are **banned** in `components/`, `lib/`, `hooks/`, `stores/`, `services/`, and `actions/` to prevent RSC tree-shaking failures.

---

## SECTION 4 — NAMING CONVENTIONS

Generate an exhaustive naming table. Cover every file and code construct in the project:

| Construct | Convention | Example |
|---|---|---|
| React component files | kebab-case | `user-profile-card.tsx` |
| React component exports | PascalCase named export | `export function UserProfileCard` |
| Custom hooks | camelCase, `use` prefix | `useUserProfile` |
| Server Action files | kebab-case | `user-actions.ts` |
| Server Action functions | camelCase, `Action` suffix | `createUserAction` |
| Route files | always `route.ts` | `app/api/v1/users/route.ts` |
| Zod schemas | camelCase, `Schema` suffix | `const userSchema = z.object(...)` |
| TypeScript interfaces | PascalCase, no `I` prefix | `interface UserProfile { ... }` |
| TypeScript type aliases | PascalCase | `type UserId = string` |
| Zustand stores | camelCase, `Store` suffix | `useUserStore` |
| Constants (primitive) | SCREAMING_SNAKE_CASE | `MAX_UPLOAD_SIZE_MB` |
| Constants (object/array) | PascalCase | `SupportedLocales` |
| CSS Module classes | camelCase | `.containerWrapper` |
| Env variables (server) | SCREAMING_SNAKE_CASE | `DATABASE_URL` |
| Env variables (client) | `NEXT_PUBLIC_` prefix | `NEXT_PUBLIC_APP_URL` |
| Test files | co-located, `.test.tsx` suffix | `user-profile-card.test.tsx` |
| E2E test files | `[feature].spec.ts` | `auth.spec.ts` |

Additional rules:
- Default exports are **banned** for component files — always use named exports.
- No abbreviations in names except universally accepted ones (`id`, `url`, `api`, `db`, `ctx`).
- Boolean props/variables start with `is`, `has`, `can`, `should` (`isLoading`, `hasError`).
- Handler props start with `on` (`onSubmit`, `onClose`, `onChange`).
- Async functions end with verbs or are clear from context; never suffix with `Async`.

---

## SECTION 5 — TYPESCRIPT STANDARDS

Generate rules covering every common TypeScript pattern. Include code examples for all
non-trivial rules. Mandatory rules to cover:

**Strictness:**
- `"strict": true` always in `tsconfig.json` — never weaken it.
- No `any` — use `unknown` with type narrowing instead. Show both patterns.
- No `@ts-ignore` — use `@ts-expect-error` with a comment explaining why + Jira/GitHub ticket.
- No `as` type assertions except `as const` and edge cases with a JSDoc comment.
- Use `satisfies` for config objects to get inference AND structural validation simultaneously.

**Types vs Interfaces:**
- `interface` for objects that will be extended, implemented, or merged (declaration merging).
- `type` for unions, intersections, mapped types, conditional types, and function types.
- Never use both for the same concept — pick one and be consistent per resource.

**Inference and Extraction:**
- Prefer `z.infer<typeof userSchema>` over manually writing `User` type — single source of truth.
- Use `Parameters<typeof fn>[0]` and `ReturnType<typeof fn>` to extract types from functions.
- Use `ComponentProps<typeof MyComponent>` to extend component prop types.

**Enums:**
- `enum` is banned — it generates undesirable JavaScript and doesn't tree-shake well.
- Use `as const` objects with `typeof` helpers instead. Show the pattern.

**Imports:**
- Always use `@/` path alias for `src/` imports — no `../../` relative imports more than 1 level.
- Type-only imports use `import type { ... }` syntax.

**Generics:**
- Name type parameters descriptively: `TData`, `TError`, `TResponse` — never single letter `T` for complex generics.
- Constrain generics where possible: `<T extends Record<string, unknown>>`.

**ActionResult Pattern (mandatory for Server Actions):**
```typescript
type ActionResult<TData = void> =
  | { success: true; data: TData; error: null }
  | { success: false; data: null; error: string; code?: string }
```

---

## SECTION 6 — COMPONENT ARCHITECTURE: SERVER VS CLIENT

This section is the most architecturally critical. Generate detailed rules with code examples for:

**Default to Server (RSC):**
- Every component is a Server Component unless proven otherwise.
- Server Components are async by default — await data directly.
- RSC can access: DB, filesystem, env vars, backend services — no API call needed.
- RSC cannot use: `useState`, `useEffect`, browser APIs, event handlers, Context consumers.

**When to add `'use client'`:**
- Need `useState` or `useReducer`.
- Need `useEffect` or lifecycle equivalents.
- Need browser APIs (`window`, `document`, `localStorage`, `navigator`).
- Need event handlers that require interactivity beyond Server Actions.
- Using a third-party library that requires DOM.
- Using React 19 hooks: `useOptimistic`, `useActionState`, `useFormStatus`.
- **Never add it** because it's "simpler" — always justify with one of the above.

**Pushing client boundaries down:**
Show a bad pattern (marking a parent `'use client'`) vs. good pattern (extracting a small
interactive child as the only client component and keeping the parent as RSC).

**Cache Components (Next.js 16 — replaces PPR experimental):**
- Use `'use cache'` directive at the top of RSC or async function.
- Use `cacheTag('tag-name')` to associate cache entries with invalidation tags.
- Use `cacheLife('seconds' | profile)` to set TTL. Built-in profiles: `'seconds'`, `'minutes'`, `'hours'`, `'days'`, `'weeks'`, `'max'`.
- Use `revalidateTag('tag-name')` inside Server Actions after mutations to bust cache.
- Never put PII or sensitive session data inside a cached component.

Full example:
```typescript
// src/app/(dashboard)/products/_components/product-list.tsx
'use cache'
import { cacheTag, cacheLife } from 'next/cache'
import { db } from '@/services/db'
import { ProductCard } from './product-card'

interface ProductListProps {
  categoryId: string
}

export async function ProductList({ categoryId }: ProductListProps) {
  cacheTag(`products:category:${categoryId}`)
  cacheLife('hours')

  const products = await db.product.findMany({
    where: { categoryId, isPublished: true },
    orderBy: { createdAt: 'desc' },
  })

  if (products.length === 0) {
    return <ProductListEmpty />
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  )
}
```

**Component Checklist (agents must mentally run before creating any component):**
1. Can this be a Server Component? → Default yes unless requiring client APIs.
2. Does it fetch data? → Fetch directly in RSC, not via API call from client.
3. Does it mutate? → Use Server Action, not Route Handler.
4. Should it be cached? → Use `'use cache'` if it renders the same for different users.
5. Does it have loading states? → Add co-located `loading.tsx` or `<Suspense>`.

---

## SECTION 7 — APP ROUTER PATTERNS

**File Conventions (generate rules for each):**
- `page.tsx` — route's UI, always an async RSC, exports `generateMetadata`.
- `layout.tsx` — shared UI, persistent across child routes, never adds `'use client'` at layout level.
- `loading.tsx` — Suspense boundary UI, immediately shown on navigation, skeleton-based.
- `error.tsx` — Error boundary, must be `'use client'`, has `reset()` prop for retry.
- `not-found.tsx` — 404 UI triggered by `notFound()`.
- `route.ts` — Route Handler, exports HTTP method functions.
- `template.tsx` — Like layout but remounts on navigation (use sparingly for animations).
- `_components/` — private, not a route, co-located with its page.

**Route Groups:**
- `(groupName)` creates a layout scope without affecting the URL.
- Use for: separating auth from dashboard, multi-tenant layouts, A/B test variants.
- Never use route groups just for folder organization without a shared layout — it's misleading.

**Metadata:**
- Every `page.tsx` must export either static `metadata` or async `generateMetadata`.
- Include `title`, `description`, `openGraph`, and `twitter` in every page metadata.
- Use `metadataBase` in root layout for absolute URL resolution.

**Dynamic Routes:**
- Always implement `generateStaticParams()` on dynamic routes that have a finite, knowable set of values.
- Use `dynamicParams = false` to 404 for uncached params if the dataset is fixed.

**Parallel and Intercepting Routes:**
- `@modal` slot + `(.)` interception = modal-style navigation that preserves URL (use for image lightboxes, quick-view drawers, auth modals).
- Show the directory structure example for a modal intercepting route pattern.

---

## SECTION 8 — SERVER ACTIONS

**File Setup:**
- Every file in `src/actions/` starts with `'use server'` directive.
- One file per domain: `src/actions/user-actions.ts`, `src/actions/product-actions.ts`.
- Never define Server Actions inline in component files (except `action` prop for simple `<form>` use).

**Anatomy of a Server Action:**
Show a complete, production-ready example:
```typescript
// src/actions/product-actions.ts
'use server'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'
import { db } from '@/services/db'
import { getSession } from '@/lib/auth'
import { createProductSchema } from '@/lib/validations/product-schema'
import type { ActionResult } from '@/types'

export async function createProductAction(
  formData: FormData
): Promise<ActionResult<{ productId: string }>> {
  // 1. Auth check — always first
  const session = await getSession()
  if (!session?.user) {
    return { success: false, data: null, error: 'Unauthorized', code: 'UNAUTHORIZED' }
  }

  // 2. Input validation — always Zod
  const parsed = createProductSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return {
      success: false,
      data: null,
      error: parsed.error.errors[0]?.message ?? 'Invalid input',
      code: 'VALIDATION_ERROR',
    }
  }

  // 3. Business logic
  try {
    const product = await db.product.create({
      data: { ...parsed.data, ownerId: session.user.id },
    })

    // 4. Cache invalidation
    revalidateTag(`products:category:${parsed.data.categoryId}`)

    return { success: true, data: { productId: product.id }, error: null }
  } catch (error) {
    // 5. Error handling — never expose raw DB errors
    console.error('[createProductAction]', error)
    return { success: false, data: null, error: 'Failed to create product', code: 'DB_ERROR' }
  }
}
```

**Rules:**
- Validate ALL inputs — never trust FormData, JSON body, or URL params.
- Auth check is always the **first** operation.
- Return `ActionResult<T>`, never throw (throwing from Server Actions causes full-page error boundaries to trigger).
- Revalidate after every mutation — never leave stale cache.
- Log errors with context — never log passwords, tokens, or PII.
- Rate limiting: apply Upstash or similar to all public-facing Server Actions.

**Client-Side Usage:**
- Use `useActionState` (React 19) for form state + pending state.
- Use `useOptimistic` for UI that should feel instant before the server confirms.
- Show a complete form example with `useActionState`, `useFormStatus`, and optimistic update.

---

## SECTION 9 — PROXY.TS (NEXT.JS 16 — REPLACES MIDDLEWARE)

**Critical context:** Next.js 16 replaced `middleware.ts` with `proxy.ts`.
`middleware.ts` files must be removed and migrated — any agent encountering one must flag it.

**File location:** `src/proxy.ts` — one file, root of `src/`.

**Purpose:** Only network-boundary concerns:
- Authentication/session validation (check token validity only, not permissions).
- Redirect unauthenticated users to login.
- Geo-routing and locale detection.
- Rate limiting responses.
- A/B testing variant assignment via cookies.
- Request ID injection.

**Rules:**
- No business logic in `proxy.ts` — it is not a controller.
- No DB calls — only session token parsing (JWT claims or cookie-based check).
- No React imports.
- Only Edge-compatible APIs — no Node.js built-ins (`fs`, `crypto` from Node, etc.).
- Keep matchers explicit and narrow: `matcher: ['/dashboard/:path*', '/api/:path*']`.
- Never match static assets — explicitly exclude `/_next/`, `/favicon.ico`, `/public/`.

Show a complete `proxy.ts` example:
```typescript
// src/proxy.ts
import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth-edge'

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*', '/api/v1/:path*'],
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  // Attach request ID for tracing
  const requestId = crypto.randomUUID()
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-request-id', requestId)

  // Auth check
  const session = await getSessionFromRequest(request)
  if (!session && pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}
```

---

## SECTION 10 — STATE MANAGEMENT HIERARCHY

Generate a clear decision tree agents must follow:

**Level 1 — Server State (default, prefer always):**
React Server Components + Cache Components. Zero client-side state for data that comes from
the server. No SWR, no React Query, no Tanstack Query needed.

**Level 2 — URL State (for shareable, bookmarkable UI state):**
`useSearchParams()` + `usePathname()` + `useRouter()`. Use for filters, pagination, tabs,
search queries — anything the user should be able to share via URL.

**Level 3 — Local UI State (co-located, ephemeral):**
`useState` and `useReducer`. Use for: modal open/close, accordion state, hover state,
form draft values. Never lift to global unless 2+ unrelated components need it.

**Level 4 — Global Client State (last resort):**
Zustand. Use only when genuinely global: cart items, theme override, notification queue,
multi-step wizard state. One Zustand store per domain feature.

**Form State (special case):**
- `useActionState` (React 19) tied to a Server Action — for all forms.
- `useFormStatus` in submit buttons to access `pending`.
- `useOptimistic` for instant UI feedback before server confirms.
- Never use `useEffect` to sync form state.

**Rules:**
- Context API is only for: providing auth session to deep client trees, theme, and i18n locale — never for frequently-updated values (causes full-subtree re-renders).
- No Redux or Redux Toolkit.
- No MobX.
- Persistence: `localStorage`/`sessionStorage` only via Zustand persist middleware — never directly.

---

## SECTION 11 — STYLING STANDARDS

**Primary System: Tailwind CSS v4**
- No `tailwind.config.ts` file — Tailwind v4 uses `@theme` block directly in CSS.
- Define semantic design tokens in `src/app/globals.css` using `@theme`:
  - Color palette, typography scale, spacing scale, border radius, shadows.
  - Semantic names: `--color-primary`, `--color-surface`, `--color-text-muted` — not `--color-blue-500`.
- Dark mode: use `prefers-color-scheme` media query in `@theme` for light/dark variants.
- Class ordering: enforced by Prettier Tailwind CSS plugin — never manually sort.
- Never use arbitrary values (`[23px]`) except for pixel-perfect one-off cases — prefer design tokens.

**CSS Modules (for complex components):**
- Use when a component has: conditional class composition that Tailwind struggles with, complex
  CSS animations, or pseudo-elements that are messy inline.
- Class names: camelCase. File: `component-name.module.css`.
- Never use CSS Modules for simple components — Tailwind is preferred.

**Absolute Rules:**
- No `!important` except in `globals.css` resets.
- No inline `style` except for truly dynamic values (e.g., CSS custom property from JS: `style={{ '--progress': `${value}%` }}`).
- No styled-components, emotion, Stitches, or runtime-in-JS CSS.
- All animations must have a `prefers-reduced-motion: reduce` override.

**View Transitions (React 19.2 — Next.js 16):**
- Use the `<ViewTransition>` component for page-level navigation animations.
- Use the `name` prop to create shared element transitions between routes.
- Do NOT use framer-motion for basic page transitions — View Transitions API is built in.

---

## SECTION 12 — REACT 19.2 PATTERNS

Generate a rule for each new React 19.2 API and when/how to use it:

**`<ViewTransition>` component:**
- Wraps elements whose entrance/exit should animate during React state transitions or navigations.
- Set `name` prop for shared element transitions (e.g., card → detail page expansion).
- Always provide a `prefers-reduced-motion` CSS override.

**`useEffectEvent(fn)`:**
- Extracts non-reactive logic from inside Effects.
- Use to read current values inside an Effect without re-running the Effect when those values change.
- Example: event handler inside an Effect that reads `userId` but should not re-subscribe when `userId` changes.
- Rule: never pass `useEffectEvent` return value as a prop or store it in state.

**`<Activity mode="hidden" | "visible">`:**
- Use for background tabs, panels, or secondary routes that must maintain state without being visible.
- When `mode="hidden"`, the component renders with `display: none`, keeping state alive.
- Effects run cleanup when hidden and re-run setup when visible — do not suppress this.
- Use instead of mounting/unmounting expensive components to avoid re-initialization.

**`use(promise)` hook:**
- Use inside render to read a promise (triggers Suspense) or Context.
- Replaces patterns where `useEffect` was used to resolve a promise into state.
- Only use inside components — not in Server Actions or utilities.

**`useOptimistic(state, updateFn)`:**
- Use on ALL mutations where latency would cause UI to feel slow.
- Show a complete like-button example with optimistic count increment.
- The optimistic value reverts automatically if the Server Action returns an error.

**`useActionState(action, initialState)`:**
- Use for every form tied to a Server Action.
- Returns `[state, formAction, isPending]`.
- `state` is the last `ActionResult<T>` returned by the Server Action.
- Show inline validation error display pattern using `state.error`.

**`useFormStatus()`:**
- Use in submit buttons to access `pending` from the nearest ancestor `<form>`.
- Extract submit button as its own `'use client'` component so the parent can stay RSC.

---

## SECTION 13 — REACT COMPILER RULES

- React Compiler is **stable and enabled by default** in Next.js 16 — no configuration needed.
- **DO NOT** write `React.memo()`, `useMemo()`, or `useCallback()` for performance — the compiler handles automatic memoization.
- **DO NOT** remove `useMemo`/`useCallback` from existing code without profiling — verify first.
- **WHEN** manual memoization is still valid: computationally expensive pure functions where profiling shows the compiler is NOT deduplicating (use React DevTools compiler badge to verify).
- **`'use no memo'` directive:** add at top of a component or hook ONLY if the compiler is causing a verified bug — document why with a comment.
- Code style changes required by compiler: avoid mutating objects/arrays that are used as deps — treat all data as immutable.

---

## SECTION 14 — UI/UX STANDARDS

Generate exhaustive rules. Every interaction pattern must have a rule:

**Loading States:**
- Every async route boundary has a co-located `loading.tsx` with a **shape-matching skeleton**.
- Skeleton components must match the dimensions and layout of the real content.
- Never use spinner-only loading for content areas — skeletons only.
- Use spinner for: button pending states, modal submission, global navigation indicator.

**Error States:**
- Every route has a co-located `error.tsx` with a user-friendly message and retry button.
- The error message must never expose internal details (stack traces, DB errors) in production.
- `error.tsx` must have a `Try again` button calling `reset()`.

**Empty States:**
- Every list, table, or data collection must have an explicit empty state UI.
- Empty states include: an icon, a headline, a description, and a primary CTA if applicable.
- Never render an empty `<ul>` or `<div>` for empty data.

**Forms:**
- Inline validation errors under each field — never modal alerts.
- Errors appear after blur or first submit attempt — not on every keystroke.
- Disabled submit button during `isPending` state — always show loading indicator in button.
- Successful submission: clear form, show success toast, redirect if appropriate.
- Failed submission: preserve form values, show field-level and/or form-level errors.

**Toast Notifications:**
- Single global toast provider (e.g., Sonner) at root layout level.
- Toasts for: success confirmations, non-blocking errors, network reconnection notices.
- Never use `alert()`, `confirm()`, or `prompt()` — use modal dialogs instead.
- Toast duration: success = 3s, info = 4s, error = 5s, persistent = until dismissed.

**Optimistic UI:**
- All mutations that affect visible list items (add, edit, delete, reorder) use `useOptimistic`.
- The optimistic state visually indicates it's in-flight (e.g., opacity 0.6, spinner icon).
- If the action fails, the optimistic state reverts with an error toast.

**Navigation:**
- Use `<Link>` from `next/link` for all internal navigation — never `<a>`.
- `<Link prefetch>` for primary navigation links, `prefetch={false}` for lists with many items.
- Active link state: always use `usePathname()` to highlight active navigation items.
- Back navigation: use `router.back()` only for explicit back buttons — not for programmatic flows.

**Confirmation Dialogs:**
- Destructive actions (delete, archive, revoke) always require a confirmation modal.
- The confirm button uses danger/destructive visual styling.
- The modal clearly states what will be deleted and whether it's reversible.

---

## SECTION 15 — ACCESSIBILITY (WCAG 2.2 AA)

Generate rules covering every WCAG success criterion relevant to this stack:

**Semantic HTML:**
- Use semantic elements first: `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<aside>`, `<button>`, `<a>`.
- `<div>` and `<span>` are for styling wrappers only — no semantic meaning should depend on them.
- One `<h1>` per page. Heading order must be sequential — no jumping H1 → H3.

**Images:**
- All `<Image>` from `next/image` must have `alt` prop.
- Decorative images: `alt=""` (empty string, not omitted).
- Informational images: descriptive `alt` that conveys the image's meaning to a non-sighted user.
- Icon buttons: `<button aria-label="Close menu">` — never icon-only without accessible label.

**Forms:**
- Every input has an associated `<label>` via `htmlFor` or wrapping label.
- Error messages linked via `aria-describedby` to their input.
- Required fields: `required` attribute + visual indicator.
- Invalid state: `aria-invalid="true"` + `aria-describedby` pointing to error message.

**Keyboard:**
- All interactive elements reachable via Tab key.
- Focus order follows logical reading order.
- Custom keyboard shortcuts: documented, and never conflict with browser/OS shortcuts.
- Modal dialogs: trap focus within modal when open, restore focus on close.
- `tabIndex` values: only `0` (natural order) or `-1` (programmatic focus) — never positive integers.

**Focus Visible:**
- Never `outline: none` without a custom focus-visible style.
- Focus ring must meet 3:1 contrast ratio with adjacent colors.
- Use `:focus-visible` (not `:focus`) to avoid showing ring on mouse click.

**ARIA:**
- Prefer native HTML semantics over ARIA roles.
- If ARIA is needed: use correctly — invalid ARIA is worse than no ARIA.
- Live regions: `aria-live="polite"` for status updates, `aria-live="assertive"` for critical errors.
- `role="alert"` for error messages that must be announced immediately.

**Color:**
- Normal text: 4.5:1 contrast ratio minimum.
- Large text (18px+ or 14px+ bold): 3:1 minimum.
- Interactive element boundaries: 3:1 against adjacent background.
- Never use color alone to convey information (colorblind users).

**Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
This reset must exist in `globals.css`.

---

## SECTION 16 — PERFORMANCE STANDARDS

**Target Metrics (fail CI if violated on Lighthouse test):**
- LCP (Largest Contentful Paint): < 2.5s on simulated 4G
- INP (Interaction to Next Paint): < 200ms
- CLS (Cumulative Layout Shift): < 0.1
- TTFB (Time to First Byte): < 600ms
- Total JS bundle (client initial load): < 150KB gzipped

**Images:**
- Always use `<Image>` from `next/image` — never `<img>`.
- Always provide explicit `width` and `height` to prevent CLS.
- Above-the-fold images: `priority={true}`.
- Below-the-fold: `loading="lazy"` (default).
- Use `sizes` prop for responsive images to avoid downloading oversized images.
- Format: prefer `webp`/`avif` — configured in `next.config.ts` `images.formats`.

**Fonts:**
- Always use `next/font` — never `<link rel="stylesheet">` for fonts.
- Use `display: 'swap'` to prevent invisible text during font load.
- Load only used weights and subsets.

**Scripts:**
- Always use `<Script>` from `next/script` with explicit `strategy` prop.
- `strategy="afterInteractive"` for analytics.
- `strategy="lazyOnload"` for non-critical third-party scripts.
- `strategy="worker"` for scripts that can run in a Web Worker.

**Code Splitting:**
- `next/dynamic` with `ssr: false` for components that require browser APIs and aren't needed SSR.
- `next/dynamic` with `loading` prop for heavy client components (rich text editors, chart libraries, etc.).
- Never dynamic-import components that are above the fold.

**Turbopack Filesystem Caching:**
For projects > 50 files, enable in `next.config.ts`:
```typescript
const config = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
} satisfies NextConfig
```

**Bundle Analysis:**
- Run `next-bundle-analyzer` (compatible with Turbopack in Next.js 16.1+) when bundle size exceeds threshold.
- No single npm package > 20KB gzipped without documented justification and approval.
- Prefer tree-shakeable libraries. Check bundlephobia.com before adding any dependency.

---

## SECTION 17 — TESTING STANDARDS

**Stack:**
- Unit + Integration: Vitest + `@testing-library/react` + `@testing-library/user-event`
- E2E: Playwright
- MSW (Mock Service Worker) for API mocking in integration tests

**Coverage Thresholds (enforced in CI `vitest.config.ts`):**
- `src/lib/`: 90% lines
- `src/actions/`: 85% lines
- `src/services/`: 85% lines
- `src/components/ui/`: 75% lines
- `src/app/` pages: 60% lines (integration-level, not unit)

**File Co-location:**
- Test files live next to source files: `user-profile-card.test.tsx` beside `user-profile-card.tsx`.
- E2E tests live in `e2e/`: `e2e/auth.spec.ts`, `e2e/checkout.spec.ts`.

**Test Writing Rules:**
- Test **behavior** not implementation — test what the component renders and how it responds to user interaction, not its internal state.
- AAA pattern: every `it()` block has clear Arrange / Act / Assert phases.
- Descriptive test names: `it('shows error message when email is already taken')` not `it('test error')`.
- No snapshot tests for component logic — snapshots are only for intentional visual regression.
- Mock at the boundary: mock DB calls, external services, environment variables — not internal utility functions.
- `data-testid` attributes for E2E selectors — never CSS class names or text content.

**Server Action Testing:**
```typescript
import { vi } from 'vitest'
vi.mock('next/cache', () => ({ revalidateTag: vi.fn() }))
vi.mock('next/navigation', () => ({ redirect: vi.fn() }))

// Test the action directly — no HTTP round-trip needed
const result = await createProductAction(formData)
expect(result.success).toBe(true)
```

**RSC Testing:**
- Use `@testing-library/react` with async `render()` for Server Components.
- Mock `next/navigation` hooks: `usePathname`, `useSearchParams`, `useRouter`.
- Show example of testing a Cache Component with mocked `cacheTag`/`cacheLife`.

---

## SECTION 18 — ERROR HANDLING STRATEGY

**Error Types and Handling Locations:**

| Error Type | Location | Handler |
|---|---|---|
| Route-level render errors | `app/.../error.tsx` | Error boundary, shows retry UI |
| 404 — resource not found | Server Action / RSC | `notFound()` from `next/navigation` |
| Auth — unauthenticated | `proxy.ts` | Redirect to login |
| Auth — unauthorized (wrong role) | Server Action / RSC | Return `ActionResult` error |
| Validation errors | Server Action | Return `ActionResult` with field errors |
| DB errors | Service layer | Catch, log, return generic error |
| External API errors | Service layer | Catch, log, retry with backoff |
| Client-side runtime errors | React `<ErrorBoundary>` | Show fallback UI with support link |

**Rules:**
- Never use empty catch: `catch (e) {}` — always log and handle.
- Never expose raw error messages, stack traces, or DB error codes to the client in production.
- Use structured error codes: `{ code: 'PRODUCT_NOT_FOUND', message: '...' }` — never plain strings alone.
- `error.tsx` must always show a generic "Something went wrong" message in production.
- All service functions that can fail return `Result<T, E>` — never throw from services.
- Sentry: capture all `error.tsx` `useEffect` error reports and all unhandled Server Action errors.
- Log format: `{ level, timestamp, requestId, userId, route, error: { message, code, stack } }`.

---

## SECTION 19 — SECURITY RULES

**Headers (in `next.config.ts` `headers()` function):**
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{NONCE}'; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**Authentication and Authorization:**
- Verify session at the start of every Server Action and Route Handler — no exceptions.
- Permissions check (role, ownership) happens in Server Action / RSC — not in `proxy.ts`.
- JWT tokens: validate signature AND expiry AND audience claim.
- Session cookies: `HttpOnly`, `Secure`, `SameSite=Strict`, short expiry + refresh token rotation.

**Input Security:**
- All user input validated with Zod before any processing.
- File uploads: validate MIME type server-side (not just extension), scan for malware, limit file size.
- Never pass user input directly into SQL strings — always use ORM parameterized queries.
- Never pass user input directly to `eval()`, `dangerouslySetInnerHTML`, or `new Function()`.

**Environment Variables:**
- Server secrets: never prefixed with `NEXT_PUBLIC_`.
- Validated at startup via `src/config/env.ts` with Zod — app fails fast if misconfigured.
- Rotation: all secrets in environment variable manager (AWS Secrets Manager / Vercel Environment Variables) — never in `.env` committed to git.

**Dependencies:**
- `pnpm audit` runs in CI — blocks merge if critical/high CVEs found.
- No npm scripts from untrusted packages that run at install time without review.
- Subresource Integrity (SRI): enabled by default in Next.js 16.2 — do not disable.
- Lock file committed — `pnpm install --frozen-lockfile` in CI.

---

## SECTION 20 — API DESIGN (ROUTE HANDLERS)

**When to use Route Handlers vs Server Actions:**
- ✅ Use Server Actions for: form submissions, CRUD operations triggered by UI interactions.
- ✅ Use Route Handlers for: webhooks from third parties, file upload/download endpoints, REST endpoints consumed by external clients (mobile apps, third parties), Server-Sent Events.
- ❌ Never use Route Handlers as a "traditional API" that your own Next.js UI calls via `fetch` — use Server Actions instead.

**Route Handler Anatomy:**
```typescript
// src/app/api/v1/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSession } from '@/lib/auth'
import { productService } from '@/services/product-service'
import { createProductSchema } from '@/lib/validations/product-schema'

export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. Auth
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } }, { status: 401 })
  }

  // 2. Parse + Validate
  const body: unknown = await request.json()
  const parsed = createProductSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: parsed.error.errors[0]?.message } },
      { status: 422 }
    )
  }

  // 3. Business logic via service
  const result = await productService.create(parsed.data, session.user.id)
  if (!result.success) {
    return NextResponse.json({ error: { code: result.code, message: result.error } }, { status: 500 })
  }

  return NextResponse.json({ data: result.data }, { status: 201 })
}
```

**Rules:**
- Always version: `/api/v1/`.
- Consistent response envelope: success = `{ data: T }`, error = `{ error: { code, message } }`.
- Correct HTTP status codes: 200 GET, 201 POST create, 204 DELETE no content, 400 bad request, 401 unauth, 403 forbidden, 404 not found, 422 validation, 500 server error.
- CORS: only add CORS headers if the endpoint is consumed cross-origin — document why.

---

## SECTION 21 — NEXT.CONFIG.TS STANDARDS

Generate a complete annotated `next.config.ts` template with:
- `satisfies NextConfig` operator usage.
- Security headers in `headers()`.
- Image domain allowlist.
- Turbopack filesystem caching enabled.
- `reactCompiler: true` documented (enabled by default, shown for clarity).
- TypeScript and ESLint build error settings.
- Bundle size budget configuration.
- Commented-out experimental features with rationale for each.

```typescript
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const config = {
  // TypeScript: fail build on type errors
  typescript: { ignoreBuildErrors: false },
  // ESLint: fail build on lint errors
  eslint: { ignoreDuringBuilds: false },
  // Images: only allow whitelisted domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.[PROJECT_DOMAIN]' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Security headers on all routes
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  experimental: {
    // Turbopack filesystem cache (speeds up restart for large projects)
    turbopackFileSystemCacheForDev: true,
    // React Compiler is stable in Next.js 16 — shown here for discoverability
    // reactCompiler: true, // Uncomment only if you need to configure options
  },
} satisfies NextConfig

export default config
```

---

## SECTION 22 — ENVIRONMENT VARIABLES & CONFIG

Show the complete `src/config/env.ts` pattern:
```typescript
import { z } from 'zod'

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(32),
  // Add all server-only env vars here
})

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  // Add all public env vars here
})

// Validate at startup — throws if misconfigured
export const serverEnv = serverEnvSchema.parse(process.env)
export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})
```

Rules:
- Import `serverEnv` only in Server Components, Server Actions, Route Handlers, services.
- Import `clientEnv` only in Client Components.
- `.env.example` is committed — contains all keys with placeholder values and explanatory comments.
- `.env.local` and `.env.production` are never committed — in `.gitignore`.
- Secrets are rotated via the deployment platform's secrets manager, not by editing files.

---

## SECTION 23 — GIT & PR CONVENTIONS

**Commit Messages (Conventional Commits — required):**
```
<type>(<scope>): <short description>

[optional body]

[optional footer: BREAKING CHANGE, Closes #123]
```
Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `perf`, `chore`, `ci`, `revert`.

**Branch Naming:**
```
feat/[TICKET]-short-description
fix/[TICKET]-short-description
chore/update-dependencies
```

**PR Rules:**
- Title follows Conventional Commits format.
- References issue/ticket: `Closes #123` or `Part of #456`.
- Screenshots/recordings required for ALL UI changes.
- Checklist: types checked, tests passing, accessibility validated, no console.logs.
- Size: < 400 lines changed preferred. > 800 lines requires breakdown justification.
- No direct commits to `main` or `develop` — PRs only.
- Squash merge to `main` to keep history clean.
- Semantic versioning tags on `main` after each merge.

---

## SECTION 24 — SOLID PRINCIPLES IN THIS CODEBASE

Generate a concrete Next.js 16 interpretation of each principle with real code examples:

**S — Single Responsibility:**
- A `page.tsx` only composes components — no data transformation logic.
- A Server Action only handles one specific mutation — no multi-step side effects in one function.
- A service function does one operation — `createProduct`, not `createProductAndSendEmail`.

**O — Open/Closed:**
- UI components accept `children` or render props for extension instead of growing conditionals.
- `className` prop on every component to allow style extension without modifying the component.
- New features add new files — don't modify shared components unless explicitly needed.

**L — Liskov Substitution:**
- Component prop types use extension (`AdminUser extends User`) properly — a component accepting `User` must work with `AdminUser`.
- Never narrow a prop type in a subcomponent in a way that breaks the contract.

**I — Interface Segregation:**
- Never pass a large object when only 2–3 fields are used — destructure and pass specific props.
- Split large prop interfaces into focused ones: `UserCardDisplayProps` + `UserCardActionProps`.

**D — Dependency Inversion:**
- Components depend on interfaces/types, not concrete service implementations.
- Services are injected or imported from `@/services/` — never instantiated inside components.
- Test doubles (mocks) replace real services at test time without changing component code.

---

## SECTION 25 — DRY PRINCIPLES & PATTERNS

**Extraction Thresholds:**
- UI pattern appears in 3+ places → extract to `components/ui/` or `components/[domain]/`.
- Logic/computation appears in 2+ places → extract to `lib/` or custom hook.
- Type appears in 2+ files → move to `types/` and import.
- Constant appears in 2+ files → move to `constants/` and import.
- Zod schema used in both action and client form → single schema in `lib/validations/`.

**Shared Component Checklist:**
Before extracting a component ask:
1. Does it have a clear, single purpose with a good name?
2. Are its props interface-segregated (no massive prop objects)?
3. Is it in the right folder (ui/ for atomic, domain/ for domain-specific)?
4. Does it have a test?

**Anti-DRY Traps to Avoid:**
- ❌ Premature abstraction — do not extract after only 2 occurrences unless they're clearly identical.
- ❌ Wrong-level abstraction — a shared component that's coupled to a specific feature is not shared.
- ❌ Prop-drilling shared components — if a "shared" component needs 8 props to be general, it's wrong.

---

## SECTION 26 — OBSERVABILITY & LOGGING

**Structured Logging (Pino):**
```typescript
// src/lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  formatters: { level: (label) => ({ level: label }) },
})
```

**Log Levels:**
- `debug`: development-only diagnostic info.
- `info`: significant business events (user created, payment processed).
- `warn`: recoverable errors, degraded functionality.
- `error`: unrecoverable errors, requires investigation.

**What to Include in Every Log:**
- `requestId` (from `x-request-id` header set in `proxy.ts`).
- `userId` (from session, if available).
- `route` or `action` name.
- `durationMs` for all external calls.
- `error.message` and `error.code` — never raw stack traces in production logs.

**What to NEVER Log:**
- Passwords, tokens, API keys, session secrets.
- PII: email, name, phone, address (unless required and compliant).
- Full request/response bodies unless specifically debugging and logs are secured.

**Next.js 16.2 Developer Tools:**
- Server Function Logging: enabled by default in dev — shows Server Action execution in terminal.
- Browser Log Forwarding: forwards browser console errors to the terminal — useful for agent debugging. Do not disable.
- Do not suppress either of these in development.

**Sentry Setup:**
- `Sentry.init()` in `instrumentation.ts` for server-side.
- `Sentry.captureException()` in `error.tsx` `useEffect` for client-side.
- Source maps uploaded to Sentry in CI — never ship unminified source maps to CDN.

---

## SECTION 27 — AGENT-SPECIFIC OPERATING PROCEDURES

This section is the meta-instruction for all AI coding agents. Generate exhaustive, specific rules:

**Before Starting Any Task:**
1. Read this entire `AGENTS.md` file if you haven't already in this session.
2. Inspect the relevant directory structure before writing any new files.
3. Check if a similar pattern already exists in the codebase — prefer extending over creating.
4. Identify if you need a Server Component or Client Component before touching any component.
5. Identify which cache tags will need revalidation if this task involves mutations.

**When Creating New Files:**
- Always place files in the correct directory per the Architecture section.
- Always add proper TypeScript types — no implicit `any`.
- Always add a test file for non-trivial logic.
- Always add JSDoc comment to exported functions that have non-obvious behavior.
- Prefer named exports — never default exports from component files.

**When Editing Existing Files:**
- Do not change unrelated code in the same commit/change.
- If you spot a code smell while editing, add a `// TODO:` comment rather than fixing it in scope.
- Preserve existing code style and patterns — do not refactor while implementing a feature.

**When in Doubt:**
- Check `AGENTS.md` first.
- If `AGENTS.md` doesn't cover it, follow the nearest existing pattern in the codebase.
- If no pattern exists, follow the Next.js 16 official documentation.
- Never invent patterns — flag ambiguity in a comment or PR description.

**Red Lines (immediately stop and flag):**
- If you see a `pages/` directory — flag it, do not add to it.
- If you see `middleware.ts` — flag it, do not add to it. It must be migrated to `proxy.ts`.
- If you're about to add a `console.log` to production code — use the structured logger.
- If you're about to use `any` — stop and find the correct type.
- If you're about to call a DB query from a Client Component — stop and move it to RSC.

---

## SECTION 28 — INTERNATIONALIZATION (i18n)

**Routing:** Next.js App Router locale routing via route groups: `app/[locale]/`.

**Translation:**
- All user-facing strings in translation files — no hardcoded English strings in components.
- Namespace translation files by feature: `auth.json`, `dashboard.json`, `common.json`.
- Keys: dot notation, snake_case: `auth.login.submit_button`.
- Use `next-intl` or equivalent — rules specific to chosen library.

**Locale-Aware Formatting:**
- Dates: `Intl.DateTimeFormat` with locale context — never `date.toLocaleDateString()`.
- Numbers: `Intl.NumberFormat` — never `number.toLocaleString()` without locale.
- Currency: always format with `Intl.NumberFormat` + `style: 'currency'` + explicit currency code.
- Pluralization: use ICU message format (`{count, plural, one {item} other {items}}`).

**RTL Support:**
- CSS: use logical properties exclusively: `margin-inline-start` not `margin-left`, `padding-block` not `padding-top/bottom`.
- Icons: mirror-aware icons must flip in RTL (directional arrows, progress indicators).
- Test: add Arabic or Hebrew locale test to Playwright E2E suite.

---

## SECTION 29 — DEPLOYMENT & CI/CD

**CI Pipeline (GitHub Actions — must pass before merge):**
1. `pnpm install --frozen-lockfile`
2. `pnpm typecheck` — TypeScript must be error-free
3. `pnpm lint` — ESLint must be warning/error-free
4. `pnpm test` — All Vitest tests pass, coverage thresholds met
5. `pnpm build` — Next.js build must succeed (no build-time errors)
6. `pnpm audit --prod` — No critical/high CVEs in production dependencies
7. Playwright E2E — critical user flows pass
8. Lighthouse CI — Core Web Vitals thresholds met

**Deployment Rules:**
- Never deploy a failing build.
- Feature flags for incomplete features landing on `main`.
- Database migrations run before the new deployment goes live (never after).
- Rollback procedure documented in `docs/runbooks/rollback.md`.
- Environment variable changes require a new deployment.

**Vercel-Specific (if applicable):**
- Preview deployments for every PR — linked in PR comment.
- Production branch: `main` only.
- Edge functions use `proxy.ts` — not Lambda functions.
- Image optimization: use Vercel's built-in (`remotePatterns` in `next.config.ts`).

---

## SECTION 30 — FORBIDDEN PATTERNS

Generate a comprehensive flat list. Format: `❌ Forbidden pattern` → `✅ Required alternative` + one-line reason.

Cover every item from all previous sections that has a forbidden counterpart. Minimum 35 items including:

- ❌ `pages/` directory → ✅ `app/` directory (Pages Router retired in Next.js 16)
- ❌ `middleware.ts` → ✅ `proxy.ts` (Next.js 16 network boundary API)
- ❌ `type X = any` → ✅ `type X = unknown` + type narrowing (type safety)
- ❌ `@ts-ignore` → ✅ `@ts-expect-error // Reason: [explanation] [TICKET]` (documented suppression)
- ❌ `as SomeType` (unsafe cast) → ✅ proper type narrowing or `satisfies`
- ❌ `enum Status {}` → ✅ `const Status = { ... } as const` + `type Status = typeof Status[keyof typeof Status]`
- ❌ `export default function MyComponent` → ✅ `export function MyComponent` (named exports always)
- ❌ Barrel `index.ts` in `components/`, `lib/`, `hooks/` → ✅ direct named imports (RSC tree-shaking)
- ❌ `'use client'` on a layout file → ✅ extract interactive parts as a client child wrapper
- ❌ `useEffect` for data fetching → ✅ async RSC + `'use cache'` directive
- ❌ `React.memo()` for performance → ✅ React Compiler handles memoization automatically
- ❌ `useMemo()` / `useCallback()` for performance → ✅ React Compiler (add only when profiler proves compiler isn't optimizing)
- ❌ `fetch('/api/...')` in Client Component for owned data → ✅ RSC data fetching passed as props
- ❌ DB query inside a Client Component → ✅ Server Component or Server Action
- ❌ `window.location.href = '/...'` → ✅ `router.push()` from `next/navigation`
- ❌ `router.push()` for non-navigation → ✅ `redirect()` in Server Component/Action
- ❌ `<a href="/internal">` → ✅ `<Link href="/internal">` from `next/link`
- ❌ `<img src="...">` → ✅ `<Image>` from `next/image` (performance + security)
- ❌ Hardcoded string in component: `"Submit"` → ✅ i18n translation key: `t('common.submit')`
- ❌ `console.log(...)` in production code → ✅ `logger.info(...)` from `@/lib/logger`
- ❌ Magic number: `if (status === 3)` → ✅ named constant: `if (status === OrderStatus.SHIPPED)`
- ❌ Secrets in `NEXT_PUBLIC_*` → ✅ server-only env vars accessed via `serverEnv`
- ❌ `../../lib/utils` (deep relative import) → ✅ `@/lib/utils` (path alias)
- ❌ Inline SQL string: `` db.query(`SELECT * WHERE id = ${id}`) `` → ✅ ORM parameterized query
- ❌ `dangerouslySetInnerHTML` with user content → ✅ sanitize with DOMPurify + render safely
- ❌ Empty catch: `catch (e) {}` → ✅ catch, log with context, handle or rethrow
- ❌ Route Handler for UI mutations → ✅ Server Action
- ❌ Modifying shared component to add one-off behavior → ✅ composition via `children` or `className`
- ❌ `outline: none` on focused element without alternative → ✅ custom `:focus-visible` ring
- ❌ `tabIndex={1}` (positive) → ✅ `tabIndex={0}` (natural order) or reorder DOM
- ❌ `<div onClick={...}>` for interactive element → ✅ `<button>` or `<a>` with correct semantics
- ❌ Color as sole information carrier → ✅ color + icon/text/pattern combination
- ❌ Framer Motion for basic page transitions → ✅ React 19.2 View Transitions API
- ❌ Storing derived state: `const [fullName, setFullName] = useState(...)` → ✅ compute: `const fullName = \`${first} ${last}\``
- ❌ `process.env.SOME_VAR` scattered across files → ✅ centralized `serverEnv.SOME_VAR` from `@/config/env`
- ❌ `new Date()` in a Cache Component → ✅ move date-dependent logic outside `'use cache'` boundary

---

### END OF FILE
