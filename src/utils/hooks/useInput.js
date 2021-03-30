import { useState } from 'react';

export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [hasError, setHasError] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const onChange = (event = {}) => {
    const { target: { value: eventValue } = {} } = event;

    if (typeof eventValue === 'undefined') {
      return;
    }

    !isTouched && setIsTouched(true);

    // If `validator` callback is passed - validates input and sets `hasError`
    if (
      typeof validator === 'function'
    ) {
      const isInputValid = validator(eventValue);
      setHasError(!isInputValid);
    }

    setValue(eventValue);
  };

  return {
    value,
    onChange,
    hasError,
    isTouched
  };
};
