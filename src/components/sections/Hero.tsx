"use client";

import { motion, type Variants } from "framer-motion";
import { personal } from "@/lib/data";

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export function Hero() {
    const handleScroll = (href: string) => {
        const id = href.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="hero"
            className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
            {/* Radial spotlight behind text */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-full"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
                }}
                aria-hidden
            />

            <motion.div
                className="relative z-10 max-w-3xl"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {/* Badge */}
                <motion.div variants={item} className="mb-6 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                        Available for work
                    </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    variants={item}
                    className="mb-4 text-6xl font-extrabold tracking-tight text-white md:text-8xl"
                >
                    Hi, I&apos;m{" "}
                    <span
                        className="bg-linear-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    >
                        {personal.displayName}
                    </span>
                    <span className="text-violet-400">.</span>
                </motion.h1>

                {/* Title */}
                <motion.p
                    variants={item}
                    className="mb-6 text-xl font-medium text-zinc-300 md:text-2xl"
                >
                    {personal.title}
                </motion.p>

                {/* Bio */}
                <motion.p
                    variants={item}
                    className="mb-10 max-w-xl mx-auto text-base leading-relaxed text-zinc-400 md:text-lg"
                >
                    {personal.bio}
                </motion.p>

                {/* CTAs */}
                <motion.div variants={item} className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => handleScroll("#projects")}
                        className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-violet-600 px-7 text-sm font-semibold text-white transition-all hover:bg-violet-500 active:scale-[0.98]"
                    >
                        <span className="relative z-10">View Projects</span>
                        <ArrowDownIcon />
                    </button>
                    <button
                        onClick={() => handleScroll("#about")}
                        className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/12 bg-white/4 px-7 text-sm font-semibold text-zinc-200 transition-all hover:border-white/25 hover:bg-white/7 active:scale-[0.98]"
                    >
                        About Me
                    </button>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.button
                onClick={() => handleScroll("#about")}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                aria-label="Scroll down"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </motion.div>
            </motion.button>
        </section>
    );
}

function ArrowDownIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
        </svg>
    );
}
