"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { personal } from "@/lib/data";

const highlights = [
    { value: "5+", label: "Years of coding" },
    { value: "20+", label: "Projects built" },
    { value: "∞", label: "Bugs fixed" },
];

export function About() {
    return (
        <section id="about" className="relative py-28 px-6">
            <div className="mx-auto max-w-5xl">
                <SectionHeading label="Who I am" title="About Me" />

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
                    {/* Text */}
                    <motion.div
                        className="space-y-5"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <p className="text-zinc-300 leading-relaxed text-base">
                            I&apos;m <strong className="text-white font-semibold">{personal.name}</strong>, a passionate
                            full-stack developer who loves turning ideas into thoughtful digital experiences.
                        </p>
                        <p className="text-zinc-400 leading-relaxed text-base">
                            I have a deep interest in clean code, great developer experience, and building
                            things that actually work in production. Whether it&apos;s a user-facing web app or
                            a background service, I care about every layer of the stack.
                        </p>
                        <p className="text-zinc-400 leading-relaxed text-base">
                            When I&apos;m not coding, I&apos;m probably learning something new, contributing to
                            open-source, or tinkering with side projects that may or may not ship.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                            {personal.github && (
                                <SocialLink href={personal.github} label="GitHub">
                                    <GitHubIcon />
                                </SocialLink>
                            )}
                        </div>
                    </motion.div>

                    {/* Stats / Card */}
                    <motion.div
                        className="grid grid-cols-3 gap-4"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    >
                        {highlights.map((h, i) => (
                            <motion.div
                                key={h.label}
                                className="flex flex-col items-center justify-center rounded-2xl border border-white/6 bg-white/3 p-6 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                            >
                                <span className="text-3xl font-extrabold bg-linear-to-br from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    {h.value}
                                </span>
                                <span className="mt-1.5 text-xs text-zinc-500 text-center leading-tight">{h.label}</span>
                            </motion.div>
                        ))}

                        {/* Code block card */}
                        <motion.div
                            className="col-span-3 rounded-2xl border border-white/6 bg-white/3 p-5 font-mono text-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <div className="mb-3 flex gap-1.5">
                                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                                <span className="h-3 w-3 rounded-full bg-green-500/60" />
                            </div>
                            <p className="text-zinc-500"><span className="text-violet-400">const</span> <span className="text-cyan-400">dev</span> = {"{"}</p>
                            <p className="pl-4 text-zinc-400">  name: <span className="text-amber-300">&ldquo;{personal.name}&rdquo;</span>,</p>
                            <p className="pl-4 text-zinc-400">  role: <span className="text-amber-300">&ldquo;{personal.title}&rdquo;</span>,</p>
                            <p className="pl-4 text-zinc-400">  passions: <span className="text-green-400">[&ldquo;code&rdquo;, &ldquo;oss&rdquo;, &ldquo;craft&rdquo;]</span>,</p>
                            <p className="text-zinc-500">{"}"}</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/4 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-violet-500/30 hover:text-white"
        >
            {children}
            {label}
        </a>
    );
}

function GitHubIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    );
}
