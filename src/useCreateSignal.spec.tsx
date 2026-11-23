import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot, Root } from 'react-dom/client';

import { useCreateSignal } from './useCreateSignal';
import type { UseCreateSignalResult } from './useCreateSignal';

describe('useCreateSignal happy path', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('supports direct values and functional updates', () => {
    type Signal = UseCreateSignalResult<number>;
    let getValue!: Signal[0];
    let setValue!: Signal[1];

    const TestComponent = () => {
      [getValue, setValue] = useCreateSignal(1);
      return null;
    };

    act(() => root.render(<TestComponent />));
    expect(getValue()).toBe(1);

    act(() => {
      setValue(5);
    });
    expect(getValue()).toBe(5);

    act(() => {
      setValue(current => current + 3);
    });
    expect(getValue()).toBe(8);
  });
});
