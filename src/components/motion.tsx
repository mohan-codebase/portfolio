"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { useEffect } from "react";

import { SCROLL_LOCK_EVENT } from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "expo.out";

/** Exponential ease-out for programmatic scrolls (fast start, long soft landing). */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * All page motion in one place.
 *
 * Lenis gives the page inertial, eased scrolling and drives ScrollTrigger from
 * GSAP's ticker, so every scroll-linked animation moves on the same smoothed
 * frame. Markup opts in through data attributes:
 * - [data-reveal]    fades and rises in when scrolled into view (batched + staggered)
 * - [data-split]     heading lines slide up from behind a mask
 * - [data-curtain]   project frames wipe open from the bottom
 * - [data-parallax]  "cover" images drift, "device" screenshots rise into place
 * - [data-hero]      hero headline drifts up as you scroll away
 * - [data-wordmark]  footer name, letter by letter
 * Nothing runs with prefers-reduced-motion: the page keeps native scrolling.
 */
export function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";

      /* ---------------------------------------------------------------- */
      /* Smooth scroll                                                     */
      /* ---------------------------------------------------------------- */

      const lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.95,
        smoothWheel: true,
        // Touch devices keep their native momentum scrolling.
        syncTouch: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // A link tapped in the mobile menu waits until the menu has closed and the
      // page has reflowed (the scrollbar comes back), so the target is measured correctly.
      let pendingScroll: (() => void) | null = null;
      const onLock = (event: Event) => {
        if ((event as CustomEvent<boolean>).detail) {
          lenis.stop();
          return;
        }
        lenis.start();
        const run = pendingScroll;
        pendingScroll = null;
        if (run) requestAnimationFrame(run);
      };
      window.addEventListener(SCROLL_LOCK_EVENT, onLock);

      // Eased scrolling for in-page links (the skip link keeps native behaviour).
      const onClick = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
        const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        const hash = link?.getAttribute("href");
        if (!link || !hash || hash === "#" || hash === "#main") return;
        const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
        if (target === null) return;

        event.preventDefault();
        history.pushState(null, "", hash);
        const go = () =>
          // The header offset comes from `scroll-padding-top` on <html>, which Lenis honours.
          lenis.scrollTo(target, {
            duration: 1.6,
            easing: easeOutExpo,
          });
        if (lenis.isStopped) pendingScroll = go;
        else go();
      };
      document.addEventListener("click", onClick);

      /* ---------------------------------------------------------------- */
      /* Reveals                                                           */
      /* ---------------------------------------------------------------- */

      // Content fades and rises in, staggered when several items enter together.
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (elements) =>
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 1.4,
            ease: EASE,
            stagger: 0.09,
            overwrite: true,
            // Leave no transform behind: a transformed element would capture the
            // absolutely positioned full-card links inside it.
            // The final state is written inline so it never depends on a stylesheet rule.
            onComplete() {
              for (const el of elements as HTMLElement[]) {
                el.setAttribute("data-revealed", "");
                el.style.transform = "none";
                el.style.opacity = "1";
                el.style.visibility = "visible";
              }
            },
          }),
      });

      // Project frames wipe open from the bottom.
      ScrollTrigger.batch("[data-curtain]", {
        start: "top 88%",
        once: true,
        onEnter: (elements) =>
          gsap.to(elements, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.inOut", stagger: 0.12 }),
      });

      // Masked line reveals for large headings. autoSplit re-splits after fonts load or on resize.
      const splits = gsap.utils.toArray<HTMLElement>("[data-split]").map((el) =>
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 });
            return gsap.from(self.lines, {
              yPercent: 115,
              rotate: 2,
              transformOrigin: "0% 0%",
              duration: 1.5,
              ease: EASE,
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        }),
      );

      // Footer wordmark, letter by letter.
      const wordmark = document.querySelector<HTMLElement>("[data-wordmark]");
      const wordmarkSplit = wordmark
        ? SplitText.create(wordmark, {
            type: "chars",
            mask: "chars",
            onSplit(self) {
              gsap.set(wordmark, { autoAlpha: 1 });
              return gsap.from(self.chars, {
                yPercent: 100,
                duration: 1.8,
                ease: EASE,
                stagger: 0.06,
                scrollTrigger: { trigger: wordmark, start: "top 98%", once: true },
                // Drop the leftover transform so the letters render as crisp, plain text.
                onComplete() {
                  gsap.set(self.chars, { clearProps: "transform" });
                },
              });
            },
          })
        : null;

      /* ---------------------------------------------------------------- */
      /* Scroll-linked                                                     */
      /* ---------------------------------------------------------------- */

      // Project imagery parallax. Lenis already smooths the input, so scrub tracks it directly.
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const scrollTrigger = { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true };
        if (el.dataset.parallax === "device") {
          gsap.fromTo(el, { yPercent: 16 }, { yPercent: -4, ease: "none", scrollTrigger });
        } else {
          // Zoom from the left edge so website screenshots never lose their logo / left column.
          gsap.fromTo(
            el,
            { yPercent: -5, scale: 1.12, transformOrigin: "0% 50%" },
            { yPercent: 5, scale: 1.12, ease: "none", scrollTrigger },
          );
        }
      });

      // Hero headline drifts and softens as the page scrolls.
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        gsap.to(hero, {
          yPercent: -24,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
        });
      }

      return () => {
        document.removeEventListener("click", onClick);
        window.removeEventListener(SCROLL_LOCK_EVENT, onLock);
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
        splits.forEach((split) => split.revert());
        wordmarkSplit?.revert();
        root.style.scrollBehavior = "";
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
