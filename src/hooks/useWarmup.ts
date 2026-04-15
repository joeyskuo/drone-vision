import { useQuery } from '@tanstack/react-query';
import { warmUp } from '@/api/detection';
import { queryKeys } from '@/api/queryKeys';

export function useWarmup() {
  return useQuery({
    queryKey: queryKeys.detection.warmup(),
    queryFn: ({ signal }) => warmUp({ signal }).then(() => true as const),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
