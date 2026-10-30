// A Client Component. `usePathname` and the scroll spy are both browser-only,
// so this file needs the directive. Everything it links to stays a Server
// Component.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// The site is one page, so these are section ids rather than routes. On a
// case study page the same links become "/#projects" and navigate home first.
const LINKS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [spyId, setSpyId] = useState<string | null>(null);

  // Derived, not stored. Resetting this in the effect when the route changes
  // would be a second render for something the render can already work out.
  const activeId = isHome ? spyId : null;

  // Scroll spy. An IntersectionObserver is cheaper than listening to scroll:
  // the browser tells us when a section enters or leaves instead of us asking
  // on every frame.
  useEffect(() => {
    if (!isHome) return;

    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    // Shrinking the root to a thin band across the middle of the viewport
    // means "active" is whatever you are actually looking at, not whatever
    // has one pixel on screen.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = LINKS.find((l) => visible.has(l.id));
        setSpyId(first ? first.id : null);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="shell flex h-(--nav-h) items-center justify-between gap-6">
        {/* The wordmark is drawn as a CSS mask rather than inline SVG: the
            shape comes from public/wordmark.svg and the colour from
            `bg-current`, so it follows --foreground and recolours with the
            palette. Inline SVG would also recolour, but this file is 7.5 KB
            of path data and Nav is a Client Component, so inlining it would
            put all of that in the JS bundle instead of a cached asset. */}
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="group flex items-end gap-1 whitespace-nowrap"
        >
          <span
            aria-hidden
            className="block h-[17px] bg-current"
            style={{
              aspectRatio: "815.28 / 119.04",
              maskImage: "url(/wordmark.svg)",
              WebkitMaskImage: "url(/wordmark.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
          {/* The dot is the one bit of brand. It warms up on hover. */}
          <span
            aria-hidden
            className="mb-px text-sm leading-none font-medium text-accent transition-opacity group-hover:opacity-60"
          >
            .
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const isActive = isHome && activeId === link.id;

            return (
              <a
                key={link.id}
                href={href(link.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {/* Every link renders this pill, but only the active one is
                    mounted. Sharing one `layoutId` makes motion animate the
                    pill from the old link to the new one instead of fading. */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:text-foreground md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* AnimatePresence lets an element animate on the way out. Without it a
          component that unmounts simply disappears. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <ul className="shell flex flex-col py-2">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={href(link.id)}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
