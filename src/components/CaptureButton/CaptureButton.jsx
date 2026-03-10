import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useVideoSync } from '../../context/VideoSyncContext';
import { detectObjects } from '../../ml/objectDetector';
import './CaptureButton.scss';

const CaptureButton = () => {
    const { appState, setAppState } = useContext(AppContext);
    const { sourceRef } = useVideoSync();
    const [activated, setActivated] = useState(false);

    const handleCapture = async () => {
        setActivated(true);
        const video = sourceRef.current;

        const frameCanvas = document.createElement('canvas');
        frameCanvas.width = video.videoWidth;
        frameCanvas.height = video.videoHeight;
        const ctx = frameCanvas.getContext('2d');
        ctx.drawImage(video, 0, 0, frameCanvas.width, frameCanvas.height);

        const container = document.querySelector('.captured-frame-root');
        const rawImg = document.createElement('img');
        rawImg.src = frameCanvas.toDataURL('image/jpeg', 0.95);
        rawImg.style.width = '100%';
        container.innerHTML = '';
        container.appendChild(rawImg);

        setAppState({ isLoading: true });

        frameCanvas.toBlob(async (blob) => {
            try {
                const resultUrl = await detectObjects(blob);
                const resultImg = document.createElement('img');
                resultImg.src = resultUrl;
                resultImg.style.width = '100%';
                container.innerHTML = '';
                container.appendChild(resultImg);
            } catch (error) {
                throw error;
            } finally {
                setAppState({ isLoading: false });
            }
        }, 'image/jpeg', 0.95);
    };

    return (
        <button className={`capture-btn${activated ? ' activated' : ''}`} onClick={handleCapture} disabled={appState.isLoading}>
            {appState.isLoading ? 'Detecting...' : 'Capture Frame'}
        </button>
    );
};

export default CaptureButton;
