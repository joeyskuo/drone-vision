import { useState, useEffect, useContext } from 'react';
import { warmUp, detectObjects } from '../../ml/objectDetector';
import { AppContext } from '../../context/AppContext';
import PredictionContainer from '../PredictionContainer/PredictionContainer';
import './ImageProcessingContainer.css';

const ImageProcessingContainer = () => {

    const { setAppState } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);
    
    function captureFrame() {
        const CameraViewVideo = document.querySelector('.camera-view-player video');

        // create canvas matching video size
        const frameCanvas = document.createElement('canvas');
        frameCanvas.width = CameraViewVideo.videoWidth;
        frameCanvas.height = CameraViewVideo.videoHeight;
        
        // capture frame
        const ctx = frameCanvas.getContext('2d');
        ctx.drawImage(CameraViewVideo, 0, 0, frameCanvas.width, frameCanvas.height);
        
        // Convert to image and display
        const frameImage = document.createElement('img');
        frameImage.src = frameCanvas.toDataURL('image/jpeg', 0.95);
        frameImage.style.width = '100%';
        
        // Clear container and add image
        const container = document.querySelector('.captured-frame-root');
        container.innerHTML = '';
        container.appendChild(frameImage);
    }

    const handleDetect = async () => {

        let imgRef = document.querySelector('.captured-frame-root img');
        setIsLoading(true);

        try {
            await detectObjects(imgRef);
        } catch (error) {
            console.error('Detection error:', error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        warmUp();
    }, []);

    return (
        <>
            <div className='image-process-buttons'>
                <button onClick={captureFrame}>
                    Capture
                </button>
                <button onClick={handleDetect}>
                    Detect
                </button>
            </div>
            <div className="image-process-output">
                <div className='captured-frame-container'>
                    <h3>Captured Frame</h3>
                    <div className='captured-frame-root'>
                        <div className='image-placeholder'></div>
                    </div>
                </div>
                <PredictionContainer/>
            </div>
        </>
    )
};

export default ImageProcessingContainer;