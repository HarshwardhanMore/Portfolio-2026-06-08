import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { stats } from "@/data/stats";

export type OutputLine =
  | { type: "text"; content: string; cls?: string }
  | { type: "html"; content: string }
  | { type: "spacer" };

export type CommandContext = {
  clear: () => void;
  exit: () => void;
  print: (lines: OutputLine[]) => void;
};

export type Command = {
  name: string;
  description: string;
  hidden?: boolean;
  run: (args: string[], ctx: CommandContext) => OutputLine[] | void;
};

const stripHtml = (s: string) => s.replace(/<[^>]+>/g, "");

const T = (content: string, cls?: string): OutputLine => ({ type: "text", content, cls });
const H = (content: string): OutputLine => ({ type: "html", content });
const SP = (): OutputLine => ({ type: "spacer" });

const helpCmd: Command = {
  name: "help",
  description: "List available commands",
  run: () => {
    const rows = Object.values(registry)
      .filter((c) => !c.hidden)
      .map((c) => `  <span class="cli-key">${c.name.padEnd(12)}</span><span class="cli-dim">${c.description}</span>`);
    return [
      T("Available commands:", "cli-dim"),
      SP(),
      ...rows.map(H),
      SP(),
      H(`<span class="cli-dim">Navigate history with ↑/↓ · autocomplete with Tab · Ctrl+L clears · Esc exits</span>`),
    ];
  },
};

const aboutCmd: Command = {
  name: "about",
  description: "Read about.txt",
  run: () => [
    H(`<span class="cli-dim">$ cat about.txt</span>`),
    SP(),
    T(`${profile.name} — ${profile.role}`),
    T(`${profile.location}  ·  ${profile.status}`, "cli-dim"),
    SP(),
    T(
      "Backend engineer with 2+ years shipping event-driven microservices and",
    ),
    T(
      "distributed systems in production. I obsess over observability, reliability,",
    ),
    T(
      "and the kind of architecture that scales without keeping you up at night.",
    ),
    SP(),
    T("Currently:  designing services that fail well, recover fast, and stay observable."),
    T("Interests:  distributed systems, queue topologies, schema design, perf work."),
    T("Mindset:    measure first, build deliberately, document the trade-offs."),
  ],
};

const whoamiCmd: Command = {
  name: "whoami",
  description: "Print identity",
  run: () => [T(`visitor (guest of ${profile.name.toLowerCase().replace(/\s+/g, "")})`)],
};

const experienceCmd: Command = {
  name: "experience",
  description: "View work history (~/logs/experience.log)",
  run: () => {
    const out: OutputLine[] = [
      H(`<span class="cli-dim">$ tail -n +1 ~/logs/experience.log</span>`),
      SP(),
    ];
    experience.forEach((e) => {
      const co = e.company.replace(/\n/g, " ");
      out.push(H(`<span class="cli-key">[${e.date}]</span> <span class="cli-acc">${e.role}</span>`));
      out.push(H(`<span class="cli-dim">  @ ${co}${e.badge ? `  ·  ${e.badge}` : ""}</span>`));
      if (e.points) {
        e.points.forEach((p) =>
          out.push(T(`  • ${stripHtml(p.html)}`, "cli-soft")),
        );
      }
      if (e.education) {
        if (e.education.note) out.push(T(`  • ${e.education.note}`, "cli-soft"));
        if (e.education.gpa)
          out.push(T(`  • GPA ${e.education.gpa}${e.education.gpaScale ?? ""}`, "cli-soft"));
        if (e.education.location) out.push(T(`  • ${e.education.location}`, "cli-soft"));
      }
      if (e.stack && e.stack.length) {
        out.push(H(`  <span class="cli-dim">stack:</span> <span class="cli-soft">${e.stack.join(", ")}</span>`));
      }
      out.push(SP());
    });
    return out;
  },
};

const projectsCmd: Command = {
  name: "projects",
  description: "List projects (ls ~/projects)",
  run: (args) => {
    if (args.length === 0) {
      const out: OutputLine[] = [
        H(`<span class="cli-dim">$ ls ~/projects</span>`),
        SP(),
      ];
      projects.forEach((p) => {
        out.push(
          H(
            `<span class="cli-key">${p.name.toLowerCase()}/</span>  <span class="cli-dim">— ${p.subtitle.replace(/^—\s*/, "")}</span>`,
          ),
        );
      });
      out.push(SP());
      out.push(H(`<span class="cli-dim">Open one with:</span> <span class="cli-key">projects ${projects[0].name.toLowerCase()}</span>`));
      return out;
    }
    const target = args[0].toLowerCase().replace(/\/$/, "");
    const p = projects.find((pr) => pr.name.toLowerCase() === target);
    if (!p) return [T(`projects: no such project: ${args[0]}`, "cli-err")];
    return [
      H(`<span class="cli-dim">$ cat ~/projects/${p.name.toLowerCase()}/README.md</span>`),
      SP(),
      H(`<span class="cli-acc"># ${p.name}</span> <span class="cli-dim">${p.subtitle}</span>`),
      SP(),
      T(p.description),
      SP(),
      T("Highlights", "cli-key"),
      ...p.highlights.map((h) => T(`  - ${stripHtml(h.html)}`, "cli-soft")),
      SP(),
      H(`<span class="cli-key">Stack:</span> <span class="cli-soft">${p.stack.join(", ")}</span>`),
      H(`<span class="cli-key">Repo: </span> <a href="${p.href}" target="_blank" rel="noreferrer" class="cli-link">${p.href}</a>`),
    ];
  },
};

const skillsCmd: Command = {
  name: "skills",
  description: "List technical skills",
  run: () => {
    const out: OutputLine[] = [
      H(`<span class="cli-dim">$ cat ~/skills.txt</span>`),
      SP(),
    ];
    skillGroups.forEach((g) => {
      out.push(H(`<span class="cli-acc">[${g.name}]</span>`));
      const line = g.tags
        .map((t) => (t.core ? `<span class="cli-key">${t.name}</span>` : `<span class="cli-soft">${t.name}</span>`))
        .join(`<span class="cli-dim">, </span>`);
      out.push(H(`  ${line}`));
      out.push(SP());
    });
    out.push(H(`<span class="cli-dim">core skills shown in green</span>`));
    return out;
  },
};

const stackCmd: Command = {
  name: "stack",
  description: "Daily-driver tools",
  run: () => [
    H(`<span class="cli-dim">$ cat ~/.stackrc</span>`),
    SP(),
    H(`<span class="cli-key">runtime  </span> <span class="cli-soft">Node.js · TypeScript</span>`),
    H(`<span class="cli-key">messaging</span> <span class="cli-soft">RabbitMQ · BullMQ · Redis</span>`),
    H(`<span class="cli-key">storage  </span> <span class="cli-soft">PostgreSQL · MySQL · Prisma</span>`),
    H(`<span class="cli-key">cloud    </span> <span class="cli-soft">AWS (EC2/ECS/S3/Lambda) · Docker · GitHub Actions</span>`),
    H(`<span class="cli-key">observ.  </span> <span class="cli-soft">Prometheus · Grafana · Loki</span>`),
    H(`<span class="cli-key">testing  </span> <span class="cli-soft">Jest · Supertest · TDD</span>`),
  ],
};

const statsCmd: Command = {
  name: "stats",
  description: "Quick numbers",
  hidden: true,
  run: () => [
    H(`<span class="cli-dim">$ uptime --portfolio</span>`),
    SP(),
    ...stats.map((s) =>
      H(`  <span class="cli-acc">${s.n}${s.sfx}</span>  <span class="cli-soft">${s.label.replace(/\n/g, " ")}</span>`),
    ),
  ],
};

const resumeCmd: Command = {
  name: "resume",
  description: "Open resume PDF",
  run: () => {
    if (typeof window !== "undefined") {
      window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
    }
    return [
      H(`<span class="cli-dim">$ open ${profile.resumeUrl}</span>`),
      T("→ resume opened in a new tab.", "cli-acc"),
    ];
  },
};

const contactCmd: Command = {
  name: "contact",
  description: "Show contact details",
  run: () => [
    H(`<span class="cli-dim">$ cat ~/contact.vcf</span>`),
    SP(),
    H(`<span class="cli-key">name:    </span> <span class="cli-soft">${profile.name}</span>`),
    H(`<span class="cli-key">role:    </span> <span class="cli-soft">${profile.role}</span>`),
    H(`<span class="cli-key">email:   </span> <a class="cli-link" href="mailto:${profile.email}">${profile.email}</a>`),
    H(`<span class="cli-key">phone:   </span> <a class="cli-link" href="tel:${profile.phone}">${profile.phone}</a>`),
    H(`<span class="cli-key">github:  </span> <a class="cli-link" target="_blank" rel="noreferrer" href="${profile.github}">${profile.github}</a>`),
    H(`<span class="cli-key">linkedin:</span> <a class="cli-link" target="_blank" rel="noreferrer" href="${profile.linkedin}">${profile.linkedin}</a>`),
  ],
};

const clearCmd: Command = {
  name: "clear",
  description: "Clear the screen",
  run: (_a, ctx) => {
    ctx.clear();
  },
};

const exitCmd: Command = {
  name: "exit",
  description: "Return to the main site",
  run: (_a, ctx) => {
    ctx.exit();
  },
};

const lsCmd: Command = {
  name: "ls",
  description: "List portfolio sections",
  hidden: true,
  run: () => [
    H(
      `<span class="cli-key">about.txt</span>  <span class="cli-key">contact.vcf</span>  <span class="cli-key">resume.pdf</span>  <span class="cli-key">skills.txt</span>  <span class="cli-key">projects/</span>  <span class="cli-key">logs/</span>`,
    ),
  ],
};

export const registry: Record<string, Command> = {
  help: helpCmd,
  about: aboutCmd,
  whoami: whoamiCmd,
  experience: experienceCmd,
  projects: projectsCmd,
  skills: skillsCmd,
  stack: stackCmd,
  stats: statsCmd,
  resume: resumeCmd,
  contact: contactCmd,
  clear: clearCmd,
  exit: exitCmd,
  ls: lsCmd,
};

export const commandNames = Object.values(registry)
  .filter((c) => !c.hidden)
  .map((c) => c.name);

export const allCommandNames = Object.keys(registry);

// Simple Levenshtein for "did you mean"
export function closest(input: string): string | null {
  let best: string | null = null;
  let bestD = Infinity;
  for (const n of allCommandNames) {
    const d = lev(input, n);
    if (d < bestD) {
      bestD = d;
      best = n;
    }
  }
  return bestD <= 3 ? best : null;
}

function lev(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp: number[] = Array(n + 1)
    .fill(0)
    .map((_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(
        dp[j] + 1,
        dp[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      prev = tmp;
    }
  }
  return dp[n];
}
