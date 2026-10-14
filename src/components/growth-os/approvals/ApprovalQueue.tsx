"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { TimeIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import type { QueueItem, Tone } from "../data";
import TenantTag from "../shared/TenantTag";

const toneOf = (q: QueueItem): Tone =>
  q.st === "approved" ? "success" : q.st === "rejected" ? "light" : q.urgent ? "error" : "primary";

export default function ApprovalQueue() {
  const t = useTranslations("growthOs");
  const { queue, inScope, approve, returnItem } = useGrowthOS();
  const items = queue.filter((q) => inScope(q.tn));

  return (
    <ComponentCard
      title={t("approvals.queue")}
      desc={t("approvals.queueDesc")}
      action={<Badge size="sm" color="light">{t("approvals.sorted")}</Badge>}
      bodyClassName="p-0"
    >
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {items.map((q) => (
          <li
            key={q.id}
            className={cn(
              "flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:px-6 dark:hover:bg-white/3",
              q.st !== "pending" && "opacity-60",
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm" color={toneOf(q)}>
                  {q.st === "approved" ? t("common.approved") : q.st === "rejected" ? t("common.returned") : q.type}
                </Badge>
                <TenantTag tn={q.tn} />
                <span className="text-theme-xs text-gray-400">{q.agent} · {q.tier}</span>
              </div>
              <p className="mt-2 text-theme-sm font-semibold text-gray-800 dark:text-white/90">{q.title}</p>
              <p className="mt-0.5 text-theme-sm text-gray-500 dark:text-gray-400">{q.detail}</p>
            </div>
            <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end">
              <span className={cn("inline-flex items-center gap-1 text-theme-xs", q.urgent && q.st === "pending" ? "font-medium text-error-600 dark:text-error-500" : "text-gray-500 dark:text-gray-400")}>
                <TimeIcon className="size-4" />
                {q.due}
              </span>
              {q.st === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="px-3! py-2!" onClick={() => returnItem(q.id)}>
                    {t("common.return")}
                  </Button>
                  <Button size="sm" className="px-3! py-2!" onClick={() => approve(q.id)}>
                    {t("common.approve")}
                  </Button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </ComponentCard>
  );
}
