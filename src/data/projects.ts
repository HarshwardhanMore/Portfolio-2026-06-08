import heimdallCover from "@/assets/heimdall-cover.jpg";
import collaboroCover from "@/assets/collaboro-cover.jpg";

export type Project = {
  name: string;
  tag: string;
  description: string;
  stack: string[];
  href: string;
  cover: string;
};

export const projects: Project[] = [
  {
    name: "Heimdall",
    tag: "Distributed Job Processing Engine",
    description:
      "Production-grade distributed job engine with priority queues, exponential backoff retry, dead-letter queue handling, and job deduplication. Prometheus metrics, Loki log aggregation with correlation IDs, Grafana dashboards, and 85%+ test coverage.",
    stack: ["Node.js", "TypeScript", "BullMQ", "Redis", "PostgreSQL", "Prometheus"],
    href: "https://github.com/HarshwardhanMore",
    cover: heimdallCover,
  },
  {
    name: "Collaboro",
    tag: "Agile Work Management Platform",
    description:
      "Next.js server-side REST APIs with PostgreSQL via Prisma — normalized sprint / task / user schema with composite indexing tuned for read-heavy patterns. Chose SSE over WebSockets for real-time board updates after evaluating HTTP/2 compatibility.",
    stack: ["Next.js", "React.js", "PostgreSQL", "Prisma", "SSE"],
    href: "https://github.com/HarshwardhanMore",
    cover: collaboroCover,
  },
];
