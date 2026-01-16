import { useState } from 'react';
import { detectRoundObjects } from '../../ml/objectDetector';

const ImageProcessingContainer = () => {

    const [result, setResult] = useState({});

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
        const container = document.querySelector('.captured-frame-container');
        container.innerHTML = '';
        container.appendChild(frameImage);
    }

    const handleDetect = async () => {

        let imgRef = document.querySelector('.captured-frame-container img');

        try {
          const detection = await detectRoundObjects(imgRef);
          setResult(detection);
        } catch (error) {
          console.error('Detection error:', error);
        }
      };

    return (
        <div>
            <div>ImageProcessingContainer</div>
            <div>Captured Image Here</div>
            <div className='captured-frame-container'></div>
            <div>`is circle detected? - {result?.hasRoundObject?.toString()}`</div>
            {result?.probabilities?.map((prob, index) => (
                <div key={index}>
                    <p><strong>Object:</strong> {prob.object}</p>
                    <p><strong>Confidence:</strong> {prob.confidence}</p>
                </div>
            ))}
            <button onClick={captureFrame}>Capture</button>
            <button onClick={handleDetect}>
                Detect
            </button>
        </div>
    )
};

export default ImageProcessingContainer;