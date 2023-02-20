# use-create-signal

Implements createSignal from Solid-JS for React-JS

Lightweight package that fixes most useState problems:

- value is locked in scope
- setState doens't return value
- parallel updated only possible with predicates

## How to use

Just like you use useState

But value is a getter function

```tsx
type DefaultValueType<T> = T | (() => T);

type UseCreateSignalType<T> = (
  defaultValue?: DefaultValueType<T>
) => [() => T, (setter: SetStateAction<T>) => T, T];
```

```jsx
const Component = () => {
  const [getter, setter] = useCreateSignal('');

  return <input value={getter()} onChange={e => setter(e.target.value)} />;
};
```

Or if you also need value, it's gonna be here

```jsx
const Component = () => {
  const [getter, setter, value] = useCreateSignal('');

  return <input value={getter()} onChange={e => setter(e.target.value)} />;
};
```

## Advantages

- `useCallback` / `useEffect` and others don't require to put value in deps
- consecutive `useEffect` have updated values
- parallel `useEffect` have actual updated values
- multiple child components will have actual updated values

## Downsides

- memo-components: getter is always the same function. so if you pass getter-function directly - also pass it's result

## Examples

```jsx
const Component = () => {
  const [getter, setter] = useCreateSignal(() => 1); // or just useCreateSignal(1). it's the same as useState

  const handleIncrement = useCallback(() => {
    const newValue = setter(getter() + 1);
    console.log('no deps required. newValue: ', newValue);
  }, []);

  const handleWowIncrement = useCallback(() => {
    const newValue = setter(old => old + 1);
    console.log('WOW. it returned value from predicate. Much wow', newValue);
  }, []);

  // these effects have values updated in between
  useEffect(() => {
    const value = getter();
    console.log(setter(value + 1)); // return 2
  }, []);
  useEffect(() => {
    const value = getter();
    console.log(setter(value + 1)); // return 3
  }, []);
  useEffect(() => {
    const value = getter();
    // parallel effects didn't get updated values
    // this does
    if (value > 2) return;

    console.log(setter(value + 1)); // won't execute
  }, []);

  return <div onClick={handleIncrement}>I was clicked {getter()} times</div>;
};
```

```jsx
const InputWithValidation = ({ value, hasError, onValidation }) => {
  useEffect(() => {
    const isNotValid = value > 100;

    onValidation(isNotValid);
  }, [value]);

  return 'Something';
};

const MultipleInputs = ({ onErrors }) => {
  const [getFormErrors, setFormErrors] = useCreateSignal({});
  const formErrors = getFormErrors();

  const handleOnErrors = newErrors => {
    setFormErrors(newErrors);
    onErrors?.(newErrors);
  };

  return (
    <div>
      <InputWithValidation
        value={190}
        hasError={formErrors.first}
        onValidation={isValid =>
          handleOnErrors({ ...getFormErrors(), first: isValid })
        }
        // this would fail, as only last input would be validated
        // onValidation={isValid => handleOnErrors({ ...formErrors, first: isValid })}
      />
      <InputWithValidation
        value={310}
        hasError={formErrors.second}
        onValidation={isValid =>
          handleOnErrors({ ...getFormErrors(), second: isValid })
        }
      />
      <InputWithValidation
        value={90}
        hasError={formErrors.third}
        onValidation={isValid =>
          handleOnErrors({ ...getFormErrors(), third: isValid })
        }
      />
      <InputWithValidation
        value={20}
        hasError={formErrors.fourth}
        onValidation={isValid =>
          handleOnErrors({ ...getFormErrors(), fourth: isValid })
        }
      />
      <InputWithValidation
        value={290}
        hasError={formErrors.fifth}
        onValidation={isValid =>
          handleOnErrors({ ...getFormErrors(), fifth: isValid })
        }
      />
    </div>
  );
};
```
