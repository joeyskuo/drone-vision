import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAppStore } from '@/stores/app';

describe('useAppStore', () => {
  let revokeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
  });

  afterEach(() => {
    act(() => {
      useAppStore.getState().resetFrames();
    });
    revokeSpy.mockRestore();
  });

  it('starts with null frames', () => {
    const state = useAppStore.getState();
    expect(state.capturedFrameUrl).toBeNull();
    expect(state.predictionUrl).toBeNull();
  });

  it('revokes a previous prediction URL when replaced', () => {
    act(() => {
      useAppStore.getState().setPredictionUrl('blob:first');
    });
    act(() => {
      useAppStore.getState().setPredictionUrl('blob:second');
    });
    expect(revokeSpy).toHaveBeenCalledWith('blob:first');
    expect(useAppStore.getState().predictionUrl).toBe('blob:second');
  });

  it('clears frames on reset', () => {
    act(() => {
      useAppStore.getState().setCapturedFrameUrl('data:image/jpeg;base64,abc');
      useAppStore.getState().setPredictionUrl('blob:x');
    });
    act(() => {
      useAppStore.getState().resetFrames();
    });
    expect(useAppStore.getState().capturedFrameUrl).toBeNull();
    expect(useAppStore.getState().predictionUrl).toBeNull();
  });
});
