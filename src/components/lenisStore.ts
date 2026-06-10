import type Lenis from "lenis";

/** Shared handle to the active Lenis instance, so non-scroll components
 *  (e.g. the page transition) can drive it — scroll to top, etc. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
