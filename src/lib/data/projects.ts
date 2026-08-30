import type { Project } from "@/types";

export const projects: Project[] = [
    {
        id: "1",
        title: "MARS",
        description:
            "An online watch store built with HTML, CSS, PHP and JavaScript. Includes customer features and admin features (CRUD).",
        tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL"],
        githubUrl: "https://github.com/Cloneeu/MARS",
        liveUrl: "",
        featured: true,
    },
    {
        id: "2",
        title: "Alex's Platformer",
        description:
            "A 2D platformer game with 3+ levels. Written in pure JavaScript and using kaplay.js.",
        tags: ["JavaScript"],
        githubUrl: "https://github.com/Cloneeu/proyecto-final-graficos-por-computadora",
        liveUrl: "",
        featured: true,
    },
    {
        id: "3",
        title: "This Portfolio",
        description:
            "An immersive retro terminal portfolio built with Next.js 16, TypeScript, Three.js, and custom CRT shaders.",
        tags: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS"],
        githubUrl: "https://github.com/Cloneeu/cloneeu-portfolio",
        liveUrl: "",
        featured: true,
    },
];
