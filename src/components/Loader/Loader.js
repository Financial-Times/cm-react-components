import React from 'react';
import PropTypes from 'prop-types';

const classNameDefault = 'o-loading';
const classNameDefaultPrefix = '--';

const Loader = ({
  size,
  theme
}) => {
  let loaderClasses = classNameDefault;

  if (size) {
    loaderClasses += ` ${classNameDefault}${classNameDefaultPrefix}${size}`;
  }

  if (theme) {
    loaderClasses += ` ${classNameDefault}${classNameDefaultPrefix}${theme}`;
  }

  return (
    <div data-testid="loader" className={loaderClasses} />
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf([
    'mini',
    'small',
    'medium',
    'large',
    'extra-large'
  ]),
  theme: PropTypes.oneOf([
    'dark',
    'light'
  ])
};

export default Loader;
