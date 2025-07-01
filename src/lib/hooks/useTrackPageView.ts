"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare const window: Window & {
  dataLayer?: Record<string, any>[];
  gtag?: (...args: any[]) => void;
};

export const useTrackPageView = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      // On utilise window.location.search pour éviter useSearchParams()
      const searchParams = window.location.search;
      const url = `${pathname}${searchParams}`;

      window.gtag("event", "page_view", {
        page_path: url,
        send_to: "G-XXXXXXXXXX", // Remplacez par votre ID
      });
    }
  }, [pathname]); // Seul pathname comme dépendance
};
