import { create } from 'zustand';

interface AppStore {
  capturedFrameUrl: string | null;
  predictionUrl: string | null;
  setCapturedFrameUrl: (url: string | null) => void;
  setPredictionUrl: (url: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  capturedFrameUrl: null,
  predictionUrl: null,
  setCapturedFrameUrl: (url) => set({ capturedFrameUrl: url }),
  setPredictionUrl: (url) => set({ predictionUrl: url }),
}));
