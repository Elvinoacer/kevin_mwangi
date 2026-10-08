import type { Experience, Education, TimelineEntry } from "./types";

export const experience: Experience = {
  organization: "Nairobi-based software company",
  organizationNote: "Organization name withheld until verification",
  role: "Software Engineering Intern",
  type: "internship",
  location: "Nairobi, Kenya",
  startDate: "May 2025",
  endDate: "August 2025",
  summary:
    "A three-month industrial attachment inside a working software team — the shift from classroom projects to reviewed, tested, production-adjacent code.",
  responsibilities: [
    "Assisted with frontend development on internal tools",
    "Fixed small bugs under supervision, with reproduction steps first",
    "Worked with Git branches and pull requests into a shared codebase",
    "Participated in code reviews — reading others' changes before my own got reviewed",
    "Built or updated small API endpoints with tests",
    "Wrote SQL queries against the company database for reporting needs",
    "Tested features before hand-off and updated documentation",
    "Investigated reported issues with supervision",
    "Participated in stand-ups and sprint ceremonies",
    "Learned the team's development and deployment workflow end to end",
  ],
  technologies: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Git",
    "GitHub",
    "Jira-style boards",
  ],
  lesson:
    "Internship experience taught me that production software requires more discipline than classroom projects. Changes must be reviewed, tested and understood in context. Clear communication, readable code, documentation and version control matter as much as getting a feature to work locally.",
};

export const education: Education = {
  institution: "Moi University",
  degree: "Bachelor of Science in Computer Science",
  school: "School of Information Sciences",
  location: "Eldoret, Kenya",
  period: "2022 — 2026",
  classification: "Final-year standing",
  coursework: [
    {
      category: "Programming & Software Engineering",
      modules: [
        "Programming Fundamentals",
        "Object-Oriented Programming",
        "Data Structures",
        "Algorithms",
        "Software Engineering",
        "Web Development",
      ],
    },
    {
      category: "Systems",
      modules: [
        "Operating Systems",
        "Computer Architecture",
        "Computer Networks",
        "Distributed Systems",
        "Systems Programming",
      ],
    },
    {
      category: "Data",
      modules: [
        "Database Systems",
        "Data Management",
        "SQL",
        "Data Analytics",
      ],
    },
    {
      category: "Artificial Intelligence",
      modules: ["Artificial Intelligence", "Machine Learning", "Intelligent Systems"],
    },
    {
      category: "Security",
      modules: ["Computer Security", "Cryptography Fundamentals", "Network Security Fundamentals"],
    },
    {
      category: "Mathematics",
      modules: [
        "Discrete Mathematics",
        "Calculus",
        "Linear Algebra",
        "Probability & Statistics",
        "Numerical Methods",
      ],
    },
  ],
};

export const timeline: TimelineEntry[] = [
  {
    year: "2022",
    title: "Programming Foundations",
    description:
      "Learned programming fundamentals, problem solving and data structures. First year of the BSc Computer Science programme at Moi University.",
    tags: ["C/C++", "Problem solving", "Data structures"],
  },
  {
    year: "2023",
    title: "Web & Database Systems",
    description:
      "Built web applications and relational database projects. HTML, CSS, JavaScript and SQL became daily tools; first full web app shipped.",
    tags: ["JavaScript", "SQL", "PostgreSQL"],
  },
  {
    year: "2024",
    title: "Software Engineering Depth",
    description:
      "Worked on larger team projects, APIs and system architecture. Authentication, authorization and testing became deliberate practice, not afterthoughts.",
    tags: ["TypeScript", "Node.js", "APIs", "Testing"],
  },
  {
    year: "2025",
    title: "Internship & Deployment",
    description:
      "Gained practical experience with real software workflows and hosted applications. Industrial attachment inside a working engineering team.",
    tags: ["Internship", "Git workflow", "Production mindset"],
  },
  {
    year: "2026",
    title: "Final-Year Project",
    description:
      "Built and documented a complete software system — the Campus Services Discovery Platform — and prepared for graduate engineering roles.",
    tags: ["Next.js", "Prisma", "Full-stack delivery"],
  },
];
