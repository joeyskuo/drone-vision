import useCaptureFrame from '../../hooks/useCaptureFrame';

const FrameCaptureButton = () => {
    const { handleCapture, captureActivated, isDetecting } = useCaptureFrame();

    return (
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
    );
};

export default FrameCaptureButton;
