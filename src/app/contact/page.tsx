"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const channels = [
  {
    k: "Email us",
    value: "support@gharmitra.com",
    body: "Listings, payments, or anything else. We reply within one business day.",
    href: "mailto:support@gharmitra.com",
  },
  {
    k: "Call or WhatsApp",
    value: "+91 98765 43210",
    body: "Mon–Sat, 9am–7pm IST. A real person, in your language.",
    href: "tel:+919876543210",
  },
  {
    k: "Visit",
    value: "Pune, Maharashtra",
    body: "gharMitra Technologies, Baner Road. Drop by chai is on us.",
    href: "#",
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  // Front-end only for now — flips to the "sent" state. A real backend (Gmail
  // service provider) is planned later; wire the POST in onSubmit then.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="px-5 pt-36 pb-14 sm:px-8 sm:pt-44">
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
                feels easiest phone, email, or the form below.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Form + teal channel sidebar */}
        <section className="px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto grid max-w-7xl items-stretch gap-0 lg:grid-cols-[1.25fr_1fr]">
            {/* Form */}
            <Reveal className="h-full">
              <div className="h-full rounded-[1px] border border-line bg-card p-7 sm:p-10">
                <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.1] tracking-[-0.02em]">
                  Send us a message.
                </h2>

                {sent ? (
                  <div className="mt-8 rounded-[4px] border border-accent bg-accent-soft/40 p-6">
                    <p className="font-display text-xl tracking-tight text-ink">
                      Message received - thank you.
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      We&apos;ve got it and will get back to you within one
                      business day. For anything urgent, just call or WhatsApp.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-5 text-sm font-medium uppercase tracking-[0.12em] text-accent underline-offset-4 hover:underline"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="mt-14 md:mt-28 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Your name" name="name" placeholder="Asha Patil" />
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                    </div>
                    <Field
                      label="Phone (optional)"
                      name="phone"
                      type="tel"
                      required={false}
                      placeholder="+91 …"
                    />
                    <div>
                      <label className="block text-sm font-medium text-ink-soft">
                        How can we help?
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell us a little about what you need…"
                        className="mt-2 w-full rounded-md border border-line bg-card px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-accent px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-500 hover:text-white"
                    >
                      {/* fill panel wipes left→right on hover */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0" />
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

            {/* Channels — brand-teal panel */}
            <Reveal delay={0.1} className="h-full">
              <div className="flex h-full flex-col rounded-[1px] bg-accent-deep p-7 text-paper sm:p-10">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-paper/55">
                  Reach us directly
                </p>
                <div className="mt-2">
                  {channels.map((c) => (
                    <a
                      key={c.k}
                      href={c.href}
                      className="group block border-t border-paper/20 py-6 first:border-t-0 first:pt-7"
                    >
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-paper/55">
                        {c.k}
                      </span>
                      <span className="mt-2 flex items-center gap-2">
                        <span className="font-display text-xl tracking-tight transition-transform duration-300 group-hover:translate-x-0.5">
                          {c.value}
                        </span>
                        <svg
                          aria-hidden
                          viewBox="0 0 16 16"
                          className="h-4 w-4 shrink-0 text-paper/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-paper"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 8h11M9 4l4 4-4 4" />
                        </svg>
                      </span>
                      <span className="mt-2 block max-w-xs text-[14px] leading-relaxed text-paper/70">
                        {c.body}
                      </span>
                    </a>
                  ))}
                </div>
                <p className="mt-auto pt-8 text-[14px] leading-relaxed text-paper/60">
                  No bots, no call-centre scripts just the people building
                  gharMitra.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Full-bleed community image band */}
        <section className="mt-6">
          <Reveal y={40}>
            <div className="relative h-80 md:h-[95vh] min-h-[700px] w-full overflow-hidden bg-paper-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/website-img/contact-img.jpg"
                alt="A group bringing their hands together"
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-5 right-5 rounded-md border border-white/25 bg-white/10 p-6 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md sm:bottom-10 sm:left-10 sm:right-auto sm:max-w-md sm:p-8">
                <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
                  Built by people who pick up the phone.
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                  We&apos;re a small team in Pune, and helping you find or fill a
                  home is the whole job. Reach out we&apos;d love to hear from
                  you.
                </p>
              </div>
            </div>
          </Reveal>
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
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-soft">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-line bg-card px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
