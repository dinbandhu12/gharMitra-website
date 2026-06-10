"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getLenis } from "./lenisStore";

type Phase = "idle" | "cover" | "reveal";

const TransitionCtx = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export const usePageTransition = () => useContext(TransitionCtx);

const EASE = [0.76, 0, 0.24, 1] as const;
const DUR = 0.7;

/**
 * Page transition — "curtain": a dark panel slides up to cover the screen
 * (brand mark shows), we navigate while covered + reset scroll to top, then the
 * panel slides off the top to reveal the new page. The overlay is the only
 * extra DOM — children render directly so layout/scroll are untouched.
 */
export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (phase !== "idle") return;
      pendingHref.current = href;
      router.prefetch(href);
      setPhase("cover");
    },
    [phase, router]
  );

  // Destination mounted under the cover → reset scroll to top, then reveal.
  useEffect(() => {
    if (phase === "cover" && pendingHref.current) {
      const dest = pendingHref.current.split(/[?#]/)[0] || "/";
      if (pathname === dest) {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
        const t = setTimeout(() => setPhase("reveal"), 120);
        return () => clearTimeout(t);
      }
    }
  }, [pathname, phase]);

  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {children}

      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="curtain"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-night"
            initial={{ y: "100%" }}
            animate={{ y: phase === "reveal" ? "-100%" : "0%" }}
            transition={{ duration: DUR, ease: EASE }}
            onAnimationComplete={() => {
              if (phase === "cover") {
                if (pendingHref.current) router.push(pendingHref.current);
              } else if (phase === "reveal") {
                pendingHref.current = null;
                setPhase("idle");
              }
            }}
          >
            <motion.div
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: phase === "cover" ? 1 : 0,
                y: phase === "cover" ? 0 : 10,
              }}
              transition={{
                duration: 0.3,
                delay: phase === "cover" ? 0.22 : 0,
                ease: "easeOut",
              }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent font-display text-lg leading-none text-white">
                g
              </span>
              <span className="font-display text-2xl font-medium tracking-tight text-paper">
                gharMitra
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  );
}
