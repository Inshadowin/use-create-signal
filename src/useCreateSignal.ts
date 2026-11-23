import { useRef, useState } from 'react';
import type { SetStateAction } from 'react';

type DefaultValueType<T> = T | (() => T);

export type UseCreateSignalResult<T> = readonly [
  () => T,
  (setter: SetStateAction<T>) => T,
  T
];

const isFunction = <T>(setter: T | Function): setter is Function => {
  return typeof setter === 'function';
};

export function useCreateSignal<T>(
  defaultValue: DefaultValueType<T>
): UseCreateSignalResult<T>;
export function useCreateSignal<T = undefined>(): UseCreateSignalResult<
  T | undefined
>;

export function useCreateSignal<T>(defaultValue?: DefaultValueType<T>) {
  const [value, setValue] = useState<T | undefined>(defaultValue);

  const container = useRef({
    value: value,
    getValue: () => container.current.value,
    onChange: (setter: SetStateAction<T | undefined>) => {
      const newValue = isFunction(setter)
        ? setter(container.current.value)
        : setter;

      container.current.value = newValue;
      setValue(newValue);

      return newValue;
    },
  });

  return [
    container.current.getValue,
    container.current.onChange,
    value,
  ] as const;
}
