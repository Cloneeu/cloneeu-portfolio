"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { personal } from "@/lib/data";

const contactLinks = [
    {
        label: "GitHub",
        value: "@Cloneeu",
        href: personal.github,
        icon: <GitHubIcon />,
        accent: "hover:border-violet-500/30 hover:bg-violet-500/10",
    },
];

export function Contact() {
    return (
        <section id="contact" className="relative py-28 px-6">
            {/* Subtle top glow */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-500/30 to-transparent"
                aria-hidden
            />

            <div className="mx-auto max-w-3xl text-center">
                <SectionHeading
                    label="Get in touch"
                    title="Let's Work Together"
                    description="Have a project in mind, a question, or just want to say hi? My inbox is always open."
                />

                {/* Links */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                >
                    {contactLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group inline-flex items-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-6 py-4 text-sm font-medium text-zinc-300 transition-all ${link.accent} hover:text-white`}
                        >
                            <span className="text-zinc-500 transition-colors group-hover:text-inherit">
                                {link.icon}
                            </span>
                            <div className="text-left">
                                <p className="text-xs text-zinc-500">{link.label}</p>
                                <p className="mt-0.5 font-semibold text-white">{link.value}</p>
                            </div>
                        </a>
                    ))}
                </motion.div>

                {/* Footer note */}
                <motion.p
                    className="mt-20 text-xs text-zinc-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    Designed & built by{" "}
                    <a
                        href={personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        {personal.name}
                    </a>{" "}
                    · {new Date().getFullYear()}
                </motion.p>
            </div>
        </section>
    );
}

function GitHubIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    );
}
