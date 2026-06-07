export type Project = {
  number: string;
  kind: string;
  name: string;
  subtitle: string;
  description: string;
  highlights: { html: string }[];
  stack: string[];
  href: string;
};

export const projects: Project[] = [
  {
    number: "01",
    kind: "Personal Project",
    name: "Heimdall",
    subtitle: "— Distributed Job Processing Engine",
    description:
      "Production-grade distributed job engine designed for clean separation between job definition, queue management, and worker execution. Built for testability, extensibility, and real-world reliability from the ground up.",
    highlights: [
      {
        html: "<em>Priority queues, exponential backoff retry, dead-letter queue handling,</em> and job deduplication across distributed workers",
      },
      {
        html: "<em>Prometheus metrics</em> — throughput, failure rate, p99 latency — with Loki log aggregation (correlation IDs) and Grafana alerting dashboards",
      },
      {
        html: "PostgreSQL persistence with <em>index-optimized status queries</em> and 85%+ test coverage via Jest and Supertest",
      },
    ],
    stack: ["Node.js", "TypeScript", "BullMQ", "Redis", "PostgreSQL", "Prometheus"],
    href: "https://github.com/HarshwardhanMore",
  },
  {
    number: "02",
    kind: "Personal Project",
    name: "Collaboro",
    subtitle: "— Agile Work Management Platform",
    description:
      "Full-stack agile platform where every architectural choice was grounded in a real production trade-off — from SSE vs. WebSockets to composite index design for read-heavy sprint query patterns.",
    highlights: [
      {
        html: "Next.js <em>server-side REST APIs</em> with PostgreSQL via type-safe Prisma ORM — normalized sprint/task/user schema with composite indexing for read-heavy patterns",
      },
      {
        html: "Chose <em>SSE over WebSockets</em> for real-time board updates after evaluating connection overhead and HTTP/2 multiplexing compatibility",
      },
      {
        html: "<em>Drag-and-drop kanban board</em>, task prioritization, and PR-sharing workflows with React.js",
      },
    ],
    stack: ["Next.js", "React.js", "PostgreSQL", "Prisma"],
    href: "https://github.com/HarshwardhanMore",
  },
];
