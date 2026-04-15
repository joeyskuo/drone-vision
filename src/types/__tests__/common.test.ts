import { describe, expect, it } from 'vitest';
import { err, ok, type Result } from '@/types/common';

describe('Result helpers', () => {
  it('constructs ok variant', () => {
    const result: Result<number, Error> = ok(42);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe(42);
  });

  it('constructs err variant', () => {
    const boom = new Error('boom');
    const result: Result<number, Error> = err(boom);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe(boom);
  });
});
