"use client";

import { useEffect, useState } from "react";

/** Counts up every `ms` while `enabled` — drives the demo animations. */
export const useTick = (ms: number, enabled = true) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms, enabled]);

  return tick;
};
