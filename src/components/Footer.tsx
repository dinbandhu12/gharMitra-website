const cols = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "/#how" },
      { label: "For Owners", href: "/#owners" },
      { label: "For Seekers", href: "/#seekers" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "/contact" },
      { label: "Download", href: "/#download" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="help" className="bg-night px-5 pt-24 pb-10 text-paper sm:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.025em] text-paper">
          A home, for everyone.
        </h2>

        <div className="mt-20 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-display text-lg leading-none text-white">
                g
              </span>
              <span className="font-display text-xl tracking-tight">
                gharMitra
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-paper/60">
              Built for everyone, including first-time and elderly users. Find a
              home, or list yours — simply.
            </p>
            <a
              href="mailto:support@gharmitra.com"
              className="mt-5 inline-block text-[15px] text-paper/80 underline-offset-4 hover:underline"
            >
              support@gharmitra.com
            </a>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-paper/40">
                {c.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[15px] text-paper/75 transition-colors hover:text-paper"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-paper/15 pt-7 text-sm text-paper/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} gharMitra. All rights reserved.</p>
          <p>Made simple, for every town and city.</p>
        </div>
      </div>
    </footer>
  );
}
