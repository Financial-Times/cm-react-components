import React from 'react';
import PropTypes from 'prop-types';

import LogicFilterBubble from '../Bubble/LogicFilterBubble';
import PreviewBubble from '../Bubble/PreviewBubble';
import FilterBubble from '../Bubble/FilterBubble';
import HintConcepts from '../Hint/HintConceps';

import { useExpression } from '../../../utils/hooks/useExpression';
import {
  FILTER_EXPRESSION_TYPES,
  FILTERS_ONCHANGE_REQUEST,
  SELECT_OPTIONS_ALL
} from '../../../utils/constants';
import { getDropdownOptions } from '../../../utils/helpers';

const ExpressionGroup = ({
  expression,
  onChange,
  isFirst,
  currentId,
  increaseId,
  dropdownOptions,
  withHint
}) => {
  const renderOperands = (operands, changeParentFilters) => {
    let isFirstOperand = true;

    return operands.map(operand => {
      let dropdownOptions = SELECT_OPTIONS_ALL;
      let shouldRenderHint = false;

      if (operand.type !== FILTER_EXPRESSION_TYPES.expression) {

        if (!isFirst) {
          dropdownOptions = getDropdownOptions(operands, operand.id);
        }

        if (isFirstOperand) {
          isFirstOperand = false;
          shouldRenderHint = true;
        }
      }

      return (
        <ExpressionGroup
          key={`${operand.type}--${operand.id}`}
          expression={operand}
          onChange={changeParentFilters}
          currentId={currentId}
          increaseId={increaseId}
          dropdownOptions={dropdownOptions}
          withHint={shouldRenderHint}
        />
      );
    });
  };

  const {
    type,
    logic,
    relationship,
    value,
    operands,
    editMode,
    options,
    prefLabel,
    narrowerConcepts,
    relatedConcepts
  } = expression;
  let bubbleType = '';
  let bubbleValue = '';
  let bubblePrefLabel = '';

  const {
    changeType,
    changeFilters,
    insertExpression,
    deleteExpression,
    toggleFilterEditMode,
    changeConceptType,
    changeConcept,
    requestConcepts
  } = useExpression(expression, onChange, currentId, increaseId);

  if (type === FILTER_EXPRESSION_TYPES.expression) {
    let logicClasses = '';
    let bubbleContainerClasses = 'bubble-container primary o-layout__unstyled-element';
    if (isFirst) {
      logicClasses += ' no-connector';
      bubbleContainerClasses += ' no-padding';
    }

    return (
      <li key={`${type}--${logic}--${currentId}`} className={bubbleContainerClasses} data-testid="expressionGroup">
        <LogicFilterBubble
          className={logicClasses}
          expressionValue={expression}
          onChange={changeType}
          addNewFilter={changeFilters}
          insertExpression={insertExpression}
          deleteExpression={deleteExpression}
          isFirst={isFirst}
        />
        <ul className="bubble-list builder-list o-layout__unstyled-element">
          {renderOperands(operands, changeFilters)}
        </ul>
      </li>
    );
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

  const requestConceptCallback = FILTERS_ONCHANGE_REQUEST.indexOf(bubbleType) > -1
    ? requestConcepts
    : null;

  const bubbleHint = withHint
    ? <HintConcepts />
    : null;

  return editMode
    ? (
      <FilterBubble
        onChange={changeConceptType}
        value={bubbleType}
        initialInputValue={bubbleValue}
        dropdownOptions={dropdownOptions}
        autocompleteId={expression.id}
        autocompleteOptions={options || []}
        autocompleteFinish={changeConcept}
        autocompleteChange={requestConceptCallback}
      >
        {bubbleHint}
      </FilterBubble>
    )
    : (
      <PreviewBubble
        primary
        actions={{
          edit: toggleFilterEditMode,
          delete: deleteExpression
        }}
        id={expression.id}
        type={bubbleType}
        value={bubblePrefLabel}
        bubbleUUID={bubbleValue}
        options={options}
        narrower={narrowerConcepts}
        related={relatedConcepts}
        onConceptClick={changeConcept}
      >
        {bubbleHint}
      </PreviewBubble>
    );
};

ExpressionGroup.propTypes = {
  expression: PropTypes.objectOf(PropTypes.any),
  onChange: PropTypes.func,
  isFirst: PropTypes.bool,
  currentId: PropTypes.number,
  increaseId: PropTypes.func,
  dropdownOptions: FilterBubble.propTypes.dropdownOptions,
  withHint: PropTypes.bool
};

export default ExpressionGroup;
