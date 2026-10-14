"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Tier } from "../data";
import SegmentedTabs from "../shared/SegmentedTabs";
import { tenantName } from "../utils";

type Filter = "all" | Tier;
const th = "px-5 py-3 text-start text-theme-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400";

export default function AuditLog() {
  const t = useTranslations("growthOs.cost");
  const { audit, inScope } = useGrowthOS();
  const [filter, setFilter] = useState<Filter>("all");
  const rows = audit.filter((a) => inScope(a[3]) && (filter === "all" || a[4] === filter));

  return (
    <ComponentCard
      title={t("audit")}
      desc={t("auditDesc")}
      action={
        <SegmentedTabs<Filter>
          value={filter}
          onChange={setFilter}
          options={(["all", "T0", "T1", "T2", "T3"] as Filter[]).map((f) => ({ value: f, label: f === "all" ? t("all") : f }))}
        />
      }
      bodyClassName="p-0"
    >
      <div className="custom-scrollbar max-w-full overflow-x-auto">
        <Table className="min-w-190">
          <TableHeader className="border-b border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell isHeader className={th}>{t("cols.time")}</TableCell>
              <TableCell isHeader className={th}>{t("cols.actor")}</TableCell>
              <TableCell isHeader className={th}>{t("cols.action")}</TableCell>
              <TableCell isHeader className={th}>{t("cols.tenant")}</TableCell>
              <TableCell isHeader className={th}>{t("cols.tier")}</TableCell>
              <TableCell isHeader className={`${th} text-end`}>{t("cols.cost")}</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {rows.map(([time, who, what, tn, tier, cost], i) => (
              <TableRow key={`${time}-${what}-${i}`} className="hover:bg-gray-50 dark:hover:bg-white/3">
                <TableCell className="px-5 py-3 font-mono text-theme-xs text-gray-500 sm:px-6 dark:text-gray-400">{time}</TableCell>
                <TableCell className="px-5 py-3 text-theme-sm font-medium text-gray-800 sm:px-6 dark:text-white/90">{who}</TableCell>
                <TableCell className="px-5 py-3 text-theme-sm text-gray-600 sm:px-6 dark:text-gray-400">{what}</TableCell>
                <TableCell className="px-5 py-3 text-theme-xs text-gray-500 sm:px-6 dark:text-gray-400">{tn === "all" ? t("allTenants") : tenantName(tn)}</TableCell>
                <TableCell className="px-5 py-3 sm:px-6"><Badge size="sm">{tier}</Badge></TableCell>
                <TableCell className="px-5 py-3 text-end font-mono text-theme-xs text-gray-700 sm:px-6 dark:text-gray-300">{cost ? `$${cost.toFixed(3)}` : "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ComponentCard>
  );
}
