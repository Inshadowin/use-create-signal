import React, { useCallback, useEffect } from 'react';

import { useCreateSignal } from '../src';

const Component = () => {
  const [getter, setter] = useCreateSignal<number>(() => 1); // or just useCreateSignal(1). it's the same as useState

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

  return <div onClick={handleWowIncrement}>I was clicked {getter()} times</div>;
};

export default React.memo(Component);
