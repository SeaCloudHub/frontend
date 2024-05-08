import React from 'react';
import { QueryClientProvider } from './ReactQueryProvider';
import ScreenModeProvider from './ScreenModeProvider';
import { ThemeProvider } from './theme-provider';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <ScreenModeProvider>{children}</ScreenModeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
