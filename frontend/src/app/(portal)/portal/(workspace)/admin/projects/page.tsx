import type { Metadata } from "next";

import { AdminProjects } from "@/src/components/portal/AdminProjects";
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
      <AdminProjects />
    </>
  );
}
