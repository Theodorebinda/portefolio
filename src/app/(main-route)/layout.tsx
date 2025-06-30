"use client";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/globalStyle";
import Footer from "@/ui/components/footer/footer";
import Loader from "@/app/loader/loader";
import { useTheme } from "@/lib/useTheme/useTheme";
import NavigationWrapper from "@/routes/navigationWraper";
import React from "react";
import { useTrackPageView } from "@/lib/hooks/useTrackPageView";

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
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default React.memo(MainRoutesLayout);
