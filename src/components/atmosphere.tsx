"use client";

import { useEffect, useRef } from "react";

/**
 * Page backdrop: a fine film grain over everything, plus a soft light that
 * trails the cursor on desktop. Both ignore pointer events; the light stays
 * off for touch devices and reduced motion.
 */
export function Atmosphere() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glow.current;
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!el || !query.matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    let frame = 0;

    const render = () => {
      // Ease towards the pointer so the light drifts instead of snapping.
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(render) : 0;
    };

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      el.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    render();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          ref={glow}
          className="absolute top-0 left-0 size-[44rem] rounded-full opacity-0 transition-opacity duration-1000 will-change-transform"
          style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        />
      </div>
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60] overflow-hidden" />
    </>
  );
}
