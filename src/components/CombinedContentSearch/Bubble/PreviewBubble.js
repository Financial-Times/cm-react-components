import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Bubble from './Bubble';
import SimilarConceptsList from '../SimilarConcepts/SimilarConceptsList';
import Tooltip from '../../Tooltip/Tooltip';

import { FILTER_EXPRESSION_TYPES } from '../../../utils/constants';
import { useTooltip } from '../../../utils/hooks/useTooltip';

const typeMap = {
  'has-genre': 'Genre',
  'has-brand': 'Brand',
  'content-type-filter': 'Content',
  'mentions': 'Mentions',
  'about': 'About',
  'keyword-filter': 'Keyword',
  'has-author': 'Author'
};

const PreviewBubble = ({
  type = '',
  value = '',
  primary,
  actions,
  options,
  id,
  children,
  narrower,
  related,
  onConceptClick
}) => {
  const editFilter = () => {
    const isKeywordFilter = type === FILTER_EXPRESSION_TYPES.keyword;

    const objectToEdit = {
      id,
      type: isKeywordFilter ? FILTER_EXPRESSION_TYPES.keyword : FILTER_EXPRESSION_TYPES.relatedEntity,
      value: isKeywordFilter ? value : '',
      relationship: type,
      options,
      editMode: true
    };
    if (isKeywordFilter) {
      delete objectToEdit.relationship;
    }

    actions.edit(objectToEdit);
  };

  const deleteFilter = () => {
    actions.delete(id);
  };

  const tooltipContainerRef = useRef(null);

  const {
    isVisible,
    hideTooltip,
    showTooltip,
    top,
    left
  } = useTooltip(false, tooltipContainerRef, tooltipContainerRef);

  const shouldShowTooltip = (narrower && narrower.length > 0)
    || (related && related.length > 0);

  const handleClickOutside = event => {
    if (
      tooltipContainerRef
      && tooltipContainerRef.current
      && !tooltipContainerRef.current.contains(event.target)
    ) {
      hideTooltip();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Bubble
      primary={primary}
    >
      <div
        className="container preview-bubble o-layout__unstyled-element with-tooltip"
        data-testid="previewBubble"
        ref={tooltipContainerRef}
      >
        {children}
        <div className="type-container">
          <div className="type">{typeMap[type]}</div>
          <div className="arrow" />
        </div>
        <div className={`value${shouldShowTooltip ? ' tooltip' : ''}`} title={value}>{value}</div>
        {actions && (
          <div className={`action-buttons${shouldShowTooltip ? ' tooltip' : ''}`}>
            <button className="as-icon pencil" title="Edit filter" onClick={editFilter}>
              <span className="edit" />
            </button>
            {shouldShowTooltip && (
              <>
                <div className="separator" />
                <button className="as-icon" title="Show similar concepts" onClick={showTooltip}>
                  <span className="dots" />
                </button>
              </>
            )}
            <div className="separator" />
            <button className="as-icon delete" title="Remove filter" onClick={deleteFilter}>
              <span className="cross" />
            </button>
          </div>
        )}
        {shouldShowTooltip && (
          <Tooltip
            isVisible={isVisible}
            close={hideTooltip}
            top={top}
            left={left}
          >
            <SimilarConceptsList
              title="Narrower concepts"
              concepts={narrower}
              onConceptClick={onConceptClick}
              hideTooltip={hideTooltip}
            />
            <SimilarConceptsList
              title="Related concepts"
              concepts={related}
              onConceptClick={onConceptClick}
              hideTooltip={hideTooltip}
            />
          </Tooltip>
        )}
      </div>
    </Bubble>
  );
};

PreviewBubble.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  primary: Bubble.propTypes.primary,
  actions: PropTypes.object,
  id: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  narrower: PropTypes.arrayOf(PropTypes.object),
  related: PropTypes.arrayOf(PropTypes.object),
  onConceptClick: SimilarConceptsList.propTypes.onConceptClick
};

export default PreviewBubble;
