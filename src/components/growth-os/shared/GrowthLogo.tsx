import { LemniscateIcon } from "@/icons";
import { useTranslations } from "next-intl";

interface GrowthLogoProps {
  compact?: boolean;
}

export default function GrowthLogo({ compact = false }: GrowthLogoProps) {
  const t = useTranslations("growthOs.brand");

  return (
    <span className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
        <LemniscateIcon className="h-4 w-7" />
      </span>
      {!compact && (
        <span className="flex flex-col">
          <span className="text-lg leading-tight font-semibold text-gray-800 dark:text-white/90">
            {t("name")}
          </span>
          <span className="text-theme-xs text-gray-500 dark:text-gray-400">{t("by")}</span>
        </span>
      )}
    </span>
  );
}
