"use client";

import Button from "@/components/ui/button/Button";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { routes } from "../data";
import TenantTag from "../shared/TenantTag";

/** The most time-sensitive decision: a moment set that expires today. */
export default function MomentDecision() {
  const t = useTranslations("growthOs.approvals");
  const { queue, signals, inScope, approve, select } = useGrowthOS();
  const router = useRouter();
  const moment = queue.find((q) => q.type === "Moment set" && inScope(q.tn));
  const sig = moment ? signals.find((s) => s.id === moment.sig) : undefined;
  if (!moment || !sig || moment.st !== "pending") return null;

  return (
    <div className="rounded-2xl border border-brand-300 bg-white p-5 shadow-theme-md sm:p-6 dark:border-brand-800 dark:bg-white/3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-theme-xs font-medium tracking-wide text-error-600 uppercase dark:text-error-500">{t("moment", { due: moment.due })}</span>
        <TenantTag tn={sig.tn} />
      </div>
      <p className="mt-3 font-semibold text-gray-800 dark:text-white/90">{sig.text}</p>
      <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{sig.why}</p>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            select("signal", sig.id);
            router.push(routes.signals);
          }}
        >
          {t("reviewAssets")}
        </Button>
        <Button size="sm" onClick={() => approve(moment.id)}>{t("approveThree")}</Button>
      </div>
    </div>
  );
}
