import type { Metadata } from "next";

import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { RevealController } from "@/src/components/site/RevealController";
import { WorkerOverview } from "@/src/components/portal/WorkerOverview";

export const metadata: Metadata = {
  title: "Overview — OrLabs portal",
  description: "The worker overview of the OrLabs portal.",
  robots: { index: false, follow: false },
};

export default function WorkerOverviewPage() {
  return (
    <>
      <RevealController />
      <PortalPageHeader
        eyebrow="Worker area"
        title="Your work"
        lead="The tasks assigned to you, the tickets that are open and where each project stands."
      />
      <WorkerOverview />
    </>
  );
}
