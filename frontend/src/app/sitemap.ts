import type { MetadataRoute } from "next";
import { siteLabNotes, siteServices, siteWork } from "@/src/lib/site/content";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only the published records have an address on the website, so only they
  // belong in the map of the site.
  const [services, work, notes] = await Promise.all([
    siteServices(),
    siteWork(),
    siteLabNotes(),
  ]);

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/industries", priority: 0.7 },
    { path: "/work", priority: 0.8 },
    { path: "/labs", priority: 0.6 },
    { path: "/careers", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      priority: 0.7,
    })),
    ...work.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      priority: 0.6,
    })),
    ...notes.map((note) => ({
      url: `${baseUrl}/labs/${note.slug}`,
      priority: 0.5,
    })),
  ];
}
