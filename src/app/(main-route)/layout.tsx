'use client';

import { ReactNode, useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../styles/theme';
import { GlobalStyle } from '../../styles/globalStyle';
import { Navigation } from '@/routes/navigation';
import { MobileNavigation } from '@/routes/mobileNavigation';
import Footer from '@/ui/components/footer/footer';
import Loader from '@/ui/components/loader/loader';

export default function MainRoutesLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string | null>(null);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(userPrefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const selectedTheme = useMemo(() => (theme === 'light' ? lightTheme : darkTheme), [theme]);

  if (theme === null) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={selectedTheme}>
        <GlobalStyle />
        <Navigation className='hidden lg:block' toggleTheme={toggleTheme} currentTheme={theme} />
        <MobileNavigation className='lg:hidden' toggleTheme={toggleTheme} currentTheme={theme} />
        {children}
        <Footer />
    </ThemeProvider>
  );
}
