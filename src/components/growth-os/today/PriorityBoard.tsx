"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon, TimeIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { actions, people, type Priority, routes } from "../data";
import InfoTooltip from "../shared/InfoTooltip";

const COLUMNS: { pri: Priority; dot: string; head: string }[] = [
  { pri: "Now", dot: "bg-error-500", head: "text-error-600" },
  { pri: "Today", dot: "bg-brand-500", head: "text-brand-600" },
  { pri: "This week", dot: "bg-gray-400", head: "text-gray-600" },
];

/** The person's actions as a board: one column per urgency. */
export default function PriorityBoard() {
  const t = useTranslations("growthOs.today");
  const { person } = useGrowthOS();
  const P = people.find((p) => p.id === person) ?? people[0];
  const list = actions[P.id];

  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-white/3">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{t("doNow", { name: P.name })}</h3>
      <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{t("doNowDesc")}</p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {COLUMNS.map((col) => {
          const items = list.filter((a) => a.pri === col.pri);
          return (
            <div key={col.pri} className="flex flex-col gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-900">
              <div className="flex items-center justify-between px-1">
                <span className={cn("flex items-center gap-2 text-theme-sm font-semibold dark:text-white/90", col.head)}>
                  <span className={cn("h-2 w-2 rounded-full", col.dot)} />
                  {t(`priority.${col.pri}`)}
                </span>
                <span className="text-theme-xs text-gray-400">{items.length}</span>
              </div>
              {items.length === 0 && <p className="px-1 py-4 text-center text-theme-xs text-gray-400">{t("board.empty")}</p>}
              {items.map((a) => (
                <article key={a.title} className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-gray-dark">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">{a.title}</h4>
                    {a.tip && <InfoTooltip tip={a.tip} align="end" />}
                  </div>
                  <p className="text-theme-xs text-gray-500 dark:text-gray-400">{a.why}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                    <span className="inline-flex items-center gap-1 text-theme-xs text-gray-500 dark:text-gray-400">
                      <TimeIcon className="size-4" />
                      {a.time}
                    </span>
                    <Link href={routes[a.go]} className="inline-flex items-center gap-1 text-theme-xs font-semibold text-brand-500 hover:text-brand-600">
                      {a.cta}
                      <ArrowRightIcon className="size-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
