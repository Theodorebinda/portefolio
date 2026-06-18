"use client";

import { slugify } from "@/lib/blog/utils";
import { ImagePlus, Loader2, Save } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[360px] items-center justify-center rounded-md border border-white/10 text-sm text-slate-400">
      Chargement de l&apos;editeur...
    </div>
  ),
});

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
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
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
  const [error, setError] = useState<string | null>(null);

  const tagSuggestions = useMemo(
    () => tags.map((tag) => tag.name).join(", "),
    [tags]
  );

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

  async function handleCoverUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

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
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload impossible."
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

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
          coverImage,
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

      router.push("/admin/blog");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Enregistrement impossible."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-md border border-red-300/30 bg-red-300/10 p-3 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-200">Titre</span>
          <input
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#b2d2fa]"
            placeholder="Titre de l'article"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-200">Langue</span>
          <input
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition focus:border-[#b2d2fa]"
            maxLength={8}
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-200">Slug</span>
        <input
          value={slug}
          onChange={(event) => handleSlugChange(event.target.value)}
          className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#b2d2fa]"
          placeholder="slug-url"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-200">Extrait</span>
        <textarea
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          className="min-h-24 w-full rounded-md border border-white/10 bg-white/5 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-[#b2d2fa]"
          maxLength={300}
          placeholder="Resume court affiche dans la liste du blog"
          required
        />
        <span className="block text-xs text-slate-500">
          {excerpt.length}/300 caracteres
        </span>
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-200">Categorie</span>
          <select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className="h-11 w-full rounded-md border border-white/10 bg-[#222020] px-3 text-sm text-white outline-none transition focus:border-[#b2d2fa]"
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
          <span className="text-sm font-semibold text-slate-200">Tags</span>
          <input
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#b2d2fa]"
            placeholder="nextjs, prisma, ui"
          />
          {tagSuggestions ? (
            <span className="block text-xs text-slate-500">
              Tags existants: {tagSuggestions}
            </span>
          ) : null}
        </label>
      </div>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold text-slate-200">
            Image de couverture
          </span>
          <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border border-white/10 px-3 text-sm font-semibold text-slate-200 transition hover:border-[#b2d2fa] hover:text-[#b2d2fa]">
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
          className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#b2d2fa]"
          placeholder="https://res.cloudinary.com/..."
        />
        {coverImage ? (
          <div className="relative aspect-[16/7] overflow-hidden rounded-md border border-white/10">
            <Image
              src={coverImage}
              alt="Image de couverture"
              fill
              className="object-cover"
            />
          </div>
        ) : null}
      </section>

      <label className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-200">
        <input
          type="checkbox"
          checked={featured}
          onChange={(event) => setFeatured(event.target.checked)}
          className="h-4 w-4 accent-[#b2d2fa]"
        />
        Mettre cet article en vedette
      </label>

      <section className="space-y-2">
        <span className="text-sm font-semibold text-slate-200">Contenu</span>
        <Editor initialContent={content} onChange={setContent} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-200">
            Titre SEO
          </span>
          <input
            value={seoTitle}
            onChange={(event) => setSeoTitle(event.target.value)}
            className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#b2d2fa]"
            maxLength={70}
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-200">
            Description SEO
          </span>
          <input
            value={seoDescription}
            onChange={(event) => setSeoDescription(event.target.value)}
            className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#b2d2fa]"
            maxLength={160}
          />
        </label>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 px-4 text-sm font-semibold text-slate-200 transition hover:border-white/30"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#b2d2fa] px-4 text-sm font-bold text-black transition hover:bg-white disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Enregistrer
        </button>
      </div>
    </form>
  );
}
