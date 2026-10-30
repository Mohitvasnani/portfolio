"use client";

// Half mandala behind the hero, rotating with the scroll position.
//
// It expands to roughly 490 drawn elements, so it is deliberately rendered
// once, large, in one place. Do not repeat it down the page.
//
// The rotation is written straight to the DOM rather than held in React
// state, so scrolling never triggers a re-render.

import { useEffect, useRef } from "react";

type MandalaProps = {
  /** Positioning/size classes for the wrapper (Tailwind). */
  className?: string;
  /** Degrees of rotation per pixel scrolled. 0.15 = 150deg per 1000px. */
  speed?: number;
  /**
   * Pixels it travels down per pixel scrolled. 0 pins it to the page and it
   * scrolls away normally. 0.3 means it falls at 30% of the page's speed, so
   * it drifts downward as it turns and stays in view longer.
   *
   * The drift goes on the wrapper and the rotation on the svg, because they
   * are separate elements. Putting both on one would mean one inline
   * transform string, and the Tailwind positioning classes would fight it.
   */
  drift?: number;
};

export default function Mandala({
  className = "",
  speed = 0.15,
  drift = 0,
}: MandalaProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const wrap = wrapRef.current;
    if (!svg) return;

    // Respect users who have asked their OS for less motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      svg.style.transform = `rotate(${y * speed}deg)`;
      if (wrap && drift) wrap.style.transform = `translateY(${y * drift}px)`;
    };

    // Scroll fires many times per frame; requestAnimationFrame batches it to once per frame.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update(); // correct angle if the page loads already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed, drift]);

  return (
    <div ref={wrapRef} aria-hidden="true" className={className}>
      <svg
        ref={svgRef}
        viewBox="-512 -512 1024 1024"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-full will-change-transform"
      >
        <defs>
          {/* Each ring = one shape, doubled by rotating copies of itself (2, 4, 8, 16...). */}
          <g id="m-pA">
            <path d="M0,-36 C14,-52 14,-80 0,-100 C-14,-80 -14,-52 0,-36Z" />
            <path d="M0,-46 L0,-88" />
          </g>
          <g id="m-a2"><use href="#m-pA" /><use href="#m-pA" transform="rotate(180)" /></g>
          <g id="m-a4"><use href="#m-a2" /><use href="#m-a2" transform="rotate(90)" /></g>
          <g id="m-a8"><use href="#m-a4" /><use href="#m-a4" transform="rotate(45)" /></g>

          <path id="m-pA2" d="M0,-40 C8,-50 8,-64 0,-72 C-8,-64 -8,-50 0,-40Z" />
          <g id="m-h2"><use href="#m-pA2" /><use href="#m-pA2" transform="rotate(180)" /></g>
          <g id="m-h4"><use href="#m-h2" /><use href="#m-h2" transform="rotate(90)" /></g>
          <g id="m-h8"><use href="#m-h4" /><use href="#m-h4" transform="rotate(45)" /></g>

          <circle id="m-pG" cx="0" cy="-104" r="2" />
          <g id="m-g2"><use href="#m-pG" /><use href="#m-pG" transform="rotate(180)" /></g>
          <g id="m-g4"><use href="#m-g2" /><use href="#m-g2" transform="rotate(90)" /></g>
          <g id="m-g8"><use href="#m-g4" /><use href="#m-g4" transform="rotate(45)" /></g>
          <g id="m-g16"><use href="#m-g8" /><use href="#m-g8" transform="rotate(22.5)" /></g>

          <g id="m-pB">
            <path d="M0,-115 C24,-140 24,-182 0,-206 C-24,-182 -24,-140 0,-115Z" />
            <path d="M0,-122 C16,-142 16,-176 0,-194 C-16,-176 -16,-142 0,-122Z" />
            <path d="M0,-134 L0,-180" />
          </g>
          <g id="m-b2"><use href="#m-pB" /><use href="#m-pB" transform="rotate(180)" /></g>
          <g id="m-b4"><use href="#m-b2" /><use href="#m-b2" transform="rotate(90)" /></g>
          <g id="m-b8"><use href="#m-b4" /><use href="#m-b4" transform="rotate(45)" /></g>
          <g id="m-b16"><use href="#m-b8" /><use href="#m-b8" transform="rotate(22.5)" /></g>

          <path id="m-pT" d="M0,-176 C7,-186 7,-200 0,-210 C-7,-200 -7,-186 0,-176Z" />
          <g id="m-t2"><use href="#m-pT" /><use href="#m-pT" transform="rotate(180)" /></g>
          <g id="m-t4"><use href="#m-t2" /><use href="#m-t2" transform="rotate(90)" /></g>
          <g id="m-t8"><use href="#m-t4" /><use href="#m-t4" transform="rotate(45)" /></g>
          <g id="m-t16"><use href="#m-t8" /><use href="#m-t8" transform="rotate(22.5)" /></g>

          <g id="m-pC">
            <path d="M-31,-238 Q0,-312 31,-238" />
            <circle cx="0" cy="-294" r="3.5" />
          </g>
          <g id="m-c3"><use href="#m-pC" /><use href="#m-pC" transform="rotate(120)" /><use href="#m-pC" transform="rotate(240)" /></g>
          <g id="m-c6"><use href="#m-c3" /><use href="#m-c3" transform="rotate(60)" /></g>
          <g id="m-c12"><use href="#m-c6" /><use href="#m-c6" transform="rotate(30)" /></g>
          <g id="m-c24"><use href="#m-c12" /><use href="#m-c12" transform="rotate(15)" /></g>

          <path id="m-pC2" d="M-33,-252 Q0,-326 33,-252" />
          <g id="m-k3"><use href="#m-pC2" /><use href="#m-pC2" transform="rotate(120)" /><use href="#m-pC2" transform="rotate(240)" /></g>
          <g id="m-k6"><use href="#m-k3" /><use href="#m-k3" transform="rotate(60)" /></g>
          <g id="m-k12"><use href="#m-k6" /><use href="#m-k6" transform="rotate(30)" /></g>
          <g id="m-k24"><use href="#m-k12" /><use href="#m-k12" transform="rotate(15)" /></g>

          <path id="m-pZ" d="M-20.9,-319.3 L0,-334 L20.9,-319.3" />
          <g id="m-z3"><use href="#m-pZ" /><use href="#m-pZ" transform="rotate(120)" /><use href="#m-pZ" transform="rotate(240)" /></g>
          <g id="m-z6"><use href="#m-z3" /><use href="#m-z3" transform="rotate(60)" /></g>
          <g id="m-z12"><use href="#m-z6" /><use href="#m-z6" transform="rotate(30)" /></g>
          <g id="m-z24"><use href="#m-z12" /><use href="#m-z12" transform="rotate(15)" /></g>
          <g id="m-z48"><use href="#m-z24" /><use href="#m-z24" transform="rotate(7.5)" /></g>

          <g id="m-pD">
            <path d="M0,-345 C26,-372 22,-420 0,-462 C-22,-420 -26,-372 0,-345Z" />
            <path d="M0,-364 C10,-382 9,-410 0,-434 C-9,-410 -10,-382 0,-364Z" />
            <path d="M0,-376 L0,-422" />
          </g>
          <g id="m-d2"><use href="#m-pD" /><use href="#m-pD" transform="rotate(180)" /></g>
          <g id="m-d4"><use href="#m-d2" /><use href="#m-d2" transform="rotate(90)" /></g>
          <g id="m-d8"><use href="#m-d4" /><use href="#m-d4" transform="rotate(45)" /></g>
          <g id="m-d16"><use href="#m-d8" /><use href="#m-d8" transform="rotate(22.5)" /></g>
          <g id="m-d32"><use href="#m-d16" /><use href="#m-d16" transform="rotate(11.25)" /></g>

          <g id="m-pU">
            <path d="M0,-418 L0,-440" />
            <circle cx="0" cy="-446" r="3" />
          </g>
          <g id="m-u2"><use href="#m-pU" /><use href="#m-pU" transform="rotate(180)" /></g>
          <g id="m-u4"><use href="#m-u2" /><use href="#m-u2" transform="rotate(90)" /></g>
          <g id="m-u8"><use href="#m-u4" /><use href="#m-u4" transform="rotate(45)" /></g>
          <g id="m-u16"><use href="#m-u8" /><use href="#m-u8" transform="rotate(22.5)" /></g>
          <g id="m-u32"><use href="#m-u16" /><use href="#m-u16" transform="rotate(11.25)" /></g>

          <path id="m-pF" d="M-23.06,-469.43 Q0,-492 23.06,-469.43" />
          <g id="m-f2"><use href="#m-pF" /><use href="#m-pF" transform="rotate(180)" /></g>
          <g id="m-f4"><use href="#m-f2" /><use href="#m-f2" transform="rotate(90)" /></g>
          <g id="m-f8"><use href="#m-f4" /><use href="#m-f4" transform="rotate(45)" /></g>
          <g id="m-f16"><use href="#m-f8" /><use href="#m-f8" transform="rotate(22.5)" /></g>
          <g id="m-f32"><use href="#m-f16" /><use href="#m-f16" transform="rotate(11.25)" /></g>
          <g id="m-f64"><use href="#m-f32" /><use href="#m-f32" transform="rotate(5.625)" /></g>

          <circle id="m-pE" cx="0" cy="-495" r="3" />
          <g id="m-e2"><use href="#m-pE" /><use href="#m-pE" transform="rotate(180)" /></g>
          <g id="m-e4"><use href="#m-e2" /><use href="#m-e2" transform="rotate(90)" /></g>
          <g id="m-e8"><use href="#m-e4" /><use href="#m-e4" transform="rotate(45)" /></g>
          <g id="m-e16"><use href="#m-e8" /><use href="#m-e8" transform="rotate(22.5)" /></g>
          <g id="m-e32"><use href="#m-e16" /><use href="#m-e16" transform="rotate(11.25)" /></g>
        </defs>

        {/* Centre outwards */}
        <circle r="10" fill="currentColor" stroke="none" />
        <circle r="16" />
        <circle r="22" />
        <circle r="30" strokeDasharray="2 6" />
        <use href="#m-h8" transform="rotate(22.5)" />
        <use href="#m-a8" fill="currentColor" fillOpacity={0.07} />
        <use href="#m-g16" transform="rotate(11.25)" fill="currentColor" stroke="none" />
        <circle r="110" strokeOpacity={0.45} />
        <use href="#m-b16" fill="currentColor" fillOpacity={0.07} />
        <use href="#m-t16" transform="rotate(11.25)" />
        <circle r="218" />
        <circle r="228" strokeDasharray="0.5 10" strokeWidth={3} />
        <use href="#m-c24" />
        <use href="#m-k24" transform="rotate(7.5)" strokeOpacity={0.45} />
        <circle r="318" strokeOpacity={0.45} />
        <use href="#m-z48" />
        <circle r="337" />
        <use href="#m-d32" fill="currentColor" fillOpacity={0.07} />
        <use href="#m-u32" transform="rotate(5.625)" />
        <use href="#m-f64" />
        <use href="#m-e32" fill="currentColor" stroke="none" />
        <circle r="504" strokeDasharray="1 7" strokeOpacity={0.6} />
      </svg>
    </div>
  );
}
