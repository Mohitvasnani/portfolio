// Gives a card a soft highlight that follows the cursor across it. The work is
// done in CSS: this component only keeps two custom properties up to date.
"use client";

import { useRef } from "react";
import type { ReactNode, PointerEvent } from "react";

export default function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  // `useRef` holds a value across renders without causing a re-render when it
  // changes. Writing the pointer position to state instead would re-render on
  // every mouse move, which is far too often.
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`group/spot relative isolate ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-card opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx) var(--my), color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
