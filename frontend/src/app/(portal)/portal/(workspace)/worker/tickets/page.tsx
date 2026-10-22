import type { Metadata } from "next";

import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { RevealController } from "@/src/components/site/RevealController";
import { WorkerTickets } from "@/src/components/portal/WorkerTickets";

export const metadata: Metadata = {
  title: "Tickets — OrLabs portal",
  description: "The support tickets the team is working on.",
  robots: { index: false, follow: false },
};

export default function WorkerTicketsPage() {
  return (
    <>
      <RevealController />
      <PortalPageHeader
        eyebrow="Worker area"
        title="Tickets"
        lead="What the clients have asked for, and what is still waiting on them."
      />
      <WorkerTickets />
    </>
  );
}
