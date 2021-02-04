import React from 'react';
import PropTypes from 'prop-types';

import { FormsFieldTitle } from './FormsFieldTitle';

const classNameDefault = 'o-forms-field';
const classNameDefaultPrefix = `${classNameDefault}--`;

const FormsField = ({
  children,
  containerTag = 'label',
  title,
  titlePrompt,
  titleProps,
  className: additionalClassName,
  inline,
  optional,
  inverse
}) => {
  let formsFieldClasses = classNameDefault;

  if (inline) {
    formsFieldClasses += ` ${classNameDefaultPrefix}inline`;
  }

  if (optional) {
    formsFieldClasses += ` ${classNameDefaultPrefix}optional`;
  }

  if (inverse) {
    formsFieldClasses += ` ${classNameDefaultPrefix}inverse`;
  }

  if (additionalClassName) {
    formsFieldClasses += ` ${additionalClassName}`;
  }

  const formsFieldChildren = (
    <>
      {title && <FormsFieldTitle title={title} prompt={titlePrompt} {...titleProps} />}
      {children}
    </>
  );

  const Container = containerTag;

  return (
    <Container className={formsFieldClasses} data-testid="formsField">
      {formsFieldChildren}
    </Container>
  );
};

FormsField.propTypes = {
  children: PropTypes.node,
  containerTag: PropTypes.oneOf([
    'label',
    'div'
  ]),
  title: PropTypes.string,
  titlePrompt: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleProps: PropTypes.objectOf(PropTypes.bool),
  className: PropTypes.string,
  inverse: PropTypes.bool,
  inline: PropTypes.bool,
  optional: PropTypes.bool
};

export default FormsField;
