"use client";

import Alert from "@/components/ui/alert/Alert";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { confidenceRule, momentSteps, routes, type Signal } from "../data";
import InfoTooltip from "../shared/InfoTooltip";
import ProgressBar from "../shared/ProgressBar";
import TenantTag from "../shared/TenantTag";
import { confidenceTone } from "../utils";

export default function SignalDetail({ signal: sg }: { signal: Signal }) {
  const t = useTranslations("growthOs");
  const { approveMoment, dismissSignal, say } = useGrowthOS();
  const router = useRouter();
  const market = sg.conf === "MARKET";
  const medium = sg.conf === "MEDIUM";
  const prog = sg.st === "live" ? 100 : sg.prog ?? 0;
  const kinds = t.raw("signals.assetKinds") as string[];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="border-b border-gray-100 px-5 py-5 sm:px-6 dark:border-gray-800">
        <div className="flex flex-wrap items-center gap-2">
          <Badge color={confidenceTone[sg.conf]}>{sg.conf}</Badge>
          <InfoTooltip tip="conf" />
          <span className="text-theme-sm text-gray-500 dark:text-gray-400">{confidenceRule[sg.conf]}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-gray-800 dark:text-white/90">{sg.acct}</h3>
        <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{sg.text}</p>
        <div className="mt-2"><TenantTag tn={sg.tn} /></div>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
          <p className="text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">{t("signals.whyNow")}</p>
          <p className="mt-2 text-sm text-gray-800 dark:text-white/90">{sg.why}</p>
        </div>

        <div>
          <p className="mb-3 text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">{t("signals.assets")}</p>
          <ul className="space-y-3">
            {sg.assets.map((a, i) => (
              <li
                key={a}
                className={cn(
                  "grid gap-2 rounded-xl border border-gray-200 p-4 sm:grid-cols-4 sm:gap-4 dark:border-gray-800",
                  ((market && i > 0) || (medium && i === 2)) && "opacity-50",
                )}
              >
                <span className="text-theme-xs font-semibold tracking-wide text-brand-500 uppercase dark:text-brand-400">{kinds[i]}</span>
                <span className="text-theme-sm text-gray-700 sm:col-span-3 dark:text-gray-300">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {sg.st === "new" && !market && !medium && (
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button size="sm" variant="outline" onClick={() => dismissSignal(sg.id)}>{t("common.dismiss")}</Button>
            <Button size="sm" onClick={() => approveMoment(sg.id)}>{t("signals.approve")}</Button>
          </div>
        )}

        {sg.st === "new" && (market || medium) && (
          <div className="space-y-3">
            <Alert variant="warning" title={sg.conf} message={market ? t("signals.marketBlocked") : t("signals.mediumBlocked")} />
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                router.push(routes.search);
                say(t("toast.contentBrief"));
              }}
            >
              {t("signals.openSearch")}
            </Button>
          </div>
        )}

        {(sg.st === "producing" || sg.st === "live") && (
          <div className="rounded-xl border border-gray-200 p-4 sm:p-5 dark:border-gray-800">
            <div className="flex items-center justify-between gap-2">
              <span className="text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">{t("signals.triggerToLive")}</span>
              {sg.st === "live" && <Badge size="sm" color="success">{t("common.live")}</Badge>}
            </div>
            <ProgressBar value={prog} className="mt-4" />
            <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {momentSteps.map(([time, label], i) => {
                const done = sg.st === "live" || prog >= i * 25;
                return (
                  <li key={label} className="flex flex-col gap-1">
                    <span className={cn("h-2.5 w-2.5 rounded-full", done ? "bg-brand-500" : "bg-gray-300 dark:bg-gray-700")} />
                    <span className="text-theme-xs text-gray-400">{time}</span>
                    <span className={cn("text-theme-sm", done ? "text-gray-800 dark:text-white/90" : "text-gray-400")}>{label}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
