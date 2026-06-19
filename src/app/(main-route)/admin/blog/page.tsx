import { BlogAdminActions } from "@/components/blog/BlogAdminActions";
import { auth } from "@/lib/auth";
import { formatPostDate } from "@/lib/blog/utils";
import { prisma } from "@/lib/prisma";
import { BlogPostStatus } from "@prisma/client";
import { FileText, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Administration du blog",
};

const STATUS_LABELS: Record<BlogPostStatus, string> = {
  DRAFT: "Brouillon",
  IN_REVIEW: "En relecture",
  PUBLISHED: "Publie",
  ARCHIVED: "Archive",
};

const STATUS_STYLES: Record<BlogPostStatus, string> = {
  DRAFT:
    "border-neutral-300 bg-neutral-100 text-neutral-700 dark:border-slate-300/30 dark:bg-slate-300/10 dark:text-slate-200",
  IN_REVIEW:
    "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-300/30 dark:bg-amber-300/10 dark:text-amber-200",
  PUBLISHED:
    "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-emerald-200",
  ARCHIVED:
    "border-red-300 bg-red-50 text-red-700 dark:border-red-300/30 dark:bg-red-300/10 dark:text-red-200",
};

interface AdminBlogPageProps {
  searchParams?: {
    status?: string;
  };
}

function getStatus(value?: string) {
  if (!value) return null;
  return Object.values(BlogPostStatus).includes(value as BlogPostStatus)
    ? (value as BlogPostStatus)
    : null;
}

export default async function AdminBlogPage({
  searchParams,
}: AdminBlogPageProps) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  const activeStatus = getStatus(searchParams?.status);
  const [posts, counts] = await Promise.all([
    prisma.blogPost.findMany({
      where: activeStatus ? { status: activeStatus } : undefined,
      orderBy: [{ updatedAt: "desc" }],
      include: {
        author: { select: { name: true, email: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    }),
    prisma.blogPost.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ]);
  const countByStatus = new Map(
    counts.map((item) => [item.status, item._count.status])
  );
  const totalCount = counts.reduce((total, item) => total + item._count.status, 0);

  return (
    <main className="min-h-screen">
      <div className="space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#436896] dark:text-[#b2d2fa]">
              Admin
            </p>
            <h1 className="text-3xl font-bold">Blog</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-slate-400">
              Gere les brouillons, publications et archives du blog public.
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#436896] px-4 text-sm font-bold text-white transition hover:bg-[#1c1917] dark:bg-[#b2d2fa] dark:text-black dark:hover:bg-white"
          >
            <Plus size={16} />
            Nouvel article
          </Link>
        </header>

        <nav className="flex gap-2 overflow-x-auto pb-1">
          <Link
            href="/admin/blog"
            className={`inline-flex h-9 min-w-max items-center rounded-md px-3 text-sm font-semibold transition ${
              !activeStatus
                ? "bg-[#436896] text-white dark:bg-[#b2d2fa] dark:text-black"
                : "border border-neutral-200 text-neutral-600 hover:border-[#436896] hover:text-[#436896] dark:border-white/10 dark:text-slate-300 dark:hover:border-[#b2d2fa] dark:hover:text-[#b2d2fa]"
            }`}
          >
            Tous
            <span className="ml-2 rounded bg-black/10 px-1.5 text-xs">
              {totalCount}
            </span>
          </Link>
          {Object.values(BlogPostStatus).map((status) => (
            <Link
              key={status}
              href={`/admin/blog?status=${status}`}
              className={`inline-flex h-9 min-w-max items-center rounded-md px-3 text-sm font-semibold transition ${
                activeStatus === status
                  ? "bg-[#436896] text-white dark:bg-[#b2d2fa] dark:text-black"
                  : "border border-neutral-200 text-neutral-600 hover:border-[#436896] hover:text-[#436896] dark:border-white/10 dark:text-slate-300 dark:hover:border-[#b2d2fa] dark:hover:text-[#b2d2fa]"
              }`}
            >
              {STATUS_LABELS[status]}
              <span className="ml-2 rounded bg-black/10 px-1.5 text-xs">
                {countByStatus.get(status) ?? 0}
              </span>
            </Link>
          ))}
        </nav>

        {posts.length > 0 ? (
          <div className="overflow-hidden rounded-md border border-neutral-200 bg-white dark:border-white/10 dark:bg-transparent">
            <div className="hidden grid-cols-[minmax(0,1.3fr)_130px_140px_minmax(0,1fr)] gap-4 border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-neutral-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-500 md:grid">
              <span>Titre</span>
              <span>Statut</span>
              <span>Date</span>
              <span>Actions</span>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-white/10">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="grid gap-4 px-4 py-4 md:grid-cols-[minmax(0,1.3fr)_130px_140px_minmax(0,1fr)] md:items-center"
                >
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {post.category ? (
                        <span className="rounded border border-neutral-200 px-2 py-0.5 text-[11px] text-neutral-500 dark:border-white/10 dark:text-slate-400">
                          {post.category.name}
                        </span>
                      ) : null}
                      {post.featured ? (
                        <span className="rounded border border-[#436896]/30 bg-[#436896]/10 px-2 py-0.5 text-[11px] text-[#436896] dark:border-[#b2d2fa]/30 dark:bg-[#b2d2fa]/10 dark:text-[#b2d2fa]">
                          Vedette
                        </span>
                      ) : null}
                    </div>
                    <h2 className="truncate font-semibold text-neutral-950 dark:text-white">
                      {post.title}
                    </h2>
                    <p className="mt-1 truncate text-xs text-neutral-500 dark:text-slate-500">
                      /blog/{post.slug} · {post.author.name ?? post.author.email}
                    </p>
                  </div>
                  <span
                    className={`inline-flex w-fit rounded-md border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[post.status]}`}
                  >
                    {STATUS_LABELS[post.status]}
                  </span>
                  <span className="text-sm text-neutral-600 dark:text-slate-400">
                    {formatPostDate(post.publishedAt ?? post.updatedAt)}
                  </span>
                  <BlogAdminActions
                    id={post.id}
                    slug={post.slug}
                    status={post.status}
                  />
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-8 text-center dark:border-white/10 dark:bg-white/[0.03]">
            <FileText size={34} className="text-neutral-400 dark:text-slate-500" />
            <h2 className="mt-4 text-lg font-semibold">Aucun article</h2>
            <p className="mt-2 text-sm text-neutral-500 dark:text-slate-500">
              Cree un premier brouillon pour alimenter le blog.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
