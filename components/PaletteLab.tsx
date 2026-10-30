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
  tokens: Record<string, string>;
};

// The three choices: paper, ink and the dye-pairing accent. Henna-leaf green
// passes at 4.52. Kumkum red (3.99) and marigold (4.00) are below the 4.5 bar
// for the 11px badges and eyebrow links, and for the filled badge's own label.
// See the notes in globals.css for passing values in the same hues.
const PALETTES: Palette[] = [
  {
    id: "henna",
    label: "Henna",
    tokens: {
      "--background": "#E9DCC8",
      "--surface": "#E9DCC8",
      "--foreground": "#7A3B1D",
      "--muted": "#7A3B1D",
      "--border": "#7A3B1D",
      "--accent": "#4A6B2F",
      "--accent-contrast": "#E9DCC8",
    },
  },
  {
    id: "turmeric",
    label: "Turmeric",
    tokens: {
      "--background": "#F0B429",
      "--surface": "#F0B429",
      "--foreground": "#2A1A12",
      "--muted": "#2A1A12",
      "--border": "#2A1A12",
      "--accent": "#A61E1E",
      "--accent-contrast": "#F0B429",
    },
  },
  {
    id: "sindoor",
    label: "Sindoor",
    tokens: {
      "--background": "#9E1B1B",
      "--surface": "#9E1B1B",
      "--foreground": "#F6E9D8",
      "--muted": "#F6E9D8",
      "--border": "#F6E9D8",
      "--accent": "#F2A93B",
      "--accent-contrast": "#9E1B1B",
    },
  },
];

// Not one of the three. Kept so the old site is one click away for comparison.
const ORIGINAL: Palette = {
  id: "paper",
  label: "Original",
  tokens: {
    "--background": "#faf9f7",
    "--surface": "#ffffff",
    "--foreground": "#141414",
    "--muted": "#6b6761",
    "--border": "#e3e0da",
    "--accent": "#d9541f",
    "--accent-contrast": "#ffffff",
  },
};

const TOKEN_NAMES = Object.keys(PALETTES[0].tokens);
const ALL = [...PALETTES, ORIGINAL];
const STORAGE_KEY = "palette-lab";

function apply(p: Palette) {
  const el = document.documentElement;
  for (const [name, value] of Object.entries(p.tokens)) {
    el.style.setProperty(name, value);
  }
}

function clear() {
  const el = document.documentElement;
  for (const name of TOKEN_NAMES) el.style.removeProperty(name);
}

export default function PaletteLab() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  // sessionStorage rather than localStorage: the choice should survive a
  // click through to a case study, but not outlive the tab.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      const found = ALL.find((p) => p.id === saved);
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

          <div className="flex flex-col gap-1.5">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => choose(p)}
                aria-pressed={active === p.id}
                className={`flex items-center gap-2 rounded-md border px-2 py-2 text-left transition-colors ${
                  active === p.id
                    ? "border-accent text-foreground"
                    : "border-border/50 text-muted hover:text-foreground"
                }`}
              >
                {/* paper, ink, accent: the whole palette in three dots */}
                <span aria-hidden className="flex shrink-0 gap-1">
                  {(["--background", "--foreground", "--accent"] as const).map((k) => (
                    <span
                      key={k}
                      className="size-3 rounded-full ring-1 ring-black/15"
                      style={{ background: p.tokens[k] }}
                    />
                  ))}
                </span>
                <span className="truncate">{p.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-2.5 flex flex-col gap-1.5 border-t border-border/50 pt-2.5">
            <button
              type="button"
              onClick={() => choose(ORIGINAL)}
              aria-pressed={active === ORIGINAL.id}
              className={`flex items-center gap-2 rounded-md border px-2 py-2 text-left transition-colors ${
                active === ORIGINAL.id
                  ? "border-accent text-foreground"
                  : "border-border/50 text-muted hover:text-foreground"
              }`}
            >
              <span aria-hidden className="flex shrink-0 gap-1">
                {(["--background", "--foreground", "--accent"] as const).map((k) => (
                  <span
                    key={k}
                    className="size-3 rounded-full ring-1 ring-black/15"
                    style={{ background: ORIGINAL.tokens[k] }}
                  />
                ))}
              </span>
              <span className="truncate">{ORIGINAL.label}</span>
            </button>

            <button
              type="button"
              onClick={reset}
              className="rounded-md border border-border/50 px-2 py-1.5 text-muted transition-colors hover:text-foreground"
            >
              Reset to CSS
            </button>
          </div>
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
