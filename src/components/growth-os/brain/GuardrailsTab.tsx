"use client";

import Badge from "@/components/ui/badge/Badge";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useTranslations } from "next-intl";
import type { TenantId } from "../data";
import { isTripped, limitLabel } from "../utils";

const th = "py-3 pe-4 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400";

export default function GuardrailsTab({ tn }: { tn: TenantId }) {
  const t = useTranslations("growthOs.brain");
  const { guard } = useGrowthOS();

  return (
    <div className="custom-scrollbar max-w-full overflow-x-auto">
      <Table className="min-w-180">
        <TableHeader className="border-y border-gray-100 dark:border-gray-800">
          <TableRow>
            <TableCell isHeader className={th}>{t("guardCols.threshold")}</TableCell>
            <TableCell isHeader className={th}>{t("guardCols.limit")}</TableCell>
            <TableCell isHeader className={th}>{t("guardCols.now")}</TableCell>
            <TableCell isHeader className={th}>{t("guardCols.type")}</TableCell>
            <TableCell isHeader className={th}>{t("guardCols.action")}</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
          {guard.map((g) => {
            const v = g.v[tn];
            const hit = isTripped(g, v);
            return (
              <TableRow key={g.k}>
                <TableCell className="py-3 pe-4 text-theme-sm font-medium text-gray-800 dark:text-white/90">{g.k}</TableCell>
                <TableCell className="py-3 pe-4 text-theme-sm text-gray-500 dark:text-gray-400">{limitLabel(g)}</TableCell>
                <TableCell className="py-3 pe-4">
                  <Badge size="sm" color={hit ? "error" : g.hard ? "warning" : "success"}>{`${v}${g.unit}`}</Badge>
                </TableCell>
                <TableCell className="py-3 pe-4 text-theme-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  {g.hard ? t("hardStop") : t("recommend")}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-600 dark:text-gray-400">{g.act}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
