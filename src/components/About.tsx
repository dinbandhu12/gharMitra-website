"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import Button from "./Button";

/* Shared editorial primitives (mirrors Sections.tsx) ----------------------- */

function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`text-xs font-medium uppercase tracking-[0.3em] ${
        dark ? "text-accent-soft" : "text-accent"
      }`}
    >
      {children}
    </p>
  );
}

/* ------------------------------- Hero ------------------------------------- */
/* Full-bleed photo with a thin headline that rises out of overflow masks on
   load, and a slow background scale — same language as the home Hero.        */

function AboutHero() {
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
      tl.from("[data-hero-img]", { scale: 1.14, duration: 1.8 }, 0)
        .from(
          "[data-reveal-line]",
          { yPercent: 115, duration: 1.2, stagger: 0.12 },
          0.25
        )
        .from(
          "[data-fade]",
          { opacity: 0, y: 18, duration: 1, stagger: 0.1 },
          "-=0.7"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[90svh] md:h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-hero-img
          src="/website-img/about-hero-img.jpg"
          alt="A suburban home at golden hour"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/65" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center md:justify-end px-5 md:pb-16 ">
        <p
          data-fade
          className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/70"
        >
          About gharMitra
        </p>

        <h1 className="font-display text-[clamp(3rem,5vw,3.75rem)] font-light leading-[1.04] tracking-[-0.02em] text-white">
          <span className="reveal-mask block">
            <span data-reveal-line className="block">
              A home for every
            </span>
          </span>
          <span className="reveal-mask block">
            <span data-reveal-line className="block">
              Indian family, without
            </span>
          </span>
          <span className="reveal-mask block">
            <span data-reveal-line className="block">
              the broker.
            </span>
          </span>
        </h1>

        <p
          data-fade
          className="mt-5 max-w-md text-md md:text-sm leading-relaxed text-white/75"
        >
          Finding or listing a home should be honest, direct, and simple enough
          for anyone — no middlemen, no markups, no confusion.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------- Vision ----------------------------------- */
/* Two-column intro + a wide image that drifts on scroll (parallax).          */

function Vision() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to("[data-parallax]", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-parallax-wrap]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="overflow-hidden px-5 py-28 sm:px-8 sm:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <Eyebrow>Our vision</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.0] tracking-[-0.03em]">
              A future where
              <br />
              every home finds its{" "}
              <span className="text-accent">people.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
              We imagine an India where a family in a small town can list their
              spare room as easily as a landlord in a metro, and where a young
              worker can find a place near work without paying a month&apos;s
              rent to a broker. By putting owners and seekers in direct contact,
              we&apos;re unlocking trust — and giving everyone a fair shot at a
              place to call home.
            </p>
          </Reveal>
        </div>

        {/* Wide parallax image */}
        <Reveal y={40}>
          <div
            data-parallax-wrap
            className="relative mt-16 h-[78vh] min-h-[640px] w-full overflow-hidden rounded-[4px] bg-paper-deep sm:mt-20"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-parallax
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80"
              alt="A bright, lived-in living room"
              loading="lazy"
              className="h-[130%] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------- Signature: scroll overlay reveal -------------------- */
/* A sticky, viewport-height panel. As you scroll through the (tall) section,
   a colored curtain wipes away to reveal a photograph, the image scales down,
   and the statement is unmasked line-by-line — all scrubbed to scroll.       */

function ScrollOverlay() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set("[data-curtain]", { yPercent: -100 });
        gsap.set("[data-overlay-line]", { yPercent: 0 });
        gsap.set("[data-overlay-img]", { scale: 1 });
        return;
      }

      // Pin the panel via ScrollTrigger (not CSS sticky — the page's
      // overflow-x:hidden on html/body breaks position:sticky descendants).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=170%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // curtain wipes up to reveal the photo
      tl.to("[data-curtain]", { yPercent: -100, ease: "power2.inOut" }, 0)
        // image eases from an overscaled state to rest
        .from("[data-overlay-img]", { scale: 1.3, ease: "none" }, 0)
        // statement lines rise out of their masks, staggered across the scroll
        .from(
          "[data-overlay-line]",
          { yPercent: 120, stagger: 0.18, ease: "power3.out" },
          0.2
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const lines = ["We don't sit", "between you and", "your next home."];

  return (
    <section ref={root} aria-label="What drives us">
      <div
        ref={panel}
        className="relative h-[90svh] md:h-[100svh] min-h-[600px] overflow-hidden bg-night"
      >
        {/* revealed photograph */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-overlay-img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="City skyline at dusk"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        </div>

        {/* colored curtain that wipes up */}
        <div data-curtain className="absolute inset-0 z-10 bg-accent-deep" />

        {/* statement */}
        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-8">
          <Eyebrow dark>Why we exist</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.4rem,8vw,7rem)] font-light leading-[0.98] tracking-[-0.03em] text-white">
            {lines.map((line, i) => (
              <span key={i} className="reveal-mask block">
                <span data-overlay-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="mt-9 max-w-lg text-lg leading-relaxed text-white/70">
            Brokers add cost and confusion to something that should be human.
            gharMitra removes the layer in between — so the conversation about
            your home happens directly, on fair terms.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Mission ---------------------------------- */

const pillars = [
  {
    title: "Honest by design",
    body: "Real photos, real videos, real owners. Every listing is verified so what you see is what you visit.",
    img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Simple for everyone",
    body: "Big buttons, clear screens, and your own language. If you can make a phone call, you can use gharMitra.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Local at heart",
    body: "Built for small towns and big cities alike — wherever you live, your next home is close by.",
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1000&q=80",
  },
];

function Mission() {
  return (
    <section className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Our mission</Eyebrow>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.04] tracking-[-0.025em]">
            How we&apos;re reimagining
            <br />
            the way India rents.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-y-14 md:grid-cols-3 md:gap-x-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-paper-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Quote ----------------------------------- */

function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-night text-paper">
      {/* Full-height portrait, bleeding to the right/bottom edges (desktop).
          temp-img.png is a transparent cut-out, so its empty areas show the
          night background — no contained box, no "floating" crop. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block xl:w-[42%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/website-img/temp-img.png"
          alt="Portrait of the founder"
          className="h-full w-full object-contain object-left-bottom"
        />
        {/* soft blend of the left edge into the dark band */}
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-24 md:py-24 sm:px-8 sm:py-32 lg:min-h-[680px] lg:py-40">
        <div className="lg:max-w-2xl">
          <Reveal>
            <p className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-light leading-[1.18] tracking-[-0.02em] text-paper">
              &ldquo;Amid a country moving to its cities, a stable and fair home
              is vital for the dignity and growth of every family. That&apos;s
              the promise we wake up to build.&rdquo;
            </p>
            <div className="mt-8">
              <p className="font-display text-lg tracking-tight text-paper">
                Anurag S.
              </p>
              <p className="text-sm text-paper/55">
                Co-founder &amp; CEO, gharMitra
              </p>
            </div>
          </Reveal>

          {/* Mobile: portrait stacks below the quote, still full-width. */}
          <Reveal delay={0.1}>
            <div className="mt-12 lg:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/website-img/temp-img.png"
                alt="Portrait of the founder"
                loading="lazy"
                className="mx-auto h-90 md:h-80 w-full object-contain object-bottom"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ How we began ------------------------------ */

function Story() {
  return (
    <section className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
          <Reveal>
            <Eyebrow>How we began</Eyebrow>
          </Reveal>

          <div>
            <Reveal>
              <p className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-[1.25] tracking-[-0.02em]">
                In 2025, after watching family after family hand a month&apos;s
                rent to a broker for a phone number, we asked a simple question:
                what if owners and seekers could just talk?
              </p>
            </Reveal>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <Reveal delay={0.05}>
                <p className="text-[15px] leading-relaxed text-ink-soft">
                  gharMitra began as a small experiment in one neighbourhood —
                  a handful of verified listings and a promise that the owner
                  was one tap away. Word spread quickly, because the idea was
                  obvious the moment people used it.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-[15px] leading-relaxed text-ink-soft">
                  Today we&apos;re a small team obsessed with making the
                  experience feel effortless for first-time renters and elderly
                  owners alike — building tools in regional languages, with real
                  prices, real photos, and zero middlemen.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Leadership -------------------------------- */

const team = [
  {
    name: "Dinbandhu S.",
    role: "Co-founder & CEO",
    bio: "Leads product and vision. Spent years watching families overpay brokers and decided to build the fairer alternative.",
    img: "/website-img/c-1.png",
  },
  {
    name: "Anurag S.",
    role: "Co-founder & CTO",
    bio: "Builds the technology that keeps gharMitra fast, verified, and simple enough for first-time and elderly users.",
    img: "/website-img/c-2.png",
  },
  {
    name: "Priya Nair",
    role: "Head of Trust & Operations",
    bio: "Owns listing verification and on-ground support, making sure every home and owner on gharMitra is real.",
    img: "/website-img/c-3.png",
  },
];

function Team() {
  return (
    <section className="bg-paper-deep px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:items-end">
          <Reveal>
            <Eyebrow>The people behind it</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02] tracking-[-0.03em]">
              Meet the
              <br />
              <span className="text-accent">founding team.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
              A small, focused team that genuinely answers — building gharMitra
              for every town and city, one honest listing at a time.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1} className="h-full">
              <div className="group flex h-full flex-col">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.img}
                    alt={`Portrait of ${m.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">
                  {m.name}
                </h3>
                <p className="mt-1 text-sm uppercase tracking-[0.14em] text-accent">
                  {m.role}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {m.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Stats ----------------------------------- */
/* Numbers count up the first time the row scrolls into view.                 */

const stats = [
  { value: 28000, suffix: "+", label: "Verified listings" },
  { value: 60, suffix: "+", label: "Towns & cities" },
  { value: 0, suffix: "₹", label: "Broker fees, ever", isZero: true },
  { value: 1, suffix: " tap", label: "To reach an owner" },
];

function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const nums = gsap.utils.toArray<HTMLElement>("[data-count]");
      nums.forEach((el) => {
        const end = Number(el.dataset.count);
        if (prefersReduced) {
          el.textContent = end.toLocaleString("en-IN");
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("en-IN");
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="border-l border-ink/15 pl-6">
              <p className="font-display text-[clamp(2.6rem,5vw,4rem)] font-light leading-none tracking-tight text-ink">
                {s.isZero ? (
                  <span className="text-accent">{s.suffix}0</span>
                ) : (
                  <>
                    {s.suffix === "₹" && "₹"}
                    <span data-count={s.value}>0</span>
                    {s.suffix !== "₹" && (
                      <span className="text-accent">{s.suffix}</span>
                    )}
                  </>
                )}
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.14em] text-ink-soft">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- FAQ ------------------------------------ */

const faqs = [
  {
    q: "What exactly does gharMitra do?",
    a: "gharMitra is a no-broker app that connects home owners and seekers directly. Owners list a house, room, or flat with photos and video; seekers browse nearby homes and contact the owner with one tap.",
  },
  {
    q: "Is it really broker-free?",
    a: "Yes. There is no agent in between. You talk straight to the owner and decide together — no brokerage, no markup, no surprise fees.",
  },
  {
    q: "How are listings verified?",
    a: "Every listing carries real photos and up to three short videos, and owners verify their identity, so what you see on screen is what you find on the visit.",
  },
  {
    q: "What does it cost?",
    a: "Browsing and contacting owners is always free for seekers. Owners pay a small registration fee and a success fee only when a property is actually rented or sold — no deal, no fee.",
  },
  {
    q: "Which areas do you cover?",
    a: "gharMitra is local-first and works across small towns and big cities alike. Coverage grows every week as more owners list their homes.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ink/15">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="flex items-baseline gap-5">
          <span className="font-display text-sm font-medium tabular-nums text-accent">
            0{index + 1}
          </span>
          <span className="font-display text-[clamp(1.15rem,2.4vw,1.7rem)] font-medium tracking-tight">
            {q}
          </span>
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/10 transition-all duration-300 ${
            open ? "rotate-45 text-black" : "text-ink"
          }`}
        >
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 pl-10 text-[15px] leading-relaxed text-ink-soft">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faq() {
  return (
    <section className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
        <Reveal>
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.05] tracking-[-0.025em]">
            Learn more
            <br />
            about us.
          </h2>
        </Reveal>

        <div>
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CTA cards -------------------------------- */

const ctaCards = [
  {
    k: "For owners",
    body: "List your property in minutes and reach real seekers directly.",
    href: "/#owners",
    cta: "List a home",
  },
  {
    k: "For seekers",
    body: "Browse verified homes near you and contact owners with one tap.",
    href: "/#seekers",
    cta: "Find a home",
  },
  {
    k: "Pricing",
    body: "Free to browse. Fair, transparent fees for owners — only when it works.",
    href: "/#pricing",
    cta: "See pricing",
  },
];

function CtaCards() {
  return (
    <section className="px-5 pb-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="mb-10 max-w-2xl font-display text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em]">
            Discover what sets us apart, and where you fit in.
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {ctaCards.map((c, i) => (
            <Reveal key={c.k} delay={i * 0.08} className="h-full">
              <a
                href={c.href}
                className="group flex h-full flex-col justify-between rounded-sm bg-accent p-7 text-white transition-colors duration-300 hover:bg-accent-deep sm:p-8"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
                    {c.k}
                  </p>
                  <p className="mt-4 text-[17px] leading-relaxed text-white/90">
                    {c.body}
                  </p>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.1em]">
                  {c.cta}
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path
                      d="M2 8h11M9 4l4 4-4 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Final CTA --------------------------------- */

function AboutCTA() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[110rem]">
        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-[2px] bg-[#d3e7ff] px-6 py-20 text-ink sm:px-14 sm:py-28">
            <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full border border-ink/10" />
            <div className="pointer-events-none absolute -bottom-40 -left-20 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-2xl" />

            <div className="relative">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-ink/55">
                Join us
              </p>
              <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.03em]">
                Let&apos;s make finding a home simple.
              </h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-ink/70">
                Download gharMitra and start in minutes — list a property or
                find one, with no brokers in between.
              </p>

              {/* Buttons sit after the paragraph, aligned to the right. */}
              <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button href="/#download" variant="solid">
                  Download the App
                </Button>
                <Button href="/contact" variant="outlineDark">
                  Talk to us
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- Composed --------------------------------- */

export default function About() {
  return (
    <>
      <AboutHero />
      <Vision />
      <ScrollOverlay />
      <Mission />
      <QuoteBand />
      <Story />
      <Team />
      <Stats />
      <Faq />
      <CtaCards />
      <AboutCTA />
    </>
  );
}
