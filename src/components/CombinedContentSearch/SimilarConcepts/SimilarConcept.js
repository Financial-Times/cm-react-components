import React from 'react';
import PropTypes from 'prop-types';

export const SimilarConcept = ({
  prefLabel,
  onConceptClick,
  id,
  type,
  hideTooltip
}) => {
  const handleConceptClick = () => {
    const concept = {
      prefLabel,
      id,
      type
    };
    onConceptClick(concept);
    hideTooltip();
  };

  return (
    <div
      className="single-concept"
      onClick={handleConceptClick}
      data-testid="similarConceptContainer"
    >
      <span>{prefLabel}</span>
    </div>
  );
};

SimilarConcept.propTypes = {
  prefLabel: PropTypes.string,
  onConceptClick: PropTypes.func,
  id: PropTypes.string,
  type: PropTypes.string,
  hideTooltip: PropTypes.func
};
