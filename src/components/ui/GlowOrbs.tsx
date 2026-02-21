"use client";

import { motion } from "framer-motion";

export function GlowOrbs() {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
            {/* Violet orb — top left */}
            <motion.div
                className="absolute -top-40 -left-40 w-150 h-150 rounded-full opacity-20"
                style={{
                    background:
                        "radial-gradient(circle, #7c3aed 0%, #4c1d95 40%, transparent 70%)",
                    filter: "blur(80px)",
                }}
                animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Cyan orb — bottom right */}
            <motion.div
                className="absolute -bottom-40 -right-40 w-125 h-125 rounded-full opacity-15"
                style={{
                    background:
                        "radial-gradient(circle, #06b6d4 0%, #0e7490 40%, transparent 70%)",
                    filter: "blur(80px)",
                }}
                animate={{ x: [0, -50, 20, 0], y: [0, 30, -40, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />

            {/* Small accent — center right */}
            <motion.div
                className="absolute top-1/2 -right-20 w-75 h-75 rounded-full opacity-10"
                style={{
                    background:
                        "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
                animate={{ y: [0, -60, 0], opacity: [0.1, 0.18, 0.1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
            />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    );
}
