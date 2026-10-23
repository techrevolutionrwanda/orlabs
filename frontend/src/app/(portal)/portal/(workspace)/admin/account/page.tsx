import { Suspense } from "react";
import type { Metadata } from "next";

import { AccountSettingsForm } from "@/src/components/portal/AccountSettingsForm";
import { PortalPageHeader } from "@/src/components/portal/PortalPageHeader";
import { readPortalSession } from "@/src/lib/portal/session";

export const metadata: Metadata = {
  title: "Account — OrLabs portal",
  description: "Update the administrator account credentials.",
  robots: { index: false, follow: false },
};

async function AccountSettings() {
  const session = await readPortalSession();

  return (
    <>
      <PortalPageHeader
        eyebrow="Administration"
        title="Account"
        lead="Update the username and password for the administrator account."
      />
      <section className="mt-8 max-w-2xl rounded-panel border border-border bg-surface p-6 sm:p-8">
        <p className="mb-6 text-sm text-ink-muted">
          Signed in as <strong className="text-ink">{session?.name}</strong>.
          Confirm your current password to save new credentials.
        </p>
        <AccountSettingsForm username={session?.name ?? ""} />
      </section>
    </>
  );
}

export default function AdminAccountPage() {
  return (
    <Suspense fallback={<p className="text-ink-muted">Loading account…</p>}>
      <AccountSettings />
    </Suspense>
  );
}
