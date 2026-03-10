import { useEffect, useContext } from 'react';
import { warmUp, detectObjects } from '../../ml/objectDetector';
import { AppContext } from '../../context/AppContext';
import { useVideoSync } from '../../context/VideoSyncContext';
import PredictionContainer from '../PredictionContainer/PredictionContainer';
import './ImageProcessingContainer.css';

const ImageProcessingContainer = () => {

    const { appState, setAppState } = useContext(AppContext);
    const { sourceRef } = useVideoSync();

    const handleCapture = async () => {
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

    useEffect(() => {
        warmUp();
    }, []);

    return (
        <>
            <div className='image-process-buttons'>
                <button className="image-process-buttons--capture" onClick={handleCapture} disabled={appState.isLoading}>
                    {appState.isLoading ? 'Detecting...' : 'Capture Frame'}
                </button>
            </div>
            <div className="image-process-output">
                <div className='captured-frame-container'>
                    <div className="section-label">Captured Frame</div>
                    <div className='captured-frame-root'>
                        <div className='image-placeholder'>
                            <span className='image-placeholder--icon'>🖼</span>
                            <span className='image-placeholder--text'>No frame captured yet</span>
                        </div>
                    </div>
                </div>
                <PredictionContainer/>
            </div>
        </>
    )
};

export default ImageProcessingContainer;