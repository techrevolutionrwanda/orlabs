"use client";

import { useState } from "react";

import type { PortalProject } from "@/src/data/portal/types";

import { PortalResource } from "./PortalResource";
import { ProjectList } from "./ProjectList";
import { usePortalData } from "./usePortalData";

const filters = ["all", "planning", "building", "review", "live", "paused"];

/**
 * Every project, with a filter for the state it is in.
 */
export function AdminProjects() {
  const projects = usePortalData<{ projects: PortalProject[] }>(
    "/api/portal/projects",
  );
  const [filter, setFilter] = useState("all");

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by state">
        {filters.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
            className={`rounded-full border px-4 py-2 text-[0.875rem] font-medium transition-colors ${
              filter === value
                ? "border-navy bg-navy text-white"
                : "border-border bg-surface text-ink-muted hover:border-border-strong hover:text-navy"
            }`}
          >
            {value === "all" ? "All" : value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        ))}
      </div>

      <PortalResource state={projects} rows={3}>
        {(data) => (
          <ProjectList
            projects={
              filter === "all"
                ? data.projects
                : data.projects.filter((project) => project.status === filter)
            }
          />
        )}
      </PortalResource>
    </div>
  );
}
