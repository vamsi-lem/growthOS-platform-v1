"use client";

import GrowthOverlays from "@/components/growth-os/shared/GrowthOverlays";
import { GrowthOSProvider } from "@/context/GrowthOSContext";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ms-0"
    : isExpanded || isHovered
    ? "xl:ms-72.5"
    : "xl:ms-22.5";

  return (
    <GrowthOSProvider>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        <AppSidebar />
        <Backdrop />
        {/* Main Content Area */}
        <div
          className={`min-w-0 flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <AppHeader />
          {/* Page Content */}
          <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">{children}</div>
        </div>
      </div>
      <GrowthOverlays />
    </GrowthOSProvider>
  );
}
