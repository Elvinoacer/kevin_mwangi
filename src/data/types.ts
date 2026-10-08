/**
 * Kevin Mwangi — Portfolio data model
 * Typed per the product/content spec (§61 Data Model).
 */

export type Proficiency =
  | "strong"
  | "working-knowledge"
  | "academic-exposure"
  | "currently-learning";

export interface Link {
  platform: string;
  label: string;
  url: string;
  handle?: string;
}

export interface Skill {
  name: string;
  proficiency: Proficiency;
}

export interface SkillGroup {
  title: string;
  kind: "language" | "frontend" | "backend" | "database" | "engineering" | "cloud";
  blurb: string;
  skills: Skill[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export type ProjectCategory =
  | "full-stack"
  | "backend"
  | "frontend"
  | "data"
  | "security"
  | "systems"
  | "ai";

export type ProjectType =
  | "final-year"
  | "academic"
  | "personal"
  | "team";

export interface ApiEndpoint {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "WS";
  path: string;
  auth: string;
  role?: string;
  description: string;
}

export interface SchemaEntity {
  name: string;
  fields: { name: string; type: string; note?: string }[];
  relations?: string[];
}

export interface CodeExcerpt {
  file: string;
  language: string;
  lines: string[];
  caption: string;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  type: ProjectType;
  featured: boolean;
  year: number;
  duration: string;
  role: string;
  teamSize: number;
  status: string;
  summary: string;
  problem: string;
  users: string[];
  requirements: string[];
  constraints: string[];
  architectureNote: string;
  stack: string[];
  dataModel: SchemaEntity[];
  apis: ApiEndpoint[];
  security: string[];
  testing: string[];
  deployment: string[];
  results: string[];
  metrics: ProjectMetric[];
  challenges: string[];
  lessons: string[];
  improvements: string[];
  accent: "green" | "blue" | "violet";
  excerpt?: CodeExcerpt;
}

export interface Experience {
  organization: string;
  organizationNote: string;
  role: string;
  type: "internship" | "attachment";
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  lesson: string;
}

export interface EducationCoursework {
  category: string;
  modules: string[];
}

export interface Education {
  institution: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  classification: string;
  coursework: EducationCoursework[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Capability {
  title: string;
  short: string;
  positioning: string;
  topics: string[];
  accent: "green" | "blue" | "violet";
}

export interface LearningItem {
  topic: string;
  objective: string;
  why: string;
}
