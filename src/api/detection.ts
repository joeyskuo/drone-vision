import type { AxiosResponse } from 'axios';
import { http, requestWithRetry, type RetryOptions } from '@/lib/http';
import { ValidationError } from '@/lib/errors';

export interface DetectionResult {
  readonly imageUrl: string;
  readonly revoke: () => void;
}

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'] as const;

type AllowedMime = (typeof ALLOWED_MIME_TYPES)[number];

function assertValidImageBlob(blob: Blob): asserts blob is Blob & { type: AllowedMime } {
  if (blob.size === 0) throw new ValidationError('Image blob is empty');
  if (blob.size > MAX_UPLOAD_BYTES) {
    throw new ValidationError(`Image exceeds max size of ${MAX_UPLOAD_BYTES} bytes`);
  }
  if (!ALLOWED_MIME_TYPES.includes(blob.type as AllowedMime)) {
    throw new ValidationError(`Unsupported image type: ${blob.type}`);
  }
}

function buildRetryOptions(signal: AbortSignal | undefined, retries: number): RetryOptions {
  return signal ? { signal, retries } : { retries };
}

export async function detectObjects(
  blob: Blob,
  options: { signal?: AbortSignal } = {},
): Promise<DetectionResult> {
  assertValidImageBlob(blob);

  const formData = new FormData();
  formData.append('file', blob, 'frame.jpg');

  const response = await requestWithRetry<AxiosResponse<Blob>>(
    (signal) =>
      http.post<Blob>('/detect', formData, {
        responseType: 'blob',
        signal,
      }),
    buildRetryOptions(options.signal, 1),
  );

  const imageUrl = URL.createObjectURL(response.data);
  return {
    imageUrl,
    revoke: () => URL.revokeObjectURL(imageUrl),
  };
}

export async function warmUp(options: { signal?: AbortSignal } = {}): Promise<void> {
  await requestWithRetry<AxiosResponse<unknown>>(
    (signal) => http.get('/warmup', { signal }),
    buildRetryOptions(options.signal, 1),
  );
}
