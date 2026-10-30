// Circular portrait with a ring that draws itself closed when it scrolls
// into view. Renders a monogram instead when no photo is set, so the layout
// is correct whether or not public/ has the image yet.
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";

/** "Mohit Vasnani" -> "MV". Used only by the no-photo fallback. */
function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Avatar({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative aspect-square ${className ?? ""}`}>
      {/* The ring. viewBox units rather than pixels so it scales with the
          container, and -rotate-90 moves the start point to 12 o'clock
          instead of 3 o'clock, which is where SVG arcs begin by default. */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full -rotate-90 overflow-visible"
        aria-hidden
      >
        {/* The full circle, faint. Without it the unfinished arc looks like
            a rendering bug rather than a deliberate partial ring. */}
        {/* Not `vectorEffect="non-scaling-stroke"`: it would keep the stroke
            a constant pixel width, but it also makes the dash pattern ignore
            `pathLength`, and the arc below then never closes. The widths here
            are viewBox units instead, chosen to read well at all three sizes. */}
        <circle cx="50" cy="50" r="48.5" fill="none" stroke="var(--border)" strokeWidth="0.6" />

        {/* The accent arc that closes. `pathLength={1}` rescales the path to
            one unit long, so dasharray and dashoffset can be written as
            0-to-1 fractions instead of having to compute 2*pi*r. */}
        <motion.circle
          cx="50"
          cy="50"
          r="48.5"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.1"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          initial={reduce ? { strokeDashoffset: 0 } : { strokeDashoffset: 1 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* Inset so the ring sits clear of the photo rather than on top of it. */}
      <div className="absolute inset-[5%] overflow-hidden rounded-full border border-border bg-surface">
        {site.photo ? (
          <Image
            src={"dp.jpg"}
            alt={site.name}
            fill
            // Tells the browser the rendered size so it can pick the right
            // source, rather than downloading the largest one every time.
            sizes="(min-width: 1024px) 288px, (min-width: 640px) 224px, 160px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="grid size-full place-items-center">
            <span className="font-mono text-4xl tracking-[0.1em] text-muted sm:text-5xl">
              {initials(site.name)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
