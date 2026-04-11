import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAppStore } from '../stores/app';
import { useVideoStore } from '../stores/video';
import { detectObjects } from '../ml/objectDetector';
import { captureFrameFromVideo, canvasToBlob } from '../lib/canvas';

const useCaptureFrame = () => {
    const setCapturedFrameUrl = useAppStore((s) => s.setCapturedFrameUrl);
    const setPredictionUrl = useAppStore((s) => s.setPredictionUrl);
    const sourceRef = useVideoStore((s) => s.sourceRef);
    const [captureActivated, setCaptureActivated] = useState(false);

    const detection = useMutation({
        mutationFn: detectObjects,
        onSuccess: (url) => setPredictionUrl(url),
    });

    const handleCapture = async () => {
        const video = sourceRef.current;
        if (!video) return;

        setCaptureActivated(true);
        setPredictionUrl(null);

        const canvas = captureFrameFromVideo(video);
        setCapturedFrameUrl(canvas.toDataURL('image/jpeg', 0.95));

        const blob = await canvasToBlob(canvas);
        detection.mutate(blob);
    };

    return {
        handleCapture,
        captureActivated,
        isDetecting: detection.isPending,
    };
};

export default useCaptureFrame;
