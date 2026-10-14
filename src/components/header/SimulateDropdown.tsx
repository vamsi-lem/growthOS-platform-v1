"use client";

import { routes } from "@/components/growth-os/data";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useRouter } from "@/i18n/navigation";
import { BoltIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

type SimKey = "scan" | "trip" | "approveAll" | "reset";
const simKeys: SimKey[] = ["scan", "trip", "approveAll", "reset"];

/** Demo controls: rerun the scan, trip a guardrail, approve everything, or reset. */
export default function SimulateDropdown() {
  const t = useTranslations("growthOs");
  const { role, runScan, tripGuard, approveAll, reset } = useGrowthOS();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (role === "client") return null;

  const run = (k: SimKey) => {
    if (k === "scan") {
      if (runScan()) router.push(routes.signals);
    } else if (k === "trip") tripGuard();
    else if (k === "approveAll") approveAll();
    else {
      reset();
      router.push(routes.cockpit);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="dropdown-toggle inline-flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-4 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
      >
        <BoltIcon className="size-5" />
        {t("header.simulate")}
      </button>
      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="mt-2 w-72 p-2">
        {simKeys.map((k) => (
          <DropdownItem
            key={k}
            onItemClick={() => setIsOpen(false)}
            onClick={() => run(k)}
            baseClassName="flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2.5 text-start hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <span className="text-theme-sm font-medium text-gray-800 dark:text-white/90">{t(`simulate.${k}.title`)}</span>
            <span className="text-theme-xs text-gray-500 dark:text-gray-400">{t(`simulate.${k}.desc`)}</span>
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
}
