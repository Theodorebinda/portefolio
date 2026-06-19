import { BlogArticleActions } from "@/components/blog/BlogArticleActions";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { TrackedBlogLink } from "@/components/blog/TrackedBlogLink";
import { formatPostDate, getValidBlogImageSource } from "@/lib/blog/utils";
import { prisma } from "@/lib/prisma";
import { BlogPostStatus, Prisma } from "@prisma/client";
import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const baseUrl = "https://theodorebinda.me";

const postInclude = {
  author: {
    select: {
      name: true,
      image: true,
    },
  },
  category: true,
  tags: {
    include: { tag: true },
  },
} satisfies Prisma.BlogPostInclude;

async function getPost(slug: string) {
  return prisma.blogPost.findFirst({
    where: {
      slug,
      status: BlogPostStatus.PUBLISHED,
      publishedAt: { not: null },
    },
    include: postInclude,
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Article introuvable",
    };
  }

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const url = `/blog/${post.slug}`;
  const coverImage = getValidBlogImageSource(post.coverImage);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name ?? "Theodore Samba"],
      images: coverImage
        ? [
            {
              url: coverImage,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const tagIds = post.tags.map(({ tag }) => tag.id);
  const relatedPosts =
    tagIds.length > 0
      ? await prisma.blogPost.findMany({
          where: {
            id: { not: post.id },
            status: BlogPostStatus.PUBLISHED,
            publishedAt: { not: null },
            tags: {
              some: {
                tagId: { in: tagIds },
              },
            },
          },
          orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
          take: 3,
          include: {
            tags: { include: { tag: true } },
          },
        })
      : [];
  const articleUrl = `${baseUrl}/blog/${post.slug}`;
  const coverImage = getValidBlogImageSource(post.coverImage);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    image: coverImage ? [coverImage] : undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name ?? "Theodore Samba",
    },
    publisher: {
      "@type": "Person",
      name: "Theodore Samba",
    },
    mainEntityOfPage: articleUrl,
  };

  return (
    <main className="relative z-0 isolate flex w-full md:max-w-4xl mx-auto flex-col gap-10  text-neutral-800 dark:text-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-[#436896] dark:text-slate-400 dark:hover:text-[#b2d2fa]"
      >
        <ArrowLeft size={16} />
        Retour au blog
      </Link>

      <article className="space-y-8">
        <header className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(({ tag }) => (
              <span
                key={tag.id}
                className="rounded-md border border-[#436896]/20 bg-[#436896]/10 px-2.5 py-1 text-xs font-semibold text-[#436896] dark:border-[#b2d2fa]/20 dark:bg-[#b2d2fa]/10 dark:text-[#b2d2fa]"
              >
                #{tag.name}
              </span>
            ))}
          </div>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-neutral-950 dark:text-white md:text-5xl">
            {post.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-neutral-600 dark:text-slate-400">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 dark:text-slate-500">
            <span>{post.author.name ?? "Theodore Samba"}</span>
            <span>•</span>
            <span>{formatPostDate(post.publishedAt)}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={15} />
              {post.readingTime ?? 1} min read
            </span>
          </div>
        </header>

        {coverImage ? (
          <div className="relative aspect-[16/8] overflow-hidden rounded-md border border-neutral-200 dark:border-white/10">
            <Image
              src={coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        <MarkdownContent content={post.content} />
      </article>

      <BlogArticleActions title={post.title} url={articleUrl} />

      {relatedPosts.length > 0 ? (
        <section className="space-y-4 border-t border-neutral-200 pt-6 dark:border-white/10">
          <h2 className="text-xs font-bold uppercase tracking-wide text-neutral-500 dark:text-slate-400">
            Articles similaires
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <TrackedBlogLink
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                trackingLabel={relatedPost.slug}
                className="rounded-md border border-neutral-200 p-4 transition hover:border-[#436896] hover:bg-neutral-50 dark:border-white/10 dark:hover:border-[#b2d2fa] dark:hover:bg-white/[0.04]"
              >
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {relatedPost.tags.slice(0, 2).map(({ tag }) => (
                    <span
                      key={tag.id}
                      className="text-[11px] font-semibold text-[#436896] dark:text-[#b2d2fa]"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold text-neutral-950 dark:text-white">
                  {relatedPost.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-500 dark:text-slate-500">
                  {formatPostDate(relatedPost.publishedAt)}
                </p>
              </TrackedBlogLink>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
