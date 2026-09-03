export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  artwork: "watch" | "platformer" | "portfolio";
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "tool" | "other";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: "work" | "education";
}

export interface PersonalInfo {
  name: string;
  displayName: string;
  title: string;
  rol: string;
  headline: readonly [string, string];
  bio: string;
  about: readonly [string, string];
  github: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
}

export type SectionId = "hero" | "about" | "skills" | "experience" | "projects" | "contact";
