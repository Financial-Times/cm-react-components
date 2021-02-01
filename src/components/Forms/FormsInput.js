import React from 'react';
import PropTypes from 'prop-types';

const classNameDefault = 'o-forms-input';
const classNameDefaultPrefix = `${classNameDefault}--`;

export const FormsInput = ({
  children,
  type,
  hasError,
  errorMessage,
  className: additionalClassName,
  valid,
  small,
  inline
}) => {
  let inputClasses = `${classNameDefault} ${classNameDefaultPrefix}${type}`;
  const errorClasses = `${classNameDefault}__error`;

  if (valid) {
    inputClasses += ` ${classNameDefaultPrefix}valid`;
  }

  if (hasError) {
    inputClasses += ` ${classNameDefaultPrefix}invalid`;
  }

  if (small) {
    inputClasses += ` ${classNameDefaultPrefix}small`;
  }

  if (inline) {
    inputClasses += ` ${classNameDefaultPrefix}inline`;
  }

  if (additionalClassName) {
    inputClasses += ` ${additionalClassName}`;
  }

  return (
    <span className={inputClasses} data-testid="formsInput">
      {children}
      {hasError && (
        <span className={errorClasses}>{errorMessage}</span>
      )}
    </span>
  );
};

FormsInput.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf([
    'text',
    'textarea',
    'select',
    'radio-round',
    'radio-box',
    'radio-box__container',
    'checkbox',
    'toggle'
  ]),
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  valid: PropTypes.bool,
  small: PropTypes.bool,
  inline: PropTypes.bool
};
