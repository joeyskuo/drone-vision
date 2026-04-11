import { useState } from 'react';
import { useAppStore } from '../stores/app';
import { useVideoStore } from '../stores/video';
import { detectObjects } from '../ml/objectDetector';

const useCaptureFrame = () => {
    const { setDetecting, setCapturedFrameUrl, setPredictionUrl } = useAppStore();
    const sourceRef = useVideoStore((s) => s.sourceRef);
    const [captureActivated, setCaptureActivated] = useState(false);

    const handleCapture = async () => {
        setCaptureActivated(true);
        const video = sourceRef.current;
        if (!video) return;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frameDataUrl = canvas.toDataURL('image/jpeg', 0.95);
        setCapturedFrameUrl(frameDataUrl);
        setPredictionUrl(null);
        setDetecting(true);

        canvas.toBlob(async (blob) => {
            if (!blob) return;
            try {
                const resultUrl = await detectObjects(blob);
                setPredictionUrl(resultUrl);
            } finally {
                setDetecting(false);
            }
        }, 'image/jpeg', 0.95);
    };

    return { handleCapture, captureActivated };
};

export default useCaptureFrame;
