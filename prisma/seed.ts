import { BlogPostStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Developpement web", slug: "developpement-web" },
  { name: "Architecture", slug: "architecture" },
  { name: "Design produit", slug: "design-produit" },
];

const tags = [
  { name: "nextjs", slug: "nextjs" },
  { name: "react", slug: "react" },
  { name: "typescript", slug: "typescript" },
  { name: "prisma", slug: "prisma" },
  { name: "postgresql", slug: "postgresql" },
  { name: "auth", slug: "auth" },
  { name: "ui", slug: "ui" },
];

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

async function main() {
  await Promise.all(
    categories.map((category) =>
      prisma.blogCategory.upsert({
        where: { slug: category.slug },
        update: { name: category.name },
        create: category,
      })
    )
  );

  await Promise.all(
    tags.map((tag) =>
      prisma.blogTag.upsert({
        where: { slug: tag.slug },
        update: { name: tag.name },
        create: tag,
      })
    )
  );

  const adminEmails = getAdminEmails();

  if (adminEmails.length === 0) {
    console.warn("Seed blog: aucun ADMIN_EMAILS configure, article demo ignore.");
    return;
  }

  const admin = await prisma.user.findFirst({
    where: {
      email: {
        in: adminEmails,
        mode: "insensitive",
      },
    },
    orderBy: { createdAt: "asc" },
  });

  if (!admin) {
    console.warn("Seed blog: aucun utilisateur admin trouve, article demo ignore.");
    return;
  }

  const category = await prisma.blogCategory.findUnique({
    where: { slug: "developpement-web" },
  });
  const selectedTags = await prisma.blogTag.findMany({
    where: { slug: { in: ["nextjs", "auth", "prisma"] } },
  });

  const post = await prisma.blogPost.upsert({
    where: { slug: "mettre-en-place-authjs-v5-avec-linkedin-et-prisma" },
    update: {
      authorId: admin.id,
      categoryId: category?.id,
      status: BlogPostStatus.PUBLISHED,
      featured: true,
      publishedAt: new Date(),
    },
    create: {
      slug: "mettre-en-place-authjs-v5-avec-linkedin-et-prisma",
      title: "Mettre en place Auth.js v5 avec LinkedIn et Prisma",
      excerpt:
        "Notes de terrain sur l'authentification LinkedIn, les sessions et la moderation dans une application Next.js.",
      content: [
        "# Mettre en place Auth.js v5 avec LinkedIn et Prisma",
        "",
        "Ce premier article sert de contenu de demonstration pour valider le blog dynamique du portfolio.",
        "",
        "## Objectif",
        "",
        "Montrer comment une authentification LinkedIn peut alimenter un portfolio avec des roles, des sessions et une base PostgreSQL via Prisma.",
        "",
        "## Points a retenir",
        "",
        "- Auth.js garde la session simple cote application.",
        "- Prisma centralise les utilisateurs, les comptes et les donnees metier.",
        "- Le role admin peut rester derive de `ADMIN_EMAILS` pour une premiere version.",
      ].join("\n"),
      status: BlogPostStatus.PUBLISHED,
      featured: true,
      language: "fr",
      readingTime: 2,
      seoTitle: "Auth.js v5, LinkedIn et Prisma dans Next.js",
      seoDescription:
        "Retour pratique sur Auth.js v5, LinkedIn, Prisma et PostgreSQL dans une application Next.js.",
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: category?.id,
    },
  });

  await prisma.blogPostTag.deleteMany({
    where: { postId: post.id },
  });

  await prisma.blogPostTag.createMany({
    data: selectedTags.map((tag) => ({
      postId: post.id,
      tagId: tag.id,
    })),
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
