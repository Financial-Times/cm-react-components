import React from 'react';
import PropTypes from 'prop-types';
import PreviewBubble from '../Bubble/PreviewBubble';
import { FILTER_EXPRESSION_TYPES } from '../../../utils/constants';

const PreviewFilterExpression = ({
  expression
}) => {
  let isFirstListItem = true;

  const renderOperands = operands => operands.map((operand, index) => renderExpression(operand, index + 1));

  /**
   * Based on `expression.type`:
   * either returns `PreviewBubble` with appropriate `type` and `value`
   * or returns a new `li` with `logic separator` and ul inside
   * @param expression
   * @param id
   * @returns {*}
   */
  const renderExpression = (expression, id = 0) => {
    const { type, logic, relationship, value, operands, prefLabel } = expression;
    let bubbleType = '';
    let bubbleValue = '';
    let bubblePrefLabel = '';

    if (type === FILTER_EXPRESSION_TYPES.expression) {
      let logicClasses = 'logic';
      let bubbleContainerClasses = 'bubble-container o-layout__unstyled-element';
      if (isFirstListItem) {
        isFirstListItem = false;
        logicClasses += ' no-connector';
        bubbleContainerClasses += ' no-padding';
      }

      return operands.length > 0
        ? (
          <li key={`${type}--${logic}--${id}`} className={bubbleContainerClasses}>
            <div className={logicClasses}>{logic}</div>
            <ul className="bubble-list o-layout__unstyled-element">
              {renderOperands(operands)}
            </ul>
          </li>
        )
        : null;
    }

    if (type === FILTER_EXPRESSION_TYPES.relatedEntity) {
      bubbleType = relationship;
      bubbleValue = value;
      bubblePrefLabel = prefLabel;
    } else {
      bubbleType = type;
      bubbleValue = value;
      bubblePrefLabel = value;
    }

    return (
      <PreviewBubble
        key={`${bubbleType}--${bubbleValue}--${id}`}
        type={bubbleType}
        value={bubblePrefLabel}
      />
    );
  };

  return (
    <div className="preview-filter-expression-container" data-testid="previewFilterExpression">
      <div className="small-heading">
        Filter expression
      </div>
      {expression && Object.keys(expression).length > 0 && (
        <ul className="bubble-list o-layout__unstyled-element">
          {renderExpression(expression)}
        </ul>
      )}
    </div>
  );
};

PreviewFilterExpression.propTypes = {
  expression: PropTypes.object
};

export default PreviewFilterExpression;
