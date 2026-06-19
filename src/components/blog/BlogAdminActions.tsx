"use client";

import { trackEvent } from "@/utils/trackEvent";
import { Archive, Edit3, Eye, Loader2, Send, Undo2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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

      toast.success("Action effectuee.");
      router.refresh();
    } catch (error) {
      toast.error("Action impossible", {
        description:
          error instanceof Error
            ? error.message
            : "Veuillez reessayer dans un instant.",
      });
    } finally {
      setLoadingAction(null);
    }
  }

  const isLoading = Boolean(loadingAction);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/admin/blog/${id}/edit`}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-neutral-300 px-3 text-xs font-semibold text-neutral-700 transition hover:border-[#436896] hover:text-[#436896] dark:border-white/10 dark:text-slate-200 dark:hover:border-[#b2d2fa] dark:hover:text-[#b2d2fa]"
        title="Editer l'article"
      >
        <Edit3 size={14} />
        {/* Editer */}
      </Link>
      {status === "PUBLISHED" ? (
        <Link
          href={`/blog/${slug}`}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-neutral-300 px-3 text-xs font-semibold text-neutral-700 transition hover:border-[#436896] hover:text-[#436896] dark:border-white/10 dark:text-slate-200 dark:hover:border-[#b2d2fa] dark:hover:text-[#b2d2fa]"
          title="Voir l'article"
        >
          <Eye size={14} />
          {/* Voir */}
        </Link>
      ) : null}
      {status === "PUBLISHED" ? (
        <button
          type="button"
          disabled={isLoading}
          onClick={() => runAction("unpublish")}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-neutral-300 px-3 text-xs font-semibold text-neutral-700 transition hover:border-amber-500 hover:text-amber-700 disabled:opacity-50 dark:border-white/10 dark:text-slate-200 dark:hover:border-amber-300 dark:hover:text-amber-200"
          title="Depublier l'article"
        >
          {loadingAction === "unpublish" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Undo2 size={14} />
          )}
          {/* Depublier */}
        </button>
      ) : (
        <button
          type="button"
          disabled={isLoading || status === "ARCHIVED"}
          onClick={() => runAction("publish")}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-[#436896] px-3 text-xs font-bold text-white transition hover:bg-[#1c1917] disabled:opacity-50 dark:bg-[#b2d2fa] dark:text-black dark:hover:bg-white"
          title="Publier l'article"
        >
          {loadingAction === "publish" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          {/* Publier */}
        </button>
      )}
      <button
        type="button"
        disabled={isLoading || status === "ARCHIVED"}
        onClick={() => runAction("archive")}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-red-300 px-3 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-300/30 dark:text-red-200 dark:hover:bg-red-300/10"
        title="Archiver l'article"
      >
        {loadingAction === "archive" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Archive size={14} />
        )}
        {/* Archiver */}
      </button>
    </div>
  );
}
