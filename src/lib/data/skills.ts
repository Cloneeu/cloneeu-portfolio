import type { Skill } from "@/types";

export const skills: Skill[] = [
    // Languages
    { name: "TypeScript", category: "language" },
    { name: "JavaScript", category: "language" },
    { name: "Python", category: "language" },
    { name: "C++", category: "language" },
    { name: "SQL", category: "language" },

    // Frameworks & Libraries
    { name: "React", category: "framework" },
    { name: "Next.js", category: "framework" },
    { name: "Node.js", category: "framework" },
    { name: "Tailwind CSS", category: "framework" },

    // Tools & Infra
    { name: "Docker", category: "tool" },
    { name: "Git", category: "tool" },
    { name: "MySQL", category: "tool" },
    { name: "Linux", category: "tool" },
];

export const skillCategories = [
    { key: "language", label: "Languages" },
    { key: "framework", label: "Frameworks & Libraries" },
    { key: "tool", label: "Tools & Infra" },
] as const;
