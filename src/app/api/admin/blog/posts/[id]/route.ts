import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getReadingTime, getUniquePostSlug, syncPostTags } from "@/lib/blog/server";
import { blogPostPatchSchema } from "@/lib/blog/validation";
import { prisma } from "@/lib/prisma";

function forbidden() {
  return NextResponse.json(
    { message: "Acces administrateur requis." },
    { status: 403 }
  );
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return forbidden();
  }

  const body = await request.json().catch(() => null);
  const result = blogPostPatchSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error.issues[0]?.message ?? "Donnees invalides." },
      { status: 400 }
    );
  }

  const payload = result.data;

  try {
    const post = await prisma.$transaction(async (tx) => {
      const currentPost = await tx.blogPost.findUnique({
        where: { id: params.id },
        select: { id: true, slug: true, content: true },
      });

      if (!currentPost) {
        return null;
      }

      const slug =
        payload.slug || payload.title
          ? await getUniquePostSlug(
              tx,
              payload.slug ?? payload.title ?? currentPost.slug,
              currentPost.id
            )
          : undefined;
      const content = payload.content ?? currentPost.content;

      await tx.blogPost.update({
        where: { id: currentPost.id },
        data: {
          ...(payload.title !== undefined ? { title: payload.title } : {}),
          ...(slug !== undefined ? { slug } : {}),
          ...(payload.excerpt !== undefined ? { excerpt: payload.excerpt } : {}),
          ...(payload.content !== undefined
            ? {
                content: payload.content,
                readingTime: getReadingTime(content),
              }
            : {}),
          ...(payload.coverImage !== undefined
            ? { coverImage: payload.coverImage }
            : {}),
          ...(payload.featured !== undefined
            ? { featured: payload.featured }
            : {}),
          ...(payload.language !== undefined ? { language: payload.language } : {}),
          ...(payload.seoTitle !== undefined ? { seoTitle: payload.seoTitle } : {}),
          ...(payload.seoDescription !== undefined
            ? { seoDescription: payload.seoDescription }
            : {}),
          ...(payload.categoryId !== undefined
            ? { categoryId: payload.categoryId }
            : {}),
        },
      });

      if (payload.tagNames !== undefined) {
        await syncPostTags(tx, currentPost.id, payload.tagNames);
      }

      return tx.blogPost.findUniqueOrThrow({
        where: { id: currentPost.id },
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
      });
    });

    if (!post) {
      return NextResponse.json(
        { message: "Article introuvable." },
        { status: 404 }
      );
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/blog");

    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Mise a jour impossible.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return forbidden();
  }

  const post = await prisma.blogPost.update({
    where: { id: params.id },
    data: {
      status: "ARCHIVED",
      publishedAt: null,
    },
    select: { slug: true },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");

  return NextResponse.json({ id: params.id, status: "ARCHIVED" });
}
