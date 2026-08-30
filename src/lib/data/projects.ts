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
            "My personal portfolio built from scratch using Next.js 15, Tailwind CSS v4, Framer Motion, and a fully modular component architecture.",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
        githubUrl: "https://github.com/Cloneeu/cloneeu-portfolio",
        liveUrl: "",
        featured: true,
    },
];
