import React from 'react';
import PropTypes from 'prop-types';

import { SimilarConcept } from './SimilarConcept';

const SimilarConceptsList = ({
  title,
  concepts,
  onConceptClick,
  hideTooltip
}) => <>
  {concepts && concepts.length > 0
    ? (
      <div className="similar-concepts-list">
        <div className="title">{title}</div>
        <div className="concepts">
          {concepts.map(similar => {
            const { concept } = similar;

            return (
              <SimilarConcept
                key={concept.uuid}
                id={concept.id}
                prefLabel={concept.prefLabel}
                type={concept.type}
                onConceptClick={onConceptClick}
                hideTooltip={hideTooltip}
              />
            );
          })}
        </div>
      </div>
    )
    : null}
</>;

SimilarConceptsList.propTypes = {
  title: PropTypes.string,
  concepts: PropTypes.arrayOf(PropTypes.object),
  onConceptClick: SimilarConcept.propTypes.onConceptClick,
  hideTooltip: SimilarConcept.propTypes.hideTooltip
};

export default SimilarConceptsList;
