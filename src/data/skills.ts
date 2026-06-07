export type SkillTag = { name: string; core?: boolean };
export type SkillGroup = { name: string; tags: SkillTag[] };

export const skillGroups: SkillGroup[] = [
  {
    name: "Core Backend",
    tags: [
      { name: "Node.js", core: true },
      { name: "TypeScript", core: true },
      { name: "Express.js", core: true },
      { name: "JavaScript" },
      { name: "REST API Design" },
      { name: "Microservices" },
      { name: "Event-Driven Arch" },
      { name: "System Design" },
      { name: "Rate Limiting" },
    ],
  },
  {
    name: "Messaging & Queues",
    tags: [
      { name: "RabbitMQ", core: true },
      { name: "BullMQ", core: true },
      { name: "Redis", core: true },
      { name: "Kafka" },
      { name: "Dead Letter Queues" },
      { name: "Distributed Workflows" },
      { name: "Async Processing" },
    ],
  },
  {
    name: "Cloud & Infrastructure",
    tags: [
      { name: "AWS EC2 / ECS", core: true },
      { name: "AWS S3" },
      { name: "Lambda" },
      { name: "Secrets Manager" },
      { name: "Docker", core: true },
      { name: "GitHub Actions" },
      { name: "CI/CD Pipelines" },
      { name: "Nginx" },
    ],
  },
  {
    name: "Databases & ORM",
    tags: [
      { name: "PostgreSQL", core: true },
      { name: "MySQL", core: true },
      { name: "Prisma" },
      { name: "TypeORM" },
      { name: "Query Optimization" },
      { name: "Index Design" },
      { name: "Schema Design" },
    ],
  },
  {
    name: "Observability & Testing",
    tags: [
      { name: "Prometheus", core: true },
      { name: "Grafana", core: true },
      { name: "Loki", core: true },
      { name: "Jest" },
      { name: "Supertest" },
      { name: "TDD" },
      { name: "Structured Logging" },
      { name: "Integration Testing" },
    ],
  },
  {
    name: "Languages & Misc",
    tags: [
      { name: "TypeScript", core: true },
      { name: "C++ (DSA / CP)" },
      { name: "SQL" },
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Go (learning)" },
    ],
  },
];
