import type { Metadata } from "next";
import Link from "next/link";

import { startDemoSession } from "@/src/app/(portal)/portal/actions";
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
          The administration and worker areas live behind this door. Use your
          work account to continue.
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

      <div className="mt-6 rounded-card border border-dashed border-border-strong bg-chip p-6">
        <h2 className="text-h3">Development role switcher</h2>
        <p className="mt-2 text-[0.9375rem] text-ink-muted">
          This build is not connected to an identity provider. The buttons below
          open the two areas with a demo session so the portal can be walked
          through.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <form action={startDemoSession}>
            <input type="hidden" name="role" value="admin" />
            <button className="btn btn-primary" type="submit">
              Continue as administrator
            </button>
          </form>

          <form action={startDemoSession}>
            <input type="hidden" name="role" value="worker" />
            <button className="btn btn-ghost" type="submit">
              Continue as worker
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
