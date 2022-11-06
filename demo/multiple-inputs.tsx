import React, { useEffect } from 'react';

import { useGetterState } from '../src';

type InputProps = {
  value: number;
  hasError: number;
  onValidation: (isValid: boolean) => void;
};

const Input: React.FC<InputProps> = ({ value, hasError, onValidation }) => {
  useEffect(() => {
    const isNotValid = value > 100;

    onValidation(isNotValid);
  }, [value]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <input
          value={value}
          style={{ borderColor: hasError ? 'red' : 'black', outline: 0 }}
        />
      </div>
      {hasError && <div style={{ color: 'red' }}>input not valid</div>}
      <br />
    </div>
  );
};

const MultipleInputs = () => {
  const [getFormErrors, setFormErrors] = useGetterState<any>({});

  return (
    <div>
      <div>Show error if value is more than 100</div>
      <br />
      <Input
        value={190}
        hasError={getFormErrors().first}
        onValidation={isValid =>
          setFormErrors({ ...getFormErrors(), first: isValid })
        }
      />
      <Input
        value={310}
        hasError={getFormErrors().second}
        onValidation={isValid =>
          setFormErrors({ ...getFormErrors(), second: isValid })
        }
      />
      <Input
        value={90}
        hasError={getFormErrors().third}
        onValidation={isValid =>
          setFormErrors({ ...getFormErrors(), third: isValid })
        }
      />
      <Input
        value={20}
        hasError={getFormErrors().fourth}
        onValidation={isValid =>
          setFormErrors({ ...getFormErrors(), fourth: isValid })
        }
      />
      <Input
        value={290}
        hasError={getFormErrors().fifth}
        onValidation={isValid =>
          setFormErrors({ ...getFormErrors(), fifth: isValid })
        }
      />
    </div>
  );
};

export default React.memo(MultipleInputs);
