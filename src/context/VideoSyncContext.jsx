import { createContext, useContext, useRef } from 'react';

const VideoSyncContext = createContext();

export function VideoSyncProvider({ children }) {
  const sourceRef = useRef(null);

  return (
    <VideoSyncContext.Provider value={{ sourceRef }}>
      {children}
    </VideoSyncContext.Provider>
  );
}

export const useVideoSync = () => useContext(VideoSyncContext);