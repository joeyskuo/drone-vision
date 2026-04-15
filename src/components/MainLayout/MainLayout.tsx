import type { ReactNode } from 'react';
import AboutSection from '@/components/AboutSection/AboutSection';
import DualVideoPlayer from '@/components/DualVideoPlayer/DualVideoPlayer';
import FrameCaptureButton from '@/components/FrameCaptureButton/FrameCaptureButton';
import Hero from '@/components/Hero/Hero';
import ImageProcessingContainer from '@/components/ImageProcessingContainer/ImageProcessingContainer';
import { useWarmup } from '@/hooks/useWarmup';

function MainLayout(): ReactNode {
  useWarmup();

  return (
    <main className="flex flex-col gap-8 p-12">
      <Hero />
      <DualVideoPlayer />
      <FrameCaptureButton />
      <ImageProcessingContainer />
      <AboutSection />

      <section aria-labelledby="architecture-heading">
        <h2
          id="architecture-heading"
          className="font-sans text-base font-bold tracking-widest uppercase text-accent mb-4"
        >
          Architecture
        </h2>
        <img
          src="/architecture.png"
          className="w-full bg-surface-alt rounded-[20px] border border-border border-b-2 border-b-accent-alt shadow-card"
          alt="System architecture diagram showing browser, BFF, inference API, and model layers"
          loading="lazy"
          decoding="async"
        />
      </section>
    </main>
  );
}

export default MainLayout;
