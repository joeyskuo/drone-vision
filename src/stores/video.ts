import { create } from 'zustand';

interface VideoStore {
  sourceRef: React.RefObject<HTMLVideoElement | null>;
}

export const useVideoStore = create<VideoStore>(() => ({
  sourceRef: { current: null },
}));
