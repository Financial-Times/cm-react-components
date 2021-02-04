import React from 'react';
import PropTypes from 'prop-types';

import { FormsInput } from './FormsInput';

const RadioInput = ({
  className = '',
  small,
  inline,
  disabled,
  isRounded = false,
  options = [],
  name,
  onChange: handleRadioInputChange,
  selectedValue = ''
}) => {
  const radioInputs = options.map((option, index) => (
    <label key={`${option.name}-${index}`}>
      <input
        name={name}
        type="radio"
        value={option.value}
        disabled={disabled}
        checked={option.value === selectedValue}
        onChange={handleRadioInputChange}
      />
      <span className="o-forms-input__label">
        {option.name}
      </span>
    </label>
  ));

  let containerClasses = '';

  if (!isRounded) {
    containerClasses += 'o-forms-input--radio-box__container';
  }

  return (
    <FormsInput
      className={className}
      small={small}
      inline={inline}
      type={isRounded ? 'radio-round' : 'radio-box'}
    >
      <div
        className={containerClasses}
        data-testid="radioInputs"
      >
        {options.length > 0 && radioInputs}
      </div>
    </FormsInput>
  );
};

RadioInput.propTypes = {
  className: PropTypes.string,
  small: FormsInput.propTypes.small,
  inline: FormsInput.propTypes.inline,
  disabled: PropTypes.bool,
  isRounded: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })
  ),
  name: PropTypes.string,
  onChange: PropTypes.func,
  selectedValue: PropTypes.string
};

export default RadioInput;
