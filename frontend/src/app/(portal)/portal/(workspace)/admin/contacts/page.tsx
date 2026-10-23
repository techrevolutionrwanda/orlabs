import type { Metadata } from "next";

import { AdminContacts } from "@/src/components/portal/AdminContacts";
import { RevealController } from "@/src/components/site/RevealController";

export const metadata: Metadata = {
  title: "Contacts — OrLabs portal",
  description: "Website contact form messages.",
  robots: { index: false, follow: false },
};

export default function AdminContactsPage() {
  return (
    <>
      <RevealController />
      <AdminContacts />
    </>
  );
}
