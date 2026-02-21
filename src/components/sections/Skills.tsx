"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills, skillCategories } from "@/lib/data";

export function Skills() {
    return (
        <section id="skills" className="relative py-28 px-6">
            <div className="mx-auto max-w-5xl">
                <SectionHeading
                    label="What I know"
                    title="Skills & Technologies"
                    description="A snapshot of the languages, frameworks, and tools I work with regularly."
                />

                <div className="space-y-8">
                    {skillCategories.map((cat, catIdx) => {
                        const catSkills = skills.filter((s) => s.category === cat.key);
                        return (
                            <motion.div
                                key={cat.key}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                            >
                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                                    {cat.label}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {catSkills.map((skill, i) => (
                                        <motion.span
                                            key={skill.name}
                                            className="inline-flex items-center rounded-xl border border-white/7 bg-white/4 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white cursor-default"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.35, delay: catIdx * 0.1 + i * 0.04 }}
                                            whileHover={{ y: -2, transition: { duration: 0.15 } }}
                                        >
                                            {skill.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
