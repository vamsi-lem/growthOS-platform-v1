import FixWorkflow from "@/components/growth-os/search/FixWorkflow";
import TrackedPages from "@/components/growth-os/search/TrackedPages";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search visibility | Growth OS",
  description: "SEO, AEO and GEO measured separately on a 15-day cycle.",
};

export default function SearchVisibilityPage() {
  return (
    <GrowthPage screen="search">
      <FixWorkflow />
      <TrackedPages />
    </GrowthPage>
  );
}
