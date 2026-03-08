import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const PredictionContainer = () => {

    const { appState } = useContext(AppContext);
    
    return (
        <div className="prediction-container">
            <div class="section-label">Predictions</div>
                <div className="prediction-container-results">
                    <span className='prediction-placeholder--icon'>⬚</span>
                    <span className='prediction-placeholder--text'>No predictions yet</span>
                </div>
        </div>
    )
}

export default PredictionContainer;