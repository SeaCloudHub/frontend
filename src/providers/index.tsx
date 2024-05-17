import React from 'react';
import { QueryClientProvider } from './ReactQueryProvider';
import ScreenModeProvider from './ScreenModeProvider';
import { ThemeProvider } from './theme-provider';
import { CookiesProvider, useCookies } from 'react-cookie'

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider>
      <CookiesProvider>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <ScreenModeProvider>{children}</ScreenModeProvider>
        </ThemeProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
