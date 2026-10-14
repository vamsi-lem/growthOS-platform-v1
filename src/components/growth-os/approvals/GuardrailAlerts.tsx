"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useTranslations } from "next-intl";
import AlertList from "../shared/AlertList";

export default function GuardrailAlerts() {
  const t = useTranslations("growthOs.alerts");

  return (
    <ComponentCard title={t("title")} bodyClassName="p-0">
      <AlertList />
    </ComponentCard>
  );
}
