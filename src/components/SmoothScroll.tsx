"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "./lenisStore";

/**
 * Global smooth-scroll provider.
 * Lenis drives inertia scrolling; GSAP's ticker drives Lenis' RAF loop and
 * keeps ScrollTrigger in sync so scroll-driven animations stay accurate.
 * Also intercepts same-page hash links (e.g. "/#how") so they glide to the
 * section instead of jumping. Respects prefers-reduced-motion.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Smooth-scroll for same-page anchor links (nav, hero buttons, etc.).
    // Capture phase so we intercept before Next.js <Link> handles the click.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;

      const url = new URL(href, window.location.href);
      // Only handle links that point at a section on the current page.
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      // preventDefault alone makes Next.js <Link> skip its own navigation;
      // we intentionally let the event keep bubbling so menu links can close.
      e.preventDefault();
      // The mobile menu stops Lenis while open. Restart it *before* scrolling:
      // a later start() would reset() and cancel the in-flight animation.
      if (lenis.isStopped) lenis.start();
      lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.3 });
      window.history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
