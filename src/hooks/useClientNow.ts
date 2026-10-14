"use client";

import { useSyncExternalStore } from "react";

let loadedAt: number | null = null;
const subscribe = () => () => {};
const getSnapshot = () => (loadedAt ??= Date.now());
const getServerSnapshot = () => null;

/**
 * The time the page was loaded on the client, or null during server rendering —
 * lets time-of-day copy render without a hydration mismatch.
 */
export const useClientNow = (): Date | null => {
  const ms = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return ms === null ? null : new Date(ms);
};
