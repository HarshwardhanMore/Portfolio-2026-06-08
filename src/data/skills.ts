export type SkillGroup = {
  heading: string;
  dot: "accent" | "success" | "muted";
  items: { name: string; level: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    heading: "Core Languages",
    dot: "accent",
    items: [
      { name: "TypeScript / JavaScript", level: "Expert" },
      { name: "SQL", level: "Advanced" },
      { name: "C++ (DSA)", level: "Competitive" },
    ],
  },
  {
    heading: "Backend & Distributed Systems",
    dot: "success",
    items: [
      { name: "Node.js / Express.js", level: "Expert" },
      { name: "RabbitMQ / BullMQ / Kafka", level: "Production" },
      { name: "Redis / Event-Driven Arch.", level: "Production" },
    ],
  },
  {
    heading: "Observability & Cloud",
    dot: "muted",
    items: [
      { name: "Prometheus / Loki / Grafana", level: "Production" },
      { name: "AWS (EC2, ECS, S3, Lambda)", level: "Advanced" },
      { name: "Docker / GitHub Actions", level: "CI/CD" },
    ],
  },
];

export const skillsExtended: { heading: string; items: string[] }[] = [
  {
    heading: "Databases & ORM",
    items: ["PostgreSQL", "MySQL", "Prisma", "TypeORM", "Index design", "Query optimization"],
  },
  {
    heading: "Testing",
    items: ["Jest", "Supertest", "TDD", "Integration testing"],
  },
  {
    heading: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS"],
  },
];
