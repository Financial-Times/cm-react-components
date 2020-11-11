'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classNameDefault = 'o-buttons';
var classNameDefaultPrefix = classNameDefault + '--';
var classNameIcon = classNameDefault + '-icon';
var classNameIconPrefix = classNameIcon + '--';

var Button = (0, _react.forwardRef)(function (_ref, ref) {
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

  return _react2.default.createElement(
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
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  children: _propTypes2.default.node,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  selected: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  primary: _propTypes2.default.bool,
  secondary: _propTypes2.default.bool,
  inverse: _propTypes2.default.bool,
  big: _propTypes2.default.bool,
  mono: _propTypes2.default.bool,
  b2c: _propTypes2.default.bool,
  icon: _propTypes2.default.string,
  title: _propTypes2.default.string
};

exports.default = Button;