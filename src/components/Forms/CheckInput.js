import React from 'react';
import PropTypes from 'prop-types';

import { FormsInput } from './FormsInput';

const CheckInput = ({
  isToggle,
  className = '',
  small,
  disabled,
  onChange,
  checked,
  label
}) => (
  <FormsInput
    type={isToggle ? 'toggle' : 'checkbox'}
    className={className}
    small={small}
  >
    <label>
      <input
        className="checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        data-testid="checkboxInput"
      />
      <span className="o-forms-input__label checkbox-label">
        {label}
      </span>
    </label>
  </FormsInput>
);

CheckInput.propTypes = {
  isToggle: PropTypes.bool,
  className: PropTypes.string,
  small: FormsInput.propTypes.small,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string
};

export default CheckInput;
