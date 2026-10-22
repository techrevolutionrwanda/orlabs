import type { Metadata } from "next";

import { AdminProjects } from "@/src/components/portal/AdminProjects";
import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "Projects — OrLabs portal",
  description: "The delivery projects of the OrLabs portal.",
  robots: { index: false, follow: false },
};

export default function AdminProjectsPage() {
  return (
    <>
      <RevealController />
      <PortalPageHeader
        eyebrow="Administration"
        title="Projects"
        lead="Every engagement, the people on it and how far along it is."
      />
      <AdminProjects />
    </>
  );
}
