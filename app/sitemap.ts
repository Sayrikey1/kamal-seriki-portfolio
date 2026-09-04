import type { MetadataRoute } from "next";
import { caseStudyProjects } from "@/data/projects";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kamal-seriki.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudyProjects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
