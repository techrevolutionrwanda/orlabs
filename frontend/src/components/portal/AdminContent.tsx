"use client";

import type { ContentEntry } from "@/src/data/portal/types";

import { ContentList } from "./ContentList";
import { PortalResource } from "./PortalResource";
import { usePortalData } from "./usePortalData";

/**
 * The public pages and where each one stands.
 */
export function AdminContent() {
  const content = usePortalData<{ content: ContentEntry[] }>(
    "/api/portal/content",
  );

  return (
    <PortalResource state={content} rows={4}>
      {(data) => <ContentList content={data.content} />}
    </PortalResource>
  );
}
