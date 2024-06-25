'use client';

import { ReactNode, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../styles/theme';
import { GlobalStyle } from '../../styles/globalStyle';
import  {Navigation}  from '@/routes/navigation';
import { MobileNavigation } from '@/routes/mobileNavigation';
import Footer from '@/ui/components/footer/footer';

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
      const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(userPrefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  if (theme === null) {
    return null; 
  }

  return (
    <div>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Navigation className='hidden md:block' toggleTheme={toggleTheme} currentTheme={theme} />
        <MobileNavigation className='md:hidden' toggleTheme={toggleTheme} currentTheme={theme} />
        {children}
        <Footer />
      </ThemeProvider>
    </div>
  );
}
