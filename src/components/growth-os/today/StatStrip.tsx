"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { ArrowDownIcon, ArrowUpIcon } from "@/icons";
import { cn } from "@/utils";
import { highlights } from "../data";
import Sparkline from "../shared/Sparkline";

/** Four headline numbers in one connected strip, divided rather than boxed. */
export default function StatStrip() {
  const { person } = useGrowthOS();

  return (
    <section className="grid grid-cols-2 overflow-hidden rounded-3xl border border-gray-200 bg-white xl:grid-cols-4 dark:border-gray-800 dark:bg-white/3">
      {highlights[person].map((h, i) => (
        <div
          key={h.k}
          className={cn(
            "flex flex-col gap-2 p-5 md:p-6",
            i % 2 === 1 && "border-s border-gray-100 dark:border-gray-800",
            i >= 2 && "border-t border-gray-100 xl:border-t-0 dark:border-gray-800",
            i === 2 && "xl:border-s",
          )}
        >
          <span className="text-theme-sm font-medium text-gray-500 dark:text-gray-400">{h.k}</span>
          <span className="text-title-sm font-extrabold tracking-tight text-gray-900 dark:text-white">{h.v}</span>
          <span className={cn("inline-flex items-center gap-1 text-theme-xs font-semibold", h.up ? "text-brand-600 dark:text-brand-400" : "text-error-600 dark:text-error-500")}>
            {h.up ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" />}
            {h.d}
          </span>
          <div className="-mx-1 mt-1">
            <Sparkline data={h.s} color="#059669" name={h.k} height={40} />
          </div>
        </div>
      ))}
    </section>
  );
}
