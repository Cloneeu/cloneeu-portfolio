export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    githubUrl: string;
    liveUrl?: string;
    featured?: boolean;
}

export interface Skill {
    name: string;
    category: "language" | "framework" | "tool" | "other";
    icon: string;   // Simple Icons slug
    color: string;  // brand hex color for glow
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
    bio: string;
    github: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
}

export type SectionId = "hero" | "about" | "skills" | "experience" | "projects" | "contact";
