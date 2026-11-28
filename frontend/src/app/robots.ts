
import type { MetadataRoute } from "next";

const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.orlabs.co.rw"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The portal is for the team only.
      disallow: "/portal",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
