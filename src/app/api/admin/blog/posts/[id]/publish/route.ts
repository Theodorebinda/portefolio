import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getReadingTime } from "@/lib/blog/server";
import { prisma } from "@/lib/prisma";

function forbidden() {
  return NextResponse.json(
    { message: "Acces administrateur requis." },
    { status: 403 }
  );
}

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return forbidden();
  }

  const currentPost = await prisma.blogPost.findUnique({
    where: { id: params.id },
  });

  if (!currentPost) {
    return NextResponse.json(
      { message: "Article introuvable." },
      { status: 404 }
    );
  }

  if (
    !currentPost.title.trim() ||
    !currentPost.slug.trim() ||
    !currentPost.excerpt.trim() ||
    !currentPost.content.trim() ||
    !currentPost.authorId
  ) {
    return NextResponse.json(
      { message: "Completez le titre, le slug, l'extrait et le contenu." },
      { status: 400 }
    );
  }

  const post = await prisma.blogPost.update({
    where: { id: params.id },
    data: {
      status: "PUBLISHED",
      publishedAt: currentPost.publishedAt ?? new Date(),
      readingTime: getReadingTime(currentPost.content, currentPost.readingTime),
    },
    select: {
      id: true,
      slug: true,
      status: true,
      publishedAt: true,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");

  return NextResponse.json({
    ...post,
    publishedAt: post.publishedAt?.toISOString() ?? null,
  });
}
