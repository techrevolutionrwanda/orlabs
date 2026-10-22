import type { Metadata } from "next";

import { AdminOverview } from "@/src/components/portal/AdminOverview";
import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "Overview — OrLabs portal",
  description: "The administration overview of the OrLabs portal.",
  robots: { index: false, follow: false },
};

export default function AdminOverviewPage() {
  return (
    <>
      <RevealController />
      <PortalPageHeader
        eyebrow="Administration"
        title="Overview"
        lead="Where the delivery stands, what needs a decision and what is waiting for the team."
      />
      <AdminOverview />
    </>
  );
}
