"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import Button from "./Button";

/* Shared editorial primitives ------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
      {children}
    </p>
  );
}

/* Full-bleed image band with a large glassmorphism card (bottom-right). */
function ImageBand({
  src,
  alt,
  heading,
  body,
}: {
  src: string;
  alt: string;
  heading: string;
  body: string;
}) {
  return (
    <section className="">
      <Reveal y={40}>
        <div className="relative h-[92vh] min-h-[760px] w-full overflow-hidden bg-paper-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {/* subtle right scrim so the glass card stays legible */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/45 via-black/5 to-transparent" />

          <div className="absolute bottom-6 left-5 right-5 rounded-md border border-white/25 bg-white/10 p-6 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md sm:bottom-10 sm:left-auto sm:right-10 sm:max-w-md sm:p-8">
            <h3 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              {heading}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">
              {body}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------- Why gharMitra ----------------------------- */

const reasons = [
  {
    n: "01",
    title: "Direct contact, no middleman",
    body: "Talk straight to the owner and decide together.",
  },
  {
    n: "02",
    title: "Photos and videos",
    body: "See the real home before you call, with up to 3 short videos per listing.",
  },
  {
    n: "03",
    title: "Simple for everyone",
    body: "Big buttons, clear screens, and your language. Built for first-time and elderly users.",
  },
  {
    n: "04",
    title: "Local-first",
    body: "Made for small towns and big cities alike — wherever you live.",
  },
];

export function WhyGharMitra() {
  return (
    <section id="seekers" className="overflow-hidden px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Why gharMitra</Eyebrow>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.03em]">
            A simpler way to
            <br />
            find or <span className="text-accent">list a home.</span>
          </h2>
        </Reveal>

        {/* Staggered numbered grid — top-left pair, bottom-right pair */}
        <div className="mt-20 grid gap-y-5 md:gap-y-24 lg:mt-28 lg:grid-cols-2">
          {/* Pair A — top-left */}
          <Reveal className="lg:col-start-1">
            <div>
              <div className="grid gap-5 sm:grid-cols-2">
                <FeatureItem {...reasons[0]} />
                <FeatureItem {...reasons[1]} />
              </div>
            </div>
          </Reveal>

          {/* Pair B — bottom-right, offset down so it begins where pair A ends */}
          <Reveal className="lg:col-start-2 lg:mt-[20rem]" delay={0.1}>
            <div>
              <div className="grid gap-5 sm:grid-cols-2">
                <FeatureItem {...reasons[2]} />
                <FeatureItem {...reasons[3]} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ How it works ----------------------------- */
/* The "Three simple steps" section was moved to the /work page. The homepage
   keeps just this full-bleed image band. */

export function HowItWorks() {
  return (
    <ImageBand
      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
      alt="A welcoming family home"
      heading="Real homes, real owners."
      body="Every listing is verified with real photos, and you talk directly to the owner — no brokers in between, no middlemen, no surprises."
    />
  );
}

/* --------------------------- Built for everyone --------------------------- */

const appFeatures = [
  {
    n: "01",
    title: "Verified, visual listings",
    body: "Real photos and short video walkthroughs on every home — so what you see is exactly what you visit.",
  },
  {
    n: "02",
    title: "Talk to owners directly",
    body: "Message or call the owner in a single tap. No brokers, no markup, no middlemen.",
  },
  {
    n: "03",
    title: "Made for every user",
    body: "Large text, clear steps, and your own language. If you can make a call, you can use gharMitra.",
  },
  {
    n: "04",
    title: "Local-first",
    body: "Built for small towns and big cities alike — for wherever you call home.",
  },
];

/** One numbered item — borderless editorial style. */
function FeatureItem({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className="group flex h-full flex-col rounded-[2px] border border-line p-7 transition-colors duration-300 hover:border-accent sm:p-8">
      <span className="font-display text-sm font-medium tabular-nums text-accent">
        {n}
      </span>
      <h3 className="mt-8 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-tight tracking-tight">
        {title}
      </h3>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-soft">
        {body}
      </p>
    </div>
  );
}

export function BuiltForEveryone() {
  return (
    <section
      id="owners"
      className="overflow-hidden px-5 py-28 sm:px-8 sm:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>The gharMitra difference</Eyebrow>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.03em]">
            Everything you need to
            <br />
            find the <span className="text-accent">right home.</span>
          </h2>
        </Reveal>

        {/* Staggered numbered grid — top-left pair, bottom-right pair */}
        <div className="mt-20 grid gap-y-5 md:gap-y-24 lg:mt-28 lg:grid-cols-2">
          {/* Pair A — top-left */}
          <Reveal className="lg:col-start-1">
            <div>
              <div className="grid gap-5 sm:grid-cols-2">
                <FeatureItem {...appFeatures[0]} />
                <FeatureItem {...appFeatures[1]} />
              </div>
            </div>
          </Reveal>

          {/* Pair B — bottom-right, offset down so it begins where pair A ends */}
          <Reveal className="lg:col-start-2 lg:mt-[22rem]" delay={0.1}>
            <div>
              <div className="grid gap-5 sm:grid-cols-2">
                <FeatureItem {...appFeatures[2]} />
                <FeatureItem {...appFeatures[3]} />
              </div>
            </div>
          </Reveal>
        </div>

        {/* <Reveal delay={0.1}>
          <div className="mt-20 lg:mt-24">
            <Button href="#download" variant="solid">
              Get the App
            </Button>
          </div>
        </Reveal> */}
      </div>
    </section>
  );
}

/* --------------------------------- FAQ ----------------------------------- */
/* Replaces the old Pricing section — we don't surface pricing on the first
   impression. Answers stay general (no specific price numbers). */

const faqs = [
  {
    q: "What exactly does gharMitra do?",
    a: "gharMitra is a no-broker app that connects home owners and seekers directly. Owners list a house, room, or flat with photos and video; seekers browse nearby homes and contact the owner with one tap.",
  },
  {
    q: "Is it really broker-free?",
    a: "Yes. There's no agent in between — you talk straight to the owner and decide together. No brokerage, no markup, no middlemen.",
  },
  {
    q: "How are listings verified?",
    a: "Every listing carries real photos and up to three short videos, and owners verify their identity — so what you see on screen is what you find on the visit.",
  },
  {
    q: "Do I have to pay to use it?",
    a: "Browsing and contacting owners is always free for seekers. Owners pay only when a home is actually rented or sold — no deal, no fee.",
  },
  {
    q: "Which areas does gharMitra cover?",
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
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-300 ${
            open ? "rotate-45 border-accent bg-accent text-white" : "text-ink"
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

export function Faq() {
  return (
    <section id="faq" className="bg-paper-deep px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
        <Reveal>
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.05] tracking-[-0.025em]">
            Questions,
            <br />
            answered.
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-soft">
            Everything you might want to know before you list a home or start
            your search.
          </p>
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

/* ------------------------------- Final CTA ------------------------------- */

export function FinalCTA() {
  return (
    <section id="download">
      <div className="mx-auto max-w-[110rem]">
        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-[2px] bg-[#d3e7ff] px-6 py-20 text-ink sm:px-14 sm:py-28">
            {/* oversized decorative ring */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full border border-ink/10" />
            <div className="pointer-events-none absolute -bottom-40 -left-20 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-2xl" />

            <div className="relative">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-ink/55">
                Get started
              </p>
              <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.6rem,7vw,6rem)] font-light leading-[0.96] tracking-[-0.03em]">
                Ready to find your next home?
              </h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-ink/70">
                Download gharMitra and start in minutes — list a property or
                find one, with no brokers in between.
              </p>

              {/* Buttons sit after the paragraph, aligned to the right. */}
              <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button href="#" variant="solid">
                  Download the App
                </Button>
                <Button href="#" variant="outlineDark">
                  Open Web App
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
