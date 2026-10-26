// The site's one scroll-animation primitive. Wrap anything in <Reveal> and it
// fades and rises into place the first time it enters the viewport.
//
// "use client" is needed because this runs an effect and watches the scroll
// position, and both of those only exist in the browser. Everything it wraps
// can still be a Server Component: children are rendered on the server and
// handed to this component as already-finished markup.
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before starting. Used to stagger siblings. */
  delay?: number;
  /** How far it travels, in pixels. */
  distance?: number;
  className?: string;
  /** Renders as this element instead of a div. */
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

export default function Reveal({
  children,
  delay = 0,
  distance = 18,
  className,
  as = "div",
}: RevealProps) {
  // Returns true when the visitor's OS asks for reduced motion. When it does,
  // the element is rendered in its final state with no animation at all.
  const reduce = useReducedMotion();

  const Tag = motion[as];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      // `once: true` means it animates the first time only and then stays put,
      // instead of replaying every time you scroll back past it.
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
