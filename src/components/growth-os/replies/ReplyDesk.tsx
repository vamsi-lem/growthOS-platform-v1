"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import AvatarText from "@/components/ui/avatar/AvatarText";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { intentTone } from "../utils";
import ReplyDetail from "./ReplyDetail";

export default function ReplyDesk() {
  const t = useTranslations("growthOs.replies");
  const { replies, selected, select, inScope } = useGrowthOS();
  const items = replies.filter((r) => inScope(r.tn));
  const current = items.find((r) => r.id === selected.reply) ?? items[0];

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-5">
        <ComponentCard title={t("inbox")} desc={t("inboxDesc")} bodyClassName="p-0">
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {items.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => select("reply", r.id)}
                  className={cn(
                    "flex w-full gap-3 border-s-4 px-5 py-4 text-start transition-colors sm:px-6",
                    current?.id === r.id ? "border-brand-500 bg-brand-25 dark:bg-brand-500/10" : "border-transparent hover:bg-gray-50 dark:hover:bg-white/3",
                    r.sent && "opacity-60",
                  )}
                >
                  <AvatarText name={r.from} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-theme-sm font-semibold text-gray-800 dark:text-white/90">{r.from}</span>
                      <span className="shrink-0 text-theme-xs text-gray-400">{r.age}</span>
                    </span>
                    <span className="block truncate text-theme-xs text-gray-500 dark:text-gray-400">{r.role} · {r.co}</span>
                    <span className="mt-2 flex items-center gap-2">
                      <Badge size="sm" color={intentTone[r.intent]}>{r.intent}</Badge>
                      <span className="text-theme-xs text-gray-400">{r.ch}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </ComponentCard>
      </div>
      <div className="col-span-12 xl:col-span-7">{current && <ReplyDetail reply={current} />}</div>
    </div>
  );
}
