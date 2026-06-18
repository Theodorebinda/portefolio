import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogPostPayloadSchema } from "@/lib/blog/validation";
import { getReadingTime, getUniquePostSlug, syncPostTags } from "@/lib/blog/server";
import { revalidatePath } from "next/cache";

function forbidden() {
  return NextResponse.json(
    { message: "Acces administrateur requis." },
    { status: 403 }
  );
}

export async function POST(request: Request) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN" || !session.user.id) {
    return forbidden();
  }

  const body = await request.json().catch(() => null);
  const result = blogPostPayloadSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error.issues[0]?.message ?? "Donnees invalides." },
      { status: 400 }
    );
  }

  const payload = result.data;

  const post = await prisma.$transaction(async (tx) => {
    const slug = await getUniquePostSlug(tx, payload.slug ?? payload.title);
    const createdPost = await tx.blogPost.create({
      data: {
        title: payload.title,
        slug,
        excerpt: payload.excerpt,
        content: payload.content,
        coverImage: payload.coverImage,
        featured: payload.featured ?? false,
        language: payload.language ?? "fr",
        readingTime: getReadingTime(payload.content),
        seoTitle: payload.seoTitle,
        seoDescription: payload.seoDescription,
        categoryId: payload.categoryId,
        authorId: session.user.id,
      },
      select: { id: true },
    });

    await syncPostTags(tx, createdPost.id, payload.tagNames);

    return tx.blogPost.findUniqueOrThrow({
      where: { id: createdPost.id },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");

  return NextResponse.json({ post }, { status: 201 });
}
