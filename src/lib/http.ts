import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { env } from '@/config/env';
import { ApiError, CancelledError, NetworkError, TimeoutError } from '@/lib/errors';
import { logger } from '@/lib/logger';

const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_RETRIES = 2;
const BASE_BACKOFF_MS = 300;

export interface RequestOptions extends AxiosRequestConfig {
  retries?: number;
  retryDelayMs?: number;
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(new CancelledError('Request cancelled'));
      },
      { once: true },
    );
  });
}

function normalizeError(error: unknown): ApiError | NetworkError | TimeoutError | CancelledError {
  if (axios.isCancel(error)) {
    return new CancelledError('Request cancelled', { cause: error });
  }
  if (error instanceof AxiosError) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return new TimeoutError('Request timed out', { cause: error });
    }
    if (error.response) {
      return new ApiError(
        error.response.statusText || `Request failed with status ${error.response.status}`,
        error.response.status,
        { cause: error },
      );
    }
    return new NetworkError('Network request failed', { cause: error });
  }
  if (error instanceof CancelledError) return error;
  return new NetworkError('Unknown request failure', { cause: error });
}

function isRetryable(error: unknown): boolean {
  const normalized = normalizeError(error);
  if (normalized instanceof CancelledError) return false;
  if (normalized instanceof ApiError) {
    return normalized.status >= 500 || normalized.status === 429;
  }
  return true;
}

export function createHttpClient(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: DEFAULT_TIMEOUT_MS,
    headers: { Accept: 'application/json' },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      const normalized = normalizeError(error);
      logger.warn('http request failed', {
        kind: normalized.kind,
        message: normalized.message,
        ...(normalized instanceof ApiError ? { status: normalized.status } : {}),
      });
      return Promise.reject(normalized);
    },
  );

  return instance;
}

export const http = createHttpClient(env.VITE_BFF_ENDPOINT);

export interface RetryOptions {
  retries?: number;
  retryDelayMs?: number;
  signal?: AbortSignal;
}

export async function requestWithRetry<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const { retries = DEFAULT_RETRIES, retryDelayMs = BASE_BACKOFF_MS, signal } = options;

  const controller = new AbortController();
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort, { once: true });

  try {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        return await fn(controller.signal);
      } catch (error) {
        lastError = error;
        if (attempt === retries || !isRetryable(error)) {
          throw normalizeError(error);
        }
        const backoff = retryDelayMs * 2 ** attempt + Math.random() * retryDelayMs;
        await sleep(backoff, controller.signal);
      }
    }
    throw normalizeError(lastError);
  } finally {
    signal?.removeEventListener('abort', onAbort);
  }
}
