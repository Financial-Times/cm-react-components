import React from 'react';
import PropTypes from 'prop-types';

const classNameDefault = 'o-forms-title';
const classNameDefaultPrefix = `${classNameDefault}--`;
const classNameDefaultPrefixChildren = `${classNameDefault}__`;

export const FormsFieldTitle = ({
  title,
  prompt,
  verticalCenter,
  shrink
}) => {
  let titleClasses = 'o-forms-title';

  if (verticalCenter) {
    titleClasses += ` ${classNameDefaultPrefix}vertical-center`;
  }

  if (shrink) {
    titleClasses += ` ${classNameDefaultPrefix}shrink`;
  }

  return (
    <span className={titleClasses} data-testid="formsFieldTitleContainer">
      <span className={`${classNameDefaultPrefixChildren}main`}>{title}</span>
      {prompt && <span className={`${classNameDefaultPrefixChildren}prompt`}>{prompt}</span>}
    </span>
  );
};

FormsFieldTitle.propTypes = {
  title: PropTypes.string,
  prompt: PropTypes.string,
  verticalCenter: PropTypes.bool,
  shrink: PropTypes.bool
};
