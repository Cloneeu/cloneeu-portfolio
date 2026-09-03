import type { Project } from "@/types";

export const projects: Project[] = [
    {
        id: "1",
        title: "MARS",
        description:
            "A complete online watch store with a customer storefront and an administrative CRUD system, built from the database up.",
        tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL"],
        githubUrl: "https://github.com/Cloneeu/MARS",
        liveUrl: "",
        featured: true,
        artwork: "watch",
    },
    {
        id: "2",
        title: "Alex's Platformer",
        description:
            "A multi-level 2D platformer created in JavaScript with KAPLAY, focused on responsive movement and playful level design.",
        tags: ["JavaScript", "KAPLAY"],
        githubUrl: "https://github.com/Cloneeu/proyecto-final-graficos-por-computadora",
        liveUrl: "",
        featured: true,
        artwork: "platformer",
    },
    {
        id: "3",
        title: "This Portfolio",
        description:
            "A static editorial portfolio built with Next.js, TypeScript, and Framer Motion, with custom pixel interactions and GitHub Pages deployment.",
        tags: ["Next.js", "TypeScript", "Framer Motion", "CSS"],
        githubUrl: "https://github.com/Cloneeu/cloneeu-portfolio",
        liveUrl: "",
        featured: true,
        artwork: "portfolio",
    },
];
