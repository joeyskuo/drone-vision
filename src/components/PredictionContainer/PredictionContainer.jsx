import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const PredictionContainer = () => {

    const { appState } = useContext(AppContext);
    
    return (
        <div className="prediction-container">
            <h3>Predictions</h3>
            <div className="prediction-container-results">
            </div>
        </div>
    )
}

export default PredictionContainer;