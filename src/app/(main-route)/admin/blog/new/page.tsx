import { BlogAdminForm } from "@/components/blog/BlogAdminForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Nouvel article",
};

export default async function NewBlogPostPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  const [categories, tags] = await Promise.all([
    prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    }),
    prisma.blogTag.findMany({
      orderBy: { name: "asc" },
      select: { name: true, slug: true },
    }),
  ]);

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
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-slate-400">
            Redige un brouillon, ajoute les taxonomies et enregistre avant de
            publier.
          </p>
        </header>
        <BlogAdminForm mode="create" categories={categories} tags={tags} />
      </div>
    </main>
  );
}
