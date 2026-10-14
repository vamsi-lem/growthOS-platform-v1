"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { useTranslations } from "next-intl";
import MetricCard from "../shared/MetricCard";

export default function ApprovalMetrics() {
  const t = useTranslations("growthOs.approvals");
  const { queue, signals, waves, trips, inScope } = useGrowthOS();
  const pending = queue.filter((q) => q.st === "pending" && inScope(q.tn)).length;
  const fresh = signals.filter((s) => s.st === "new" && inScope(s.tn)).length;
  const live = waves.filter((w) => w.st === "Live" && inScope(w.tn)).length;
  const hits = trips.filter((x) => x.hit).length;

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
      <MetricCard label={t("awaiting")} value={pending} sub={t("awaitingSub")} valueTone="primary" />
      <MetricCard label={t("signals")} value={fresh} sub={t("signalsSub")} />
      <MetricCard label={t("waves")} value={live} sub={t("wavesSub")} />
      <MetricCard
        label={t("guardrails")}
        value={hits}
        sub={hits ? t("guardTripped") : t("guardNear", { count: trips.length })}
        valueTone={hits ? "error" : "default"}
      />
    </div>
  );
}
