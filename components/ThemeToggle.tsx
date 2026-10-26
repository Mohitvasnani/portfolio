// Light/dark switch. The `.dark` class on <html> is what Tailwind's `dark:`
// variant keys off (see the @custom-variant line in globals.css), and the
// choice is remembered in localStorage.
//
// Deliberately stateless. The class on <html> is the single source of truth,
// set by the inline script in layout.tsx before the first paint, and both
// icons below are swapped by CSS off that same class. Mirroring the theme into
// React state as well would mean two sources of truth and a flicker while they
// agreed with each other.
"use client";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    // `classList.toggle` returns true if the class is now present, which is
    // exactly the "is it dark now" answer needed for the next line.
    const isDark = root.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Private browsing can refuse localStorage. The toggle still works for
      // this visit, it just will not be remembered, which is fine.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-foreground"
    >
      {/* Sun in light mode, moon in dark. Both are always in the DOM and CSS
          hides one, so the server and client render identical markup. */}
      <svg
        viewBox="0 0 24 24"
        className="size-4 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="hidden size-4 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" />
      </svg>
    </button>
  );
}
