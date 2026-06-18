import type { MetadataRoute } from "next";
import { BlogPostStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://theodorebinda.me";
  const posts = await prisma.blogPost.findMany({
    where: {
      status: BlogPostStatus.PUBLISHED,
      publishedAt: { not: null },
    },
    select: {
      slug: true,
      updatedAt: true,
      publishedAt: true,
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/realisation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [
    ...staticRoutes,
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
