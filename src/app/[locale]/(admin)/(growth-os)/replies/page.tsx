import ReplyDesk from "@/components/growth-os/replies/ReplyDesk";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reply desk | Growth OS",
  description: "Every reply classified by intent with the next step drafted.",
};

export default function ReplyDeskPage() {
  return (
    <GrowthPage screen="replies">
      <ReplyDesk />
    </GrowthPage>
  );
}
