"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { useRouter } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { campaigns, routes } from "../data";
import TenantTag from "../shared/TenantTag";

/** Each campaign as a track: one dot per target meeting, filled as meetings are booked. */
export default function CampaignTracks() {
  const t = useTranslations("growthOs.today");
  const { select } = useGrowthOS();
  const router = useRouter();

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-7 dark:border-gray-800 dark:bg-white/3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{t("campaigns")}</h2>
        <span className="text-theme-sm text-gray-500 dark:text-gray-400">{t("progress.desc")}</span>
      </div>
      <ul className="mt-5 divide-y divide-gray-100 dark:divide-gray-800">
        {campaigns.map((c) => {
          const pct = Math.min(100, Math.round((c.booked / c.target) * 100));
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => {
                  select("campaign", c.id);
                  router.push(routes.campaigns);
                }}
                className="group grid w-full grid-cols-1 items-center gap-4 py-4 text-start md:grid-cols-12"
              >
                <span className="md:col-span-4">
                  <span className="block text-theme-sm font-bold text-gray-900 group-hover:text-brand-600 dark:text-white">{c.name}</span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-2 text-theme-xs text-gray-500 dark:text-gray-400">
                    {c.dates} · {c.st} <TenantTag tn={c.tn} />
                  </span>
                </span>
                <span className="flex flex-wrap gap-1.5 md:col-span-5" aria-label={t("meetings", { booked: c.booked, target: c.target })}>
                  {Array.from({ length: c.target }, (_, i) => (
                    <span key={i} className={cn("h-3 w-3 rounded-full", i < c.booked ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-800")} />
                  ))}
                </span>
                <span className="flex items-center justify-between gap-3 md:col-span-3 md:justify-end">
                  <span className="text-theme-sm text-gray-500 dark:text-gray-400">{t("meetings", { booked: c.booked, target: c.target })}</span>
                  <span className="text-lg font-extrabold text-gray-900 tabular-nums dark:text-white">{pct}%</span>
                  <ArrowRightIcon className="size-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600 rtl:rotate-180" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
