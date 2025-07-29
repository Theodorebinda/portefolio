"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useTrackPageView = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      const searchParams = window.location.search;
      const url = `${pathname}${searchParams}`;
      window.gtag("event", "page_view", {
        page_path: url,
      });
    }
  }, [pathname]);
};
