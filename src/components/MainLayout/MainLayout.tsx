import useCaptureFrame from '../../hooks/useCaptureFrame';
import DualVideoPlayer from "../DualVideoPlayer/DualVideoPlayer";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import AboutSection from "../AboutSection/AboutSection";

const MainLayout = () => {
    const { handleCapture, captureActivated, isDetecting } = useCaptureFrame();

    return (
        <div data-slot="layout" className="flex flex-col gap-8 p-12">
            <section data-slot="title" className="flex flex-col items-center justify-center">
                <h1 className="text-[3.2em] leading-tight">Drone Vision</h1>
                <h2>Simulation and Object Detection</h2>
                <div>PyTorch &middot; ROS2 &middot; Gazebo</div>
            </section>

            <section data-slot="video" className="relative z-1">
                <DualVideoPlayer />
            </section>

            <div data-slot="connector" className="relative flex h-[90px] items-center before:absolute before:left-1/4 before:-translate-x-1/2 before:-top-[35px] before:-bottom-[35px] before:border-l-[5px] before:border-dashed before:border-accent before:opacity-60">
                <button
                    data-slot="capture-btn"
                    data-state={isDetecting ? 'detecting' : captureActivated ? 'activated' : 'idle'}
                    className="absolute left-1/4 -translate-x-1/2 z-2 relative overflow-hidden bg-accent border-[1.5px] border-black/25 rounded-[14px] text-white font-sans text-base font-bold tracking-wide py-3.5 px-9 min-w-[190px] cursor-pointer whitespace-nowrap transition-colors after:absolute after:inset-y-0 after:left-0 after:w-1/5 after:bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.2)_35%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.2)_55%,transparent_100%)] after:pointer-events-none after:animate-shine data-[state=activated]:after:hidden data-[state=detecting]:after:hidden hover:bg-accent-hover active:bg-accent-active data-[state=detecting]:bg-accent-muted data-[state=detecting]:text-white/75 data-[state=detecting]:border-transparent data-[state=detecting]:cursor-not-allowed"
                    onClick={handleCapture}
                    disabled={isDetecting}
                >
                    {isDetecting ? 'Detecting...' : 'Capture Frame'}
                </button>
            </div>

            <section data-slot="processing" className="relative z-1 flex flex-col min-h-[250px] bg-[linear-gradient(160deg,var(--color-surface)_0%,var(--color-surface-alt)_100%)] border border-border border-t-2 border-t-accent-alt rounded-[20px] overflow-hidden shadow-card">
                <ImageProcessingContainer />
            </section>

            <AboutSection />

            <section data-slot="architecture">
                <div data-slot="section-label">Architecture</div>
                <img src="/architecture.png" className="w-full bg-surface-alt rounded-[20px] border border-border border-b-2 border-b-accent-alt shadow-card" alt="System architecture" />
            </section>
        </div>
    )
};

export default MainLayout;
