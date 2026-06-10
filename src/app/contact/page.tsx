"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { usePageTransition } from "@/components/TransitionProvider";

const channels = [
  {
    k: "Email us",
    value: "support@gharmitra.com",
    body: "For listings, payments, or anything else. We reply within one business day.",
    href: "mailto:support@gharmitra.com",
  },
  {
    k: "Call or WhatsApp",
    value: "+91 98765 43210",
    body: "Mon–Sat, 9am to 7pm IST. Speak to a real person in your language.",
    href: "tel:+919876543210",
  },
  {
    k: "Visit",
    value: "Pune, Maharashtra",
    body: "gharMitra Technologies, Baner Road. Drop by — chai is on us.",
    href: "#",
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { navigate } = usePageTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="px-5 pt-36 pb-16 sm:px-8 sm:pt-44">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Contact
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="max-w-3xl font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[1.0] tracking-[-0.03em]">
                Let&apos;s talk about your{" "}
                <span className="text-accent">next home.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
                Questions about listing a property, browsing homes, or pricing?
                We&apos;re a small team that actually answers. Reach out however
                feels easiest — phone, email, or the form below.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Channels */}
        <section className="px-5 pb-8 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {channels.map((c, i) => (
              <Reveal key={c.k} delay={i * 0.08}>
                <a
                  href={c.href}
                  className="group block h-full rounded-2xl border border-line bg-card p-7 transition-colors duration-300 hover:border-accent"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
                    {c.k}
                  </p>
                  <p className="mt-4 font-display text-2xl tracking-tight">
                    {c.value}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {c.body}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Form + image */}
        <section className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
            <Reveal>
              <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-paper-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80"
                  alt="Two people talking over a laptop"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-light leading-[1.1] tracking-[-0.02em]">
                  Send us a message.
                </h2>

                {sent ? (
                  <p className="mt-8 rounded-2xl border border-accent bg-accent-soft/40 p-6 text-[15px] leading-relaxed text-ink">
                    Thanks for reaching out — we&apos;ve got your message and
                    will get back to you within one business day.
                  </p>
                ) : (
                  <form onSubmit={onSubmit} className="mt-8 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Your name" name="name" placeholder="Asha Patil" />
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-soft">
                        How can we help?
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell us a little about what you need…"
                        className="mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-accent px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-500 hover:text-white"
                    >
                      {/* fill panel wipes left→right on hover */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0" />
                      {/* PREVIOUS: bottom→top wipe — kept for reference */}
                      {/* <span className="pointer-events-none absolute inset-0 translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" /> */}
                      <span className="relative z-10">Send message</span>
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Back to home — smooth page transition */}
        <section className="px-5 pb-28 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-night px-6 py-16 text-center sm:px-10 sm:py-20">
                <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" />
                <h2 className="relative font-display text-[clamp(1.8rem,4vw,3rem)] font-light tracking-[-0.02em] text-paper">
                  Ready to look around?
                </h2>
                <p className="relative mx-auto mt-4 max-w-md text-paper/70">
                  Head back to the home page and start exploring.
                </p>
                <div className="relative mt-8 flex justify-center">
                  <Button
                    href="/"
                    variant="light"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/");
                    }}
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-soft">{label}</label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
