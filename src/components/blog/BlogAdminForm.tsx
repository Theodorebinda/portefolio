"use client";

import {
  getBlogImageSourceError,
  getValidBlogImageSource,
  normalizeBlogImageSource,
  slugify,
} from "@/lib/blog/utils";
import { cn } from "@/lib/utils";
import { ImagePlus, Loader2, Save } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[360px] items-center justify-center rounded-md border border-neutral-200 text-sm text-neutral-500 dark:border-white/10 dark:text-slate-400">
      Chargement de l&apos;editeur...
    </div>
  ),
});

const labelTextClassName = "text-sm font-semibold text-neutral-800 dark:text-slate-200";
const helperTextClassName = "block text-xs text-neutral-500 dark:text-slate-500";
const fieldClassName =
  "h-11 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[#436896] dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#b2d2fa]";
const textareaClassName =
  "min-h-24 w-full rounded-md border border-neutral-300 bg-white px-3 py-3 text-sm leading-6 text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[#436896] dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#b2d2fa]";
const selectClassName =
  "h-11 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-[#436896] dark:border-white/10 dark:bg-[#222020] dark:text-white dark:focus:border-[#b2d2fa]";
const DEFAULT_ARTICLE_TITLE = "Nouvel article";

interface BlogCategoryOption {
  id: string;
  name: string;
  slug: string;
}

interface BlogTagOption {
  name: string;
  slug: string;
}

export interface BlogAdminInitialPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  featured: boolean;
  language: string;
  seoTitle: string | null;
  seoDescription: string | null;
  categoryId: string | null;
  tagNames: string[];
}

export function BlogAdminForm({
  mode,
  categories,
  tags,
  initialPost,
}: {
  mode: "create" | "edit";
  categories: BlogCategoryOption[];
  tags: BlogTagOption[];
  initialPost?: BlogAdminInitialPost;
}) {
  const router = useRouter();
  const defaultTitle = initialPost?.title ?? DEFAULT_ARTICLE_TITLE;
  const [title, setTitle] = useState(defaultTitle);
  const [slug, setSlug] = useState(
    initialPost?.slug ?? slugify(defaultTitle),
  );
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [content, setContent] = useState(initialPost?.content ?? "");
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage ?? "");
  const [featured, setFeatured] = useState(initialPost?.featured ?? false);
  const [language, setLanguage] = useState(initialPost?.language ?? "fr");
  const [seoTitle, setSeoTitle] = useState(initialPost?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    initialPost?.seoDescription ?? ""
  );
  const [categoryId, setCategoryId] = useState(initialPost?.categoryId ?? "");
  const [tagInput, setTagInput] = useState(
    initialPost?.tagNames.join(", ") ?? ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const tagSuggestions = useMemo(
    () => tags.map((tag) => tag.name).join(", "),
    [tags]
  );
  const coverPreviewSrc = useMemo(
    () => getValidBlogImageSource(coverImage),
    [coverImage]
  );
  const hasInvalidCoverImage = Boolean(coverImage.trim() && !coverPreviewSrc);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlugTouched(true);
    setSlug(slugify(value));
  }

  function showCoverImageError(message: string) {
    toast.error("Image de couverture invalide", {
      description: message,
    });
  }

  function validateCoverImage(value = coverImage) {
    const message = getBlogImageSourceError(value);
    if (!message) return true;

    showCoverImageError(message);
    return false;
  }

  async function handleCoverUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as {
        secureUrl?: string;
        url?: string;
        message?: string;
      };

      if (!response.ok || (!payload.secureUrl && !payload.url)) {
        throw new Error(payload.message ?? "Upload impossible.");
      }

      setCoverImage(payload.secureUrl ?? payload.url ?? "");
      toast.success("Image de couverture importee.");
    } catch (uploadError) {
      toast.error("Upload impossible", {
        description:
          uploadError instanceof Error
            ? uploadError.message
            : "Veuillez reessayer avec une autre image.",
      });
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedCoverImage = normalizeBlogImageSource(coverImage);
    if (!validateCoverImage(normalizedCoverImage)) return;

    setIsSaving(true);

    const tagNames = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const endpoint =
      mode === "create"
        ? "/api/admin/blog/posts"
        : `/api/admin/blog/posts/${initialPost?.id}`;

    try {
      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          coverImage: normalizedCoverImage,
          featured,
          language,
          seoTitle,
          seoDescription,
          categoryId,
          tagNames,
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(payload?.message ?? "Enregistrement impossible.");
      }

      toast.success("Article enregistre.");
      router.push("/admin/blog");
      router.refresh();
    } catch (submitError) {
      toast.error("Enregistrement impossible", {
        description:
          submitError instanceof Error
            ? submitError.message
            : "Veuillez verifier les champs et reessayer.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mode === "create" ? (
        <h1 className="text-3xl font-bold text-neutral-950 dark:text-white">
          <input
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className="block w-full rounded-md border border-transparent bg-transparent px-0 py-1 text-inherit outline-none transition placeholder:text-neutral-400 focus:border-[#436896] focus:bg-white focus:px-3 dark:placeholder:text-slate-500 dark:focus:border-[#b2d2fa] dark:focus:bg-white/5"
            aria-label="Titre de l'article"
            required
          />
        </h1>
      ) : (
        <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
          <input
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className="block w-full rounded-md border border-transparent bg-transparent px-0 py-1 text-inherit outline-none transition placeholder:text-neutral-400 focus:border-[#436896] focus:bg-white focus:px-3 dark:placeholder:text-slate-500 dark:focus:border-[#b2d2fa] dark:focus:bg-white/5"
            aria-label="Titre de l'article"
            required
          />
        </h2>
      )}

      <div className="max-w-[260px]">
        <label className="block space-y-2">
          <span className={labelTextClassName}>Langue</span>
          <input
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className={fieldClassName}
            maxLength={8}
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className={labelTextClassName}>Slug</span>
        <input
          value={slug}
          onChange={(event) => handleSlugChange(event.target.value)}
          className={fieldClassName}
          placeholder="slug-url"
        />
      </label>

      <label className="space-y-2">
        <span className={labelTextClassName}>Extrait</span>
        <textarea
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          className={textareaClassName}
          maxLength={300}
          placeholder="Resume court affiche dans la liste du blog"
          required
        />
        <span className={helperTextClassName}>
          {excerpt.length}/300 caracteres
        </span>
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className={labelTextClassName}>Categorie</span>
          <select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className={selectClassName}
          >
            <option value="">Sans categorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className={labelTextClassName}>Tags</span>
          <input
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            className={fieldClassName}
            placeholder="nextjs, prisma, ui"
          />
          {tagSuggestions ? (
            <span className={helperTextClassName}>
              Tags existants: {tagSuggestions}
            </span>
          ) : null}
        </label>
      </div>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className={labelTextClassName}>
            Image de couverture
          </span>
          <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border border-neutral-300 px-3 text-sm font-semibold text-neutral-700 transition hover:border-[#436896] hover:text-[#436896] dark:border-white/10 dark:text-slate-200 dark:hover:border-[#b2d2fa] dark:hover:text-[#b2d2fa]">
            {isUploading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ImagePlus size={16} />
            )}
            Uploader
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleCoverUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
        <input
          value={coverImage}
          onChange={(event) => setCoverImage(event.target.value)}
          onBlur={() => validateCoverImage()}
          aria-invalid={hasInvalidCoverImage}
          className={cn(
            fieldClassName,
            hasInvalidCoverImage &&
              "border-red-400/70 focus:border-red-400 dark:border-red-400/70 dark:focus:border-red-400",
          )}
          placeholder="https://res.cloudinary.com/..."
        />
        {coverPreviewSrc ? (
          <div className="relative aspect-[16/7] overflow-hidden rounded-md border border-neutral-200 dark:border-white/10">
            <Image
              src={coverPreviewSrc}
              alt="Image de couverture"
              fill
              className="object-cover"
            />
          </div>
        ) : null}
      </section>

      <label className="flex items-center gap-3 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-800 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200">
        <input
          type="checkbox"
          checked={featured}
          onChange={(event) => setFeatured(event.target.checked)}
          className="h-4 w-4 accent-[#436896] dark:accent-[#b2d2fa]"
        />
        Mettre cet article en vedette
      </label>

      <section className="space-y-2">
        <span className={labelTextClassName}>Contenu</span>
        <Editor initialContent={content} onChange={setContent} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className={labelTextClassName}>
            Titre SEO
          </span>
          <input
            value={seoTitle}
            onChange={(event) => setSeoTitle(event.target.value)}
            className={fieldClassName}
            maxLength={70}
          />
        </label>
        <label className="space-y-2">
          <span className={labelTextClassName}>
            Description SEO
          </span>
          <input
            value={seoDescription}
            onChange={(event) => setSeoDescription(event.target.value)}
            className={fieldClassName}
            maxLength={160}
          />
        </label>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="inline-flex h-11 items-center justify-center rounded-md border border-neutral-300 px-4 text-sm font-semibold text-neutral-700 transition hover:border-[#436896] hover:text-[#436896] dark:border-white/10 dark:text-slate-200 dark:hover:border-white/30 dark:hover:text-white"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#436896] px-4 text-sm font-bold text-white transition hover:bg-[#1c1917] disabled:opacity-50 dark:bg-[#b2d2fa] dark:text-black dark:hover:bg-white"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Enregistrer
        </button>
      </div>
    </form>
  );
}
