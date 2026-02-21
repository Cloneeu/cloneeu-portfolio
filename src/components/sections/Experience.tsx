"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/lib/data";

export function Experience() {
    return (
        <section id="experience" className="relative py-28 px-6">
            <div className="mx-auto max-w-3xl">
                <SectionHeading
                    label="Background"
                    title="Experience"
                    description="Where I&apos;ve worked, studied, and grown as a developer."
                />

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-linear-to-b from-violet-500/40 via-white/6 to-transparent" />

                    <div className="space-y-8 pl-12">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                className="relative"
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.1 }}
                            >
                                {/* Dot */}
                                <div className="absolute -left-12 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-[#080810]">
                                    <div
                                        className={`h-2.5 w-2.5 rounded-full ${exp.type === "work" ? "bg-violet-500" : "bg-cyan-500"
                                            }`}
                                    />
                                </div>

                                <div className="rounded-2xl border border-white/6 bg-white/3 p-6 transition-colors hover:border-white/10">
                                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                                        <div>
                                            <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                                            <p className="text-sm text-violet-400">{exp.company}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${exp.type === "work"
                                                        ? "border border-violet-500/20 bg-violet-500/10 text-violet-300"
                                                        : "border border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
                                                    }`}
                                            >
                                                {exp.type === "work" ? "Work" : "Education"}
                                            </span>
                                            <span className="text-xs text-zinc-500">{exp.period}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm leading-relaxed text-zinc-400">{exp.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
