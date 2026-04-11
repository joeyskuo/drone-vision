import { useQuery } from '@tanstack/react-query';
import { warmUp } from '../../ml/objectDetector';
import Hero from "../Hero/Hero";
import DualVideoPlayer from "../DualVideoPlayer/DualVideoPlayer";
import FrameCaptureButton from "../FrameCaptureButton/FrameCaptureButton";
import ImageProcessingContainer from "../ImageProcessingContainer/ImageProcessingContainer";
import AboutSection from "../AboutSection/AboutSection";

const MainLayout = () => {
    useQuery({ queryKey: ['warmup'], queryFn: warmUp, staleTime: Infinity, retry: 1 });

    return (
        <div className="flex flex-col gap-8 p-12">
            <Hero />
            <DualVideoPlayer />
            <FrameCaptureButton />
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
