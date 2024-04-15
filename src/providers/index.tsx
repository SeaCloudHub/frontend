import React from 'react';
import { QueryClientProvider } from './ReactQueryProvider';
import ScreenModeProvider from './ScreenModeProvider';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider>
      <ScreenModeProvider>{children}</ScreenModeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
