"use client";

import { useTranslations } from "next-intl";
import { type Account, scoreParts } from "../data";
import ProgressBar from "../shared/ProgressBar";
import { scoreOf, tenantName } from "../utils";

/** Brand scale, strongest to lightest — one shade per score component. */
export const SEGMENT_SHADES = ["bg-brand-500", "bg-brand-400", "bg-brand-300", "bg-brand-200", "bg-brand-100"];

export default function AccountDetail({ account: ac }: { account: Account }) {
  const t = useTranslations("growthOs");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-5 sm:px-6 dark:border-gray-800">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">{ac.name}</h3>
          <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
            {t("leads.contacts", { industry: ac.ind, count: ac.contacts, tenant: tenantName(ac.tn) })}
          </p>
          <p className="mt-1 text-theme-sm text-gray-700 dark:text-gray-300">{t("leads.firstTouch", { first: ac.first })}</p>
        </div>
        <div className="shrink-0 text-end">
          <p className="text-title-md font-bold text-brand-500 dark:text-brand-400">{scoreOf(ac.sc)}</p>
          <p className="text-theme-xs text-gray-400 uppercase">{t("common.of100")}</p>
        </div>
      </div>

      <div className="border-b border-gray-100 px-5 py-5 sm:px-6 dark:border-gray-800">
        <p className="mb-4 text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">{t("leads.why")}</p>
        <ul className="space-y-3">
          {scoreParts.map((p, i) => (
            <li key={p.l} className="grid grid-cols-12 items-center gap-3">
              <span className="col-span-5 text-theme-sm text-gray-600 dark:text-gray-400">{p.l}</span>
              <ProgressBar value={(ac.sc[i] / p.max) * 100} className="col-span-5" barClassName={SEGMENT_SHADES[i]} />
              <span className="col-span-2 text-end text-theme-xs font-medium text-gray-800 dark:text-white/90">{ac.sc[i]} / {p.max}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <p className="mb-4 text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">{t("leads.touches")}</p>
        <ol className="relative space-y-5 border-s border-gray-200 ps-6 dark:border-gray-800">
          {ac.touches.map(([when, ch, what, tag]) => (
            <li key={`${when}-${tag}`} className="relative">
              <span className="absolute -start-7.5 top-1 h-3 w-3 rounded-full border-2 border-brand-500 bg-white dark:bg-gray-900" />
              <p className="flex flex-wrap items-baseline gap-2">
                <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">{ch}</span>
                <span className="text-theme-xs text-gray-400">{when}</span>
              </p>
              <p className="mt-0.5 text-theme-sm text-gray-600 dark:text-gray-400">{what}</p>
              <p className="mt-0.5 font-mono text-theme-xs text-brand-500 dark:text-brand-400">{tag}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
