import type { MetadataRoute } from "next";

import { featuredProjects, profile } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.url, changeFrequency: "monthly", priority: 1 },
    ...featuredProjects.map((project) => ({
      url: `${profile.url}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
