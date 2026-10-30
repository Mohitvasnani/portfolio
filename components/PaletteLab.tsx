// TEMPORARY. A comparison tool, not a site feature.
//
// To remove it: delete this file and the <PaletteLab /> line in
// app/layout.tsx. Nothing else references it.
//
// It writes the tokens as inline styles on <html>, and inline styles beat
// both :root and .dark, so while a palette is forced here the theme toggle
// in the nav has nothing to do. Reset hands control back to globals.css.
"use client";

import { useEffect, useState } from "react";

type Palette = {
  id: string;
  label: string;
  /** Whether the .dark class goes on, so Tailwind's dark: utilities match. */
  dark: boolean;
  tokens: Record<string, string>;
};

// The three are your own specs used literally: background, text, bar, with
// nothing derived and nothing borrowed between sets. Text and bar are the
// same value in each, so every palette is two colours across seven tokens.
// Paper and Ink are the site as it was, kept for comparison.
const PALETTES: Palette[] = [
  {
    id: "henna",
    label: "Henna",
    dark: false,
    tokens: {
      "--background": "#E9DCC8",
      "--surface": "#E9DCC8",
      "--foreground": "#7A3B1D",
      "--muted": "#7A3B1D",
      "--border": "#7A3B1D",
      "--accent": "#7A3B1D",
      "--accent-contrast": "#E9DCC8",
    },
  },
  {
    id: "turmeric",
    label: "Turmeric",
    dark: false,
    tokens: {
      "--background": "#F0B429",
      "--surface": "#F0B429",
      "--foreground": "#2A1A12",
      "--muted": "#2A1A12",
      "--border": "#2A1A12",
      "--accent": "#2A1A12",
      "--accent-contrast": "#F0B429",
    },
  },
  {
    id: "sindoor",
    label: "Sindoor",
    dark: false,
    tokens: {
      "--background": "#9E1B1B",
      "--surface": "#9E1B1B",
      "--foreground": "#F6E9D8",
      "--muted": "#F6E9D8",
      "--border": "#F6E9D8",
      "--accent": "#F6E9D8",
      "--accent-contrast": "#9E1B1B",
    },
  },
  {
    id: "paper",
    label: "Paper",
    dark: false,
    tokens: {
      "--background": "#faf9f7",
      "--surface": "#ffffff",
      "--foreground": "#141414",
      "--muted": "#6b6761",
      "--border": "#e3e0da",
      "--accent": "#d9541f",
      "--accent-contrast": "#ffffff",
    },
  },
  {
    id: "ink",
    label: "Ink",
    dark: true,
    tokens: {
      "--background": "#0c0c0d",
      "--surface": "#151517",
      "--foreground": "#ebe9e6",
      "--muted": "#8d8984",
      "--border": "#26262a",
      "--accent": "#ff6b35",
      "--accent-contrast": "#15100d",
    },
  },
];

const TOKEN_NAMES = Object.keys(PALETTES[0].tokens);
const STORAGE_KEY = "palette-lab";

function apply(p: Palette) {
  const el = document.documentElement;
  for (const [name, value] of Object.entries(p.tokens)) {
    el.style.setProperty(name, value);
  }
  el.classList.toggle("dark", p.dark);
  el.style.colorScheme = p.dark ? "dark" : "light";
}

function clear() {
  const el = document.documentElement;
  for (const name of TOKEN_NAMES) el.style.removeProperty(name);
  el.style.removeProperty("color-scheme");
}

export default function PaletteLab() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  // sessionStorage rather than localStorage: the choice should survive a
  // click through to a case study, but not outlive the tab.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      const found = PALETTES.find((p) => p.id === saved);
      if (found) {
        apply(found);
        // Reading initial state back out of an external system is the case
        // this rule exists to allow. It cannot move to a lazy useState
        // initializer because the server has no sessionStorage and the two
        // renders would not match. One extra render on mount, in a tool that
        // gets deleted.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActive(found.id);
      }
    } catch {
      // Private mode or blocked storage. The buttons still work.
    }
  }, []);

  function choose(p: Palette) {
    apply(p);
    setActive(p.id);
    try {
      sessionStorage.setItem(STORAGE_KEY, p.id);
    } catch {}
  }

  function reset() {
    clear();
    setActive(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    // Hand the theme back to whatever the toggle last saved.
    try {
      const saved = localStorage.getItem("theme");
      const dark = saved
        ? saved === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", dark);
    } catch {}
  }

  return (
    <div className="fixed right-4 bottom-4 z-80 font-mono text-[11px]">
      {open ? (
        <div className="w-56 rounded-xl border border-border bg-surface/95 p-3 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between gap-2 pb-2.5">
            <span className="tracking-[0.14em] text-muted uppercase">
              Palette lab
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Hide palette lab"
              className="text-muted transition-colors hover:text-foreground"
            >
              &times;
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => choose(p)}
                aria-pressed={active === p.id}
                className={`flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-left transition-colors ${
                  active === p.id
                    ? "border-accent text-foreground"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden
                  className="size-2.5 shrink-0 rounded-full border"
                  style={{
                    background: p.tokens["--background"],
                    borderColor: p.tokens["--accent"],
                  }}
                />
                <span className="truncate">{p.label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={reset}
            className="mt-2 w-full rounded-md border border-border px-2 py-1.5 text-muted transition-colors hover:text-foreground"
          >
            Reset to CSS
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-border bg-surface/95 px-3 py-2 tracking-[0.14em] text-muted uppercase shadow-lg backdrop-blur transition-colors hover:text-foreground"
        >
          Palette
        </button>
      )}
    </div>
  );
}
