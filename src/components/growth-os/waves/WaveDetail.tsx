"use client";

import Button from "@/components/ui/button/Button";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { type Wave, waveGateLabels, waveSteps } from "../data";
import InfoTooltip from "../shared/InfoTooltip";
import TenantTag from "../shared/TenantTag";

export default function WaveDetail({ wave: wv }: { wave: Wave }) {
  const t = useTranslations("growthOs.waves");
  const { queue, approve } = useGrowthOS();
  const max = wv.gates[0];
  const rate = wv.sent ? `${((wv.rep / wv.sent) * 100).toFixed(1)}%` : "—";
  const mtgRate = wv.rep ? `${Math.round((wv.mtg / wv.rep) * 100)}%` : "—";
  const awaiting = wv.step === 5 && wv.st === "Awaiting approval";
  const stats = [
    { k: t("stats.sent"), v: wv.sent, accent: false },
    { k: t("stats.replyRate"), v: rate, accent: false },
    { k: t("stats.meetings"), v: wv.mtg, accent: true },
    { k: t("stats.replyToMeeting"), v: mtgRate, accent: false },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <TenantTag tn={wv.tn} />
            <span className="text-theme-xs text-gray-400">· {wv.ch}</span>
          </div>
          <h3 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white/90">{wv.name} · {wv.persona} · {wv.seg}</h3>
          <p className="mt-1 font-mono text-theme-xs text-brand-500 dark:text-brand-400">{t("tag", { tag: wv.tag })}</p>
        </div>
        {awaiting && (
          <Button
            size="sm"
            onClick={() => {
              const q = queue.find((x) => x.wave === wv.id);
              if (q) approve(q.id);
            }}
          >
            {t("approve")}
          </Button>
        )}
      </div>

      <div className="space-y-8 p-5 sm:p-6">
        <div>
          <p className="mb-4 text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">{t("steps")}</p>
          <div className="custom-scrollbar overflow-x-auto pb-2">
            <ol className="grid min-w-180 grid-cols-9 gap-2">
              {waveSteps.map((label, i) => {
                const n = i + 1;
                const done = n < wv.step;
                const now = n === wv.step;
                return (
                  <li key={label} className="flex flex-col gap-2">
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-theme-xs font-semibold",
                          done && "border-brand-500 bg-brand-500 text-white",
                          now && "border-brand-500 bg-white text-brand-500 ring-4 ring-brand-500/15 dark:bg-gray-900",
                          !done && !now && "border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900",
                        )}
                      >
                        {n}
                      </span>
                      {n < 9 && <span className={cn("h-0.5 flex-1 rounded-full", done ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-800")} />}
                    </span>
                    <span className={cn("text-theme-xs", done || now ? "font-medium text-gray-800 dark:text-white/90" : "text-gray-400")}>{label}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <p className="mb-4 flex items-center gap-2 text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              {t("gates")}
              <InfoTooltip tip="gates" />
            </p>
            <ul className="space-y-3">
              {wv.gates.map((g, i) => (
                <li key={waveGateLabels[i]} className="grid grid-cols-12 items-center gap-3">
                  <span className="col-span-4 text-theme-sm text-gray-600 sm:col-span-3 dark:text-gray-400">{waveGateLabels[i]}</span>
                  <div className="col-span-5 h-4 overflow-hidden rounded bg-gray-100 sm:col-span-7 dark:bg-gray-800">
                    <div className="h-full rounded bg-brand-500" style={{ width: `${Math.max(6, Math.round((g / max) * 100))}%`, opacity: 1 - i * 0.11 }} />
                  </div>
                  <span className="col-span-2 text-end text-theme-sm font-semibold text-gray-800 sm:col-span-1 dark:text-white/90">{g}</span>
                  <span className="col-span-1 text-end text-theme-xs text-error-500">{i ? `−${wv.gates[i - 1] - g}` : ""}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 content-start gap-3 xl:col-span-2">
            {stats.map((s) => (
              <div key={s.k} className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                <p className="text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">{s.k}</p>
                <p className={cn("mt-2 text-2xl font-bold", s.accent ? "text-brand-500 dark:text-brand-400" : "text-gray-800 dark:text-white/90")}>{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
