"use client";

import type { WebsiteContentRow } from "./ContentList";
import { ContentList } from "./ContentList";
import { PortalResource } from "./PortalResource";
import { usePortalData } from "./usePortalData";

/**
 * Every record the public website shows, and where each one stands.
 */
export function AdminContent() {
  const content = usePortalData<{ content: WebsiteContentRow[] }>(
    "/api/portal/content",
  );

  return (
    <PortalResource state={content} rows={4}>
      {(data) => <ContentList content={data.content} />}
    </PortalResource>
  );
}
