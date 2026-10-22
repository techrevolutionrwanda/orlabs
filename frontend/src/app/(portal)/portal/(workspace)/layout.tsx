import { Suspense, type ReactNode } from "react";

import { PortalSidebar } from "@/src/components/portal/PortalSidebar";
import {
  PortalTopbar,
  PortalTopbarFallback,
} from "@/src/components/portal/PortalTopbar";

/**
 * The workspace: the navigation on the left, the session bar on top and the
 * page itself. The session is read inside a `<Suspense>` boundary so the
 * shell around it can still be prerendered.
 */

// The portal is a request-time area: the navigation reads the address it is
// shown at and the pages read the record they are about. A navigation into
// the portal is therefore allowed to block on the server instead of being
// validated as an instant navigation.
export const instant = false;

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col lg:flex-row">
      <PortalSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Suspense fallback={<PortalTopbarFallback />}>
          <PortalTopbar />
        </Suspense>
        <main className="flex-1 px-5 py-8 sm:px-8" id="main">
          {children}
        </main>
      </div>
    </div>
  );
}
