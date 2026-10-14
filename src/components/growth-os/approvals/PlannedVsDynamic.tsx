"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useTranslations } from "next-intl";
import { tenants } from "../data";
import ProgressBar from "../shared/ProgressBar";
import TenantTag from "../shared/TenantTag";

export default function PlannedVsDynamic() {
  const t = useTranslations("growthOs.approvals");
  const { inScope } = useGrowthOS();

  return (
    <ComponentCard title={t("planned")} action={<Badge size="sm" color="light">{t("plannedTag")}</Badge>} bodyClassName="space-y-4 p-4 sm:p-6">
      {tenants.filter((x) => inScope(x.id)).map((x) => (
        <div key={x.id}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <TenantTag tn={x.id} />
            <span className="text-theme-xs font-medium text-gray-700 dark:text-gray-300">{x.ratio}% / {100 - x.ratio}%</span>
          </div>
          <ProgressBar value={x.ratio} className="bg-warning-100 dark:bg-warning-500/20" />
        </div>
      ))}
      <div className="flex gap-4 pt-1 text-theme-xs text-gray-500 dark:text-gray-400">
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-500" />{t("plannedLegend")}</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning-300" />{t("dynamicLegend")}</span>
      </div>
    </ComponentCard>
  );
}
