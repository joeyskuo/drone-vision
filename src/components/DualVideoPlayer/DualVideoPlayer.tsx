import useSyncVideo from "../../hooks/useSyncVideo";
import './DualVideoPlayer.scss';

const formatTime = (t: number) => {
    if (!isFinite(t) || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

const DualVideoPlayer = () => {
    const { sourceRef, worldRef, playing, currentTime, duration, togglePlay, onSeek } = useSyncVideo();

    return (
        <figure className="dual-video-player">
            <div className="video-headers">
                <div className="video-label">Drone Camera</div>
                <div className="video-label">World View</div>
            </div>
            <div className="video-pair">
                <div className="video-slot">
                    <video ref={sourceRef} width="100%">
                        <source src="/videos/cam_soccer.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="video-slot">
                    <video ref={worldRef} width="100%">
                        <source src="/videos/world_soccer.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className="video-controls">
                <button className="play-btn" onClick={togglePlay}>
                    {playing ? '⏸' : '▶'}
                </button>
                <input
                    className="seek-bar"
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.05}
                    value={currentTime}
                    onChange={onSeek}
                />
                <span className="time-display">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>
        </figure>
    );
};

export default DualVideoPlayer;
