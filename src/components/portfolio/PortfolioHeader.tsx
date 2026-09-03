"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { personal } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
];

export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Alexandro, back to top">
        CLONEEU<span aria-hidden="true">●</span>
      </a>

      <nav className="desktop-navigation" aria-label="Primary navigation">
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="button button--compact desktop-github" href={personal.github} target="_blank" rel="noreferrer">
        GitHub <span aria-hidden="true">↗</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{open ? "CLOSE" : "MENU"}</span>
        <span aria-hidden="true">{open ? "×" : "+"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link, index) => (
              <a href={link.href} key={link.href} onClick={closeMenu}>
                <span>0{index + 1}</span>
                {link.label}
              </a>
            ))}
            <a href={personal.github} target="_blank" rel="noreferrer" onClick={closeMenu}>
              <span>05</span>
              GitHub ↗
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
