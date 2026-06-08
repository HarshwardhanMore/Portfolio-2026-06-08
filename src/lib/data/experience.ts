import type { ReactNode } from "react";

export type TimelineItem = {
  company: string;
  date: string;
  badge?: string;
  role: string;
  points?: { html: string }[];
  stack?: string[];
  education?: {
    note?: string;
    gpa?: string;
    gpaScale?: string;
    location?: string;
  };
};

export const experience: TimelineItem[] = [
  {
    company: "Unique School App\nIndia LLP",
    date: "Jul 2024 → Present",
    badge: "Current",
    role: "Software Engineer",
    points: [
      {
        html: "Spearheaded <em>monolith-to-microservices migration</em> into 8 event-driven services using RabbitMQ and BullMQ — defined bounded domains, decoupled inter-service communication via distributed queues, delivering fault isolation and horizontal scalability.",
      },
      {
        html: "Owned <em>architecture, delivery, and operations</em> of 7+ backend systems; drove service boundary and schema decisions; designed normalized MySQL schemas; owned Wonde/Twilio/SendGrid integrations with idempotent error handling.",
      },
      {
        html: "Reduced <em>system-wide API latency by ~30%</em> via Redis caching and async batch workflow redesign; eliminated N+1 patterns through query profiling and index optimization.",
      },
      {
        html: "Built <em>production observability</em> with Prometheus, Loki, and Grafana; practiced TDD with Jest and Supertest across unit, integration, and queue processor tests — reducing MTTR and regression risk.",
      },
      {
        html: "Deployed to <em>AWS (EC2, ECS, S3, Lambda, Secrets Manager)</em> via Docker multi-stage builds and GitHub Actions CI/CD with rolling zero-downtime deployments and automated secrets rotation.",
      },
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "RabbitMQ",
      "BullMQ",
      "Redis",
      "AWS",
      "Docker",
      "Prometheus",
      "Grafana",
      "MySQL",
      "GitHub Actions",
    ],
  },
  {
    company: "Unique School App\nIndia LLP",
    date: "Apr 2024 → Jul 2024",
    role: "Backend Engineer Intern",
    points: [
      {
        html: "Shipped <em>production REST APIs</em> with Node.js and Express.js — query-optimized Prisma and TypeORM operations, Twilio/SendGrid integrations with structured error handling.",
      },
      {
        html: "Authored Swagger/OpenAPI documentation and maintained production engineering standards across live codebases.",
      },
    ],
    stack: ["Node.js", "Express.js", "MySQL", "Prisma", "TypeORM"],
  },
  {
    company: "ProducTry",
    date: "Jul 2023 → Mar 2024",
    role: "Full Stack Developer Intern",
    points: [
      {
        html: "Built <em>backend services</em> with Node.js and Express.js — RESTful APIs, relational schemas, and third-party integrations within an early-stage product environment.",
      },
      {
        html: "Delivered responsive <em>React.js and Tailwind CSS</em> interfaces across the full product stack.",
      },
    ],
    stack: ["Node.js", "Express.js", "React.js", "MySQL", "Tailwind CSS"],
  },
  {
    company: "Vishwakarma Institute\nof Technology",
    date: "2020 → 2024",
    role: "B.Tech — Computer Science Engineering",
    education: {
      note: "Specialization: AI & Data Science",
      gpa: "8.8",
      gpaScale: "/ 10 CGPA",
      location: "Pune, India",
    },
  },
];

// satisfy bundler if needed
export type _ = ReactNode;
