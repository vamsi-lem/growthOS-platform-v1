"use client";

import Badge from "@/components/ui/badge/Badge";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import ProgressBar from "../shared/ProgressBar";
import TenantTag from "../shared/TenantTag";
import { waveTone } from "../utils";
import WaveDetail from "./WaveDetail";

export default function WaveBoard() {
  const t = useTranslations("growthOs.waves");
  const { waves, selected, select, inScope } = useGrowthOS();
  const items = waves.filter((w) => inScope(w.tn));
  const current = items.find((w) => w.id === selected.wave) ?? items[0];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {items.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => select("wave", w.id)}
            className={cn(
              "flex flex-col gap-3 rounded-2xl border bg-white p-5 text-start transition-colors dark:bg-white/3",
              current?.id === w.id
                ? "border-brand-500 ring-4 ring-brand-500/10"
                : "border-gray-200 hover:border-brand-300 dark:border-gray-800 dark:hover:border-brand-800",
            )}
          >
            <span className="flex items-start justify-between gap-2">
              <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">{w.name} · {w.persona}</span>
              <Badge size="sm" color={waveTone(w.st)}>{w.st}</Badge>
            </span>
            <span className="flex flex-col gap-1">
              <TenantTag tn={w.tn} />
              <span className="text-theme-xs text-gray-500 dark:text-gray-400">{w.seg}</span>
            </span>
            <ProgressBar value={(w.step / 9) * 100} size="sm" />
            <span className="flex flex-wrap gap-x-4 gap-y-1 text-theme-xs text-gray-600 dark:text-gray-400">
              <span>{t("sent", { count: w.sent })}</span>
              <span>{t("replies", { count: w.rep })}</span>
              <span>{t("meetings", { count: w.mtg })}</span>
            </span>
          </button>
        ))}
      </div>
      {current && <WaveDetail wave={current} />}
    </>
  );
}
