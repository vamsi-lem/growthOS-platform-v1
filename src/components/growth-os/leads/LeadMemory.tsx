"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { FileIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { accounts } from "../data";
import { scoreOf, tenantDotClass } from "../utils";
import AccountDetail, { SEGMENT_SHADES } from "./AccountDetail";

export default function LeadMemory() {
  const t = useTranslations("growthOs.leads");
  const { selected, select, inScope } = useGrowthOS();
  const items = accounts.filter((a) => inScope(a.tn)).sort((a, b) => scoreOf(b.sc) - scoreOf(a.sc));
  const current = items.find((a) => a.id === selected.account) ?? items[0];

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 overflow-hidden rounded-2xl border border-gray-200 bg-white xl:col-span-7 dark:border-gray-800 dark:bg-white/3">
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 sm:px-6 dark:border-gray-800">
          <FileIcon className="size-5 shrink-0 text-gray-400" />
          <span className="flex-1 text-theme-sm text-gray-500 dark:text-gray-400">{t("ask")}</span>
          <span className="hidden text-theme-xs text-gray-400 sm:block">{t("ranked")}</span>
        </div>
        <div className="hidden grid-cols-12 gap-4 border-b border-gray-100 px-6 py-3 text-theme-xs font-medium text-gray-500 sm:grid dark:border-gray-800 dark:text-gray-400">
          <span className="col-span-6">{t("cols.account")}</span>
          <span className="col-span-5">{t("cols.score")}</span>
          <span className="col-span-1 text-end">{t("cols.total")}</span>
        </div>
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {items.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => select("account", a.id)}
                className={cn(
                  "grid w-full grid-cols-12 items-center gap-x-4 gap-y-2 border-s-4 px-5 py-4 text-start transition-colors sm:px-6",
                  current?.id === a.id ? "border-brand-500 bg-brand-25 dark:bg-brand-500/10" : "border-transparent hover:bg-gray-50 dark:hover:bg-white/3",
                )}
              >
                <span className="col-span-10 min-w-0 sm:col-span-6">
                  <span className="block truncate text-theme-sm font-semibold text-gray-800 dark:text-white/90">{a.name}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-theme-xs text-gray-500 dark:text-gray-400">
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", tenantDotClass[a.tn])} />
                    <span className="truncate">{a.ind} · {a.stage}</span>
                  </span>
                </span>
                <span className="order-last col-span-12 flex h-2 gap-px overflow-hidden rounded-full bg-gray-100 sm:order-none sm:col-span-5 dark:bg-gray-800">
                  {a.sc.map((v, i) => (
                    <span key={i} className={cn("h-full", SEGMENT_SHADES[i])} style={{ width: `${v}%` }} />
                  ))}
                </span>
                <span className="col-span-2 text-end text-base font-bold text-gray-800 sm:col-span-1 dark:text-white/90">{scoreOf(a.sc)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12 xl:col-span-5">{current && <AccountDetail account={current} />}</div>
    </div>
  );
}
