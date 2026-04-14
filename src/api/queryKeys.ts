export const queryKeys = {
  detection: {
    all: ['detection'] as const,
    warmup: () => [...queryKeys.detection.all, 'warmup'] as const,
  },
} as const;

export const mutationKeys = {
  detection: {
    detect: ['detection', 'detect'] as const,
  },
} as const;

export type QueryKey = typeof queryKeys;
export type MutationKey = typeof mutationKeys;
