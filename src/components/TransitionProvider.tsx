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
const DUR = 0.8;

/**
 * Page transition — "left-to-right wipe": a dark panel (with the brand mark)
 * sweeps in from the left to fully cover the screen. We navigate while covered +
 * reset scroll to top, then the panel continues sweeping off to the right,
 * revealing the new page from the left. Both phases travel left→right for a
 * clear, noticeable swipe. The panel's onAnimationComplete drives the
 * navigation/reset between phases.
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
            initial={{ x: "-100%" }}
            animate={{ x: phase === "reveal" ? "100%" : "0%" }}
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
              initial={{ opacity: 0, x: -16 }}
              animate={{
                opacity: phase === "cover" ? 1 : 0,
                x: phase === "cover" ? 0 : -16,
              }}
              transition={{
                duration: 0.3,
                delay: phase === "cover" ? 0.28 : 0,
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
