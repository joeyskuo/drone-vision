import { useAppStore } from '../../stores/app';
import SectionLabel from '../SectionLabel/SectionLabel';

const PredictionContainer = () => {
    const predictionUrl = useAppStore((s) => s.predictionUrl);

    return (
        <div className="flex flex-col h-full w-full">
            <SectionLabel>Predictions</SectionLabel>
            <div className="h-[295px] bg-surface-alt rounded-[10px] border border-border overflow-hidden text-text-muted text-base tracking-[0.05em] flex items-center justify-center flex-col gap-2.5">
                {predictionUrl ? (
                    <img src={predictionUrl} className="w-full" alt="Detection results" />
                ) : (
                    <>
                        <span className="text-[2.5rem]">⬚</span>
                        <span>Confidence scores &mdash; to be implemented</span>
                    </>
                )}
            </div>
        </div>
    )
}

export default PredictionContainer;
