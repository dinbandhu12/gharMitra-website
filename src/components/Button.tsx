"use client";

import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "solid" | "light" | "outlineDark" | "outlineLight" | "dark";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: "sm" | "md";
  arrow?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
};

/**
 * Signature button: the label + arrow sit above a colored panel that wipes up
 * from the bottom on hover (clip-path), so the fill "fills" the pill. The arrow
 * nudges right. Same motion language as the page transition.
 */
// NOTE: the text-color change must use `hover:` (not `group-hover:`) because it
// is applied to the .group element itself — group-hover only targets descendants.
const variants: Record<
  Variant,
  { base: string; fill: string; hoverText: string }
> = {
  // accent → fills ink
  solid: {
    base: "bg-accent text-white",
    fill: "bg-ink",
    hoverText: "hover:text-white",
  },
  // white → fills ink
  light: {
    base: "bg-white text-ink",
    fill: "bg-ink",
    hoverText: "hover:text-white",
  },
  // transparent on light bg → fills ink
  outlineDark: {
    base: "border border-ink/25 text-ink",
    fill: "bg-ink",
    hoverText: "hover:text-white",
  },
  // transparent on dark bg → fills white
  outlineLight: {
    base: "border border-white/40 text-white",
    fill: "bg-white",
    hoverText: "hover:text-ink",
  },
  // dark → fills accent
  dark: {
    base: "bg-ink text-white",
    fill: "bg-accent",
    hoverText: "hover:text-white",
  },
};

export default function Button({
  children,
  href = "#",
  variant = "solid",
  size = "md",
  arrow = true,
  className = "",
  onClick,
}: Props) {
  const v = variants[variant];
  const sizing =
    size === "sm" ? "px-5 py-2.5 text-[11px]" : "px-7 py-3.5 text-[13px]";

  const inner = (
    <span
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-sm font-medium uppercase tracking-[0.1em] transition-colors duration-500 ${sizing} ${v.base} ${v.hoverText} ${className}`}
    >
      {/* fill panel that wipes up on hover */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 ${v.fill}`}
      />
      <span className="relative z-10">{children}</span>
      {arrow && (
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );

  // internal route → Link for client navigation; otherwise plain anchor
  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={onClick} className="inline-flex">
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} onClick={onClick} className="inline-flex">
      {inner}
    </a>
  );
}
