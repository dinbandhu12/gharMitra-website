"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "./Button";

/**
 * Full-bleed editorial hero — large photograph with a thin headline overlaid,
 * in the spirit of award-style architecture/energy sites. Headline rises
 * line-by-line out of overflow masks on load.
 */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set("[data-reveal-line], [data-fade]", { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.2,
      });
      tl.from("[data-hero-img]", { scale: 1.12, duration: 1.8 }, 0)
        .from(
          "[data-reveal-line]",
          { yPercent: 115, duration: 1.2, stagger: 0.12 },
          0.25
        )
        .from(
          "[data-fade]",
          { opacity: 0, y: 18, duration: 1, stagger: 0.12 },
          "-=0.7"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Background photograph */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-hero-img
          src="/hero-bgimg.avif"
          alt="A modern home"
          className="h-full w-full object-cover"
        />
        {/* Legibility gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center md:justify-end px-5 sm:px-8 sm:pb-24">
        <p
          data-fade
          className="mb-6 text-xs font-medium uppercase tracking-[0.32em] text-white/70"
        >
          Your trusted home companion
        </p>

        <h1 className="font-display text-[clamp(3.2rem,8vw,7rem)] font-light leading-[0.98] tracking-[-0.03em] text-white">
          <span className="reveal-mask block">
            <span data-reveal-line className="block">
              Find a home,
            </span>
          </span>
          <span className="reveal-mask block">
            <span data-reveal-line className="block text-[#52a9ff]">
              or list yours
            </span>
          </span>
          <span className="reveal-mask block">
            <span data-reveal-line className="block">
              the simple way.
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            data-fade
            className="max-w-lg text-[18px] md:text-base leading-relaxed text-white/75"
          >
            gharMitra connects house owners and home seekers directly. Upload
            photos and videos, see real prices, and contact the owner with one
            tap. No brokers. No confusion.
          </p>

          <div data-fade className="flex flex-wrap items-center gap-3">
            {/* Hero download — direct APK link */}
            <Button
              href="https://github.com/dinbandhu12/gharMitra-apprelease/releases/download/v1.2.2/gharMitra-v1.2.2.apk"
              variant="light"
            >
              Download the App
            </Button>
            <Button href="/work" variant="outlineLight">
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
