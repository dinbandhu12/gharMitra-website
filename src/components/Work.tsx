"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

/* Shared primitives -------------------------------------------------------- */

function Eyebrow({
  children,
  dark = false,
  right = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
  right?: boolean;
}) {
  return (
    <p
      className={`text-xs font-medium uppercase tracking-[0.3em] ${
        dark ? "text-accent-soft" : "text-accent"
      } ${right ? "text-right" : ""}`}
    >
      {children}
    </p>
  );
}

/* --------------------------------- Hero ----------------------------------- */

/* Solid-color hero matching the reference: a flat muted band (no image), with a
   large light headline top-left and two columns of supporting text lower-right. */
function WorkHero() {
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
        delay: 0.15,
      });
      tl.from(
        "[data-reveal-line]",
        { yPercent: 115, duration: 1.1, stagger: 0.12 },
        0
      ).from(
        "[data-fade]",
        { opacity: 0, y: 16, duration: 0.9, stagger: 0.12 },
        "-=0.5"
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[88svh] w-full flex-col bg-[#6b6660] text-white"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-14 pt-28 sm:justify-start sm:px-8 sm:pb-16 sm:pt-44">
        <h1 className="font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-white/95">
          <span className="reveal-mask block">
            <span data-reveal-line className="block">
              A simpler way to
            </span>
          </span>
          <span className="reveal-mask block">
            <span data-reveal-line className="block">
              find or list a home.
            </span>
          </span>
        </h1>

        <div className="mt-8 sm:mt-auto sm:flex sm:justify-end sm:pt-20">
          <div className="grid max-w-2xl gap-x-10 gap-y-6 text-[15px] leading-relaxed text-white/75 sm:grid-cols-2">
            <p data-fade>
              gharMitra connects home owners and seekers directly verified
              listings, real photos and video, and one-tap contact, with no
              broker in between.
            </p>
            <p data-fade>
              Here&apos;s the whole platform, end to end: how you list, how you
              search, and how you connect built to stay simple for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Capabilities ------------------------------- */

const capabilities = [
  {
    title: "Verified, visual listings",
    body: "Real photos and up to three short video walkthroughs on every home so what you see on screen is exactly what you visit.",
    img: "/website-img/img-1.avif",
  },
  {
    title: "Talk to owners directly",
    body: "Message or call the owner in a single tap. No brokers, no markup, no middlemen standing between you and your next home.",
    img: "/website-img/img-2.jpg",
  },
  {
    title: "Built for every user",
    body: "Large text, clear steps, and your own language. If you can make a phone call, you already know how to use gharMitra.",
    img: "/website-img/img-3.png",
  },
];

/* <img> helper to suppress next/no-img-element in one place. */
function CapImg({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img data-cap-img src={src} alt={alt} loading="lazy" className={className} />
  );
}

const capHeading = (
  <Reveal>
    <Eyebrow>What powers it</Eyebrow>
    <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.04] tracking-[-0.025em]">
      Designed to make renting
      <br />
      honest and effortless.
    </h2>
  </Reveal>
);

/* Showcase: on desktop the image column is `position: sticky` and stays in view
   while the three blurbs scroll past on the right; an IntersectionObserver swaps
   the pinned image (01 → 02 → 03) as each blurb reaches the centre of the
   viewport. On mobile (where a side-by-side sticky makes no sense) it falls back
   to a clean image-then-text stack. No GSAP pinning / ScrollTrigger, so there's
   nothing for Lenis or mobile browser-chrome resize to break. */
function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // gsap.matchMedia only runs this on desktop (where the pinned row exists)
    // and auto-reverts on resize below lg, so the mobile stack is untouched.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const scope = root.current!;
      const track = scope.querySelector<HTMLElement>("[data-track]");
      const imgs = gsap.utils.toArray<HTMLElement>("[data-show-img]", scope);
      const panels = gsap.utils.toArray<HTMLElement>("[data-show-panel]", scope);
      if (!track || imgs.length === 0) return;

      gsap.set([...imgs, ...panels], { opacity: 0 });
      gsap.set([imgs[0], panels[0]], { opacity: 1 });

      // Scroll-LINKED crossfade: `scrub` ties progress to the scroll position so
      // the fade tracks the user's scroll instead of snapping. Pinning is still
      // CSS `position: sticky` (no GSAP pin → nothing to jank on mobile).
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      const HOLD = 1; // scroll spent holding a step
      const FADE = 0.7; // scroll spent crossfading between steps
      for (let i = 1; i < imgs.length; i++) {
        tl.to([imgs[i - 1], panels[i - 1]], { opacity: 0, duration: FADE }, `+=${HOLD}`)
          .to([imgs[i], panels[i]], { opacity: 1, duration: FADE }, "<");
      }
      tl.to({}, { duration: HOLD }); // hold the final step before unpinning
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 sm:pt-28">
        {capHeading}
      </div>

      {/* Desktop: a pinned 50/50 row (image | dark panel) held by CSS sticky.
          GSAP scrubs the crossfade of both the image and the panel's number/
          title/body as the track scrolls past — smooth and scroll-linked. */}
      <div
        data-track
        className="relative mt-12 hidden lg:block"
        style={{ height: `${capabilities.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen">
          <div className="grid h-full w-full grid-cols-2">
            {/* Left — image */}
            <div className="relative h-full overflow-hidden bg-paper-deep">
              {capabilities.map((c, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={c.title}
                  data-show-img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover ${
                    i === 0 ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

            {/* Right — brand-teal panel (distinct from the near-black KeyStats
                section below); number top-left, title + body bottom-left */}
            <div className="relative h-full bg-accent-deep text-paper">
              {capabilities.map((c, i) => (
                <div
                  key={c.title}
                  data-show-panel
                  className={`pointer-events-none absolute inset-0 flex flex-col justify-between p-12 xl:p-20 ${
                    i === 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="font-display text-xl font-light tabular-nums text-paper/55">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(1.8rem,2.6vw,2.8rem)] font-medium leading-[1.1] tracking-tight text-paper">
                      {c.title}
                    </h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-paper/65">
                      {c.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: flush image + dark panel, stacked. */}
      <div className="mt-12 px-5 sm:px-8 lg:hidden">
        <div className="space-y-12">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={0.05}>
              <div className="overflow-hidden">
                <div className="relative aspect-[4/3] w-full bg-paper-deep">
                  <CapImg
                    src={c.img}
                    alt={c.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="bg-accent-deep p-7 text-paper">
                  <span className="font-display text-lg font-light tabular-nums text-paper/55">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-medium leading-[1.1] tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-paper/65">
                    {c.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Key stats -------------------------------- */

const stats = [
  { k: "Verified listings", v: "28,000+" },
  { k: "Towns & cities", v: "60+" },
  { k: "Brokerage fee", v: "₹0" },
  { k: "Languages supported", v: "8+" },
  { k: "Videos per listing", v: "Up to 3" },
  { k: "Owner response time", v: "Under a day" },
];

function KeyStats() {
  return (
    <section className="bg-night px-5 py-28 text-paper sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Eyebrow dark>By the numbers</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.05] tracking-[-0.025em] text-paper">
            Built for real homes,
            <br />
            real people, real prices.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/60">
            Every number here exists because someone found a home, or filled
            one, without paying a broker. That&apos;s the only metric we&apos;re
            really chasing.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border-t border-paper/15">
            {stats.map((s) => (
              <div
                key={s.k}
                className="flex items-baseline justify-between gap-6 border-b border-paper/15 py-6"
              >
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-paper/55">
                  {s.k}
                </span>
                <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-none tracking-tight text-paper">
                  {s.v}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Steps ----------------------------------- */
/* "Three simple steps" — staggered, diagonal flow with connector arrows,
   matching the figma. The step-1/2/3 graphics show the brand mark being built. */

const steps = [
  {
    k: "Step 1",
    title: "Sign up in seconds.",
    body: "Use your Google account or phone number - no paperwork, no waiting.",
    img: "/website-img/step-1.png",
  },
  {
    k: "Step 2",
    title: "List or search.",
    body: "Owners post their property with photos and video; seekers browse nearby homes.",
    img: "/website-img/step-2.png",
  },
  {
    k: "Step 3",
    title: "Connect directly.",
    body: "Tap to call or message the owner and take it forward - no broker in between.",
    img: "/website-img/step-3.png",
  },
];

/** Decorative L-shaped connector that leads into steps 2 and 3. */
function Connector() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 120"
      className="pointer-events-none absolute -top-20 -left-6 hidden h-28 w-28 text-line lg:block"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M2 2 V70 H110 M104 64 l6 6 -6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepBlock({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  return (
    <div className="relative flex items-start gap-8">
      {index > 0 && <Connector />}
      <div className="w-28 shrink-0 sm:w-36">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={step.img}
          alt={step.title}
          loading="lazy"
          className="w-full object-contain"
        />
      </div>
      <div className="max-w-xs pt-4">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {step.k}
        </span>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-tight">
          {step.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          {step.body}
        </p>
      </div>
    </div>
  );
}

function Steps() {
  return (
    <section id="how" className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow right>How it works</Eyebrow>
          <h2 className="mt-4 text-right font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.0] tracking-[-0.03em]">
            Three simple steps.
          </h2>
        </Reveal>

        {/* Desktop: staggered diagonal flow with connectors */}
        <div className="mt-20 hidden lg:block">
          <div className="space-y-16">
            {steps.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.08}>
                <div
                  className={
                    i === 1 ? "ml-[28%]" : i === 2 ? "ml-[56%]" : ""
                  }
                >
                  <StepBlock step={s} index={i} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: clean vertical stack */}
        <div className="mt-14 space-y-12 lg:hidden">
          {steps.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.08}>
              <StepBlock step={s} index={0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Image band + roadmap -------------------------- */
/* We're brand new, so this section owns that — a forward-looking roadmap rather
   than a list of past milestones. */

const roadmap = [
  {
    phase: "Now",
    label: "Live and growing, one neighbourhood at a time, with real verified listings.",
  },
  {
    phase: "Next",
    label: "New towns and homes added every week as more owners join.",
  },
  {
    phase: "Soon",
    label: "Richer video walkthroughs and more regional languages.",
  },
  {
    phase: "The goal",
    label: "A broker-free home for every Indian family.",
    highlight: true,
  },
];

function BandAndTimeline() {
  return (
    <>
      {/* Full-bleed image band */}
      <section>
        <Reveal y={40}>
          <div className="relative h-[90vh] min-h-[520px] w-full overflow-hidden bg-paper-deep">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/website-img/img-4.avif"
              alt="A neighbourhood of homes"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/45 via-black/5 to-transparent" />
            <div className="absolute bottom-6 left-5 right-5 rounded-md border border-white/25 bg-white/10 p-6 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md sm:bottom-10 sm:left-auto sm:right-10 sm:max-w-md sm:p-8">
              <h3 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
                Built to scale, made to stay simple.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                Every town we add works the same way list, browse, connect.
                No new rules to learn, wherever you live.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Roadmap — honest about being new, focused on momentum */}
      <section className="bg-paper-deep px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>Where we&apos;re headed</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.05] tracking-[-0.025em]">
              New here and moving
              <br />
              fast on purpose.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              gharMitra is young, and that&apos;s the advantage. No legacy, no
              broker incentives to protect just a clean platform built for how
              India actually rents today, growing a little every week.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-y-10 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {roadmap.map((m, i) => (
              <Reveal key={m.phase} delay={i * 0.08}>
                <div className="lg:border-l lg:border-ink/15 lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                  <p
                    className={`font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-none tracking-tight ${
                      m.highlight ? "text-accent" : "text-ink"
                    }`}
                  >
                    {m.phase}
                  </p>
                  <p className="mt-4 max-w-[14rem] text-[15px] leading-relaxed text-ink-soft">
                    {m.label}
                  </p>
                  {/* Mobile-only fading divider after the first three items */}
                  {i < roadmap.length - 1 && (
                    <div className="mt-10 h-px w-full bg-gradient-to-r from-ink/30 via-ink/15 to-transparent sm:hidden" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------ Who it's for ------------------------------ */

const audiences = [
  "Families looking for a fresh start",
  "Students & first-jobbers",
  "Working professionals on the move",
  "Property owners with a home to fill",
  "Newlyweds setting up together",
  "Senior citizens who value simplicity",
];

function WhoItsFor() {
  return (
    <section className="bg-night px-5 py-28 text-paper sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow dark>Who it&apos;s for</Eyebrow>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.05] tracking-[-0.025em] text-paper">
            A home, for everyone
            <br />
            wherever you&apos;re starting from.
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-paper/15">
          {audiences.map((a, i) => (
            <Reveal key={a} delay={i * 0.05}>
              <div className="group flex items-center justify-between gap-6 border-b border-paper/15 py-7">
                <span className="flex items-baseline gap-5">
                  <span className="font-display text-sm font-medium tabular-nums text-accent-soft">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[clamp(1.3rem,3vw,2.2rem)] font-light tracking-tight text-paper">
                    {a}
                  </span>
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-5 w-5 shrink-0 text-paper/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-soft"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 8h11M9 4l4 4-4 4" />
                </svg>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Composed --------------------------------- */

export default function Work() {
  useEffect(() => {
    // ScrollTrigger isn't strictly needed here yet, but registering keeps the
    // plugin available if we add scroll-driven effects to this page later.
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <>
      <WorkHero />
      <Capabilities />
      <KeyStats />
      <Steps />
      <WhoItsFor />
      <BandAndTimeline />
    </>
  );
}
