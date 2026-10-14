"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { access, routes, type ScreenId } from "../data";
import DevSpecPanel from "./DevSpecPanel";

interface GrowthPageProps {
  screen: ScreenId;
  children: React.ReactNode;
  actions?: React.ReactNode;
  hideBreadcrumb?: boolean;
}

/** Page frame for every Growth OS screen: breadcrumb, role access and the optional developer spec. */
export default function GrowthPage({ screen, children, actions, hideBreadcrumb }: GrowthPageProps) {
  const t = useTranslations("growthOs.pages");
  const { role, devSpec } = useGrowthOS();
  const router = useRouter();
  const allowed = access[role];
  const permitted = !allowed || allowed.includes(screen);

  useEffect(() => {
    if (!permitted && allowed) router.replace(routes[allowed[0]]);
  }, [permitted, allowed, router]);

  if (!permitted) return null;

  return (
    <div>
      {!hideBreadcrumb && (
        <PageBreadcrumb pageTitle={t(`${screen}.title`)} description={t(`${screen}.crumb`)} actions={actions} />
      )}
      <div className="space-y-4 md:space-y-6">{children}</div>
      {devSpec && <DevSpecPanel screen={screen} />}
    </div>
  );
}
