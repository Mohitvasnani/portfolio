// Wraps a button or link so it leans very slightly towards the cursor.
// Subtle on purpose: enough to feel responsive, not enough to be a toy.
"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ReactNode, PointerEvent } from "react";

export default function Magnetic({
  children,
  className,
  strength = 0.18,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20 });
  const sy = useSpring(y, { stiffness: 220, damping: 20 });

  function handleMove(event: PointerEvent<HTMLSpanElement>) {
    if (reduce) return;
    // getBoundingClientRect gives the element's position in the viewport, so
    // subtracting its centre from the pointer gives an offset from the middle.
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}
