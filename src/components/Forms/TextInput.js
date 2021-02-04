import React from 'react';
import PropTypes from 'prop-types';

import { FormsInput } from './FormsInput';

const TextInput = ({
  className = '',
  small,
  disabled,
  inputType = 'text',
  value,
  onChange,
  onBlur,
  onKeyDown,
  hasError,
  errorMessage = '',
  isTouched,
  rows = 4
}) => {
  const isTextArea = inputType === 'textarea';

  const inputProps = {
    value,
    onChange,
    disabled,
    onBlur,
    onKeyDown
  };

  let Input = '';
  if (isTextArea) {
    Input = 'textarea';
    inputProps.rows = rows;
  } else {
    Input = 'input';
    inputProps.type = inputType;
  }

  return (
    <FormsInput
      type={isTextArea ? 'textarea' : 'text'}
      className={className}
      small={small}
      valid={isTouched && !hasError}
      hasError={hasError}
      errorMessage={errorMessage}
    >
      <Input data-testid="textInput" {...inputProps} />
    </FormsInput>
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  small: FormsInput.propTypes.small,
  disabled: PropTypes.bool,
  inputType: PropTypes.oneOf([
    'text',
    'password',
    'email',
    'number',
    'textarea'
  ]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  hasError: FormsInput.propTypes.hasError,
  errorMessage: FormsInput.propTypes.errorMessage,
  isTouched: PropTypes.bool,
  rows: PropTypes.number
};

export default TextInput;
