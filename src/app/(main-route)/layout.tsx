"use client";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/globalStyle";
import Footer from "@/ui/components/footer/footer";
import Loader from "@/app/loader/loader";
import { useTheme } from "@/lib/useTheme/useTheme";
import NavigationWrapper from "@/routes/navigationWraper";
import React, { useEffect } from "react";
import { useTrackPageView } from "@/lib/hooks/useTrackPageView";
import ScrollToTop from "@/utils/scroll-to-top";
import { GoogleAnalytics } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import TrackPageView from "@/components/analytique/tracking-view";

function MainRoutesLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  useTrackPageView();

  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  if (theme === null) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      <div className=" mx-auto py-8 max-w-screen-xl">
        <NavigationWrapper toggleTheme={toggleTheme} currentTheme={theme} />
        {/* <SpotifyPlayer playlistUrl="https://open.spotify.com/embed/playlist/679wCT6dVMDBxrYa5NcrXL?utm_source=generator" /> */}
        {children}
        <TrackPageView />
        <ScrollToTop />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default React.memo(MainRoutesLayout);
