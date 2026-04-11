import { create } from 'zustand';

interface AppStore {
  isDetecting: boolean;
  capturedFrameUrl: string | null;
  predictionUrl: string | null;
  setDetecting: (detecting: boolean) => void;
  setCapturedFrameUrl: (url: string | null) => void;
  setPredictionUrl: (url: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isDetecting: false,
  capturedFrameUrl: null,
  predictionUrl: null,
  setDetecting: (detecting) => set({ isDetecting: detecting }),
  setCapturedFrameUrl: (url) => set({ capturedFrameUrl: url }),
  setPredictionUrl: (url) => set({ predictionUrl: url }),
}));
