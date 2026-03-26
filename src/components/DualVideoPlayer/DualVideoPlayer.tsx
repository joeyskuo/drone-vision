import { useEffect, useRef, useState } from "react";
import { useVideoSync } from "../../context/VideoSyncContext";
import './DualVideoPlayer.scss';

const formatTime = (t: number) => {
    if (!isFinite(t) || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

const DualVideoPlayer = () => {
    const { sourceRef } = useVideoSync();
    const worldRef = useRef<HTMLVideoElement>(null);

    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Sync world video to camera video
    useEffect(() => {
        const source = sourceRef.current;
        const target = worldRef.current;
        if (!source || !target) return;

        const syncTime = () => {
            if (Math.abs(source.currentTime - target.currentTime) > 0.1)
                target.currentTime = source.currentTime;
        };
        const syncPlay = () => target.play();
        const syncPause = () => target.pause();
        const syncSeeked = () => { target.currentTime = source.currentTime; };

        source.addEventListener('timeupdate', syncTime);
        source.addEventListener('play', syncPlay);
        source.addEventListener('pause', syncPause);
        source.addEventListener('seeked', syncSeeked);

        return () => {
            source.removeEventListener('timeupdate', syncTime);
            source.removeEventListener('play', syncPlay);
            source.removeEventListener('pause', syncPause);
            source.removeEventListener('seeked', syncSeeked);
        };
    }, [sourceRef]);

    // Drive controls UI from source video events
    useEffect(() => {
        const video = sourceRef.current;
        if (!video) return;

        const onTimeUpdate = () => setCurrentTime(video.currentTime);
        const onLoaded = () => setDuration(video.duration);
        const onPlay = () => setPlaying(true);
        const onPause = () => setPlaying(false);

        video.addEventListener('timeupdate', onTimeUpdate);
        video.addEventListener('loadedmetadata', onLoaded);
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);

        return () => {
            video.removeEventListener('timeupdate', onTimeUpdate);
            video.removeEventListener('loadedmetadata', onLoaded);
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
        };
    }, [sourceRef]);

    const togglePlay = () => {
        const video = sourceRef.current;
        if (!video) return;
        video.paused ? video.play() : video.pause();
    };

    const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = sourceRef.current;
        if (!video) return;
        video.currentTime = Number(e.target.value);
    };

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
