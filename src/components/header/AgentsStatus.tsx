"use client";

import { agents } from "@/components/growth-os/data";
import { nowHHMM } from "@/components/growth-os/utils";
import { useClientNow } from "@/hooks/useClientNow";
import { useTick } from "@/hooks/useTick";
import { useTranslations } from "next-intl";

/** Same rotation the Approvals screen uses: an agent is "running" on 6 of every 10 ticks. */
export const runningAgents = (tick: number) => agents.filter((_, i) => (i * 7 + tick * 3) % 10 < 6).length;

export default function AgentsStatus() {
  const t = useTranslations("growthOs.header");
  const tick = useTick(1680);
  const mounted = useClientNow() !== null;
  const clock = mounted ? nowHHMM() : "";

  return (
    <span className="hidden h-11 shrink-0 items-center gap-2 rounded-lg border whitespace-nowrap border-gray-200 px-3 text-theme-sm text-gray-600 2xl:inline-flex dark:border-gray-800 dark:text-gray-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
      </span>
      {clock} · {t("agentsRunning", { count: runningAgents(tick) })}
    </span>
  );
}
