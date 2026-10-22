import type { Metadata } from "next";

import { AdminContent } from "@/src/components/portal/AdminContent";
import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "Content — OrLabs portal",
  description: "The public pages of the website and where each one stands.",
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return (
    <>
      <RevealController />
      <PortalPageHeader
        eyebrow="Administration"
        title="Content"
        lead="The pages of the public website, who looks after them and where they stand."
      />
      <AdminContent />
    </>
  );
}
