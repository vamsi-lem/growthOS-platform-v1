"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { useTranslations } from "next-intl";
import { connectors, type ScreenId } from "./data";
import { limitLabel, tenantName } from "./utils";

export interface GrowthAlert {
  id: string;
  title: string;
  value: string;
  limit: string;
  action: string;
  tripped: boolean;
  opensModal: boolean;
  to: ScreenId;
}

/** Guardrail thresholds that are tripped or near their limit, plus degraded connectors. */
export function useAlerts(): GrowthAlert[] {
  const t = useTranslations("growthOs.alerts");
  const { trips, role, inScope } = useGrowthOS();

  const alerts: GrowthAlert[] = trips.map((x) => ({
    id: `${x.g.k}-${x.tn}`,
    title: `${x.g.k} · ${tenantName(x.tn)}`,
    value: `${x.v}${x.g.unit}`,
    limit: limitLabel(x.g),
    action: x.g.act,
    tripped: x.hit,
    opensModal: x.tn === "mg" && x.g.k === "Hard bounce rate" && x.hit,
    to: "cost",
  }));

  connectors.mg.forEach(([, tool, state]) => {
    if (state === "warn" && inScope("mg")) {
      alerts.push({
        id: `seat-${tool}`,
        title: t("seatHealth", { tool }),
        value: t("seat"),
        limit: t("warning"),
        action: t("seatHealthAct"),
        tripped: false,
        opensModal: false,
        to: role === "operator" ? "tenants" : "cost",
      });
    }
  });

  return alerts;
}
