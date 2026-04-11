import { useAppStore } from '../../stores/app';
import PredictionContainer from '../PredictionContainer/PredictionContainer';
import './ImageProcessingContainer.css';

const ImageProcessingContainer = () => {
    const capturedFrameUrl = useAppStore((s) => s.capturedFrameUrl);

    return (
        <div className="image-process-output">
            <div className='captured-frame-container'>
                <div className="section-label">Captured Frame</div>
                <div className='captured-frame-root'>
                    {capturedFrameUrl ? (
                        <img src={capturedFrameUrl} style={{ width: '100%' }} alt="Captured frame" />
                    ) : (
                        <div className='image-placeholder'>
                            <span className='image-placeholder--icon'>🖼</span>
                            <span className='image-placeholder--text'>Press "Capture Frame" to begin</span>
                        </div>
                    )}
                </div>
            </div>
            <PredictionContainer/>
        </div>
    )
};

export default ImageProcessingContainer;
