import { useEffect, useRef } from "react";
import { useVideoSync } from "../../context/VideoSyncContext";

const WorldViewPlayer = () => {

    const { sourceRef } = useVideoSync();
    const videoRef = useRef(null);

    useEffect(() => {
        const source = sourceRef.current;
        const target = videoRef.current;

        const syncTime = () => {
            const timeDifference = Math.abs(source.currentTime - target.currentTime);
            if (timeDifference > 0.1)
                target.currentTime = source.currentTime;
        };

        const syncPlay = () => target.play();
        const syncPause = () => target.pause();
        const syncSeeked = () => target.currentTime = source.currentTime;
      
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

    return (
        <figure className="world-view-player">
            <figcaption>World View</figcaption>
            <video ref={videoRef} width="100%">
                <source src="/videos/world_soccer.mp4" type="video/mp4" />
            </video>
        </figure>
    )
};

export default WorldViewPlayer;