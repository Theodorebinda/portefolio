'use client'

import { ReactNode, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../styles/theme';
import { GlobalStyle } from '../../styles/globalStyle';
import { Navigation } from '@/routes/navigation'
import { MobileNavigation } from '@/routes/mobileNavigation'
import Footer from '@/ui/components/footer/footer';



export default function MainRoutesLayout({
  children,
}: {
  children: React.ReactNode
}) 
{
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);



  return (
    <div className=''>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
          <Navigation className='hidden md:block' toggleTheme={toggleTheme} currentTheme={theme} />
          <MobileNavigation className='md:hidden' toggleTheme={toggleTheme} currentTheme={theme}/>
          {children}
          <Footer/>
      </ThemeProvider>
    </div>
  )
}
