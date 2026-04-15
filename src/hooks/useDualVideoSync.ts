import { useCallback, useState, type RefObject, type SyntheticEvent } from 'react';

const SYNC_THRESHOLD_SECONDS = 0.1;

export interface DualVideoHandlers {
  readonly playing: boolean;
  readonly currentTime: number;
  readonly duration: number;
  readonly togglePlay: () => void;
  readonly onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onTimeUpdate: (event: SyntheticEvent<HTMLVideoElement>) => void;
  readonly onPlay: () => void;
  readonly onPause: () => void;
  readonly onSeeked: (event: SyntheticEvent<HTMLVideoElement>) => void;
  readonly onLoadedMetadata: (event: SyntheticEvent<HTMLVideoElement>) => void;
}

export function useDualVideoSync(
  sourceRef: RefObject<HTMLVideoElement | null>,
  mirrorRef: RefObject<HTMLVideoElement | null>,
): DualVideoHandlers {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = useCallback(() => {
    const video = sourceRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }, [sourceRef]);

  const onSeek = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const video = sourceRef.current;
      if (!video) return;
      video.currentTime = Number(event.target.value);
    },
    [sourceRef],
  );

  const onTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const t = event.currentTarget.currentTime;
      setCurrentTime(t);
      const mirror = mirrorRef.current;
      if (mirror && Math.abs(t - mirror.currentTime) > SYNC_THRESHOLD_SECONDS) {
        mirror.currentTime = t;
      }
    },
    [mirrorRef],
  );

  const onPlay = useCallback(() => {
    setPlaying(true);
    void mirrorRef.current?.play();
  }, [mirrorRef]);

  const onPause = useCallback(() => {
    setPlaying(false);
    mirrorRef.current?.pause();
  }, [mirrorRef]);

  const onSeeked = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const mirror = mirrorRef.current;
      if (mirror) mirror.currentTime = event.currentTarget.currentTime;
    },
    [mirrorRef],
  );

  const onLoadedMetadata = useCallback((event: SyntheticEvent<HTMLVideoElement>) => {
    setDuration(event.currentTarget.duration);
  }, []);

  return {
    playing,
    currentTime,
    duration,
    togglePlay,
    onSeek,
    onTimeUpdate,
    onPlay,
    onPause,
    onSeeked,
    onLoadedMetadata,
  };
}
