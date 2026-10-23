import type { Metadata } from "next";
import Link from "next/link";

import { PortalLoginForm } from "@/src/components/portal/PortalLoginForm";

export const metadata: Metadata = {
  title: "Portal — OrLabs internal area",
  description:
    "Sign in to the OrLabs administration and worker portal. This area is for the team only.",
  robots: { index: false, follow: false },
};

export default function PortalSignInPage() {
  return (
    <div className="w-full max-w-[560px]">
      <div className="rounded-panel border border-border bg-surface p-8 sm:p-10">
        <p className="eyebrow">OrLabs portal</p>
        <h1 className="mt-4 text-h2">Sign in to the portal.</h1>
        <p className="mt-3 text-ink-muted">
          Sign in with the administrator account to continue.
        </p>

        <div className="mt-8">
          <PortalLoginForm />
        </div>

        <p className="mt-8 text-sm text-ink-subtle">
          <Link href="/" className="link-arrow text-teal-text">
            Back to the website
          </Link>
        </p>
      </div>

    </div>
  );
}
