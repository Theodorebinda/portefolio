"use client";

import { trackEvent } from "@/utils/trackEvent";
import { Mail } from "lucide-react";
import Link from "next/link";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function BlogArticleActions({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const shareText = "Jeter un coup d'oeil a cet article";
  const encodedUrl = encodeURIComponent(url);
  const encodedShareText = encodeURIComponent(shareText);
  const encodedLinkedInSummary = encodeURIComponent(`${shareText} ${url}`);
  const shareLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedLinkedInSummary}`,
      icon: FaWhatsapp,
      event: "blog_share_whatsapp",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodeURIComponent(
        title
      )}&summary=${encodedLinkedInSummary}`,
      icon: FaLinkedin,
      event: "blog_share_linkedin",
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedUrl}`,
      icon: FaXTwitter,
      event: "blog_share_x",
    },
  ];

  return (
    <div className="flex flex-col gap-3 border-y border-neutral-200 py-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href="/contact"
        onClick={() => trackEvent("blog_contact_click", "Blog", title)}
        className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-md bg-[#436896] px-4 text-sm font-bold text-white transition hover:bg-[#1c1917] dark:bg-[#b2d2fa] dark:text-black dark:hover:bg-white"
      >
        <Mail size={16} />
        En discuter
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        {shareLinks.map(({ label, href, icon: Icon, event }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Partager sur ${label}`}
            onClick={() => trackEvent(event, "Blog", title)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-neutral-300 px-3 text-sm font-semibold text-neutral-900 transition hover:border-[#436896] hover:text-[#436896] dark:border-white/10 dark:text-white dark:hover:border-[#b2d2fa] dark:hover:text-[#b2d2fa]"
          >
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
