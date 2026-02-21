"use client";

import { useState, useEffect, useRef } from "react";
import type { SectionId } from "@/types";

const SECTIONS: SectionId[] = ["hero", "about", "skills", "experience", "projects", "contact"];

export function useActiveSection() {
    const [active, setActive] = useState<SectionId>("hero");
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id as SectionId);
                    }
                }
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );

        SECTIONS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.current?.observe(el);
        });

        return () => observer.current?.disconnect();
    }, []);

    return active;
}
