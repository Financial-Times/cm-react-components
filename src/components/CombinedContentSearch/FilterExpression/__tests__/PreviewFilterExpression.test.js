import React from 'react';
import { cleanup, render } from '@testing-library/react';

import PreviewFilterExpression from '../PreviewFilterExpression';

const mockId = 'previewFilterExpression';
const classNameDefault = 'preview-filter-expression-container';

const mockExpression = {
  type: 'expression',
  logic: 'and',
  operands: [
    {
      type: 'content-type-filter',
      value: 'article'
    },
    {
      type: 'related-entity-filter',
      relationship: 'mentions',
      value: 'Michael martin'
    },
    {
      type: 'keyword-filter',
      value: 'London'
    },
    {
      type: 'expression',
      logic: 'or',
      operands: [
        {
          type: 'keyword-filter',
          value: 'New York'
        }
      ]
    },
    {
      type: 'expression',
      logic: 'or',
      operands: []
    }
  ]
};

describe('Test PreviewFilterExpression component', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<PreviewFilterExpression />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('PreviewFilterExpression has default classname', () => {
    const { getByTestId } = render(<PreviewFilterExpression />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('PreviewFilterExpression has 1 child when `expression` is not passed', () => {
    const { getByTestId } = render(<PreviewFilterExpression />);
    expect(getByTestId(mockId).children).toHaveLength(1);
  });

  it('PreviewFilterExpression has 2 children when `expression` is passed', () => {
    const { getByTestId } = render(<PreviewFilterExpression expression={mockExpression} />);
    expect(getByTestId(mockId).children).toHaveLength(2);
  });

  it('PreviewFilterExpression has one `no-connector` and `no-padding` elements', () => {
    const { getByTestId } = render(<PreviewFilterExpression expression={mockExpression} />);
    expect(getByTestId(mockId).querySelectorAll('.no-connector').length).toEqual(1);
    expect(getByTestId(mockId).querySelectorAll('.no-padding').length).toEqual(1);
  });
});
