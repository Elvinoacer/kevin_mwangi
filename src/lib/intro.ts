"use client";

import { useSyncExternalStore } from "react";

/**
 * Intro coordination — the preloader signals completion via a
 * window event + flag so the hero entrance can begin the moment
 * the curtain lifts (and immediately on repeat visits).
 * Read as an external store — no cascading state updates.
 */

declare global {
  interface Window {
    __introDone?: boolean;
  }
}

const EVENT = "portfolio:intro-done";

export function markIntroDone() {
  window.__introDone = true;
  window.dispatchEvent(new Event(EVENT));
}

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};

const getSnapshot = () => window.__introDone === true;
const getServerSnapshot = () => false;

/** True once the preloader has finished (or was skipped). */
export function useIntroDone(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
