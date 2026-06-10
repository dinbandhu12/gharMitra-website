"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import { getLenis } from "./lenisStore";

const links = [
  { label: "How It Works", href: "/#how" },
  { label: "For Owners", href: "/#owners" },
  { label: "For Seekers", href: "/#seekers" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/contact" },
];

/** `overHero` = the page opens with a dark full-bleed hero, so the nav should
 *  render in light (white) treatment until the user scrolls. */
export default function Nav({ overHero = false }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

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
      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
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

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
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
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </>
            )}
          </svg>
        </button>
      </nav>
    </header>

      {/* Mobile full-screen menu — rendered outside the <header> because its
          translate-y transform would otherwise become the containing block
          for this fixed overlay, collapsing it to the header's height. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-paper md:hidden"
          >
            <div className="flex h-[100svh] flex-col px-5 pb-10 pt-24 sm:px-8">
              <ul className="flex flex-col">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                    className="border-b border-line"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 font-display text-3xl font-medium tracking-tight text-ink"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + links.length * 0.05, duration: 0.4 }}
                className="mt-auto"
              >
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
