// An endlessly scrolling strip of technology names. No JavaScript: the
// movement is the `animate-marquee` keyframe defined in globals.css, so this
// stays a Server Component.
import { marquee } from "@/lib/site";

export default function Marquee() {
  // The list is rendered twice. The animation moves the track by exactly -50%,
  // which is one full copy, so the second copy is mid-frame when the first
  // finishes and the loop has no visible jump.
  const items = [...marquee, ...marquee];

  return (
    <div className="fade-x relative overflow-hidden border-y border-border py-5">
      <ul className="animate-marquee flex w-max items-center gap-10 will-change-transform">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 font-mono text-xs tracking-[0.14em] whitespace-nowrap text-muted uppercase"
            // The duplicated half is decorative, so screen readers skip it.
            aria-hidden={i >= marquee.length}
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-accent/60" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
