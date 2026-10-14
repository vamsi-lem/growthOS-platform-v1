"use client";

import { type Scope, tenants } from "@/components/growth-os/data";
import { tenantDotClass } from "@/components/growth-os/utils";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { ChevronDownIcon, EyeIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

/** Filters every screen to one client tenant, or all of them. Clients are locked to their own tenant. */
export default function TenantScopeDropdown() {
  const t = useTranslations("growthOs.scope");
  const { role, scope, setScope } = useGrowthOS();
  const [isOpen, setIsOpen] = useState(false);

  if (role === "client") {
    return (
      <span className="inline-flex h-11 w-full items-center gap-2 rounded-lg bg-brand-50 px-3 text-theme-sm font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">
        <EyeIcon className="size-4" />
        {t("readOnly")}
      </span>
    );
  }

  const options: { id: Scope; name: string }[] = [{ id: "all", name: t("all") }, ...tenants.map((x) => ({ id: x.id as Scope, name: x.name }))];
  const current = options.find((o) => o.id === scope) ?? options[0];
  const dot = (id: Scope) => (id === "all" ? "bg-gray-400" : tenantDotClass[id]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={t("label")}
        className="dropdown-toggle inline-flex h-11 w-full items-center gap-2 whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-white/3"
      >
        <span className={cn("h-2 w-2 rounded-full", dot(current.id))} />
        <span className="flex-1 truncate text-start sm:max-w-36">{current.name}</span>
        <ChevronDownIcon className={cn("size-4 text-gray-500 transition-transform", isOpen && "rotate-180")} />
      </button>
      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="mt-2 w-full p-2 sm:w-56">
        {options.map((o) => (
          <DropdownItem
            key={o.id}
            onItemClick={() => setIsOpen(false)}
            onClick={() => setScope(o.id)}
            baseClassName={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-start text-theme-sm",
              scope === o.id
                ? "bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5",
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", dot(o.id))} />
            {o.name}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
}
