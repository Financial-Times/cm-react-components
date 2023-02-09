import React from 'react';
import { cleanup, render } from '@testing-library/react';

import LogicFilterBubble from '../LogicFilterBubble';

const mockId = 'logicFilterBubble';
const mockExpressionValue = {
  logic: 'and',
  type: 'expression'
};
const mockOnChange = jest.fn();
const mockAddNewFilter = jest.fn();
const mockDeleteExpression = jest.fn();
const mockInsertExpression = jest.fn();

const classNameDefault = 'logic-filter-bubble';
const classNameDefaultLogic = 'logic';
const additionalClassName = 'additional-logic-classname';

const classNameButtons = 'logic-buttons-group';
const classNameAddLine = 'add-line';
const classNameAddGroup = 'add';
const classNameInsert = 'insert';
const classNameDelete = 'delete';

describe('Test LogicFilterBubble component', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(
      <LogicFilterBubble
        expressionValue={mockExpressionValue}
        onChange={mockOnChange}
        addNewFilter={mockAddNewFilter}
        deleteExpression={mockDeleteExpression}
        insertExpression={mockInsertExpression}
      />
    );
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('LogicFilterBubble has default classNames', () => {
    const { getByTestId } = render(
      <LogicFilterBubble
        expressionValue={mockExpressionValue}
        onChange={mockOnChange}
        addNewFilter={mockAddNewFilter}
        deleteExpression={mockDeleteExpression}
        insertExpression={mockInsertExpression}
      />)
    ;
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
    expect(getByTestId(mockId)).toHaveClass(classNameDefaultLogic);
  });

  it('LogicFilterBubble has additional className if props is passed', () => {
    const { getByTestId } = render(
      <LogicFilterBubble
        expressionValue={mockExpressionValue}
        onChange={mockOnChange}
        addNewFilter={mockAddNewFilter}
        deleteExpression={mockDeleteExpression}
        insertExpression={mockInsertExpression}
        className={additionalClassName}
      />
    );
    expect(getByTestId(mockId)).toHaveClass(additionalClassName);
  });

  it('LogicFilterBubble buttons handlers are called correctly', () => {
    const { getByTestId } = render(
      <LogicFilterBubble
        expressionValue={mockExpressionValue}
        onChange={mockOnChange}
        addNewFilter={mockAddNewFilter}
        deleteExpression={mockDeleteExpression}
        insertExpression={mockInsertExpression}
        className={additionalClassName}
      />
    );
    const buttonAddLine = getByTestId(mockId).querySelector(`.${classNameButtons} .${classNameAddLine}`);
    const buttonAddGroup = getByTestId(mockId).querySelector(`.${classNameButtons} .${classNameAddGroup}`);
    const buttonInsertExpression = getByTestId(mockId).querySelector(`.${classNameButtons} .${classNameInsert}`);
    const buttonDeleteExpression = getByTestId(mockId).querySelector(`.${classNameDefault} .${classNameDelete}`);

    expect(mockAddNewFilter.mock.calls).toHaveLength(0);
    buttonAddLine.click();
    expect(mockAddNewFilter.mock.calls).toHaveLength(1);

    buttonAddGroup.click();
    expect(mockAddNewFilter.mock.calls).toHaveLength(2);

    expect(mockInsertExpression.mock.calls).toHaveLength(0);
    buttonInsertExpression.click();
    expect(mockInsertExpression.mock.calls).toHaveLength(1);

    expect(mockDeleteExpression.mock.calls).toHaveLength(0);
    buttonDeleteExpression.click();
    expect(mockDeleteExpression.mock.calls).toHaveLength(1);
  });
});
