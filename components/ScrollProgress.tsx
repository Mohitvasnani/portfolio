// A hairline at the top of the window that fills as you scroll the page.
"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  // `scrollYProgress` is a motion value from 0 at the top to 1 at the bottom.
  const { scrollYProgress } = useScroll();
  // Feeding it through a spring stops the bar twitching on a trackpad.
  const width = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      // `scaleX` is animated rather than `width` because transforms are the
      // only property the browser can animate without re-laying out the page.
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-60 h-px origin-left bg-accent"
    />
  );
}
