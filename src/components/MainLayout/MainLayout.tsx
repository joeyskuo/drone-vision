import { useQuery } from '@tanstack/react-query';
import useCaptureFrame from '../../hooks/useCaptureFrame';
import { warmUp } from '../../ml/objectDetector';
import Hero from "../Hero/Hero";
import DualVideoPlayer from "../DualVideoPlayer/DualVideoPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import AboutSection from "../AboutSection/AboutSection";

const MainLayout = () => {
    useQuery({ queryKey: ['warmup'], queryFn: warmUp, staleTime: Infinity, retry: 1 });
    const { handleCapture, captureActivated, isDetecting } = useCaptureFrame();

    return (
        <div className="flex flex-col gap-8 p-12">
            <Hero />

            <DualVideoPlayer />

            <div className="capture-connector relative flex h-[90px] items-center">
                <button
                    className="capture-btn bg-accent border-[1.5px] border-black/25 rounded-[14px] text-white font-sans text-base font-bold tracking-wide py-3.5 px-9 min-w-[190px] cursor-pointer whitespace-nowrap transition-colors hover:bg-accent-hover active:bg-accent-active"
                    data-state={isDetecting ? 'detecting' : captureActivated ? 'activated' : 'idle'}
                    onClick={handleCapture}
                    disabled={isDetecting}
                >
                    {isDetecting ? 'Detecting...' : 'Capture Frame'}
                </button>
            </div>

            <ImageProcessingContainer />

            <AboutSection />

            <section>
                <div className="font-sans text-base font-bold tracking-widest uppercase text-accent mb-4">Architecture</div>
                <img src="/architecture.png" className="w-full bg-surface-alt rounded-[20px] border border-border border-b-2 border-b-accent-alt shadow-card" alt="System architecture" />
            </section>
        </div>
    )
};

export default MainLayout;
