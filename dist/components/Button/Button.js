import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

var classNameDefault = 'o-buttons';
var classNameDefaultPrefix = classNameDefault + '--';
var classNameIcon = classNameDefault + '-icon';
var classNameIconPrefix = classNameIcon + '--';

var Button = forwardRef(function (_ref, ref) {
  var id = _ref.id,
      children = _ref.children,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      selected = _ref.selected,
      additionalClassname = _ref.className,
      primary = _ref.primary,
      secondary = _ref.secondary,
      inverse = _ref.inverse,
      big = _ref.big,
      mono = _ref.mono,
      b2c = _ref.b2c,
      icon = _ref.icon,
      title = _ref.title;

  var buttonClasses = classNameDefault;

  // Checking if some of the following props are passed
  // and attaching the appropriate origami classes
  if (primary) {
    buttonClasses += ' ' + classNameDefaultPrefix + 'primary';
  }

  if (secondary) {
    buttonClasses += ' ' + classNameDefaultPrefix + 'secondary';
  }

  if (inverse) {
    buttonClasses += ' ' + classNameDefaultPrefix + 'inverse';
  }

  if (big) {
    buttonClasses += ' ' + classNameDefaultPrefix + 'big';
  }

  if (mono) {
    buttonClasses += ' ' + classNameDefaultPrefix + 'mono';
  }

  if (b2c) {
    buttonClasses += ' ' + classNameDefaultPrefix + 'b2c';
  }

  if (icon) {
    buttonClasses += ' ' + classNameIcon + ' ' + classNameIconPrefix + icon + ' ';

    if (!children) {
      buttonClasses += ' ' + classNameIconPrefix + 'icon-only';
    }
  }

  // Attaching if some external classname is passed through props
  if (additionalClassname) {
    buttonClasses += ' ' + additionalClassname;
  }

  return React.createElement(
    'button',
    {
      id: id,
      ref: ref,
      'data-testid': id,
      className: buttonClasses,
      disabled: disabled,
      onClick: onClick,
      title: title,
      'aria-selected': selected
    },
    children
  );
});

Button.displayName = 'Button';
Button.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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

export default Button;