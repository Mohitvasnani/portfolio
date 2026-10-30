import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/projects";
import { site } from "@/lib/site";

// Next turns this into /sitemap.xml at build time.
export default function sitemap(): MetadataRoute.Sitemap {
  // The site is a single page now, so there is one route plus the case
  // studies. Sections are anchors, and anchors are not separate URLs.
  const routes = [""];
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
