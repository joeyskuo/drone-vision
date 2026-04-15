import { useRef, type ReactNode } from 'react';
import { useDualVideoSync } from '@/hooks/useDualVideoSync';
import { formatTime } from '@/lib/format';
import { useVideoStore } from '@/stores/video';

const VIDEO_SOURCES = {
  camera: '/videos/cam_soccer.mp4',
  world: '/videos/world_soccer.mp4',
} as const;

function DualVideoPlayer(): ReactNode {
  const sourceRef = useVideoStore((s) => s.sourceRef);
  const worldRef = useRef<HTMLVideoElement>(null);

  const {
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
  } = useDualVideoSync(sourceRef, worldRef);

  return (
    <section aria-label="Drone camera and world view playback" className="relative z-1">
      <figure className="surface-card m-0 border border-border border-t-2 border-t-accent-alt rounded-2xl overflow-hidden pt-3.5 shadow-card">
        <div className="grid grid-cols-2 pb-2">
          <div className="font-sans text-base font-bold tracking-widest uppercase text-accent pl-4">
            Drone Camera
          </div>
          <div className="font-sans text-base font-bold tracking-widest uppercase text-accent pl-4">
            World View
          </div>
        </div>
        <div className="grid grid-cols-2 gap-0.5 bg-video-gap">
          <div className="bg-surface">
            <video
              ref={sourceRef}
              className="block w-full"
              preload="metadata"
              playsInline
              muted
              aria-label="Drone onboard camera"
              onTimeUpdate={onTimeUpdate}
              onPlay={onPlay}
              onPause={onPause}
              onSeeked={onSeeked}
              onLoadedMetadata={onLoadedMetadata}
            >
              <source src={VIDEO_SOURCES.camera} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="bg-surface">
            <video
              ref={worldRef}
              className="block w-full"
              preload="metadata"
              playsInline
              muted
              aria-label="World view of the simulation"
            >
              <source src={VIDEO_SOURCES.world} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="flex items-center gap-3 py-2.5 px-5 border-t border-border">
          <button
            type="button"
            aria-label={playing ? 'Pause videos' : 'Play videos'}
            aria-pressed={playing}
            className="bg-transparent border border-border rounded-lg text-accent text-base w-8 h-8 flex items-center justify-center cursor-pointer shrink-0 transition-colors hover:bg-accent hover:border-accent hover:text-white"
            onClick={togglePlay}
          >
            {playing ? '\u23F8' : '\u25B6'}
          </button>
          <input
            className="flex-1 cursor-pointer h-[30px]"
            type="range"
            aria-label="Playback position"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            min={0}
            max={duration || 0}
            step={0.05}
            value={currentTime}
            onChange={onSeek}
          />
          <span
            className="font-sans text-[0.78rem] font-medium text-text-muted whitespace-nowrap shrink-0"
            aria-live="off"
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </figure>
    </section>
  );
}

export default DualVideoPlayer;
