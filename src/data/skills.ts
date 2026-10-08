import type { SkillGroup, Capability, LearningItem } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    kind: "language",
    blurb: "Daily drivers and academic foundations.",
    skills: [
      { name: "TypeScript", proficiency: "strong" },
      { name: "JavaScript", proficiency: "strong" },
      { name: "SQL", proficiency: "strong" },
      { name: "Python", proficiency: "working-knowledge" },
      { name: "Java", proficiency: "working-knowledge" },
      { name: "C / C++", proficiency: "academic-exposure" },
    ],
  },
  {
    title: "Frontend",
    kind: "frontend",
    blurb: "Component-driven UIs that stay maintainable.",
    skills: [
      { name: "React", proficiency: "strong" },
      { name: "Next.js", proficiency: "strong" },
      { name: "HTML", proficiency: "strong" },
      { name: "CSS", proficiency: "strong" },
      { name: "Tailwind CSS", proficiency: "strong" },
      { name: "Responsive design", proficiency: "strong" },
      { name: "Accessibility fundamentals", proficiency: "working-knowledge" },
    ],
  },
  {
    title: "Backend",
    kind: "backend",
    blurb: "Services with clear boundaries and honest failure states.",
    skills: [
      { name: "Node.js", proficiency: "strong" },
      { name: "REST APIs", proficiency: "strong" },
      { name: "Authentication", proficiency: "working-knowledge" },
      { name: "Authorization", proficiency: "working-knowledge" },
      { name: "Webhooks", proficiency: "working-knowledge" },
      { name: "WebSockets", proficiency: "working-knowledge" },
      { name: "Background jobs", proficiency: "working-knowledge" },
    ],
  },
  {
    title: "Databases",
    kind: "database",
    blurb: "Data models designed for correctness first.",
    skills: [
      { name: "PostgreSQL", proficiency: "strong" },
      { name: "SQL", proficiency: "strong" },
      { name: "Prisma / ORM", proficiency: "working-knowledge" },
      { name: "Database migrations", proficiency: "working-knowledge" },
      { name: "Indexing fundamentals", proficiency: "working-knowledge" },
      { name: "Transactions", proficiency: "working-knowledge" },
      { name: "Redis", proficiency: "academic-exposure" },
    ],
  },
  {
    title: "Software Engineering",
    kind: "engineering",
    blurb: "The practices that keep systems alive.",
    skills: [
      { name: "Git", proficiency: "strong" },
      { name: "GitHub", proficiency: "strong" },
      { name: "API design", proficiency: "strong" },
      { name: "Debugging", proficiency: "strong" },
      { name: "Documentation", proficiency: "strong" },
      { name: "Code review", proficiency: "working-knowledge" },
      { name: "Unit testing", proficiency: "working-knowledge" },
      { name: "Integration testing", proficiency: "working-knowledge" },
      { name: "Agile workflows", proficiency: "working-knowledge" },
    ],
  },
  {
    title: "Cloud / DevOps",
    kind: "cloud",
    blurb: "From localhost to real hosted environments.",
    skills: [
      { name: "Vercel", proficiency: "working-knowledge" },
      { name: "Linux", proficiency: "working-knowledge" },
      { name: "Docker", proficiency: "working-knowledge" },
      { name: "CI/CD", proficiency: "working-knowledge" },
      { name: "Environment management", proficiency: "working-knowledge" },
      { name: "Logging / monitoring", proficiency: "academic-exposure" },
    ],
  },
];

export const proficiencyLabels: Record<string, string> = {
  strong: "Strong",
  "working-knowledge": "Working knowledge",
  "academic-exposure": "Academic exposure",
  "currently-learning": "Currently learning",
};

export const capabilities: Capability[] = [
  {
    title: "Full-Stack Development",
    short: "Full Stack",
    positioning:
      "Building end-to-end product experiences across frontend and backend boundaries.",
    topics: [
      "React",
      "Next.js",
      "TypeScript",
      "UI architecture",
      "Forms",
      "Authentication flows",
      "API integration",
      "State management",
    ],
    accent: "green",
  },
  {
    title: "Backend Engineering",
    short: "Backend",
    positioning:
      "Designing reliable application services and clear interfaces between systems.",
    topics: [
      "Node.js",
      "REST APIs",
      "Server-side TypeScript",
      "Authentication",
      "Authorization",
      "Business logic",
      "Background jobs",
      "Webhooks",
      "Rate limiting",
    ],
    accent: "blue",
  },
  {
    title: "Databases & Data Modelling",
    short: "Databases",
    positioning:
      "Designing data models that support correctness, performance and maintainability.",
    topics: [
      "PostgreSQL",
      "Relational design",
      "Normalization",
      "Indexes",
      "Transactions",
      "Migrations",
      "ORM",
      "SQL",
    ],
    accent: "violet",
  },
  {
    title: "Cloud & Deployment",
    short: "Cloud",
    positioning:
      "Taking applications from local development into real hosted environments.",
    topics: [
      "Vercel",
      "Linux",
      "Docker fundamentals",
      "Environment variables",
      "CI/CD",
      "Logs",
      "Monitoring",
      "Deployment workflows",
    ],
    accent: "green",
  },
  {
    title: "Security Fundamentals",
    short: "Security",
    positioning:
      "Treating security as a software-engineering requirement rather than an afterthought.",
    topics: [
      "Authentication",
      "Authorization",
      "Password hashing",
      "Session security",
      "OWASP awareness",
      "Input validation",
      "Rate limiting",
      "Least privilege",
      "Secrets management",
    ],
    accent: "blue",
  },
];

export const learningItems: LearningItem[] = [
  {
    topic: "System design",
    objective: "Reason about scaling, failure modes and service boundaries before writing code.",
    why: "Backend and platform roles expect this thinking early.",
  },
  {
    topic: "Docker",
    objective: "Containerise the services I build and run reproducible local environments.",
    why: "Removes 'works on my machine' from team workflows.",
  },
  {
    topic: "Advanced PostgreSQL",
    objective: "Query plans, indexing strategy, transactions under concurrency.",
    why: "The flagship project showed me data design decides product quality.",
  },
  {
    topic: "Distributed systems",
    objective: "Consistency, queues and event-driven architecture fundamentals.",
    why: "Understanding where monoliths end and systems begin.",
  },
  {
    topic: "Observability",
    objective: "Structured logs, metrics and tracing so failures are diagnosable.",
    why: "Deployment is only half the job; running software is the other half.",
  },
];

export const foundations = [
  {
    title: "Algorithms & Data Structures",
    topics: [
      "Arrays",
      "Linked lists",
      "Stacks & queues",
      "Hash tables",
      "Trees",
      "Graphs",
      "Recursion",
      "Sorting & searching",
      "Complexity analysis",
    ],
  },
  {
    title: "Operating Systems",
    topics: [
      "Processes",
      "Threads",
      "Scheduling",
      "Memory management",
      "Filesystems",
      "Synchronization",
      "Deadlocks",
    ],
  },
  {
    title: "Computer Networks",
    topics: [
      "TCP/IP",
      "DNS",
      "HTTP",
      "Sockets",
      "Routing",
      "Client/server systems",
    ],
  },
  {
    title: "Databases",
    topics: [
      "Relational modelling",
      "SQL",
      "Normalization",
      "Transactions",
      "Indexes",
      "Concurrency",
    ],
  },
  {
    title: "Software Engineering",
    topics: [
      "Requirements",
      "Design",
      "Architecture",
      "Testing",
      "Version control",
      "Maintainability",
    ],
  },
];

export const practices = [
  {
    title: "Version Control",
    points: ["Git", "Feature branches", "Pull requests", "Commit discipline", "Merge conflict resolution"],
    blurb: "Small, reviewable changes on branches — never long-lived local diverges.",
  },
  {
    title: "Testing",
    points: ["Unit", "Integration", "End-to-end", "Regression"],
    blurb: "Tests exist to protect behaviour, not to hit a coverage number.",
  },
  {
    title: "Code Quality",
    points: ["Naming", "Small functions", "Modularity", "Separation of concerns", "Linting", "Formatting"],
    blurb: "Code is read many more times than it is written — I write for the reader.",
  },
  {
    title: "Documentation",
    points: ["README", "Setup instructions", "API docs", "Architecture notes", "Decision records"],
    blurb: "A project another engineer cannot set up in minutes is unfinished.",
  },
  {
    title: "Debugging",
    points: ["Logs", "Browser devtools", "Stack traces", "Database inspection", "Reproduction steps"],
    blurb: "Reproduce first. Fix second. Guessing is the expensive option.",
  },
];
