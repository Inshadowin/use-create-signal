import React, { useEffect, useState } from 'react';

const Parent = () => {
  const [state, setState] = useState<number>(0);

  const handleChange = (newValue: number) => {
    console.log(
      "This doesn't support transform function because it hates other people"
    );

    setState(newValue);
  };

  return (
    <div>
      <ChildAutoCounter value={state} onChange={handleChange} />
      <ChildAutoCounter value={state} onChange={handleChange} />
      <ChildAutoCounter value={state} onChange={handleChange} />
      <ChildAutoCounter value={state} onChange={handleChange} />
      <ChildAutoCounter value={state} onChange={handleChange} />
      <ChildAutoCounter value={state} onChange={handleChange} />
      <ChildAutoCounter value={state} onChange={handleChange} />
    </div>
  );
};

type ChildProps = {
  value: number;
  onChange: (newValue: number) => void;
};

const ChildAutoCounter: React.FC<ChildProps> = ({ value, onChange }) => {
  useEffect(() => {
    onChange(value + 1);
  }, []);

  return <div>The number of children is {value}</div>;
};

export default React.memo(Parent);
