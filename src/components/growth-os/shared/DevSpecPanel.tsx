"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useTranslations } from "next-intl";
import { accounts, connectors, pages, type ScreenId, specs, tenants } from "../data";
import { singleTenant } from "../utils";

interface DevSpecPanelProps {
  screen: ScreenId;
}

/** Record the developer spec shows for each screen — whatever is selected right now. */
function useSpecObject(screen: ScreenId): unknown {
  const s = useGrowthOS();
  const one = singleTenant(s.scope, "lg");
  switch (screen) {
    case "cockpit": return s.queue.find((q) => s.inScope(q.tn));
    case "signals": return s.signals.find((x) => x.id === s.selected.signal);
    case "waves": return s.waves.find((w) => w.id === s.selected.wave);
    case "replies": return s.replies.find((r) => r.id === s.selected.reply);
    case "brain": return { tenant: one, version: s.briefs[one].v, positioning: s.briefs[one].pos, icp_filters: s.briefs[one].icp };
    case "leads": return accounts.find((a) => a.id === s.selected.account);
    case "search": return pages.find((p) => s.inScope(p.tn));
    case "client": return { tenant: singleTenant(s.scope, "mg"), role: "client_viewer", writable: false };
    case "tenants": return { tenant: tenants[0], connectors: connectors.lg.slice(0, 3) };
    case "cost": return s.audit[0];
    default: return undefined;
  }
}

/** Build notes for the current screen: layer, tables, endpoints, rule and the selected record. */
export default function DevSpecPanel({ screen }: DevSpecPanelProps) {
  const t = useTranslations("growthOs.devSpec");
  const tp = useTranslations("growthOs.pages");
  const spec = specs[screen];
  const object = useSpecObject(screen);

  return (
    <ComponentCard
      className="mt-6"
      title={t("panelTitle")}
      desc={tp(`${screen}.title`)}
      bodyClassName="grid gap-6 p-4 sm:p-6 lg:grid-cols-2"
    >
      <dl className="divide-y divide-gray-100 dark:divide-gray-800">
        {spec.rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-3 gap-4 py-3 first:pt-0">
            <dt className="text-theme-xs font-medium text-gray-500 uppercase dark:text-gray-400">{k}</dt>
            <dd className="col-span-2 text-theme-sm text-gray-800 dark:text-white/90">{v}</dd>
          </div>
        ))}
      </dl>
      {spec.obj && object !== undefined && (
        <div className="min-w-0">
          <p className="mb-2 text-theme-xs font-medium text-gray-500 uppercase dark:text-gray-400">
            {t("selected", { name: spec.obj })}
          </p>
          <pre className="custom-scrollbar max-h-80 overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-theme-xs text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
            {JSON.stringify(object, null, 2)}
          </pre>
        </div>
      )}
    </ComponentCard>
  );
}
