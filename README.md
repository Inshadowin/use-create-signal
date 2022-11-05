# use-getter-state

Lightweight package that fixes most useState problems:

- value is locked in scope
- setState doens't return value
- parallel updated only possible with predicates

## How to use

Just like you use useState
But value is a getter function

```jsx
const Component = () => {
  const [getter, setter] = useGetterState('');

  return <input value={getter()} onChange={e => setter(e.target.value)} />;
};
```

## Advantages

- `useCallback` / `useEffect` and others don't require to put value in deps
- consecutive `useEffect` have updated values
- parallel `useEffect` have actual updated values
- multiple child components will have actual updated values

```jsx
const Component = () => {
  const [getter, setter] = useGetterState(() => 1); // or just useGetterState(1). it's the same as useState

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
