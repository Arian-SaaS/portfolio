import type { MetadataRoute } from "next";
import { siteConfig, navItems } from "@/data/site-config";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", ...navItems.map((item) => item.href)].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
