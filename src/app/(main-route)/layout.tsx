"use client";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/globalStyle";
import Loader from "@/app/loader/loader";
import { useTheme } from "@/lib/useTheme/useTheme";
import NavigationWrapper from "@/routes/navigationWraper";
import React from "react";
import dynamic from "next/dynamic";

// Lazy load des composants non-critiques pour réduire le bundle initial
const Footer = dynamic(() => import("@/ui/components/footer/footer"), {
  ssr: true,
});

const ScrollToTop = dynamic(() => import("@/utils/scroll-to-top"), {
  ssr: false,
});

const TrackPageView = dynamic(() => import("@/components/analytique/tracking-view"), {
  ssr: false,
});

function MainRoutesLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  if (theme === null) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      <div className=" mx-auto py-8 max-w-screen-xl">
        <NavigationWrapper toggleTheme={toggleTheme} currentTheme={theme} />
        {children}
        <TrackPageView />
        <ScrollToTop />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default React.memo(MainRoutesLayout);
