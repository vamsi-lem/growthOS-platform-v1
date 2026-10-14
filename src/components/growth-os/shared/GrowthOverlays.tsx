"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { CheckCircleIcon, ErrorIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { guardFlowSteps } from "../data";

/** App-wide overlays: the guardrail decision modal and the action toast. */
export default function GrowthOverlays() {
  const t = useTranslations("growthOs.guardModal");
  const { guardModalOpen, closeGuardModal, confirmGuard, overrideGuard, guardFlow, toast } = useGrowthOS();

  return (
    <>
      <Modal isOpen={guardModalOpen} onClose={closeGuardModal} className="m-4 max-w-150">
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4 pe-10">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-error-50 text-error-500 dark:bg-error-500/15">
              <ErrorIcon className="size-6" />
            </span>
            <div>
              <p className="text-theme-xs font-medium tracking-wide text-error-600 uppercase dark:text-error-500">{t("eyebrow")}</p>
              <h4 className="mt-1 text-lg font-semibold text-gray-800 dark:text-white/90">{t("title")}</h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t("desc")}</p>
            </div>
          </div>

          <p className="mt-6 mb-3 text-theme-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t("flow")}</p>
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {guardFlowSteps.map((label, i) => {
              const st = i < guardFlow ? "done" : i === guardFlow ? "now" : "next";
              return (
                <li
                  key={label}
                  className={cn(
                    "rounded-xl border px-3 py-2.5",
                    st === "done" && "border-error-200 bg-error-50 dark:border-error-500/30 dark:bg-error-500/15",
                    st === "now" && "border-error-500 bg-white dark:bg-gray-900",
                    st === "next" && "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/3",
                  )}
                >
                  <span className={cn("block text-theme-xs font-semibold", st === "next" ? "text-gray-400" : "text-error-600 dark:text-error-500")}>
                    0{i + 1}
                  </span>
                  <span className="block text-theme-xs text-gray-700 dark:text-gray-300">{label}</span>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{t("recommendation")}</p>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" size="sm" onClick={overrideGuard}>{t("override")}</Button>
            <button
              type="button"
              onClick={confirmGuard}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-error-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs transition hover:bg-error-600"
            >
              {t("confirm")}
            </button>
          </div>
        </div>
      </Modal>

      {toast && (
        <div
          role="status"
          className="fixed inset-x-4 bottom-6 z-99999 mx-auto flex w-fit items-center gap-3 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-theme-lg dark:bg-white dark:text-gray-900"
        >
          <CheckCircleIcon className="size-5 shrink-0 text-success-500" />
          {toast}
        </div>
      )}
    </>
  );
}
