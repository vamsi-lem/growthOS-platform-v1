import TenantDirectory from "@/components/growth-os/tenants/TenantDirectory";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tenants & connectors | Growth OS",
  description: "Every client tenant and the tools connected to it.",
};

export default function TenantDirectoryPage() {
  return (
    <GrowthPage screen="tenants">
      <TenantDirectory />
    </GrowthPage>
  );
}
