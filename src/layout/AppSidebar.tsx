"use client";

import { access, routes, type ScreenId } from "@/components/growth-os/data";
import GrowthLogo from "@/components/growth-os/shared/GrowthLogo";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { useSidebar } from "../context/SidebarContext";
import {
  BoltIcon,
  ChatIcon,
  CheckCircleIcon,
  DocsIcon,
  DollarLineIcon,
  EyeIcon,
  GridIcon,
  GroupIcon,
  HorizontaLDots,
  ListIcon,
  PaperPlaneIcon,
  PieChartIcon,
  PlugInIcon,
  TimeIcon,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";

type NavItem = { key: ScreenId; icon: React.ReactNode };
type NavGroup = { key: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  { key: "HOME", items: [{ key: "today", icon: <GridIcon /> }, { key: "run", icon: <TimeIcon /> }] },
  { key: "DECIDE", items: [{ key: "cockpit", icon: <CheckCircleIcon /> }] },
  {
    key: "RUN",
    items: [
      { key: "signals", icon: <BoltIcon /> },
      { key: "campaigns", icon: <PaperPlaneIcon /> },
      { key: "waves", icon: <ListIcon /> },
      { key: "replies", icon: <ChatIcon /> },
    ],
  },
  {
    key: "KNOW",
    items: [
      { key: "brain", icon: <DocsIcon /> },
      { key: "leads", icon: <GroupIcon /> },
      { key: "search", icon: <PieChartIcon /> },
    ],
  },
  { key: "SHARE", items: [{ key: "client", icon: <EyeIcon /> }] },
  {
    key: "GOVERN",
    items: [
      { key: "tenants", icon: <PlugInIcon /> },
      { key: "cost", icon: <DollarLineIcon /> },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const t = useTranslations("growthOs.nav");
  const { role, queue, signals, replies, inScope } = useGrowthOS();
  const showText = isExpanded || isHovered || isMobileOpen;
  const allowed = access[role];

  const badges: Partial<Record<ScreenId, number>> =
    role === "client"
      ? {}
      : {
          cockpit: queue.filter((q) => q.st === "pending" && inScope(q.tn)).length,
          signals: signals.filter((x) => x.st === "new" && inScope(x.tn)).length,
          replies: replies.filter((r) => !r.sent && inScope(r.tn)).length,
        };

  const groups = navGroups
    .map((g) => ({ ...g, items: g.items.filter((i) => !allowed || allowed.includes(i.key)) }))
    .filter((g) => g.items.length);

  return (
    <aside
      className={`fixed top-0 left-0 z-50 flex h-full flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out xl:mt-0 rtl:right-0 rtl:left-auto rtl:border-r-0 rtl:border-l dark:border-gray-800 dark:bg-gray-900 ${
        isExpanded || isMobileOpen ? "w-72.5" : isHovered ? "w-72.5" : "w-22.5"
      } ${
        isMobileOpen
          ? "translate-x-0"
          : "-translate-x-full rtl:translate-x-full"
      } xl:translate-x-0 xl:rtl:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn("flex py-8", !isExpanded && !isHovered ? "xl:justify-center" : "justify-start")}>
        <Link href="/">
          <GrowthLogo compact={!showText} />
        </Link>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {groups.map((group) => (
              <div key={group.key}>
                <h2
                  className={cn(
                    "mb-3 flex text-xs leading-5 text-gray-400 uppercase",
                    !isExpanded && !isHovered ? "xl:justify-center" : "justify-start",
                  )}
                >
                  {showText ? t(`groups.${group.key}`) : <HorizontaLDots />}
                </h2>
                <ul className="flex flex-col gap-1">
                  {group.items.map((nav) => {
                    const path = routes[nav.key];
                    const active = pathname === path;
                    const badge = badges[nav.key] ?? 0;
                    return (
                      <li key={nav.key}>
                        <Link
                          href={path}
                          className={cn(
                            "group menu-item",
                            active ? "menu-item-active" : "menu-item-inactive",
                            !showText && "xl:justify-center",
                          )}
                          title={showText ? undefined : t(`items.${nav.key}`)}
                        >
                          <span className={cn("relative", active ? "menu-item-icon-active" : "menu-item-icon-inactive")}>
                            {nav.icon}
                            {!showText && badge > 0 && (
                              <span className="absolute -top-1 -end-1 h-2 w-2 rounded-full bg-brand-500" />
                            )}
                          </span>
                          {showText && <span className="menu-item-text">{t(`items.${nav.key}`)}</span>}
                          {showText && badge > 0 && (
                            <span
                              className={cn(
                                "ms-auto menu-dropdown-badge",
                                active ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive",
                              )}
                            >
                              {badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>
        {showText ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
