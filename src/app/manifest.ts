import type { MetadataRoute } from "next";

import { profile } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Portfolio`,
    short_name: profile.name,
    description: profile.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111111",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
