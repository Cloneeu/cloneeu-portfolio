"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";

type KineticTextProps = {
  text: string;
  className?: string;
};

export function KineticText({ text, className }: KineticTextProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, wordIndex, words) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span className="kinetic-word" aria-hidden="true">
            {Array.from(word).map((character, characterIndex) => {
              const index = wordIndex + characterIndex;
              const direction = index % 2 === 0 ? -1 : 1;

              return (
                <motion.span
                  className="kinetic-letter"
                  key={`${character}-${characterIndex}`}
                  whileHover={
                    reduceMotion
                      ? { color: "var(--mint-teal)" }
                      : {
                          y: "-0.12em",
                          rotate: direction * 4,
                          scale: 1.04,
                          color: "var(--kinetic-color, var(--ink))",
                          textShadow: `${direction * 3}px 3px 0 var(--mint-teal)`,
                        }
                  }
                  transition={{ type: "spring", stiffness: 520, damping: 22, mass: 0.45 }}
                >
                  {character}
                </motion.span>
              );
            })}
          </span>
          {wordIndex < words.length - 1 && <span className="kinetic-letter kinetic-letter--space" aria-hidden="true" />}
        </Fragment>
      ))}
    </span>
  );
}
