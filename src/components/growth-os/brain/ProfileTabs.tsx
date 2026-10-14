"use client";

import Badge from "@/components/ui/badge/Badge";
import { CheckLineIcon, CloseLineIcon, LockIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import type { Brief } from "../data";

export function IcpTab({ brief }: { brief: Brief }) {
  const t = useTranslations("growthOs.common");
  return (
    <dl className="divide-y divide-gray-100 dark:divide-gray-800">
      {brief.icp.map(([k, v]) => (
        <div key={k} className="grid grid-cols-1 gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-12 sm:items-center sm:gap-4">
          <dt className="text-theme-xs font-medium text-gray-500 uppercase sm:col-span-3 dark:text-gray-400">{k}</dt>
          <dd className="text-sm text-gray-800 sm:col-span-7 dark:text-white/90">{v}</dd>
          <dd className="sm:col-span-2 sm:text-end">
            <Badge size="sm" startIcon={<LockIcon className="size-3" />}>{t("locked")}</Badge>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function PersonasTab({ brief }: { brief: Brief }) {
  const t = useTranslations("growthOs.brain");
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {brief.personas.map(([title, pain, trig, obj]) => (
        <div key={title} className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
          <p className="font-semibold text-gray-800 dark:text-white/90">{title}</p>
          <dl className="mt-4 space-y-3">
            {[[t("pain"), pain], [t("trigger"), trig], [t("objection"), obj]].map(([k, v]) => (
              <div key={k}>
                <dt className="text-theme-xs font-medium text-gray-500 uppercase dark:text-gray-400">{k}</dt>
                <dd className="mt-0.5 text-theme-sm text-gray-700 dark:text-gray-300">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

export function VoiceTab({ brief }: { brief: Brief }) {
  const t = useTranslations("growthOs.brain");
  const cols = [
    { title: t("always"), items: brief.voice.do, ok: true },
    { title: t("never"), items: brief.voice.dont, ok: false },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {cols.map((c) => (
        <div key={c.title} className="rounded-2xl border border-gray-200 p-5 dark:border-gray-800">
          <p className={cn("text-theme-xs font-semibold tracking-wide uppercase", c.ok ? "text-success-600 dark:text-success-500" : "text-error-600 dark:text-error-500")}>
            {c.title}
          </p>
          <ul className="mt-4 space-y-3">
            {c.items.map((x) => (
              <li key={x} className="flex items-start gap-3 text-theme-sm text-gray-700 dark:text-gray-300">
                <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", c.ok ? "bg-success-50 text-success-600 dark:bg-success-500/15" : "bg-error-50 text-error-600 dark:bg-error-500/15")}>
                  {c.ok ? <CheckLineIcon className="size-3.5" /> : <CloseLineIcon className="size-3.5" />}
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function VersionsTab({ brief }: { brief: Brief }) {
  const t = useTranslations("growthOs");
  return (
    <ol className="relative space-y-6 border-s border-gray-200 ps-6 dark:border-gray-800">
      {brief.hist.map(([v, d, by, note], i) => (
        <li key={`${v}-${i}`} className="relative">
          <span className={cn("absolute -start-7.5 top-1 h-3 w-3 rounded-full border-2", i === 0 ? "border-brand-500 bg-brand-500" : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900")} />
          <p className="flex flex-wrap items-center gap-2">
            <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">{v}</span>
            <span className="text-theme-xs text-gray-400">{d} · {by}</span>
            {i === 0 && <Badge size="sm">{t("common.current")}</Badge>}
          </p>
          <p className="mt-1 text-theme-sm text-gray-600 dark:text-gray-400">{note}</p>
        </li>
      ))}
    </ol>
  );
}
