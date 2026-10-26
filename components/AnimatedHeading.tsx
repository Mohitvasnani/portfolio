// A heading that animates in one word at a time. Used once, on the hero, so
// the first thing on the page has some life without the whole site moving.
"use client";

import { motion, useReducedMotion } from "motion/react";

type AnimatedHeadingProps = {
  text: string;
  className?: string;
  /** These words render in the italic serif instead of the sans. */
  serifWords?: string[];
};

export default function AnimatedHeading({
  text,
  className,
  serifWords = [],
}: AnimatedHeadingProps) {
  const reduce = useReducedMotion();
  // `split(" ")` turns the sentence into an array of words so each one can be
  // given its own delay. Rendering a whole string at once can't be staggered.
  const words = text.split(" ");

  return (
    <h1 className={className}>
      {words.map((word, i) => {
        // `replace` strips punctuation before comparing, so "tool." still
        // matches "tool" in the serifWords list.
        const bare = word.replace(/[^\p{L}]/gu, "").toLowerCase();
        const isSerif = serifWords.some((w) => w.toLowerCase() === bare);

        return (
          // The outer span clips the word while it slides up from below.
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className={`inline-block ${isSerif ? "serif text-accent" : ""}`}
              initial={reduce ? undefined : { y: "110%" }}
              animate={reduce ? undefined : { y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.06 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
            {/* A plain space would be collapsed between inline-blocks. */}
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </h1>
  );
}
