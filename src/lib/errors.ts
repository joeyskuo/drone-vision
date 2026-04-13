export abstract class AppError extends Error {
  abstract readonly kind: string;
  override readonly cause?: unknown;

  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = this.constructor.name;
    if (options?.cause !== undefined) this.cause = options.cause;
  }
}

export class NetworkError extends AppError {
  readonly kind = 'network' as const;
}

export class TimeoutError extends AppError {
  readonly kind = 'timeout' as const;
}

export class CancelledError extends AppError {
  readonly kind = 'cancelled' as const;
}

export class ApiError extends AppError {
  readonly kind = 'api' as const;
  readonly status: number;

  constructor(message: string, status: number, options?: { cause?: unknown }) {
    super(message, options);
    this.status = status;
  }
}

export class ValidationError extends AppError {
  readonly kind = 'validation' as const;
}

export type KnownError = NetworkError | TimeoutError | CancelledError | ApiError | ValidationError;

export function isAppError(value: unknown): value is AppError {
  return value instanceof AppError;
}

export function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
}
