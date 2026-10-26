// Click to copy the email address, with the button confirming it worked.
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      // The Clipboard API returns a promise, so `await` waits for the write to
      // finish before the button changes label. It needs a secure context
      // (https or localhost), which is why the catch matters.
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard refused. The mailto link next to this button still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-foreground"
    >
      <AnimatePresence mode="wait" initial={false}>
        {/* `mode="wait"` makes the outgoing label finish leaving before the
            incoming one starts, so the two never overlap mid-swap. */}
        <motion.span
          key={copied ? "copied" : "copy"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.16 }}
        >
          {copied ? "Copied" : "Copy email"}
        </motion.span>
      </AnimatePresence>
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        {copied ? (
          <path d="M5 13l4 4L19 7" />
        ) : (
          <>
            <rect x="9" y="9" width="11" height="11" rx="2.5" />
            <path d="M15 5.5A2.5 2.5 0 0 0 12.5 4H6.5A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 5.5 15" />
          </>
        )}
      </svg>
    </button>
  );
}
