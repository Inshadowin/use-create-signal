import React, { useEffect, useState } from 'react';

type InputProps = {
  value: number;
  hasError: boolean;
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
  const [formErrors, setFormErrors] = useState<{
    [x in string]: boolean;
  }>({});

  return (
    <div>
      <div>Show error if value is more than 100</div>
      <br />
      <Input
        value={190}
        hasError={formErrors.first}
        onValidation={isValid =>
          setFormErrors({ ...formErrors, first: isValid })
        }
      />
      <Input
        value={310}
        hasError={formErrors.second}
        onValidation={isValid =>
          setFormErrors({ ...formErrors, second: isValid })
        }
      />
      <Input
        value={90}
        hasError={formErrors.third}
        onValidation={isValid =>
          setFormErrors({ ...formErrors, third: isValid })
        }
      />
      <Input
        value={20}
        hasError={formErrors.fourth}
        onValidation={isValid =>
          setFormErrors({ ...formErrors, fourth: isValid })
        }
      />
      <Input
        value={290}
        hasError={formErrors.fifth}
        onValidation={isValid =>
          setFormErrors({ ...formErrors, fifth: isValid })
        }
      />
    </div>
  );
};

export default React.memo(MultipleInputs);
