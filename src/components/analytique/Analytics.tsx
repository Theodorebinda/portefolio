// app/components/Analytics.tsx
"use client";

import Script from "next/script";
import { useEffect } from "react";

// app/types/globals.d.ts
export {};

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
  }
}

declare const window: Window & {
  dataLayer?: Record<string, any>[];
  gtag?: (...args: any[]) => void;
};

export const Analytics = () => {
  useEffect(() => {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer?.push(arguments);
      };
      window.gtag("js", new Date());
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_GA_ID) {
    console.warn("Google Analytics ID manquant");
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
    </>
  );
};
