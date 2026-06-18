"use client";

import { trackEvent } from "@/utils/trackEvent";
import { Search } from "lucide-react";
import Link from "next/link";

interface BlogTagFilter {
  name: string;
  slug: string;
}

function buildBlogHref(params: { q?: string; tag?: string }) {
  const searchParams = new URLSearchParams();
  if (params.q) searchParams.set("q", params.q);
  if (params.tag) searchParams.set("tag", params.tag);
  const query = searchParams.toString();
  return query ? `/blog?${query}` : "/blog";
}

export function BlogFilters({
  tags,
  activeTag,
  query,
}: {
  tags: BlogTagFilter[];
  activeTag?: string;
  query?: string;
}) {
  return (
    <section className="flex flex-col gap-4">
      <form
        action="/blog"
        method="get"
        onSubmit={(event) => {
          const formData = new FormData(event.currentTarget);
          const value = formData.get("q");
          trackEvent(
            "blog_search",
            "Blog",
            typeof value === "string" ? value : query
          );
        }}
        className="relative block max-w-xl text-neutral-700 dark:text-slate-300"
      >
        {activeTag ? <input type="hidden" name="tag" value={activeTag} /> : null}
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-slate-500"
        />
        <input
          name="q"
          defaultValue={query}
          placeholder="Rechercher un article"
          className="h-11 w-full rounded-md border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[#436896] dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#b2d2fa]"
        />
      </form>

      <div className="flex flex-wrap gap-2">
        <Link
          href={buildBlogHref({ q: query })}
          onClick={() => trackEvent("blog_filter_tag", "Blog", "Tous")}
          className={`inline-flex h-8 items-center rounded-md border px-3 text-xs font-semibold transition ${
            !activeTag
              ? "border-[#436896] bg-[#436896] text-white dark:border-[#b2d2fa] dark:bg-[#b2d2fa] dark:text-black"
              : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-[#436896] hover:text-neutral-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-[#b2d2fa] dark:hover:text-white"
          }`}
        >
          #Tous
        </Link>
        {tags.map((tag) => {
          const active = activeTag === tag.slug;

          return (
            <Link
              key={tag.slug}
              href={buildBlogHref({ q: query, tag: tag.slug })}
              onClick={() => trackEvent("blog_filter_tag", "Blog", tag.slug)}
              className={`inline-flex h-8 items-center rounded-md border px-3 text-xs font-semibold transition ${
                active
                  ? "border-[#436896] bg-[#436896] text-white dark:border-[#b2d2fa] dark:bg-[#b2d2fa] dark:text-black"
                  : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-[#436896] hover:text-neutral-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-[#b2d2fa] dark:hover:text-white"
              }`}
            >
              #{tag.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
