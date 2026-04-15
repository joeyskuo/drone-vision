import type { ReactNode } from 'react';
import PredictionContainer from '@/components/PredictionContainer/PredictionContainer';
import { selectCapturedFrameUrl, useAppStore } from '@/stores/app';

function ImageProcessingContainer(): ReactNode {
  const capturedFrameUrl = useAppStore(selectCapturedFrameUrl);

  return (
    <section
      aria-label="Captured frame and predictions"
      className="surface-card relative z-1 flex flex-col min-h-[250px] border border-border border-t-2 border-t-accent-alt rounded-[20px] overflow-hidden shadow-card"
    >
      <div className="grid grid-cols-2 gap-12 pt-5 px-12 pb-2.5 border-t border-border min-h-[400px]">
        <div>
          <h3 className="font-sans text-base font-bold tracking-widest uppercase text-accent mb-4">
            Captured Frame
          </h3>
          <div className="w-full h-[295px]">
            {capturedFrameUrl ? (
              <img
                src={capturedFrameUrl}
                className="w-full"
                alt="Frame captured from drone camera feed"
                decoding="async"
              />
            ) : (
              <div
                role="status"
                aria-live="polite"
                className="h-full bg-surface-alt rounded-[10px] border-2 border-dashed border-border flex items-center justify-center text-text-muted text-base tracking-[0.05em] flex-col gap-2"
              >
                <span aria-hidden="true" className="text-[2.5rem]">
                  {'\u{1F5BC}'}
                </span>
                <span>Press &quot;Capture Frame&quot; to begin</span>
              </div>
            )}
          </div>
        </div>
        <PredictionContainer />
      </div>
    </section>
  );
}

export default ImageProcessingContainer;
