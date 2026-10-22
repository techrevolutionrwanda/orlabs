import type { Metadata } from "next";

import { AdminTeam } from "@/src/components/portal/AdminTeam";
import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "Team — OrLabs portal",
  description: "The people who work on the OrLabs projects.",
  robots: { index: false, follow: false },
};

export default function AdminTeamPage() {
  return (
    <>
      <RevealController />
      <PortalPageHeader
        eyebrow="Administration"
        title="Team"
        lead="Who works on what, and who has room to take something new on."
      />
      <AdminTeam />
    </>
  );
}
