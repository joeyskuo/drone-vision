import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { detectObjects, type DetectionResult } from '@/api/detection';
import { mutationKeys } from '@/api/queryKeys';
import { captureFrameFromVideo, canvasToBlob, canvasToDataUrl } from '@/lib/canvas';
import { logger } from '@/lib/logger';
import { useFrameActions } from '@/stores/app';
import { useVideoStore } from '@/stores/video';

export interface UseCaptureFrameResult {
  readonly handleCapture: () => Promise<void>;
  readonly captureActivated: boolean;
  readonly isDetecting: boolean;
  readonly error: unknown;
}

export function useCaptureFrame(): UseCaptureFrameResult {
  const { setCapturedFrameUrl, setPredictionUrl } = useFrameActions();
  const sourceRef = useVideoStore((s) => s.sourceRef);
  const [captureActivated, setCaptureActivated] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation<DetectionResult, unknown, Blob>({
    mutationKey: mutationKeys.detection.detect,
    mutationFn: async (blob) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      return detectObjects(blob, { signal: controller.signal });
    },
    onSuccess: (result) => setPredictionUrl(result.imageUrl),
    onError: (error) => logger.error('frame detection failed', error),
  });

  useEffect(
    () => () => {
      controllerRef.current?.abort();
    },
    [],
  );

  const handleCapture = useCallback(async () => {
    const video = sourceRef.current;
    if (!video) return;

    setCaptureActivated(true);
    setPredictionUrl(null);

    try {
      const canvas = captureFrameFromVideo(video);
      setCapturedFrameUrl(canvasToDataUrl(canvas));
      const blob = await canvasToBlob(canvas);
      mutation.mutate(blob);
    } catch (error) {
      logger.error('frame capture failed', error);
    }
  }, [mutation, setCapturedFrameUrl, setPredictionUrl, sourceRef]);

  return {
    handleCapture,
    captureActivated,
    isDetecting: mutation.isPending,
    error: mutation.error,
  };
}

export default useCaptureFrame;
