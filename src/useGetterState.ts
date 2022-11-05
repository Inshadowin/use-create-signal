import { useRef, useState } from 'react';
import type { SetStateAction } from 'react';

type DefaultValueType<T> = T | (() => T);

const isFunction = <T>(setter: T | Function): setter is Function => {
  return typeof setter === 'function';
};

const getDefaultValue = <T>(defaultValue?: DefaultValueType<T>) => {
  if (isFunction(defaultValue)) return defaultValue();

  return defaultValue;
};

export const useGetterState = <T>(defaultValue?: DefaultValueType<T>) => {
  const [, setValue] = useState<T | undefined>(defaultValue);

  const container = useRef({
    value: getDefaultValue(defaultValue),
    getValue: () => container.current.value,
    onChange: (setter: SetStateAction<T | undefined>) => {
      const newValue = isFunction(setter)
        ? setter(container.current.value)
        : setter;

      setValue(newValue);
      container.current.value = newValue;

      return newValue;
    },
  });

  return [container.current.getValue, container.current.onChange] as const;
};
