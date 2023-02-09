import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ListBox } from '../ListBox';

const mockId = 'listBox';
const classNameDefault = 'list-box';
const classNameUnstyled = 'o-layout__unstyled-element';
const mockListProps = {
  mockoptionprop: 'mockOptionProp'
};
const mockListOptions = [
  {
    title: 'mockTitle'
  }
];
const mockGetOptionProps = jest.fn(() => ({
  mockoptionprop: 'mockOptionProp'
}));

describe('ListBox component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(
      <ListBox
        listOptions={mockListOptions}
        listProps={mockListProps}
        getOptionProps={mockGetOptionProps}
      />
    );

    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('ListBox has default classnames', () => {
    const { getByTestId } = render(
      <ListBox
        listOptions={mockListOptions}
        listProps={mockListProps}
        getOptionProps={mockGetOptionProps}
      />
    );

    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
    expect(getByTestId(mockId)).toHaveClass(classNameUnstyled);
  });

  it('ListBox has `listOptions.length` children', () => {
    const { getByTestId } = render(
      <ListBox
        listOptions={mockListOptions}
        listProps={mockListProps}
        getOptionProps={mockGetOptionProps}
      />
    );

    expect(getByTestId(mockId).children).toHaveLength(mockListOptions.length);
  });
});
