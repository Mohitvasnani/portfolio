import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/projects";
import { site } from "@/lib/site";

// Next turns this into /sitemap.xml at build time.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/experience", "/about", "/contact"];
  const now = new Date();

  return [
    ...routes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      priority: route === "" ? 1 : 0.8,
    })),
    ...caseStudies.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
