import { Prisma } from "@prisma/client";
import { estimateReadingTime, normalizeTagNames, slugify } from "./utils";

export async function getUniquePostSlug(
  tx: Prisma.TransactionClient,
  value: string,
  ignoredPostId?: string
) {
  const baseSlug = slugify(value) || `article-${Date.now()}`;
  let slug = baseSlug;
  let suffix = 2;

  while (
    await tx.blogPost.findFirst({
      where: {
        slug,
        ...(ignoredPostId ? { NOT: { id: ignoredPostId } } : {}),
      },
      select: { id: true },
    })
  ) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function syncPostTags(
  tx: Prisma.TransactionClient,
  postId: string,
  tagNames: string[] = []
) {
  const names = normalizeTagNames(tagNames);

  await tx.blogPostTag.deleteMany({
    where: { postId },
  });

  if (names.length === 0) return;

  const tags = await Promise.all(
    names.map((name) => {
      const slug = slugify(name);

      return tx.blogTag.upsert({
        where: { slug },
        update: { name },
        create: { name, slug },
      });
    })
  );

  await tx.blogPostTag.createMany({
    data: tags.map((tag) => ({
      postId,
      tagId: tag.id,
    })),
    skipDuplicates: true,
  });
}

export function getReadingTime(content: string, providedValue?: number | null) {
  return providedValue && providedValue > 0
    ? providedValue
    : estimateReadingTime(content);
}
