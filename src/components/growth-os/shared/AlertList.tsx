"use client";

import Badge from "@/components/ui/badge/Badge";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { routes } from "../data";
import { useAlerts } from "../useAlerts";

interface AlertListProps {
  onSelect?: () => void;
  className?: string;
}

/** Guardrail alert rows, shared by the header bell and the Approvals screen. */
export default function AlertList({ onSelect, className }: AlertListProps) {
  const t = useTranslations("growthOs.alerts");
  const alerts = useAlerts();
  const { openGuardModal } = useGrowthOS();
  const router = useRouter();

  if (!alerts.length) {
    return <p className="px-4 py-6 text-center text-theme-sm text-gray-500 dark:text-gray-400">{t("empty")}</p>;
  }

  return (
    <ul className={cn("divide-y divide-gray-100 dark:divide-gray-800", className)}>
      {alerts.map((a) => (
        <li key={a.id}>
          <button
            type="button"
            onClick={() => {
              onSelect?.();
              if (a.opensModal) openGuardModal();
              else router.push(routes[a.to]);
            }}
            className="flex w-full items-start gap-3 px-4 py-3 text-start transition-colors hover:bg-gray-50 sm:px-6 dark:hover:bg-white/3"
          >
            <Badge size="sm" color={a.tripped ? "error" : "warning"}>
              {a.tripped ? t("tripped") : t("near")}
            </Badge>
            <span className="min-w-0 flex-1">
              <span className="block text-theme-sm font-medium text-gray-800 dark:text-white/90">{a.title}</span>
              <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">{a.action}</span>
            </span>
            <span className="shrink-0 text-end text-theme-xs">
              <span className={cn("block font-semibold", a.tripped ? "text-error-600 dark:text-error-500" : "text-warning-600 dark:text-orange-400")}>
                {a.value}
              </span>
              <span className="block text-gray-500 dark:text-gray-400">{a.limit}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
