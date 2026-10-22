import type { Metadata } from "next";

import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { RevealController } from "@/src/components/site/RevealController";
import { WorkerTasks } from "@/src/components/portal/WorkerTasks";

export const metadata: Metadata = {
  title: "My tasks — OrLabs portal",
  description: "The tasks assigned to the person who is signed in.",
  robots: { index: false, follow: false },
};

export default function WorkerTasksPage() {
  return (
    <>
      <RevealController />
      <PortalPageHeader
        eyebrow="Worker area"
        title="My tasks"
        lead="Move a task along as you work on it — the team sees the same state."
      />
      <WorkerTasks />
    </>
  );
}
