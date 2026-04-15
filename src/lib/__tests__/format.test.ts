import { describe, expect, it } from 'vitest';
import { formatTime } from '@/lib/format';

describe('formatTime', () => {
  it('formats whole minutes and seconds', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(59)).toBe('0:59');
    expect(formatTime(60)).toBe('1:00');
    expect(formatTime(125)).toBe('2:05');
  });

  it('pads seconds below ten with a leading zero', () => {
    expect(formatTime(65)).toBe('1:05');
  });

  it('floors fractional seconds', () => {
    expect(formatTime(61.9)).toBe('1:01');
  });

  it('returns 0:00 for invalid inputs', () => {
    expect(formatTime(Number.NaN)).toBe('0:00');
    expect(formatTime(Number.POSITIVE_INFINITY)).toBe('0:00');
    expect(formatTime(-5)).toBe('0:00');
  });
});
