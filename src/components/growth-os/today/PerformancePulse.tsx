"use client";

import Badge from "@/components/ui/badge/Badge";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { ArrowDownIcon, ArrowUpIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { highlights } from "../data";
import Sparkline from "../shared/Sparkline";

/** The four headline numbers as one compact list, each with its trend line. */
export default function PerformancePulse() {
  const t = useTranslations("growthOs.today.pulse");
  const { person } = useGrowthOS();

  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-white/3">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{t("title")}</h3>
      <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{t("desc")}</p>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-1">
        {highlights[person].map((h) => (
          <li key={h.k} className="grid grid-cols-12 items-center gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
            <div className="col-span-7">
              <p className="text-theme-sm text-gray-500 dark:text-gray-400">{h.k}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-2">
                <span className="text-2xl font-bold text-gray-800 dark:text-white/90">{h.v}</span>
                <Badge size="sm" color={h.up ? "success" : "error"}>
                  {h.up ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" />}
                  {h.d}
                </Badge>
              </p>
            </div>
            <div className="col-span-5">
              <Sparkline data={h.s} color={h.c} name={h.k} height={48} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
