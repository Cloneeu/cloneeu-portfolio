import type { Skill } from "@/types";

export const skills: Skill[] = [
    // Languages
    { name: "TypeScript", category: "language", icon: "typescript", color: "#3178C6" },
    { name: "JavaScript", category: "language", icon: "javascript", color: "#F7DF1E" },
    { name: "Python", category: "language", icon: "python", color: "#3776AB" },
    { name: "C++", category: "language", icon: "cplusplus", color: "#00599C" },
    { name: "SQL", category: "language", icon: "sqlite", color: "#003B57" },

    // Frameworks & Libraries
    { name: "React", category: "framework", icon: "react", color: "#61DAFB" },
    { name: "Next.js", category: "framework", icon: "nextdotjs", color: "#ffffff" },
    { name: "Node.js", category: "framework", icon: "nodedotjs", color: "#5FA04E" },
    { name: "Tailwind CSS", category: "framework", icon: "tailwindcss", color: "#06B6D4" },

    // Tools & Infra
    { name: "Docker", category: "tool", icon: "docker", color: "#2496ED" },
    { name: "Git", category: "tool", icon: "git", color: "#F05032" },
    { name: "MySQL", category: "tool", icon: "mysql", color: "#4479A1" },
    { name: "Linux", category: "tool", icon: "linux", color: "#FCC624" },
];

export const skillCategories = [
    { key: "language", label: "Languages" },
    { key: "framework", label: "Frameworks & Libraries" },
    { key: "tool", label: "Tools & Infra" },
] as const;
