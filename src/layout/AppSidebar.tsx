"use client";

import { access, routes, type ScreenId, users } from "@/components/growth-os/data";
import AvatarText from "@/components/ui/avatar/AvatarText";
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
  LemniscateIcon,
  ListIcon,
  PaperPlaneIcon,
  PieChartIcon,
  PlugInIcon,
  TimeIcon,
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";

type NavItem = { key: ScreenId; icon: React.ComponentType<{ className?: string }> };
type NavGroup = { key: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  { key: "HOME", items: [{ key: "today", icon: GridIcon }, { key: "run", icon: TimeIcon }] },
  { key: "DECIDE", items: [{ key: "cockpit", icon: CheckCircleIcon }] },
  { key: "RUN", items: [{ key: "signals", icon: BoltIcon }, { key: "campaigns", icon: PaperPlaneIcon }, { key: "waves", icon: ListIcon }, { key: "replies", icon: ChatIcon }] },
  { key: "KNOW", items: [{ key: "brain", icon: DocsIcon }, { key: "leads", icon: GroupIcon }, { key: "search", icon: PieChartIcon }] },
  { key: "SHARE", items: [{ key: "client", icon: EyeIcon }] },
  { key: "GOVERN", items: [{ key: "tenants", icon: PlugInIcon }, { key: "cost", icon: DollarLineIcon }] },
];

/**
 * Floating dock navigation: a dark rounded panel inset from the viewport edge.
 * Expanded it shows labels; collapsed it becomes an icon rail with hover labels.
 */
const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const t = useTranslations("growthOs");
  const { role, queue, signals, replies, inScope } = useGrowthOS();
  const open = isExpanded || isHovered || isMobileOpen;
  const allowed = access[role];
  const user = users[role];

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
      className={cn(
        "fixed inset-y-3 start-3 z-50 flex flex-col rounded-3xl bg-gray-950 text-white shadow-theme-xl ring-1 ring-white/5 transition-all duration-300 ease-in-out",
        open ? "w-68" : "w-20",
        isMobileOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)] rtl:translate-x-[calc(100%+1rem)]",
        "xl:translate-x-0 xl:rtl:translate-x-0",
      )}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Brand */}
      <Link href="/" className={cn("flex items-center gap-3 px-5 pt-6 pb-5", !open && "justify-center px-0")}>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500 shadow-lg shadow-brand-500/30">
          <LemniscateIcon className="h-4 w-7 text-white" />
        </span>
        {open && (
          <span className="min-w-0">
            <span className="block text-lg leading-tight font-bold tracking-tight">{t("brand.name")}</span>
            <span className="block truncate text-theme-xs text-gray-400">{t("brand.by")}</span>
          </span>
        )}
      </Link>

      <div className={cn("mx-4 h-px bg-white/10", !open && "mx-3")} />

      {/* Navigation */}
      <nav className="no-scrollbar flex-1 overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.key} className="mb-4 last:mb-0">
            {open ? (
              <p className="mb-1.5 px-3 text-theme-xs font-semibold tracking-widest text-gray-500 uppercase">{t(`nav.groups.${group.key}`)}</p>
            ) : (
              <span className="mx-auto mb-2 block h-px w-6 bg-white/10" />
            )}
            <ul className="flex flex-col gap-1">
              {group.items.map(({ key, icon: Icon }) => {
                const active = pathname === routes[key];
                const badge = badges[key] ?? 0;
                return (
                  <li key={key} className="group/item relative">
                    <Link
                      href={routes[key]}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl p-1.5 text-theme-sm font-medium transition-all",
                        !open && "justify-center",
                        active ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25" : "text-gray-400 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <span className={cn("relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", active ? "bg-white/15" : "bg-white/5 group-hover/item:bg-white/10")}>
                        <Icon className="size-5" />
                        {!open && badge > 0 && <span className="absolute -top-1 -end-1 h-2.5 w-2.5 rounded-full bg-brand-400 ring-2 ring-gray-950" />}
                      </span>
                      {open && <span className="flex-1 truncate">{t(`nav.items.${key}`)}</span>}
                      {open && badge > 0 && (
                        <span className={cn("me-1.5 min-w-6 rounded-full px-2 py-0.5 text-center text-theme-xs font-semibold", active ? "bg-white text-brand-600" : "bg-white/10 text-gray-200")}>{badge}</span>
                      )}
                    </Link>
                    {/* Hover label for the collapsed rail */}
                    {!open && (
                      <span className="pointer-events-none absolute start-full top-1/2 z-50 ms-3 hidden -translate-y-1/2 rounded-lg bg-gray-900 px-2.5 py-1.5 text-theme-xs font-medium whitespace-nowrap text-white shadow-theme-lg group-hover/item:block xl:group-hover/item:block">
                        {t(`nav.items.${key}`)}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer: developer spec + who is signed in */}
      <div className="space-y-3 p-3">
        {open && <SidebarWidget />}
        <div className={cn("flex items-center gap-3 rounded-2xl bg-white/5 p-2.5", !open && "justify-center bg-transparent p-0")}>
          <AvatarText name={user.name} className="shrink-0" />
          {open && (
            <span className="min-w-0">
              <span className="block truncate text-theme-sm font-semibold">{user.name}</span>
              <span className="block truncate text-theme-xs text-gray-400">{user.title}</span>
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
