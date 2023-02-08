import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ListBoxItem } from '../ListBoxItem';

const mockId = 'listBoxItem';
const mockOption = {
  prefLabel: 'mockTitle'
};
const mockOptionWithType = {
  prefLabel: 'mockTitle',
  type: 'genre/Genre'
};
const mockOptionWithWrongType = {
  prefLabel: 'mockTitle',
  type: 'genre/Genres'
};
const mockOptionProps = {
  mockoptionprop: 'mockOptionProp'
};
const classNameDefault = 'list-box-item';

describe('ListBoxItem component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<ListBoxItem option={mockOption} optionProps={mockOptionProps} />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('ListBoxItem has default classname', () => {
    const { getByTestId } = render(<ListBoxItem option={mockOption} optionProps={mockOptionProps} />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('ListBoxItem has attributes from `optionProps`', () => {
    const { getByTestId } = render(<ListBoxItem option={mockOption} optionProps={mockOptionProps} />);
    expect(getByTestId(mockId)).toHaveAttribute('mockoptionprop', mockOptionProps.mockoptionprop);
  });

  it('ListBoxItem renders `type` and `type-label` when `option.type` is passed', () => {
    const { container } = render(<ListBoxItem option={mockOptionWithType} optionProps={mockOptionProps} />);
    expect(container.querySelector('.type')).toBeInTheDocument();
    expect(container.querySelector('.type-label')).toBeInTheDocument();
  });

  it('ListBoxItem does not render type when `option.type` is not passed', () => {
    const { container } = render(<ListBoxItem option={mockOption} optionProps={mockOptionProps} />);
    expect(container.querySelector('.type')).not.toBeInTheDocument();
    expect(container.querySelector('.type-label')).not.toBeInTheDocument();
  });

  it('ListBoxItem renders emtpy `type-label` when there is not such type in predefined ones', () => {
    const { container } = render(<ListBoxItem option={mockOptionWithWrongType} optionProps={mockOptionProps} />);
    expect(container.querySelector('.type')).toBeInTheDocument();
    expect(container.querySelector('.type-label')).toBeInTheDocument();
    expect(container.querySelector('.type-label').textContent).toEqual('');
  });
});
