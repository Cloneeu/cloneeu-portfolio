"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
    label: string;
    title: string;
    description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
    return (
        <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
                {label}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
            {description && (
                <p className="max-w-xl mx-auto text-zinc-400 text-base leading-relaxed">{description}</p>
            )}
        </motion.div>
    );
}
