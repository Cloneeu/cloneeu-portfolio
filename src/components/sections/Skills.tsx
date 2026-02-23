"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills, skillCategories } from "@/lib/data";

/* Infinite-scroll marquee of tech icons */
function SkillCarousel() {
    const marqueeItems = [...skills, ...skills]; // duplicate for seamless loop

    return (
        <div className="relative overflow-x-hidden py-8 mb-14">
            {/* Left / right */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 " />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10" />

            <div
                className="flex gap-8 animate-marquee w-max"
                style={{ willChange: "transform" }}
            >
                {marqueeItems.map((skill, i) => (
                    <div
                        key={`${skill.name}-${i}`}
                        className="group relative flex flex-col items-center justify-center gap-3
                                   w-32 h-32 rounded-2xl border border-white/8 bg-white/3
                                   transition-all duration-300
                                   hover:border-white/20 hover:scale-110 hover:-translate-y-1 cursor-default shrink-0"
                        style={{
                            boxShadow: `0 0 0px transparent`,
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.boxShadow =
                                `0 0 18px ${skill.color}55, 0 0 40px ${skill.color}22`;
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0px transparent`;
                        }}
                    >
                        {/* Subtle brand-color glow ring on hover */}
                        <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `radial-gradient(circle at center, ${skill.color}15 0%, transparent 70%)` }}
                        />

                        <Image
                            src={`https://cdn.simpleicons.org/${skill.icon}/ffffff`}
                            alt={skill.name}
                            width={44}
                            height={44}
                            className="relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_var(--glow)]"
                            style={{ "--glow": skill.color } as React.CSSProperties}
                            unoptimized
                        />
                        <span className="relative z-10 text-[10px] font-medium text-zinc-400 group-hover:text-white transition-colors duration-200 text-center leading-tight px-1">
                            {skill.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Skills() {
    return (
        <section id="skills" className="relative py-28 px-6">
            <div className="mx-auto max-w-5xl">
                <SectionHeading
                    label="What I know"
                    title="Skills & Technologies"
                    description="A snapshot of the languages, frameworks, and tools I work with regularly."
                />

                {/* Glowing icon carousel */}
                <SkillCarousel />

                {/* Categorised pill grid */}
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
                                            className="inline-flex items-center gap-2 rounded-xl border border-white/7 bg-white/4 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:border-white/20 hover:text-white cursor-default"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.35, delay: catIdx * 0.1 + i * 0.04 }}
                                            whileHover={{ y: -2, transition: { duration: 0.15 } }}
                                            style={{
                                                ["--pill-color" as string]: skill.color,
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLSpanElement).style.boxShadow =
                                                    `0 0 12px ${skill.color}40`;
                                                (e.currentTarget as HTMLSpanElement).style.borderColor =
                                                    `${skill.color}55`;
                                                (e.currentTarget as HTMLSpanElement).style.background =
                                                    `${skill.color}18`;
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLSpanElement).style.boxShadow = "";
                                                (e.currentTarget as HTMLSpanElement).style.borderColor = "";
                                                (e.currentTarget as HTMLSpanElement).style.background = "";
                                            }}
                                        >
                                            <Image
                                                src={`https://cdn.simpleicons.org/${skill.icon}/ffffff`}
                                                alt={skill.name}
                                                width={16}
                                                height={16}
                                                unoptimized
                                            />
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
