"use client";

import { ArrowRightIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { type Campaign, CAMPAIGN_PHASE as PHASE } from "../data";
import InfoTooltip from "../shared/InfoTooltip";
import ProgressBar from "../shared/ProgressBar";
import { clamp01 } from "../utils";

interface CampaignFlowProps {
  campaign: Campaign;
  tick: number;
  live: boolean;
  booked: number;
  phase: string;
}

function Connector() {
  return (
    <div className="flex items-center justify-center text-gray-300 lg:px-1 dark:text-gray-700" aria-hidden>
      <ArrowRightIcon className="size-5 rotate-90 lg:rotate-0 rtl:lg:rotate-180" />
    </div>
  );
}

/** Data → audience → channel → meetings, filling in as the launch simulation runs. */
export default function CampaignFlow({ campaign: C, tick, live, booked, phase }: CampaignFlowProps) {
  const t = useTranslations("growthOs.campaigns");
  const on = { src: tick >= PHASE.source || live, gates: tick >= PHASE.gates || live, br: tick >= PHASE.branches || live };
  const srcN = on.src ? Math.round(C.gates[0][1] * (live ? 1 : clamp01(tick / 5))) : 0;
  const gmax = C.gates[0][1];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-white/3">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{t("flow")}</h3>
        <span className="rounded-lg bg-brand-50 px-3 py-1.5 text-theme-xs font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">{phase}</span>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)_auto_minmax(0,1.2fr)_auto_minmax(0,0.8fr)] lg:items-stretch">
        {/* Source */}
        <div className="flex flex-col justify-center gap-2 rounded-xl border border-brand-300 bg-brand-25 p-4 dark:border-brand-800 dark:bg-brand-500/10">
          <span className="text-theme-xs font-medium tracking-wide text-brand-500 uppercase dark:text-brand-400">{t("source", { tool: C.source.tool })}</span>
          <span className="text-title-sm font-bold text-gray-800 tabular-nums dark:text-white/90">{srcN}</span>
          <span className="text-theme-xs text-gray-600 dark:text-gray-400">{C.source.q}</span>
        </div>
        <Connector />

        {/* Gates */}
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
          <span className="flex items-center justify-between gap-2 text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            {t("gates")}
            <InfoTooltip tip="gates" align="end" />
          </span>
          {C.gates.map(([label, n], i) => {
            const shown = on.gates || (i === 0 && on.src);
            return (
              <div key={label} className={cn("transition-opacity", shown ? "opacity-100" : "opacity-30")}>
                <div className="mb-1 flex justify-between text-theme-xs">
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className="font-semibold text-gray-800 dark:text-white/90">{shown ? (i === 0 ? srcN : n) : 0}</span>
                </div>
                <ProgressBar value={Math.max(8, (n / gmax) * 100)} size="sm" />
              </div>
            );
          })}
        </div>
        <Connector />

        {/* Channels */}
        <div className="flex flex-col gap-3">
          {C.branches.map((b) => {
            const n = on.br ? Math.round(b.n * (live ? 1 : clamp01((tick - PHASE.branches) / 5))) : 0;
            return (
              <div
                key={b.ch}
                className={cn("flex flex-1 flex-col justify-center gap-1 rounded-xl border-s-4 border-gray-200 bg-gray-50 p-4 transition-opacity dark:border-gray-800 dark:bg-white/3", on.br ? "opacity-100" : "opacity-40")}
                style={{ borderInlineStartColor: b.c }}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">{b.ch}</span>
                  <InfoTooltip tip={b.tip} align="end" />
                </span>
                <span className="text-theme-xs text-gray-500 dark:text-gray-400">{b.sub}</span>
                <span className="text-xl font-bold tabular-nums" style={{ color: b.c }}>{n}</span>
              </div>
            );
          })}
        </div>
        <Connector />

        {/* Meetings */}
        <div className="flex flex-col justify-center gap-1 rounded-xl bg-success-500 p-4 text-white">
          <span className="text-theme-xs font-medium tracking-wide uppercase opacity-85">{t("meetings")}</span>
          <span className="text-title-md font-bold tabular-nums">{booked}</span>
          <span className="text-theme-xs opacity-90">{t("target", { target: C.target })}</span>
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {C.branches.map((b) => (
          <li key={b.ch} className="flex gap-3 rounded-xl bg-gray-50 p-3 text-theme-sm text-gray-600 dark:bg-white/3 dark:text-gray-400">
            <span className="w-1 shrink-0 rounded-full" style={{ backgroundColor: b.c }} />
            <span>
              <span className="font-semibold text-gray-800 dark:text-white/90">{b.ch} · {b.n}.</span> {b.rule}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
