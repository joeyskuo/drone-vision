import { useQuery } from '@tanstack/react-query';
import useCaptureFrame from '../../hooks/useCaptureFrame';
import { warmUp } from '../../ml/objectDetector';
import DualVideoPlayer from "../DualVideoPlayer/DualVideoPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import AboutSection from "../AboutSection/AboutSection";
import SectionLabel from "../SectionLabel/SectionLabel";

const MainLayout = () => {
    useQuery({ queryKey: ['warmup'], queryFn: warmUp, staleTime: Infinity, retry: 1 });
    const { handleCapture, captureActivated, isDetecting } = useCaptureFrame();

    return (
        <div className="flex flex-col gap-8 p-12">
            <section className="flex flex-col items-center justify-center">
                <h1 className="text-[3.2em] leading-tight">Drone Vision</h1>
                <h2>Simulation and Object Detection</h2>
                <div>PyTorch &middot; ROS2 &middot; Gazebo</div>
            </section>

            <section className="relative z-1">
                <DualVideoPlayer />
            </section>

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

            <section className="surface-card relative z-1 flex flex-col min-h-[250px] border border-border border-t-2 border-t-accent-alt rounded-[20px] overflow-hidden shadow-card">
                <ImageProcessingContainer />
            </section>

            <AboutSection />

            <section>
                <SectionLabel>Architecture</SectionLabel>
                <img src="/architecture.png" className="w-full bg-surface-alt rounded-[20px] border border-border border-b-2 border-b-accent-alt shadow-card" alt="System architecture" />
            </section>
        </div>
    )
};

export default MainLayout;
