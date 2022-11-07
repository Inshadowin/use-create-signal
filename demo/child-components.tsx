import React, { useCallback, useEffect } from 'react';

import { useGetterState } from '../src';

const Parent = () => {
  const [getState, setState] = useGetterState<number>(0);

  const handleChange = useCallback((newValue: number) => {
    console.log(
      "This doesn't support transform function. But we don't care anymore"
    );

    setState(newValue);
  }, []);

  return (
    <div>
      <ChildAutoCounterMemo
        value={getState()}
        getValue={getState}
        onChange={handleChange}
      />
      <ChildAutoCounterMemo
        value={getState()}
        getValue={getState}
        onChange={handleChange}
      />
      <ChildAutoCounterMemo
        value={getState()}
        getValue={getState}
        onChange={handleChange}
      />
      <ChildAutoCounterMemo
        value={getState()}
        getValue={getState}
        onChange={handleChange}
      />
      <ChildAutoCounterMemo
        value={getState()}
        getValue={getState}
        onChange={handleChange}
      />
      <ChildAutoCounterMemo
        value={getState()}
        getValue={getState}
        onChange={handleChange}
      />
      <ChildAutoCounterMemo
        value={getState()}
        getValue={getState}
        onChange={handleChange}
      />
    </div>
  );
};

type ChildProps = {
  value: number;
  getValue: () => number;
  onChange: (newValue: number) => void;
};

const ChildAutoCounter: React.FC<ChildProps> = ({ getValue, onChange }) => {
  useEffect(() => {
    onChange(getValue() + 1);
  }, []);

  return <div>The number of children is {getValue()}</div>;
};

// if you memoize the component - don't forget to also pass value
const ChildAutoCounterMemo = React.memo(ChildAutoCounter);

export default React.memo(Parent);
