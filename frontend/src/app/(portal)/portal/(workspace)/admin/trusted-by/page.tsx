import type { Metadata } from "next";

import { AdminTrustedBy } from "@/src/components/portal/AdminTrustedBy";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "Trusted by — OrLabs portal",
  description: "Manage organizations featured in the Trusted by section.",
  robots: { index: false, follow: false },
};

export default function AdminTrustedByPage() {
  return (
    <>
      <RevealController />
      <AdminTrustedBy />
    </>
  );
}
