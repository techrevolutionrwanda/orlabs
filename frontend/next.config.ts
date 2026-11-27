import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Only the global stylesheet needs Tailwind. Applying this to every
      // .css file would also turn *.module.css into global CSS, leaving the
      // CSS Module import with an empty class map.
      "*": {
        condition: { path: /(^|\/)globals\.css$/ },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
