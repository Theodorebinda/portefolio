"use client";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/globalStyle";
import Footer from "@/ui/components/footer/footer";
import Loader from "@/app/loader/loader";
import { useTheme } from "@/lib/useTheme/useTheme";
import NavigationWrapper from "@/routes/navigationWraper";
import React from "react";

function MainRoutesLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  if (theme === null) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      <NavigationWrapper toggleTheme={toggleTheme} currentTheme={theme} />
      {children}
      <Footer />
    </ThemeProvider>
  );
}

export default React.memo(MainRoutesLayout);
