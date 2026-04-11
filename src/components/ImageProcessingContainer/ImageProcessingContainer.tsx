import { useAppStore } from '../../stores/app';
import PredictionContainer from '../PredictionContainer/PredictionContainer';

const ImageProcessingContainer = () => {
    const capturedFrameUrl = useAppStore((s) => s.capturedFrameUrl);

    return (
        <div data-slot="output" className="grid grid-cols-2 gap-12 pt-5 px-12 pb-2.5 border-t border-border min-h-[400px]">
            <div data-slot="captured-frame">
                <div data-slot="section-label">Captured Frame</div>
                <div className="w-full h-[295px]">
                    {capturedFrameUrl ? (
                        <img src={capturedFrameUrl} className="w-full" alt="Captured frame" />
                    ) : (
                        <div data-slot="placeholder" className="h-full bg-surface-alt rounded-[10px] border-2 border-dashed border-border flex items-center justify-center text-text-muted text-base tracking-[0.05em] flex-col gap-2">
                            <span className="text-[2.5rem]">🖼</span>
                            <span>Press "Capture Frame" to begin</span>
                        </div>
                    )}
                </div>
            </div>
            <PredictionContainer />
        </div>
    )
};

export default ImageProcessingContainer;
