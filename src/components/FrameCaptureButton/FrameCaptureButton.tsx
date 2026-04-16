import type { ReactNode } from 'react';
import { useCaptureFrame } from '@/hooks/useCaptureFrame';

type CaptureState = 'idle' | 'activated' | 'detecting';

function FrameCaptureButton(): ReactNode {
  const { handleCapture, captureActivated, isDetecting } = useCaptureFrame();

  const state: CaptureState = isDetecting ? 'detecting' : captureActivated ? 'activated' : 'idle';

  return (
    <div className="capture-connector relative flex h-[90px] items-center">
      <button
        type="button"
        className="capture-btn bg-accent border-[1.5px] border-black/25 rounded-[14px] text-white font-sans text-base font-bold tracking-wide py-3.5 px-9 min-w-[190px] cursor-pointer whitespace-nowrap transition-colors hover:bg-accent-hover active:bg-accent-active"
        data-state={state}
        onClick={() => void handleCapture()}
        disabled={isDetecting}
        aria-busy={isDetecting}
        aria-label={isDetecting ? 'Running detection' : 'Capture a video frame'}
      >
        {isDetecting ? 'Detecting...' : 'Capture Frame'}
      </button>
    </div>
  );
}

export default FrameCaptureButton;
