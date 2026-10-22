import { permanentRedirect } from "next/navigation";

/**
 * The old address of the projects screen.
 *
 * The projects are one collection among many, and every collection has the
 * same screen, so the old address sends the visitor to the new one.
 */
export default function AdminProjectsPage() {
  permanentRedirect("/portal/admin/delivery/projects");
}
