import { QueryCache, QueryClient, MutationCache } from '@tanstack/react-query';
import { CancelledError } from '@/lib/errors';
import { logger } from '@/lib/logger';

function shouldReportError(error: unknown): boolean {
  return !(error instanceof CancelledError);
}

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        retry: (failureCount, error) => {
          if (!shouldReportError(error)) return false;
          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 0,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (!shouldReportError(error)) return;
        logger.error('query error', error, { queryKey: query.queryKey });
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _vars, _ctx, mutation) => {
        if (!shouldReportError(error)) return;
        logger.error('mutation error', error, { mutationKey: mutation.options.mutationKey });
      },
    }),
  });
}
