import React from 'react';
import PropTypes from 'prop-types';

import { FormsInput } from './FormsInput';

const SelectBox = ({
  className = '',
  small,
  hasError,
  errorMessage = '',
  primary,
  isTouched,
  disabled,
  selectedValue,
  onChange,
  placeholderOptions = {},
  options = []
}) => {
  const {
    name: placeholderName,
    value: placeholderValue
  } = placeholderOptions;

  return (
    <FormsInput
      type="select"
      small={small}
      className={className}
      valid={isTouched && !hasError}
      hasError={hasError}
      errorMessage={errorMessage}
    >
      <select
        className={primary ? 'primary' : ''}
        disabled={disabled}
        onChange={onChange}
        value={selectedValue}
        data-testid="selectBox"
      >
        {placeholderName && placeholderValue && (
          <option
            key="placeholder"
            value={placeholderValue}
            disabled
            hidden
          >
            {placeholderName}
          </option>
        )}
        {options.map(option => {
          const { id, value, name, disabled = false } = option;
          const key = typeof id === 'undefined' ? value : id;

          return (
            <option
              key={key}
              value={value}
              disabled={disabled}
            >
              {name}
            </option>
          );
        })}
      </select>
    </FormsInput>
  );
};

SelectBox.propTypes = {
  className: PropTypes.string,
  small: FormsInput.propTypes.small,
  hasError: FormsInput.propTypes.hasError,
  errorMessage: FormsInput.propTypes.errorMessage,
  primary: PropTypes.bool,
  isTouched: PropTypes.bool,
  disabled: PropTypes.bool,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholderOptions: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }),
  options: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]),
      type: PropTypes.string,
      disabled: PropTypes.bool
    })
  )
};

export default SelectBox;
