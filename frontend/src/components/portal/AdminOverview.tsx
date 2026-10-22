"use client";

import type { PortalProject, PortalSummary } from "@/src/data/portal/types";

import { PortalHighlights, PortalMetrics } from "./PortalMetrics";
import { PortalResource } from "./PortalResource";
import { PortalSectionHead } from "./PortalPageHeader";
import { ProjectList } from "./ProjectList";
import { usePortalData } from "./usePortalData";

/**
 * The administration overview: the numbers first, then what is being built.
 */
export function AdminOverview() {
  const summary = usePortalData<PortalSummary>("/api/portal/summary");
  const projects = usePortalData<{ projects: PortalProject[] }>(
    "/api/portal/projects",
  );

  return (
    <div className="grid gap-10">
      <PortalResource state={summary} rows={2}>
        {(data) => (
          <div className="grid gap-4">
            <PortalMetrics metrics={data.metrics} />
            <PortalHighlights highlights={data.highlights} />
          </div>
        )}
      </PortalResource>

      <section>
        <PortalSectionHead
          title="In delivery"
          lead="The projects that are being built or reviewed right now."
        />
        <PortalResource state={projects} rows={2}>
          {(data) => (
            <ProjectList
              projects={data.projects.filter(
                (project) =>
                  project.status !== "live" && project.status !== "paused",
              )}
            />
          )}
        </PortalResource>
      </section>
    </div>
  );
}
