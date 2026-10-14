"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import type { Signal } from "../data";
import ProgressBar from "../shared/ProgressBar";
import TenantTag from "../shared/TenantTag";
import { confidenceTone } from "../utils";

interface SignalListProps {
  items: Signal[];
  selectedId?: string;
}

export default function SignalList({ items, selectedId }: SignalListProps) {
  const t = useTranslations("growthOs");
  const { select } = useGrowthOS();

  return (
    <ComponentCard title={t("signals.list")} desc={t("signals.listDesc")} bodyClassName="p-0">
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {items.map((x) => (
          <li key={x.id}>
            <button
              type="button"
              onClick={() => select("signal", x.id)}
              className={cn(
                "flex w-full flex-col gap-2 border-s-4 px-5 py-4 text-start transition-colors sm:px-6",
                selectedId === x.id ? "border-brand-500 bg-brand-25 dark:bg-brand-500/10" : "border-transparent hover:bg-gray-50 dark:hover:bg-white/3",
              )}
            >
              <span className="flex flex-wrap items-center gap-2">
                <Badge size="sm" color={confidenceTone[x.conf]}>{x.conf}</Badge>
                <span className="text-theme-xs text-gray-500 dark:text-gray-400">{x.kind}</span>
                <TenantTag tn={x.tn} />
                <span className="ms-auto text-theme-xs text-gray-400">{x.t}</span>
              </span>
              <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">{x.acct}</span>
              <span className="text-theme-sm text-gray-500 dark:text-gray-400">{x.text}</span>
              <span className="flex items-center gap-3">
                <ProgressBar value={x.score} size="sm" />
                <span className="text-theme-xs font-semibold text-gray-800 dark:text-white/90">{x.score}</span>
                {(x.st === "live" || x.st === "producing") && (
                  <Badge size="sm" color="success">{x.st === "live" ? t("common.live") : t("common.producing")}</Badge>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </ComponentCard>
  );
}
