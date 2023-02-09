import React from 'react';
import { cleanup, render } from '@testing-library/react';

import ExpressionGroup from '../ExpressionGroup';

const mockId = 'expressionGroup';
const mockExpression = {
  id: 1,
  type: 'expression',
  logic: 'and',
  operands: [
    {
      id: 2,
      type: 'content-type-filter',
      value: 'article'
    },
    {
      id: 3,
      type: 'related-entity-filter',
      relationship: 'mentions',
      value: 'Michael martin'
    },
    {
      id: 4,
      type: 'keyword-filter',
      value: 'London',
      editMode: true
    }
  ]
};

const classNameNoPadding = 'no-padding';

describe('Test ExpressionGroup component', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<ExpressionGroup expression={mockExpression} />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('ExpressionGroup first expression has correct classes', () => {
    const { getByTestId } = render(
      <ExpressionGroup
        expression={mockExpression}
        isFirst
      />
    );
    expect(getByTestId(mockId)).toHaveClass(classNameNoPadding);
  });
});
