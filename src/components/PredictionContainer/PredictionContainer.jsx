import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const PredictionContainer = () => {

    const { appState } = useContext(AppContext);
    
    console.log(appState);

    return (
        <div className="prediction-container">
            <h3>Predictions</h3>
            <div className="prediction-container-results">
                {appState?.probabilities?.map((prob, index) => (
                    <div key={index}>
                        <p><strong>Object:</strong> {prob.object}</p>
                        <p><strong>Confidence:</strong> {prob.confidence}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PredictionContainer;