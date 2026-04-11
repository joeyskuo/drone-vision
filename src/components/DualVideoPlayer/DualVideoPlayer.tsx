import useSyncVideo from "../../hooks/useSyncVideo";

const formatTime = (t: number) => {
    if (!isFinite(t) || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

const DualVideoPlayer = () => {
    const { sourceRef, worldRef, playing, currentTime, duration, togglePlay, onSeek } = useSyncVideo();

    return (
        <figure data-slot="video-player" className="m-0 bg-[linear-gradient(160deg,var(--color-surface)_0%,var(--color-surface-alt)_100%)] border border-border border-t-2 border-t-accent-alt rounded-2xl overflow-hidden pt-3.5 shadow-card">
            <div data-slot="video-headers" className="grid grid-cols-2 pb-2">
                <div data-slot="video-label" className="font-sans text-base font-bold tracking-widest uppercase text-accent pl-4">Drone Camera</div>
                <div data-slot="video-label" className="font-sans text-base font-bold tracking-widest uppercase text-accent pl-4">World View</div>
            </div>
            <div data-slot="video-pair" className="grid grid-cols-2 gap-0.5 bg-video-gap">
                <div data-slot="video-slot" className="bg-surface">
                    <video ref={sourceRef} className="block w-full">
                        <source src="/videos/cam_soccer.mp4" type="video/mp4" />
                    </video>
                </div>
                <div data-slot="video-slot" className="bg-surface">
                    <video ref={worldRef} className="block w-full">
                        <source src="/videos/world_soccer.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
            <div data-slot="controls" className="flex items-center gap-3 py-2.5 px-5 border-t border-border">
                <button
                    data-slot="play-btn"
                    className="bg-transparent border border-border rounded-lg text-accent text-base w-8 h-8 flex items-center justify-center cursor-pointer shrink-0 transition-colors hover:bg-accent hover:border-accent hover:text-white"
                    onClick={togglePlay}
                >
                    {playing ? '⏸' : '▶'}
                </button>
                <input
                    data-slot="seek-bar"
                    className="flex-1 cursor-pointer h-[30px]"
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.05}
                    value={currentTime}
                    onChange={onSeek}
                />
                <span data-slot="time" className="font-sans text-[0.78rem] font-medium text-text-muted whitespace-nowrap shrink-0">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>
        </figure>
    );
};

export default DualVideoPlayer;
