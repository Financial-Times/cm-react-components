import React from 'react';
import PropTypes from 'prop-types';

const Teaser = ({
  className: additionalClassname,
  imageSrc = '',
  topic,
  heading,
  content,
  linkUrl
}) => {
  let teaserClasses = 'teaser-container';
  if (additionalClassname) {
    teaserClasses += ` ${additionalClassname}`;
  }

  let Tag = 'div';
  const tagProps = {
    className: teaserClasses,
    'data-testid': 'teaser'
  };

  if (linkUrl) {
    Tag = 'a';
    tagProps.href = linkUrl;
    tagProps.target = '_blank';
  }

  return (
    <Tag {...tagProps}>
      {imageSrc && (
        <div className="image-container">
          <img
            src={imageSrc}
            className="teaser-image o-layout__unstyled-element"
            alt="Teaser image"
          />
        </div>
      )}
      <div className="content-wrapper">
        {topic && (
          <div className="topic">
            {topic}
          </div>
        )}
        {heading && (
          <h2 className="heading">
            {heading}
          </h2>
        )}
        {content && (
          <p className="content">
            {content}
          </p>
        )}
      </div>
    </Tag>
  );
};

Teaser.propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  topic: PropTypes.string,
  heading: PropTypes.string,
  content: PropTypes.string,
  linkUrl: PropTypes.string
};

export default Teaser;
