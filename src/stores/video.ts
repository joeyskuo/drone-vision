import type { RefObject } from 'react';
import { create } from 'zustand';

interface VideoStore {
  readonly sourceRef: RefObject<HTMLVideoElement | null>;
}

export const useVideoStore = create<VideoStore>(() => ({
  sourceRef: { current: null },
}));

export const selectSourceRef = (s: VideoStore): RefObject<HTMLVideoElement | null> => s.sourceRef;
