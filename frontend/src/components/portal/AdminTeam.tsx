"use client";

import type { TeamMember } from "@/src/data/portal/types";

import { PortalResource } from "./PortalResource";
import { TeamList } from "./TeamList";
import { usePortalData } from "./usePortalData";

/**
 * The people on the roster.
 */
export function AdminTeam() {
  const team = usePortalData<{ team: TeamMember[] }>("/api/portal/team");

  return (
    <PortalResource state={team} rows={3}>
      {(data) => <TeamList team={data.team} />}
    </PortalResource>
  );
}
