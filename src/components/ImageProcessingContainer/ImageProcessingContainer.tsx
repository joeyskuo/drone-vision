import { useEffect } from 'react';
import { warmUp } from '../../ml/objectDetector';
import PredictionContainer from '../PredictionContainer/PredictionContainer';
import './ImageProcessingContainer.css';

const ImageProcessingContainer = () => {

    useEffect(() => {
        warmUp();
    }, []);

    return (
        <div className="image-process-output">
            <div className='captured-frame-container'>
                <div className="section-label">Captured Frame</div>
                <div className='captured-frame-root'>
                    <div className='image-placeholder'>
                        <span className='image-placeholder--icon'>🖼</span>
                        <span className='image-placeholder--text'>Press "Capture Frame" to begin</span>
                    </div>
                </div>
            </div>
            <PredictionContainer/>
        </div>
    )
};

export default ImageProcessingContainer;
