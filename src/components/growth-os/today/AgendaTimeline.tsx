"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon, TimeIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { actions, people, type Priority, routes } from "../data";
import InfoTooltip from "../shared/InfoTooltip";

const NODE: Record<Priority, string> = {
  Now: "bg-brand-500 ring-4 ring-brand-500/20",
  Today: "bg-white ring-2 ring-brand-500 dark:bg-gray-900",
  "This week": "bg-gray-300 dark:bg-gray-700",
};

/** The person's actions as an agenda: one timeline, sectioned by urgency. */
export default function AgendaTimeline() {
  const t = useTranslations("growthOs.today");
  const { person } = useGrowthOS();
  const P = people.find((p) => p.id === person) ?? people[0];
  const list = actions[P.id];
  const sections: Priority[] = ["Now", "Today", "This week"];

  return (
    <section className="h-full rounded-3xl border border-gray-200 bg-white p-6 md:p-7 dark:border-gray-800 dark:bg-white/3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{t("doNow", { name: P.name })}</h2>
        <span className="text-theme-sm text-gray-500 dark:text-gray-400">{t("doNowDesc")}</span>
      </div>

      <div className="mt-6 space-y-6">
        {sections.map((pri) => {
          const items = list.filter((a) => a.pri === pri);
          if (!items.length) return null;
          return (
            <div key={pri}>
              <p className="mb-3 flex items-center gap-2 text-theme-xs font-bold tracking-widest text-gray-400 uppercase">
                {t(`priority.${pri}`)}
                <span className="rounded-full bg-gray-100 px-2 py-0.5 tracking-normal text-gray-600 dark:bg-gray-800 dark:text-gray-300">{items.length}</span>
              </p>
              <ol className="relative space-y-3 ps-7 before:absolute before:inset-y-2 before:start-2 before:w-px before:bg-gray-200 dark:before:bg-gray-800">
                {items.map((a) => (
                  <li key={a.title} className="relative">
                    <span className={cn("absolute top-5 -start-6.5 h-3 w-3 rounded-full", NODE[pri])} />
                    <div className="group flex flex-col gap-3 rounded-2xl border border-transparent p-4 transition-colors hover:border-gray-200 hover:bg-gray-50 sm:flex-row sm:items-center dark:hover:border-gray-800 dark:hover:bg-white/3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-theme-sm font-bold text-gray-900 dark:text-white">{a.title}</h3>
                          {a.tip && <InfoTooltip tip={a.tip} />}
                        </div>
                        <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{a.why}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-theme-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                          <TimeIcon className="size-3.5" />
                          {a.time}
                        </span>
                        <Link
                          href={routes[a.go]}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-theme-xs font-semibold transition-colors",
                            pri === "Now" ? "bg-brand-500 text-white hover:bg-brand-600" : "border border-gray-200 text-gray-700 hover:border-brand-500 hover:text-brand-600 dark:border-gray-700 dark:text-gray-300",
                          )}
                        >
                          {a.cta}
                          <ArrowRightIcon className="size-3.5 rtl:rotate-180" />
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}
