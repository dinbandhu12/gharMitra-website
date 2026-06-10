"use client";

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

/* Full-bleed image band with glassmorphism tags stacked on the left. */
function ImageBand({
  src,
  alt,
  tags = [],
}: {
  src: string;
  alt: string;
  tags?: string[];
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
          {/* subtle left scrim so the glass tags stay legible */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-black/5 to-transparent" />

          {tags.length > 0 && (
            <div className="absolute left-5 top-1/2 flex -translate-y-1/2 flex-col items-start gap-3 sm:left-10">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/25 bg-white/10 px-4 py-2.5 text-[13px] font-medium text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
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

const steps = [
  {
    k: "Step 1",
    title: "Sign up in seconds.",
    body: "Use your Google account or phone number — no paperwork, no waiting.",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1000&q=80",
  },
  {
    k: "Step 2",
    title: "List or search.",
    body: "Owners post their property with photos and video; seekers browse nearby homes.",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80",
  },
  {
    k: "Step 3",
    title: "Connect directly.",
    body: "Tap to call or message the owner and take it forward — no broker in between.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
  },
];

export function HowItWorks() {
  return (
    <>
      <ImageBand
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
        alt="A welcoming family home"
        tags={[
          "Real homes, real owners",
          "Verified listings",
          "Direct owner contact",
          "No brokers in between",
        ]}
      />

      <section id="how" className="px-5 py-28 sm:px-8 sm:py-40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.04] tracking-[-0.025em]">
              Three simple steps.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-y-14 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col md:border-l md:border-line md:px-9 md:first:border-l-0 md:first:pl-0">
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-paper-deep">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    {s.k}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
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
    <div className="group flex h-full flex-col rounded-lg border border-line p-7 transition-colors duration-300 hover:border-accent sm:p-8">
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
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.03em]">
            Everything you need to
            <br />
            find the <span className="text-accent">right home.</span>
          </h2>
        </Reveal>

        {/* Staggered numbered grid — top-left pair, bottom-right pair */}
        <div className="mt-20 grid gap-y-24 lg:mt-28 lg:grid-cols-2">
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

/* -------------------------------- Pricing -------------------------------- */

const plans = [
  {
    k: "Launch month",
    price: "Free",
    note: "for everyone",
    body: "List and connect at no cost for the first month while we grow.",
    featured: true,
  },
  {
    k: "Registration",
    price: "₹499",
    note: "one-time · owners",
    body: "For owners to list properties. Seekers always browse free.",
    featured: false,
  },
  {
    k: "Success fee",
    price: "₹599",
    note: "on close · owners",
    body: "Charged only when your property is actually sold or rented. No sale, no fee.",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-paper-deep px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left: statement */}
        <div>
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.0] tracking-[-0.03em]">
              Free to start.
              <br />
              Fair when it works.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Downloading and browsing gharMitra is always free. Owners only pay
              for the services that help close a deal.
            </p>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-ink-soft/80">
              Pay by UPI, QR scan, cards, or netbanking — powered by Razorpay.
              No hidden charges. Seekers never pay to search or contact an owner.
            </p>
          </Reveal>
        </div>

        {/* Right: editorial price rows */}
        <Reveal delay={0.08}>
          <div className="border-t border-ink/15">
            {plans.map((p) => (
              <div
                key={p.k}
                className="group relative grid grid-cols-[1fr_auto] items-center gap-6 border-b border-ink/15 py-8"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <p
                      className={`text-xs font-medium uppercase tracking-[0.18em] ${
                        p.featured ? "text-accent" : "text-ink-soft"
                      }`}
                    >
                      {p.k}
                    </p>
                    {p.featured && (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
                        Now
                      </span>
                    )}
                  </div>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-display text-[clamp(2.2rem,5vw,3.5rem)] font-light leading-none tracking-tight transition-colors duration-300 ${
                      p.featured ? "text-accent" : "text-ink"
                    }`}
                  >
                    {p.price}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-soft">
                    {p.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
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
          <div className="relative overflow-hidden rounded-sm bg-[#d3e7ff] px-6 py-20 text-ink sm:px-14 sm:py-28">
            {/* oversized decorative ring */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full border border-ink/10" />
            <div className="pointer-events-none absolute -bottom-40 -left-20 h-[26rem] w-[26rem] rounded-full bg-white/40 blur-2xl" />

            <div className="relative grid gap-12 lg:grid-cols-[1.5fr_0.5fr] lg:items-end">
              <div>
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
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
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
