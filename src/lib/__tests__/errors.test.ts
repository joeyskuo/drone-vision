import { describe, expect, it } from 'vitest';
import {
  ApiError,
  CancelledError,
  NetworkError,
  TimeoutError,
  ValidationError,
  isAppError,
  toErrorMessage,
} from '@/lib/errors';

describe('error classes', () => {
  it('discriminates by kind', () => {
    expect(new NetworkError('n').kind).toBe('network');
    expect(new TimeoutError('t').kind).toBe('timeout');
    expect(new CancelledError('c').kind).toBe('cancelled');
    expect(new ApiError('a', 500).kind).toBe('api');
    expect(new ValidationError('v').kind).toBe('validation');
  });

  it('preserves api status code', () => {
    expect(new ApiError('oops', 503).status).toBe(503);
  });

  it('identifies app errors', () => {
    expect(isAppError(new NetworkError('x'))).toBe(true);
    expect(isAppError(new Error('x'))).toBe(false);
    expect(isAppError('x')).toBe(false);
  });

  it('converts unknown values to messages', () => {
    expect(toErrorMessage(new Error('boom'))).toBe('boom');
    expect(toErrorMessage('nope')).toBe('nope');
    expect(toErrorMessage(42)).toBe('An unexpected error occurred');
  });
});
