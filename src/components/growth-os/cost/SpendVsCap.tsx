"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useTranslations } from "next-intl";
import { modelTiers, tenants } from "../data";
import InfoTooltip from "../shared/InfoTooltip";
import TenantTag from "../shared/TenantTag";

/** Model tiers T0–T3, lightest to strongest. */
const TIER_SHADES = ["bg-gray-300 dark:bg-gray-600", "bg-brand-200", "bg-brand-400", "bg-brand-600"];

export default function SpendVsCap() {
  const t = useTranslations("growthOs.cost");
  const { inScope } = useGrowthOS();

  return (
    <ComponentCard
      title={<span className="inline-flex items-center gap-2">{t("spend")}<InfoTooltip tip="router" /></span>}
      desc={t("spendDesc")}
      bodyClassName="space-y-5 p-4 sm:p-6"
    >
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {modelTiers.map(([tier, label], i) => (
          <li key={tier} className="flex items-center gap-2 text-theme-xs text-gray-500 dark:text-gray-400">
            <span className={`h-2.5 w-2.5 rounded-sm ${TIER_SHADES[i]}`} />
            <span className="font-semibold text-gray-800 dark:text-white/90">{tier}</span>
            {label}
          </li>
        ))}
      </ul>
      {tenants.filter((x) => inScope(x.id)).map((x) => {
        const spent = x.spend.reduce((a, b) => a + b, 0);
        const pct = Math.round((spent / x.budget) * 100);
        const state = pct >= 100 ? "override" : pct >= 80 ? "dropped" : "normal";
        return (
          <div key={x.id} className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:items-center sm:gap-4">
            <div className="sm:col-span-3"><TenantTag tn={x.id} /></div>
            <div className="relative h-3.5 overflow-hidden rounded-full bg-gray-100 sm:col-span-6 dark:bg-gray-800">
              <div className="flex h-full">
                {x.spend.map((v, i) => (
                  <span key={i} className={`h-full ${TIER_SHADES[i]}`} style={{ width: `${(v / x.budget) * 100}%` }} />
                ))}
              </div>
              <span className="absolute inset-y-0 w-0.5 bg-warning-500" style={{ insetInlineStart: "80%" }} aria-hidden />
            </div>
            <div className="flex items-center justify-between gap-3 sm:col-span-3 sm:justify-end">
              <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
                ${spent} <span className="font-normal text-gray-400">/ ${x.budget}</span>
              </span>
              <Badge size="sm" color={state === "override" ? "error" : state === "dropped" ? "warning" : "success"}>{t(`state.${state}`)}</Badge>
            </div>
          </div>
        );
      })}
    </ComponentCard>
  );
}
