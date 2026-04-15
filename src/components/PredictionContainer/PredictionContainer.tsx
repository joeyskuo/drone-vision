import type { ReactNode } from 'react';
import { selectPredictionUrl, useAppStore } from '@/stores/app';

function PredictionContainer(): ReactNode {
  const predictionUrl = useAppStore(selectPredictionUrl);

  return (
    <div className="flex flex-col h-full w-full">
      <h3 className="font-sans text-base font-bold tracking-widest uppercase text-accent mb-4">
        Predictions
      </h3>
      <div
        aria-live="polite"
        className="h-[295px] bg-surface-alt rounded-[10px] border border-border overflow-hidden text-text-muted text-base tracking-[0.05em] flex items-center justify-center flex-col gap-2.5"
      >
        {predictionUrl ? (
          <img
            src={predictionUrl}
            className="w-full"
            alt="Annotated detection results"
            decoding="async"
          />
        ) : (
          <>
            <span aria-hidden="true" className="text-[2.5rem]">
              {'\u2B1A'}
            </span>
            <span>Confidence scores, to be implemented</span>
          </>
        )}
      </div>
    </div>
  );
}

export default PredictionContainer;
