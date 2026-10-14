"use client";

import Badge from "@/components/ui/badge/Badge";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import type { Campaign } from "../data";
import InfoTooltip from "../shared/InfoTooltip";

interface CadenceTableProps {
  campaign: Campaign;
  activeCol: number;
  simulated: boolean;
}

/** Day-by-day touches per channel; columns up to the current day light up. */
export default function CadenceTable({ campaign: C, activeCol, simulated }: CadenceTableProps) {
  const t = useTranslations("growthOs.campaigns");
  const colour: Record<string, string> = Object.fromEntries(C.branches.map((b) => [b.ch, b.c]));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-white/3">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white/90">
          {t("cadence")}
          <InfoTooltip tip="cadence" />
        </h3>
        {simulated && <Badge size="sm" color="warning">{t("simulatedOutcome")}</Badge>}
      </div>
      <div className="custom-scrollbar max-w-full overflow-x-auto">
        <Table className="min-w-190 border-separate border-spacing-1.5">
          <TableHeader>
            <TableRow>
              <TableCell isHeader className="w-32 pb-2 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">{t("channel")}</TableCell>
              {C.days.map((d, j) => (
                <TableCell
                  key={d}
                  isHeader
                  className={cn(
                    "border-b-2 pb-2 text-start text-theme-xs font-medium",
                    j === activeCol ? "border-brand-500 text-gray-800 dark:text-white/90" : "border-transparent",
                    j <= activeCol ? "text-gray-800 dark:text-white/90" : "text-gray-400",
                  )}
                >
                  {d}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {C.cadence.map(([ch, cells]) => (
              <TableRow key={ch}>
                <TableCell className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: colour[ch] }} />
                    {ch}
                  </span>
                </TableCell>
                {cells.map((x, j) => {
                  const lit = !!x && j <= activeCol;
                  return (
                    <TableCell key={j} className="p-0">
                      {x && (
                        <span
                          className={cn(
                            "flex h-12 items-center rounded-lg border-2 px-3 text-theme-xs font-medium transition-colors duration-300",
                            lit ? "text-white" : "bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300",
                          )}
                          style={{ borderColor: colour[ch], ...(lit ? { backgroundColor: colour[ch] } : {}) }}
                        >
                          {x}
                        </span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
