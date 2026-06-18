import { z } from "zod";

const optionalText = (max: number) =>
  z
    .union([z.string().trim().max(max), z.literal("")])
    .optional()
    .transform((value) => (value ? value : undefined));

export const blogPostPayloadSchema = z.object({
  title: z.string().trim().min(3, "Le titre est requis."),
  slug: optionalText(100),
  excerpt: z
    .string()
    .trim()
    .min(20, "L'extrait doit contenir au moins 20 caracteres.")
    .max(300, "L'extrait ne peut pas depasser 300 caracteres."),
  content: z.string().trim().min(1, "Le contenu est requis."),
  coverImage: optionalText(500),
  featured: z.boolean().optional(),
  language: z.string().trim().min(2).max(8).optional(),
  seoTitle: optionalText(70),
  seoDescription: optionalText(160),
  categoryId: z
    .union([z.string().cuid(), z.literal(""), z.null()])
    .optional()
    .transform((value) => (value ? value : null)),
  tagNames: z.array(z.string().trim().min(1).max(40)).max(12).optional(),
});

export const blogPostPatchSchema = blogPostPayloadSchema.partial();

export type BlogPostPayload = z.infer<typeof blogPostPayloadSchema>;
export type BlogPostPatchPayload = z.infer<typeof blogPostPatchSchema>;
