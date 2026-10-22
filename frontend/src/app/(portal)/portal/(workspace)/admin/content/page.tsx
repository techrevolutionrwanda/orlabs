import type { Metadata } from "next";

import { AdminContent } from "@/src/components/portal/AdminContent";
import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "Content — OrLabs portal",
  description:
    "Every record the public website shows, and where each one stands.",
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return (
    <>
      <RevealController />
      <PortalPageHeader
        eyebrow="Website"
        title="All content"
        lead="Every record the public website shows, and whether it is published. Open one to change it."
      />
      <AdminContent />
    </>
  );
}
