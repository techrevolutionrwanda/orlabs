import type { MetadataRoute } from "next";
import { labPosts } from "@/src/content/labs";
import { projects } from "@/src/content/projects";
import { services } from "@/src/content/services";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      priority: 0.6,
    })),
    ...labPosts.map((post) => ({
      url: `${baseUrl}/labs/${post.slug}`,
      priority: 0.5,
    })),
  ];
}
