"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { personal } from "@/lib/data";

const NAV_ITEMS = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
] as const;

export function Navbar() {
    const active = useActiveSection();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        const id = href.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
                        ? "border-b border-white/6 bg-[#080810]/80 backdrop-blur-xl"
                        : "bg-transparent"
                    }`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <button
                        onClick={() => handleNavClick("#hero")}
                        className="text-base font-bold tracking-tight text-white transition-colors hover:text-violet-400"
                    >
                        <span className="text-violet-400">&lt;</span>
                        {personal.name}
                        <span className="text-violet-400"> /&gt;</span>
                    </button>

                    {/* Desktop nav */}
                    <ul className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => {
                            const sectionId = item.href.replace("#", "");
                            const isActive = active === sectionId;
                            return (
                                <li key={item.href}>
                                    <button
                                        onClick={() => handleNavClick(item.href)}
                                        className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? "text-white" : "text-zinc-400 hover:text-white"
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-pill"
                                                className="absolute inset-0 rounded-lg bg-white/[0.07]"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                            />
                                        )}
                                        <span className="relative z-10">{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* GitHub CTA */}
                    <a
                        href={personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 rounded-lg border border-white/12 bg-white/4 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
                    >
                        <GitHubIcon />
                        GitHub
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2 text-zinc-400 hover:text-white"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            className="block h-px w-6 bg-current origin-center"
                            animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                        />
                        <motion.span
                            className="block h-px w-6 bg-current"
                            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                        />
                        <motion.span
                            className="block h-px w-6 bg-current origin-center"
                            animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                        />
                    </button>
                </nav>
            </motion.header>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-x-0 top-[65px] z-40 border-b border-white/6 bg-[#080810]/95 backdrop-blur-xl md:hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ul className="flex flex-col px-6 py-4 gap-1">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <button
                                        onClick={() => handleNavClick(item.href)}
                                        className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function GitHubIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    );
}
