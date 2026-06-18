import { BlogFilters } from "@/components/blog/BlogFilters";
import { TrackedBlogLink } from "@/components/blog/TrackedBlogLink";
import { BLOG_POSTS_PER_PAGE, formatPostDate } from "@/lib/blog/utils";
import { prisma } from "@/lib/prisma";
import { BlogPostStatus, Prisma } from "@prisma/client";
import { ArrowRight, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles de Theodore Samba sur Next.js, React, TypeScript, Prisma, design produit et architecture web.",
  alternates: {
    canonical: "/blog",
  },
};

export const dynamic = "force-dynamic";

interface BlogPageProps {
  searchParams?: {
    q?: string;
    tag?: string;
    page?: string;
  };
}

function parsePage(value?: string) {
  const page = Number(value ?? "1");
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

function buildHref(params: { q?: string; tag?: string; page?: number }) {
  const searchParams = new URLSearchParams();
  if (params.q) searchParams.set("q", params.q);
  if (params.tag) searchParams.set("tag", params.tag);
  if (params.page && params.page > 1) {
    searchParams.set("page", String(params.page));
  }

  const query = searchParams.toString();
  return query ? `/blog?${query}` : "/blog";
}

const postInclude = {
  author: {
    select: {
      name: true,
      image: true,
    },
  },
  category: true,
  tags: {
    include: {
      tag: true,
    },
    orderBy: {
      tag: {
        name: "asc",
      },
    },
  },
} satisfies Prisma.BlogPostInclude;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const query = searchParams?.q?.trim() ?? "";
  const activeTag = searchParams?.tag?.trim() ?? "";
  const page = parsePage(searchParams?.page);
  const where: Prisma.BlogPostWhereInput = {
    status: BlogPostStatus.PUBLISHED,
    publishedAt: { not: null },
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(activeTag
      ? {
          tags: {
            some: {
              tag: {
                slug: activeTag,
              },
            },
          },
        }
      : {}),
  };

  const [posts, totalPosts, tags, featuredPost] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * BLOG_POSTS_PER_PAGE,
      take: BLOG_POSTS_PER_PAGE,
      include: postInclude,
    }),
    prisma.blogPost.count({ where }),
    prisma.blogTag.findMany({
      where: {
        posts: {
          some: {
            post: {
              status: BlogPostStatus.PUBLISHED,
              publishedAt: { not: null },
            },
          },
        },
      },
      orderBy: { name: "asc" },
      select: { name: true, slug: true },
    }),
    prisma.blogPost.findFirst({
      where: {
        status: BlogPostStatus.PUBLISHED,
        publishedAt: { not: null },
        featured: true,
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      include: postInclude,
    }),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalPosts / BLOG_POSTS_PER_PAGE));
  const heroPost = featuredPost ?? posts[0] ?? null;

  return (
    <main className="relative z-0 isolate flex w-full flex-col gap-12 py-8 text-neutral-800 dark:text-slate-200">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
        <div className="max-w-2xl">
          <span className="mb-4 inline-flex h-8 items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-xs font-semibold uppercase tracking-wide text-[#436896] dark:border-white/10 dark:bg-white/5 dark:text-[#b2d2fa]">
            <Tag size={14} />
            Blog
          </span>
          <h1 className="text-4xl font-bold text-neutral-950 dark:text-white">
            Articles, notes techniques et retours de terrain
          </h1>
          <p className="mt-5 text-base leading-8 text-neutral-600 dark:text-slate-400 md:text-lg">
            Une selection d&apos;articles sur Next.js, React, TypeScript, Prisma,
            l&apos;interface produit, l&apos;accessibilite et les decisions
            techniques qui rendent un projet plus solide.
          </p>
        </div>
      </section>

      <BlogFilters tags={tags} activeTag={activeTag} query={query} />

      {heroPost ? (
        <section className="overflow-hidden rounded-md border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white shadow-xl shadow-neutral-200/50 dark:border-white/10 dark:from-white/[0.08] dark:to-white/[0.03] dark:shadow-black/20">
          {heroPost.coverImage ? (
            <div className="relative aspect-[16/7] border-b border-neutral-200 dark:border-white/10">
              <Image
                src={heroPost.coverImage}
                alt={heroPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : null}
          <div className="p-5 md:p-7">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-slate-500">
              <span className="font-bold uppercase tracking-wide text-[#436896] dark:text-[#b2d2fa]">
                Article en vedette
              </span>
              <span>{formatPostDate(heroPost.publishedAt)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={13} />
                {heroPost.readingTime ?? 1} min read
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_180px] md:items-end">
              <div>
                <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
                  {heroPost.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600 dark:text-slate-400 md:text-base">
                  {heroPost.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {heroPost.tags.map(({ tag }) => (
                    <span
                      key={tag.id}
                      className="rounded-md border border-[#436896]/20 bg-[#436896]/10 px-2.5 py-1 text-xs font-semibold text-[#436896] dark:border-[#b2d2fa]/20 dark:bg-[#b2d2fa]/10 dark:text-[#b2d2fa]"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
              <TrackedBlogLink
                href={`/blog/${heroPost.slug}`}
                trackingLabel={heroPost.slug}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#436896] px-4 text-sm font-bold text-white transition hover:bg-[#1c1917] dark:bg-[#b2d2fa] dark:text-black dark:hover:bg-white"
              >
                Lire
                <ArrowRight size={16} />
              </TrackedBlogLink>
            </div>
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-white/10">
          <h2 className="text-xs font-bold uppercase tracking-wide text-neutral-500 dark:text-slate-400">
            Toutes les publications
          </h2>
          <span className="text-xs text-neutral-500 dark:text-slate-500">
            {totalPosts} article{totalPosts > 1 ? "s" : ""}
          </span>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-md border border-transparent p-4 transition hover:border-neutral-200 hover:bg-neutral-50 dark:hover:border-white/10 dark:hover:bg-white/[0.04]"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {post.tags.map(({ tag }) => (
                        <span
                          key={tag.id}
                          className="text-xs font-semibold text-[#436896] dark:text-[#b2d2fa]"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                    <TrackedBlogLink
                      href={`/blog/${post.slug}`}
                      trackingLabel={post.slug}
                      className="block text-lg font-semibold text-neutral-950 transition dark:text-slate-100 dark:group-hover:text-white"
                    >
                      {post.title}
                    </TrackedBlogLink>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-slate-500">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 text-xs text-neutral-500 dark:text-slate-500 md:pt-7">
                    <span>{formatPostDate(post.publishedAt)}</span>
                    <span>•</span>
                    <span>{post.readingTime ?? 1} min</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            Aucun article ne correspond a cette recherche.
          </div>
        )}

        {totalPages > 1 ? (
          <div className="flex items-center justify-between border-t border-neutral-200 pt-4 text-sm dark:border-white/10">
            <Link
              href={buildHref({ q: query, tag: activeTag, page: page - 1 })}
              className={`rounded-md border px-3 py-2 ${
                page <= 1
                  ? "pointer-events-none border-neutral-200 text-neutral-400 dark:border-white/10 dark:text-slate-600"
                  : "border-neutral-200 text-neutral-700 hover:border-[#436896] dark:border-white/10 dark:text-slate-300 dark:hover:border-[#b2d2fa]"
              }`}
            >
              Precedent
            </Link>
            <span className="text-neutral-500 dark:text-slate-500">
              Page {page} / {totalPages}
            </span>
            <Link
              href={buildHref({ q: query, tag: activeTag, page: page + 1 })}
              className={`rounded-md border px-3 py-2 ${
                page >= totalPages
                  ? "pointer-events-none border-neutral-200 text-neutral-400 dark:border-white/10 dark:text-slate-600"
                  : "border-neutral-200 text-neutral-700 hover:border-[#436896] dark:border-white/10 dark:text-slate-300 dark:hover:border-[#b2d2fa]"
              }`}
            >
              Suivant
            </Link>
          </div>
        ) : null}
      </section>

      <section className="flex flex-col gap-4 rounded-md border border-neutral-200 bg-neutral-50 p-5 dark:border-white/10 dark:bg-white/[0.04] md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
            Une idee d&apos;article ou de collaboration ?
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-slate-400">
            Parlons technique, produit ou interface autour d&apos;un projet
            concret.
          </p>
        </div>
        <Link
          href="mailto:theodorebinda@gmail.com"
          className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 px-4 text-sm font-semibold text-neutral-900 transition hover:border-[#436896] hover:text-[#436896] dark:border-white/10 dark:text-white dark:hover:border-[#b2d2fa] dark:hover:text-[#b2d2fa]"
        >
          Ecrire
        </Link>
      </section>
    </main>
  );
}
