import type { Project } from "@/types";

export const projects: Project[] = [
    {
        id: "1",
        title: "Project Alpha",
        description:
            "A full-stack web application built with Next.js and a REST API backend. Features authentication, real-time updates, and a responsive dashboard.",
        tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
        githubUrl: "https://github.com/Cloneeu",
        liveUrl: "",
        featured: true,
    },
    {
        id: "2",
        title: "Project Beta",
        description:
            "A CLI tool that automates repetitive development workflows. Written in Python with a clean plugin architecture for easy extensibility.",
        tags: ["Python", "CLI", "Automation"],
        githubUrl: "https://github.com/Cloneeu",
        featured: true,
    },
    {
        id: "3",
        title: "Project Gamma",
        description:
            "An open-source React component library following modern design principles. Fully typed, accessible, and tree-shakeable.",
        tags: ["React", "TypeScript", "Storybook", "Rollup"],
        githubUrl: "https://github.com/Cloneeu",
        liveUrl: "",
        featured: true,
    },
    {
        id: "4",
        title: "Project Delta",
        description:
            "A Discord bot with moderation, music playback, and custom commands. Built with Discord.js and deployed on Railway.",
        tags: ["Node.js", "Discord.js", "Railway"],
        githubUrl: "https://github.com/Cloneeu",
    },
    {
        id: "5",
        title: "Project Epsilon",
        description:
            "An API gateway with rate limiting, caching, and JWT authentication built on top of Fastify.",
        tags: ["Fastify", "Redis", "JWT", "Docker"],
        githubUrl: "https://github.com/Cloneeu",
    },
    {
        id: "6",
        title: "This Portfolio",
        description:
            "My personal portfolio built from scratch using Next.js 15, Tailwind CSS v4, Framer Motion, and a fully modular component architecture.",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
        githubUrl: "https://github.com/Cloneeu/cloneeu-portfolio",
        liveUrl: "",
        featured: false,
    },
];
