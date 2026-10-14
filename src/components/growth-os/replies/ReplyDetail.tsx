"use client";

import TextArea from "@/components/form/input/TextArea";
import Alert from "@/components/ui/alert/Alert";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useTranslations } from "next-intl";
import type { Reply } from "../data";
import ProgressBar from "../shared/ProgressBar";
import TenantTag from "../shared/TenantTag";
import { intentTone } from "../utils";

const confBar = { success: "bg-success-500", warning: "bg-warning-500", error: "bg-error-500", primary: "bg-brand-500", light: "bg-gray-400" };

export default function ReplyDetail({ reply: rp }: { reply: Reply }) {
  const t = useTranslations("growthOs");
  const { sendReply, updateDraft, say } = useGrowthOS();
  const tone = intentTone[rp.intent];
  const unsub = rp.intent === "Unsubscribe";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6 dark:border-gray-800">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{rp.subj}</h3>
          <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{rp.from} · {rp.role}, {rp.co}</p>
          <div className="mt-2 flex items-center gap-2">
            <TenantTag tn={rp.tn} />
            <span className="text-theme-xs text-gray-400">· {rp.ch}</span>
          </div>
        </div>
        <div className="w-full shrink-0 sm:w-44">
          <Badge color={tone}>{rp.intent}</Badge>
          <p className="mt-3 mb-1.5 text-theme-xs text-gray-500 dark:text-gray-400">{t("replies.confidence")} · {rp.conf}%</p>
          <ProgressBar value={rp.conf} size="sm" barClassName={confBar[tone]} />
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <blockquote className="rounded-xl border-s-4 border-gray-300 bg-gray-50 p-4 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
          {rp.body}
        </blockquote>
        <div>
          <p className="mb-2 text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">{t("replies.drafted")}</p>
          <TextArea rows={5} value={rp.draft} onChange={(v) => updateDraft(rp.id, v)} className="text-gray-800!" disabled={rp.sent} />
        </div>
        {!rp.sent ? (
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {!unsub && (
              <Button size="sm" variant="outline" onClick={() => say(t("toast.snoozed"))}>{t("common.snooze")}</Button>
            )}
            <Button size="sm" onClick={() => sendReply(rp.id)}>{t("replies.send")}</Button>
          </div>
        ) : (
          <Alert variant="success" title={t("common.approved")} message={t("replies.done")} />
        )}
      </div>
    </div>
  );
}
