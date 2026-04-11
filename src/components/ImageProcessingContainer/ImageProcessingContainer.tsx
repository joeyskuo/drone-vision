import { useAppStore } from '../../stores/app';
import PredictionContainer from '../PredictionContainer/PredictionContainer';

const ImageProcessingContainer = () => {
    const capturedFrameUrl = useAppStore((s) => s.capturedFrameUrl);

    return (
        <section className="surface-card relative z-1 flex flex-col min-h-[250px] border border-border border-t-2 border-t-accent-alt rounded-[20px] overflow-hidden shadow-card">
        <div className="grid grid-cols-2 gap-12 pt-5 px-12 pb-2.5 border-t border-border min-h-[400px]">
            <div>
                <div className="font-sans text-base font-bold tracking-widest uppercase text-accent mb-4">Captured Frame</div>
                <div className="w-full h-[295px]">
                    {capturedFrameUrl ? (
                        <img src={capturedFrameUrl} className="w-full" alt="Captured frame" />
                    ) : (
                        <div className="h-full bg-surface-alt rounded-[10px] border-2 border-dashed border-border flex items-center justify-center text-text-muted text-base tracking-[0.05em] flex-col gap-2">
                            <span className="text-[2.5rem]">🖼</span>
                            <span>Press "Capture Frame" to begin</span>
                        </div>
                    )}
                </div>
            </div>
            <PredictionContainer />
        </div>
        </section>
    )
};

export default ImageProcessingContainer;
