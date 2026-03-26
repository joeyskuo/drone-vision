import { createContext, useContext, useRef } from 'react';

interface VideoSyncContextValue {
  sourceRef: React.RefObject<HTMLVideoElement | null>;
}

const VideoSyncContext = createContext<VideoSyncContextValue>({} as VideoSyncContextValue);

export function VideoSyncProvider({ children }: { children: React.ReactNode }) {
  const sourceRef = useRef<HTMLVideoElement>(null);

  return (
    <VideoSyncContext.Provider value={{ sourceRef }}>
      {children}
    </VideoSyncContext.Provider>
  );
}

export const useVideoSync = () => useContext(VideoSyncContext);
