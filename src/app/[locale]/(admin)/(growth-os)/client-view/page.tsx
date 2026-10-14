import ClientDashboard from "@/components/growth-os/client/ClientDashboard";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client dashboard | Growth OS",
  description: "What the client sees: results and everything done for them.",
};

export default function ClientDashboardPage() {
  return (
    <GrowthPage screen="client">
      <ClientDashboard />
    </GrowthPage>
  );
}
