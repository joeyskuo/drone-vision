import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { isDev } from '@/config/env';

interface AppState {
  readonly capturedFrameUrl: string | null;
  readonly predictionUrl: string | null;
}

interface AppActions {
  setCapturedFrameUrl: (url: string | null) => void;
  setPredictionUrl: (url: string | null) => void;
  resetFrames: () => void;
}

export type AppStore = AppState & AppActions;

const initialState: AppState = {
  capturedFrameUrl: null,
  predictionUrl: null,
};

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      ...initialState,
      setCapturedFrameUrl: (url) => set({ capturedFrameUrl: url }, false, 'setCapturedFrameUrl'),
      setPredictionUrl: (url) => {
        const previous = get().predictionUrl;
        if (previous && previous !== url) URL.revokeObjectURL(previous);
        set({ predictionUrl: url }, false, 'setPredictionUrl');
      },
      resetFrames: () => {
        const { predictionUrl } = get();
        if (predictionUrl) URL.revokeObjectURL(predictionUrl);
        set(initialState, false, 'resetFrames');
      },
    }),
    { name: 'app-store', enabled: isDev },
  ),
);

export const selectCapturedFrameUrl = (s: AppStore): string | null => s.capturedFrameUrl;
export const selectPredictionUrl = (s: AppStore): string | null => s.predictionUrl;

export const useFrameActions = () =>
  useAppStore(
    useShallow((s) => ({
      setCapturedFrameUrl: s.setCapturedFrameUrl,
      setPredictionUrl: s.setPredictionUrl,
      resetFrames: s.resetFrames,
    })),
  );
