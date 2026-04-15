import { lazy, Suspense, useState, type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/api/queryClient';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import MainLayout from '@/components/MainLayout/MainLayout';
import { isDev } from '@/config/env';
import './App.css';

const ReactQueryDevtools = isDev
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((m) => ({ default: m.ReactQueryDevtools })),
    )
  : null;

function App(): ReactNode {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MainLayout />
        {ReactQueryDevtools ? (
          <Suspense fallback={null}>
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense>
        ) : null}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
