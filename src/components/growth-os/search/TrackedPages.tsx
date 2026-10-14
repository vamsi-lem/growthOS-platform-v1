"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { pages, type Tone } from "../data";
import ProgressBar from "../shared/ProgressBar";
import { tenantDotClass } from "../utils";

const th = "px-5 py-3 text-start text-theme-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400";
const aeoTone = (a: string): Tone => (a === "Lost" ? "error" : a === "None" ? "light" : "success");
const statusTone = (s: string): Tone => (s === "Slipping" ? "error" : s === "Rising" ? "success" : "light");

export default function TrackedPages() {
  const t = useTranslations("growthOs.search");
  const { queue, role, inScope, writeFix } = useGrowthOS();
  const rows = pages.filter((p) => inScope(p.tn));

  return (
    <ComponentCard title={t("tracked")} desc={t("trackedDesc")} bodyClassName="p-0">
      <div className="custom-scrollbar max-w-full overflow-x-auto">
        <Table className="min-w-225">
          <TableHeader className="border-b border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell isHeader className={th}>{t("cols.page")}</TableCell>
              <TableCell isHeader className={th}>{t("cols.seo")}</TableCell>
              <TableCell isHeader className={th}>{t("cols.aeo")}</TableCell>
              <TableCell isHeader className={th}>{t("cols.geo")}</TableCell>
              <TableCell isHeader className={th}>{t("cols.status")}</TableCell>
              <TableCell isHeader className={th}>{""}</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {rows.map((p) => {
              const delta = p.seo[0] - p.seo[1];
              const slipping = p.st === "Slipping";
              const task = queue.find((q) => q.type === "Content fix" && q.title.includes(p.url));
              const geoUp = p.geo[1] >= p.geo[0];
              return (
                <TableRow key={p.id}>
                  <TableCell className="px-5 py-4 sm:px-6">
                    <p className="font-mono text-theme-sm text-gray-800 dark:text-white/90">{p.url}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-theme-xs text-gray-500 dark:text-gray-400">
                      <span className={cn("h-2 w-2 rounded-full", tenantDotClass[p.tn])} />
                      &ldquo;{p.q}&rdquo;
                    </p>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6">
                    <span className="flex items-baseline gap-2">
                      <span className="text-theme-xs text-gray-400">#{p.seo[0]}</span>
                      <span className="text-base font-semibold text-gray-800 dark:text-white/90">#{p.seo[1]}</span>
                      <span className={cn("text-theme-xs font-medium", delta > 0 ? "text-success-600" : delta < 0 ? "text-error-600" : "text-gray-400")}>
                        {delta > 0 ? "▲" : delta < 0 ? "▼" : ""} {Math.abs(delta)}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6"><Badge size="sm" color={aeoTone(p.aeo)}>{p.aeo}</Badge></TableCell>
                  <TableCell className="px-5 py-4 sm:px-6">
                    <p className="text-theme-xs text-gray-500 dark:text-gray-400">
                      {p.geo[0]}% → <span className={cn("font-semibold", geoUp ? "text-success-600" : "text-error-600")}>{p.geo[1]}%</span>
                    </p>
                    <ProgressBar value={p.geo[1] * 3} size="xs" className="mt-1.5 w-28" barClassName={geoUp ? "bg-success-500" : "bg-error-500"} />
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6"><Badge size="sm" color={statusTone(p.st)}>{p.st}</Badge></TableCell>
                  <TableCell className="px-5 py-4 text-end sm:px-6">
                    {slipping && !task && role !== "client" && (
                      <Button size="sm" className="px-3! py-2!" onClick={() => writeFix(p.id)}>{t("writeFix")}</Button>
                    )}
                    {task && <Badge size="sm">{task.st === "approved" ? t("fixApproved") : t("fixQueued")}</Badge>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </ComponentCard>
  );
}
