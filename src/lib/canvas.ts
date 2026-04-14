const DEFAULT_JPEG_QUALITY = 0.95;

export function captureFrameFromVideo(video: HTMLVideoElement): HTMLCanvasElement {
  if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
    throw new Error('Video is not ready for capture');
  }

  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext('2d');
  if (!context) throw new Error('Failed to acquire 2D rendering context');

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: 'image/jpeg' | 'image/png' = 'image/jpeg',
  quality: number = DEFAULT_JPEG_QUALITY,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Failed to encode canvas to blob'))),
      type,
      quality,
    );
  });
}

export function canvasToDataUrl(
  canvas: HTMLCanvasElement,
  type: 'image/jpeg' | 'image/png' = 'image/jpeg',
  quality: number = DEFAULT_JPEG_QUALITY,
): string {
  return canvas.toDataURL(type, quality);
}
