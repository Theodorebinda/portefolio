import { BlogAdminForm } from "@/components/blog/BlogAdminForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Edition article",
};

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  const [post, categories, tags] = await Promise.all([
    prisma.blogPost.findUnique({
      where: { id: params.id },
      include: {
        tags: { include: { tag: true } },
      },
    }),
    prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    }),
    prisma.blogTag.findMany({
      orderBy: { name: "asc" },
      select: { name: true, slug: true },
    }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="space-y-6">
        <header>
          <Link
            href="/admin/blog"
            className="text-sm font-semibold text-neutral-600 transition hover:text-[#436896] dark:text-slate-400 dark:hover:text-[#b2d2fa]"
          >
            Retour aux articles
          </Link>
          <h1 className="mt-3 text-3xl font-bold">Editer l&apos;article</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-slate-400">
            Modifie le brouillon, les metadonnees, l&apos;image ou le contenu.
          </p>
        </header>
        <BlogAdminForm
          mode="edit"
          categories={categories}
          tags={tags}
          initialPost={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage,
            featured: post.featured,
            language: post.language,
            seoTitle: post.seoTitle,
            seoDescription: post.seoDescription,
            categoryId: post.categoryId,
            tagNames: post.tags.map(({ tag }) => tag.name),
          }}
        />
      </div>
    </main>
  );
}
