import { useAppStore } from '../../stores/app';

const PredictionContainer = () => {
    const predictionUrl = useAppStore((s) => s.predictionUrl);

    return (
        <div className="prediction-container">
            <div className="section-label">Predictions</div>
            <div className="prediction-container-results">
                {predictionUrl ? (
                    <img src={predictionUrl} style={{ width: '100%' }} alt="Detection results" />
                ) : (
                    <>
                        <span className='prediction-placeholder--icon'>⬚</span>
                        <span className='prediction-placeholder--text'>Confidence scores &mdash; to be implemented</span>
                    </>
                )}
            </div>
        </div>
    )
}

export default PredictionContainer;
