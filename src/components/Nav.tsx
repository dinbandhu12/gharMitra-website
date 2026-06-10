"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import { getLenis } from "./lenisStore";
import { usePageTransition } from "./TransitionProvider";

// Real pages (About/Work/FAQ are built next — routes must exist before deploy)
const links = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/** `overHero` = the page opens with a dark full-bleed hero, so the nav should
 *  render in light (white) treatment until the user scrolls. */
export default function Nav({ overHero = false }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const { navigate } = usePageTransition();

  // Route the full-page nav links through the page-transition curtain. Hash
  // links (e.g. "/#download") are left to SmoothScroll; clicking the page
  // you're already on does nothing (avoids a pointless wipe).
  const goTo = (e: React.MouseEvent, href: string) => {
    setOpen(false);
    if (href.includes("#") || !href.startsWith("/")) return;
    e.preventDefault();
    if (href !== pathname) navigate(href);
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide when scrolling down (past the hero); reveal when scrolling up.
      if (y > lastY.current && y > 140) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu once we grow to desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock page scroll (native + Lenis) while the mobile menu is open.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // light treatment only over a dark hero, before scroll, and when menu closed
  const light = overHero && !scrolled && !open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled && !open
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-2 py-4">
        <Link
          href="/"
          onClick={(e) => goTo(e, "/")}
          className="flex items-center gap-2"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-display text-lg leading-none text-white">
            g
          </span>
          <span
            className={`font-display text-xl font-medium tracking-tight transition-colors duration-300 ${
              light ? "text-white" : "text-ink"
            }`}
          >
            gharMitra
          </span>
        </Link>

        {/* Right cluster: links + CTA (desktop), hamburger (mobile) */}
        <div className="flex items-center gap-9">
        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
                className={`text-[13px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                  light
                    ? "text-white/70 hover:text-white"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            href="/#download"
            variant={light ? "light" : "solid"}
            size="sm"
            arrow={false}
          >
            Download the App
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`ml-2 grid h-11 w-11 place-items-center transition-colors duration-300 md:hidden ${
            light ? "text-white" : "text-ink"
          }`}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
        </div>
      </nav>
    </header>

      {/* Mobile full-screen menu — rendered outside the <header> because its
          translate-y transform would otherwise become the containing block
          for this fixed overlay, collapsing it to the header's height. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-paper md:hidden"
          >
            {/* soft accent glow, echoes the FinalCTA treatment */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-soft/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full border border-ink/10" />

            <div className="relative flex h-[100svh] flex-col px-5 pb-8 pt-24 sm:px-8">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent"
              >
                Menu
              </motion.p>

              <ul className="flex flex-col">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      delay: 0.22 + i * 0.06,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-line"
                  >
                    <Link
                      href={l.href}
                      onClick={(e) => goTo(e, l.href)}
                      className="group flex items-center justify-between py-4 active:text-accent"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-display text-xs font-medium tabular-nums text-accent">
                          0{i + 1}
                        </span>
                        <span className="font-display text-[2rem] font-medium tracking-tight text-ink transition-colors duration-200 group-active:text-accent">
                          {l.label}
                        </span>
                      </span>
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        className="h-4 w-4 text-ink-soft/60 transition-transform duration-300 group-active:translate-x-0.5 group-active:text-accent"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 12 12 4M6 4h6v6" />
                      </svg>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.22 + links.length * 0.06, duration: 0.45 }}
                className="mt-auto"
              >
                <div className="mb-5 flex items-center justify-between text-[13px] text-ink-soft">
                  <a
                    href="mailto:support@gharmitra.com"
                    className="underline-offset-4 active:text-accent"
                  >
                    support@gharmitra.com
                  </a>
                  <a href="tel:+919876543210" className="active:text-accent">
                    +91 98765 43210
                  </a>
                </div>
                <Link
                  href="/#download"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-7 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-accent-deep"
                >
                  Download the App
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
