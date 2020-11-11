import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const classNameDefault = 'o-buttons';
const classNameDefaultPrefix = `${classNameDefault}--`;
const classNameIcon = `${classNameDefault}-icon`;
const classNameIconPrefix = `${classNameIcon}--`;

export const Button = forwardRef(({
  id,
  children,
  disabled,
  onClick,
  selected,
  className: additionalClassname,
  primary,
  secondary,
  inverse,
  big,
  mono,
  b2c,
  icon,
  title
}, ref) => {
  let buttonClasses = classNameDefault;

  // Checking if some of the following props are passed
  // and attaching the appropriate origami classes
  if (primary) {
    buttonClasses += ` ${classNameDefaultPrefix}primary`;
  }

  if (secondary) {
    buttonClasses += ` ${classNameDefaultPrefix}secondary`;
  }

  if (inverse) {
    buttonClasses += ` ${classNameDefaultPrefix}inverse`;
  }

  if (big) {
    buttonClasses += ` ${classNameDefaultPrefix}big`;
  }

  if (mono) {
    buttonClasses += ` ${classNameDefaultPrefix}mono`;
  }

  if (b2c) {
    buttonClasses += ` ${classNameDefaultPrefix}b2c`;
  }

  if (icon) {
    buttonClasses += ` ${classNameIcon} ${classNameIconPrefix}${icon} `;

    if (!children) {
      buttonClasses += ` ${classNameIconPrefix}icon-only`;
    }
  }

  // Attaching if some external classname is passed through props
  if (additionalClassname) {
    buttonClasses += ` ${additionalClassname}`;
  }

  return (
    <button
      id={id}
      ref={ref}
      data-testid={id}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-selected={selected}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
Button.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  className: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  inverse: PropTypes.bool,
  big: PropTypes.bool,
  mono: PropTypes.bool,
  b2c: PropTypes.bool,
  icon: PropTypes.string,
  title: PropTypes.string
};

// export default Button;
