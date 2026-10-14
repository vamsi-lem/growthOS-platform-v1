"use client";

import Switch from "@/components/form/switch/Switch";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useTranslations } from "next-intl";

export default function SidebarWidget() {
  const t = useTranslations("growthOs.devSpec");
  const { devSpec, setDevSpec } = useGrowthOS();

  return (
    <div className="pb-20">
      <div className="mx-auto rounded-2xl bg-gray-50 px-4 py-5 dark:bg-white/3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">{t("title")}</h3>
            <p className="text-theme-sm text-gray-500 dark:text-gray-400">{t("desc")}</p>
          </div>
          <Switch key={String(devSpec)} defaultChecked={devSpec} onChange={setDevSpec} />
        </div>
      </div>
    </div>
  );
}
