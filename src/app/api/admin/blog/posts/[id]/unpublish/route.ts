import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
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

  const post = await prisma.blogPost.update({
    where: { id: params.id },
    data: {
      status: "DRAFT",
      publishedAt: null,
    },
    select: {
      id: true,
      slug: true,
      status: true,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");

  return NextResponse.json(post);
}
