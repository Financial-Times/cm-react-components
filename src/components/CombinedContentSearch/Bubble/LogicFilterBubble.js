import React from 'react';
import PropTypes from 'prop-types';

import RadioInput from '../../Forms/RadioInput';
import HintLogicGroup from '../Hint/HintLogicGroup';

import { RADIO_OPTIONS } from '../../../utils/constants';

const LogicFilterBubble = ({
  expressionValue,
  onChange,
  addNewFilter,
  deleteExpression,
  insertExpression,
  isFirst,
  className: additionalClassName = ''
}) => {

  const addNewLine = () => {
    addNewFilter({
      type: '',
      value: '',
      editMode: true
    });
  };

  const addAGroup = () => {
    addNewFilter({
      type: 'expression',
      logic: 'and',
      operands: []
    });
  };

  const insertInAGroup = () => {
    insertExpression();
  };

  const removeGroup = () => {
    deleteExpression(expressionValue.id);
  };

  return (
    <div className={`logic-filter-bubble logic ${additionalClassName}`} data-testid="logicFilterBubble">
      <RadioInput
        options={RADIO_OPTIONS}
        selectedValue={expressionValue.logic}
        onChange={onChange}
      />
      <div className="logic-buttons-group">
        <button className="as-icon add-line" title="Add a new line" onClick={addNewLine}>
          <span className="plus" />
        </button>
        <button className="as-icon add" title="Add new group" onClick={addAGroup}>
          <span className="download" />
        </button>
        <button className="as-icon insert" title="Insert in a group" onClick={insertInAGroup}>
          <span className="upload" />
        </button>
      </div>
      <button className="as-icon delete" title="Remove this group" onClick={removeGroup}>
        <span className="trash" />
      </button>
      {isFirst && <HintLogicGroup />}
    </div>
  );
};

LogicFilterBubble.propTypes = {
  expressionValue: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: RadioInput.propTypes.onChange,
  addNewFilter: PropTypes.func.isRequired,
  deleteExpression: PropTypes.func.isRequired,
  insertExpression: PropTypes.func.isRequired,
  className: PropTypes.string,
  isFirst: PropTypes.bool
};

export default LogicFilterBubble;
