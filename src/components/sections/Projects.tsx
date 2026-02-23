"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

export function Projects() {
    const [showAll, setShowAll] = useState(false);

    const featured = projects.filter((p) => p.featured);
    const displayed = showAll ? projects : featured;

    return (
        <section id="projects" className="relative py-28 px-6">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    label="What I've built"
                    title="Projects"
                    description="A selection of projects I've built."
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {displayed.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show more / less */}
                {projects.length > featured.length && (
                    <motion.div
                        className="mt-10 flex justify-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <button
                            onClick={() => setShowAll((v) => !v)}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white"
                        >
                            {showAll ? "Show less" : `Show all ${projects.length} projects`}
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ rotate: showAll ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                aria-hidden
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </motion.svg>
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
