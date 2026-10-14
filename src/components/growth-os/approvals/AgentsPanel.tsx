"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import { useTick } from "@/hooks/useTick";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { agents } from "../data";

export default function AgentsPanel() {
  const t = useTranslations("growthOs.approvals");
  const tick = useTick(1680);

  return (
    <ComponentCard title={t("agents")} action={<Badge size="sm" color="light">{t("agentsTag")}</Badge>} bodyClassName="p-4 sm:p-6">
      <ul className="grid grid-cols-2 gap-2">
        {agents.map(([name, tier], i) => {
          const on = (i * 7 + tick * 3) % 10 < 6;
          return (
            <li key={name} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-white/3">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", on ? "animate-pulse bg-success-500" : "bg-gray-300 dark:bg-gray-700")} />
              <span className="flex-1 truncate text-theme-sm text-gray-700 dark:text-gray-300">{name}</span>
              <span className="text-theme-xs font-medium text-gray-400">{tier}</span>
            </li>
          );
        })}
      </ul>
    </ComponentCard>
  );
}
