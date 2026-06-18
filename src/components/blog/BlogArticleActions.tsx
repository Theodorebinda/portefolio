"use client";

import { trackEvent } from "@/utils/trackEvent";
import { Mail, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function BlogArticleActions({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  async function shareArticle() {
    trackEvent("blog_share_article", "Blog", title);

    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={shareArticle}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 text-sm font-semibold text-neutral-900 transition hover:border-[#436896] hover:text-[#436896] dark:border-white/10 dark:text-white dark:hover:border-[#b2d2fa] dark:hover:text-[#b2d2fa]"
      >
        <Share2 size={16} />
        {copied ? "Lien copie" : "Partager"}
      </button>
      <Link
        href="/contact"
        onClick={() => trackEvent("blog_contact_click", "Blog", title)}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#436896] px-4 text-sm font-bold text-white transition hover:bg-[#1c1917] dark:bg-[#b2d2fa] dark:text-black dark:hover:bg-white"
      >
        <Mail size={16} />
        En discuter
      </Link>
    </div>
  );
}
