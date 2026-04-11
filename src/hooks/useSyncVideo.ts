import { useCallback, useEffect, useRef, useState } from "react";
import { useVideoStore } from "../stores/video";

const useSyncVideo = () => {
    const sourceRef = useVideoStore((s) => s.sourceRef);
    const worldRef = useRef<HTMLVideoElement>(null);

    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

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

    const togglePlay = useCallback(() => {
        const video = sourceRef.current;
        if (!video) return;
        video.paused ? video.play() : video.pause();
    }, [sourceRef]);

    const onSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const video = sourceRef.current;
        if (!video) return;
        video.currentTime = Number(e.target.value);
    }, [sourceRef]);

    return { sourceRef, worldRef, playing, currentTime, duration, togglePlay, onSeek };
};

export default useSyncVideo;
