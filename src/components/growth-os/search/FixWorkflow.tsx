"use client";

import { useTick } from "@/hooks/useTick";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { seoFlow } from "../data";
import InfoTooltip from "../shared/InfoTooltip";

/** Walks through how a slipping page becomes a reviewed, deployed fix — one step every ~1.3s. */
export default function FixWorkflow() {
  const t = useTranslations("growthOs.search");
  const step = Math.floor(useTick(1260)) % seoFlow.steps.length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-white/3">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-theme-xs font-medium tracking-wide text-brand-500 uppercase dark:text-brand-400">{t("eyebrow")}</p>
          <h3 className="mt-1 text-xl font-semibold text-gray-800 dark:text-white/90">{t("headline")}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <InfoTooltip tip="seo" label="SEO" align="end" />
          <InfoTooltip tip="aeo" label="AEO" align="end" />
          <InfoTooltip tip="geo" label="GEO" align="end" />
        </div>
      </div>

      <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
        {seoFlow.steps.map((label, i) => (
          <li
            key={label}
            className={cn(
              "flex flex-col gap-2 rounded-xl border p-3 transition-all duration-300",
              i < step && "border-brand-200 bg-brand-25 text-brand-500 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-400",
              i === step && "border-brand-500 bg-brand-500 text-white shadow-theme-md",
              i > step && "border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-800 dark:bg-white/3 dark:text-gray-400",
            )}
          >
            <span className="text-theme-xs font-semibold opacity-80">0{i + 1}</span>
            <span className="text-theme-sm font-medium">{label}</span>
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
        <p className="text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
          {t("step", { n: step + 1, label: seoFlow.steps[step] })}
        </p>
        <p className="mt-1 text-sm text-gray-800 dark:text-white/90">{seoFlow.detail[step]}</p>
      </div>
    </div>
  );
}
