// app/hooks/useTrackPageView.ts
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare const window: Window & {
  dataLayer?: Record<string, any>[];
  gtag?: (...args: any[]) => void;
};

export const useTrackPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (window.gtag) {
      const url = `${pathname}${
        searchParams?.toString() ? `?${searchParams}` : ""
      }`;
      window.gtag("event", "page_view", {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);
};
