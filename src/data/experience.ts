export type Role = {
  title: string;
  company: string;
  period: string;
  stack: string[];
  bullets: string[];
  accent?: boolean;
};

export const experience: Role[] = [
  {
    title: "Software Engineer",
    company: "Unique School App India LLP — Pune",
    period: "Jul 2024 — Present",
    accent: true,
    stack: ["Node.js", "TypeScript", "RabbitMQ", "BullMQ", "AWS", "Docker", "Redis"],
    bullets: [
      "Spearheaded monolith-to-microservices migration into 8 event-driven services using RabbitMQ and BullMQ — defined bounded domains, decoupled inter-service comms via distributed queues, delivered fault isolation and independent deployability.",
      "Owned architecture, delivery, and operations of 7+ backend systems; designed normalized MySQL schemas; shipped Wonde / Twilio / SendGrid integrations with idempotent error handling.",
      "Reduced system-wide API latency by ~30% via Redis caching and async batch workflow redesign; eliminated N+1 patterns through query profiling and index optimization.",
      "Built production observability with Prometheus, Loki, and Grafana for metrics, log aggregation, and real-time alerting; practiced TDD with Jest and Supertest across unit, integration, and queue-processor tests.",
      "Deployed to AWS (EC2, ECS, S3, Lambda, Secrets Manager) via Docker multi-stage builds and GitHub Actions CI/CD with rolling zero-downtime deployments.",
    ],
  },
  {
    title: "Software Engineer Intern — Backend",
    company: "Unique School App India LLP — Pune",
    period: "Apr 2024 — Jul 2024",
    stack: ["Node.js", "Express.js", "MySQL", "Prisma"],
    bullets: [
      "Shipped production REST APIs with Node.js and Express.js — query-optimized Prisma and TypeORM operations, Twilio / SendGrid integrations with structured error handling, and Swagger/OpenAPI documentation across live codebases.",
    ],
  },
  {
    title: "Full Stack Developer Intern",
    company: "ProducTry — Pune",
    period: "Jul 2023 — Mar 2024",
    stack: ["Node.js", "Express.js", "React.js", "MySQL"],
    bullets: [
      "Built backend services with Node.js and Express.js — RESTful APIs, relational schemas, and third-party integrations within an early-stage product environment; delivered responsive React.js and Tailwind CSS interfaces across the full product stack.",
    ],
  },
];
