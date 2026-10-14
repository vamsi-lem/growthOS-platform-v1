import SignalDesk from "@/components/growth-os/signals/SignalDesk";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signal desk | Growth OS",
  description: "Today's signals, scored against each locked ICP.",
};

export default function SignalDeskPage() {
  return (
    <GrowthPage screen="signals">
      <SignalDesk />
    </GrowthPage>
  );
}
