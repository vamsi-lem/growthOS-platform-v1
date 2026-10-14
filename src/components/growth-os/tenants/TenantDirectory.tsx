"use client";

import Badge from "@/components/ui/badge/Badge";
import { PlugInIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { connectorContract, connectors, tenants } from "../data";
import TenantTag from "../shared/TenantTag";

const stateTone = { ok: "success", warn: "warning", off: "light" } as const;

export default function TenantDirectory() {
  const t = useTranslations("growthOs.tenants");

  return (
    <>
      {tenants.map((tn) => {
        const conns = connectors[tn.id];
        const warn = conns.some((c) => c[2] === "warn");
        const facts = [
          [t("tier"), `${tn.tier} · ${tn.stack}`],
          [t("retainer"), t("perMonth", { price: `$${tn.price.toLocaleString("en-US")}` })],
          [t("amMotion"), `${tn.am} · ${tn.motion}`],
        ];
        return (
          <div key={tn.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <div className="grid grid-cols-1 gap-4 border-b border-gray-100 px-5 py-5 sm:grid-cols-2 sm:px-6 xl:grid-cols-12 xl:items-center dark:border-gray-800">
              <div className="xl:col-span-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{tn.name}</h3>
                  <TenantTag tn={tn.id} label={tn.short} />
                </div>
                <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{tn.icp}</p>
              </div>
              {facts.map(([k, v]) => (
                <div key={k} className="xl:col-span-2">
                  <p className="text-theme-xs font-medium text-gray-500 uppercase dark:text-gray-400">{k}</p>
                  <p className="mt-0.5 text-theme-sm text-gray-800 dark:text-white/90">{v}</p>
                </div>
              ))}
              <div className="xl:col-span-2 xl:text-end">
                <Badge color={warn ? "warning" : "success"}>{warn ? t("attention") : t("healthy")}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-px bg-gray-100 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 dark:bg-gray-800">
              {conns.map(([cls, tool, state, lane]) => (
                <div key={`${cls}-${tool}`} className="flex flex-col gap-1.5 bg-white px-5 py-4 sm:px-6 dark:bg-gray-900">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-theme-xs text-gray-500 dark:text-gray-400">{cls}</span>
                    <Badge size="sm" color={stateTone[state]}>{t(`state.${state}`)}</Badge>
                  </div>
                  <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">{tool}</span>
                  {lane && <span className="text-theme-xs font-medium text-brand-500 dark:text-brand-400">{t("lane", { lane })}</span>}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-gray-300 p-5 sm:flex-row sm:items-center sm:gap-4 sm:p-6 dark:border-gray-700">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white/90">
          <PlugInIcon className="size-5" />
        </span>
        <div className="flex-1">
          <p className="text-theme-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t("contract")}</p>
          <p className="mt-0.5 font-mono text-theme-sm text-gray-800 dark:text-white/90">{connectorContract}</p>
        </div>
        <p className="text-theme-sm text-gray-500 dark:text-gray-400">{t("contractNote")}</p>
      </div>
    </>
  );
}
