import { permanentRedirect } from "next/navigation";

/**
 * The old address of the roster screen.
 *
 * The roster is one collection among many, and every collection has the same
 * screen, so the old address sends the visitor to the new one.
 */
export default function AdminTeamPage() {
  permanentRedirect("/portal/admin/people/team");
}
