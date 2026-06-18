"use client";

import { trackEvent } from "@/utils/trackEvent";
import Link from "next/link";
import type { ComponentProps } from "react";

interface TrackedBlogLinkProps extends ComponentProps<typeof Link> {
  trackingLabel: string;
}

export function TrackedBlogLink({
  trackingLabel,
  onClick,
  ...props
}: TrackedBlogLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent("blog_open_article", "Blog", trackingLabel);
        onClick?.(event);
      }}
    />
  );
}
