"use client";

import { trackEvent } from "@/utils/trackEvent";
import { Archive, Edit3, Eye, Loader2, Send, Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type BlogPostStatus = "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "ARCHIVED";

export function BlogAdminActions({
  id,
  slug,
  status,
}: {
  id: string;
  slug: string;
  status: BlogPostStatus;
}) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  async function runAction(action: "publish" | "unpublish" | "archive") {
    const confirmed =
      action !== "archive" ||
      window.confirm("Archiver cet article ? Il ne sera plus visible.");

    if (!confirmed) return;

    setLoadingAction(action);

    try {
      const endpoint =
        action === "archive"
          ? `/api/admin/blog/posts/${id}`
          : `/api/admin/blog/posts/${id}/${action}`;
      const response = await fetch(endpoint, {
        method: action === "archive" ? "DELETE" : "POST",
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(payload?.message ?? "Action impossible.");
      }

      if (action === "publish") {
        trackEvent("blog_publish", "Blog Admin", slug);
      }

      router.refresh();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Action impossible.");
    } finally {
      setLoadingAction(null);
    }
  }

  const isLoading = Boolean(loadingAction);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/admin/blog/${id}/edit`}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-white/10 px-3 text-xs font-semibold text-slate-200 transition hover:border-[#b2d2fa] hover:text-[#b2d2fa]"
      >
        <Edit3 size={14} />
        Editer
      </Link>
      {status === "PUBLISHED" ? (
        <Link
          href={`/blog/${slug}`}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-white/10 px-3 text-xs font-semibold text-slate-200 transition hover:border-[#b2d2fa] hover:text-[#b2d2fa]"
        >
          <Eye size={14} />
          Voir
        </Link>
      ) : null}
      {status === "PUBLISHED" ? (
        <button
          type="button"
          disabled={isLoading}
          onClick={() => runAction("unpublish")}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-white/10 px-3 text-xs font-semibold text-slate-200 transition hover:border-amber-300 hover:text-amber-200 disabled:opacity-50"
        >
          {loadingAction === "unpublish" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Undo2 size={14} />
          )}
          Depublier
        </button>
      ) : (
        <button
          type="button"
          disabled={isLoading || status === "ARCHIVED"}
          onClick={() => runAction("publish")}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-[#b2d2fa] px-3 text-xs font-bold text-black transition hover:bg-white disabled:opacity-50"
        >
          {loadingAction === "publish" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          Publier
        </button>
      )}
      <button
        type="button"
        disabled={isLoading || status === "ARCHIVED"}
        onClick={() => runAction("archive")}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-red-300/30 px-3 text-xs font-semibold text-red-200 transition hover:bg-red-300/10 disabled:opacity-50"
      >
        {loadingAction === "archive" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Archive size={14} />
        )}
        Archiver
      </button>
    </div>
  );
}
