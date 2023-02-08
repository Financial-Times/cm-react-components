import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SelectBox from '../SelectBox';

const mockId = 'selectBox';
const mockOnChange = jest.fn();
const primaryClass = 'primary';
const mockSelectedValue = 'selectedValue';
const mockSelectedValue2 = 'selectedValue2';
const mockOptions = [
  {
    name: 'Selected',
    value: mockSelectedValue,
    type: 'Type'
  }
];
const mockOptionsFull = [
  {
    id: 1,
    name: 'Selected',
    value: mockSelectedValue,
    type: 'Type',
    disabled: true
  }
];
const mockPlaceholderOptions = {
  name: 'PlaceholderName',
  value: 'PlaceholderValue'
};
const mockedIsTouched = true;
const mockedHasError = false;

describe('SelectBox component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<SelectBox onChange={mockOnChange} />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('SelectBox has `primary` class when prop is passed', () => {
    const { getByTestId } = render(<SelectBox onChange={mockOnChange} primary />);
    expect(getByTestId(mockId)).toHaveClass(primaryClass);
  });

  it('SelectBox has not `primary` class when prop is not passed', () => {
    const { getByTestId } = render(<SelectBox onChange={mockOnChange} />);
    expect(getByTestId(mockId)).not.toHaveClass(primaryClass);
  });

  it('SelectBox is `disabled` when prop is passed', () => {
    const { getByTestId } = render(<SelectBox onChange={mockOnChange} disabled />);
    expect(getByTestId(mockId)).toBeDisabled();
  });

  it('SelectBox is not `disabled` when prop is not passed', () => {
    const { getByTestId } = render(<SelectBox onChange={mockOnChange} />);
    expect(getByTestId(mockId)).not.toBeDisabled();
  });

  it('SelectBox has empty value when `selectedValue` is passed but without `options`', () => {
    const { getByTestId } = render(<SelectBox onChange={mockOnChange} selectedValue={mockSelectedValue} />);
    expect(getByTestId(mockId).value).not.toBe(mockSelectedValue);
  });

  it('SelectBox has value `selectedValue` when prop is passed', () => {
    const { getByTestId } = render(
      <SelectBox
        onChange={mockOnChange}
        selectedValue={mockSelectedValue}
        options={mockOptions}
      />
    );
    expect(getByTestId(mockId).value).toBe(mockSelectedValue);
  });

  it('SelectBox has no "placeholder" option when prop is not passed', () => {
    const { getByTestId } = render(
      <SelectBox
        onChange={mockOnChange}
        selectedValue={mockSelectedValue}
        options={mockOptions}
      />
    );
    expect(getByTestId(mockId).children).toHaveLength(mockOptions.length);
  });

  it('SelectBox has "placeholder" option when prop is passed', () => {
    const { getByTestId } = render(
      <SelectBox
        onChange={mockOnChange}
        selectedValue={mockSelectedValue}
        options={mockOptions}
        placeholderOptions={mockPlaceholderOptions}
      />
    );
    expect(getByTestId(mockId).children).toHaveLength(mockOptions.length + 1);
  });

  it('SelectBox "placeholder" is rendered correctly', () => {
    const { getByTestId } = render(
      <SelectBox
        onChange={mockOnChange}
        selectedValue={mockSelectedValue}
        options={mockOptions}
        placeholderOptions={mockPlaceholderOptions}
      />
    );
    expect(getByTestId(mockId).querySelector('option')).toHaveAttribute('value', mockPlaceholderOptions.value);
    expect(getByTestId(mockId).querySelector('option')).toHaveTextContent(mockPlaceholderOptions.name);
    expect(getByTestId(mockId).querySelector('option')).toBeDisabled();
    expect(getByTestId(mockId).querySelector('option')).toHaveAttribute('hidden');
  });

  it('SelectBox `options` keys are correct (key = value)', () => {
    render(
      <SelectBox
        onChange={mockOnChange}
        selectedValue={mockSelectedValue}
        options={mockOptions}
      />
    );
    if (mockOptions.length > 0) {
      const { id, value } = mockOptions[0];
      const optionId = typeof id === 'undefined' ? value : id;
      expect(optionId).toBe(value);
    }
  });

  it('SelectBox `options` keys are correct (key = id)', () => {
    render(
      <SelectBox
        onChange={mockOnChange}
        selectedValue={mockSelectedValue}
        options={mockOptionsFull}
      />
    );
    const { id, value } = mockOptionsFull[0];
    const optionId = typeof id === 'undefined' ? value : id;
    expect(optionId).toBe(id);
  });

  it('SelectBox `options` keys are rendered correctly', () => {
    const { getByTestId } = render(
      <SelectBox
        onChange={mockOnChange}
        selectedValue={mockSelectedValue}
        options={mockOptionsFull}
      />
    );
    const { value, name } = mockOptionsFull[0];
    expect(getByTestId(mockId).querySelector('option')).toBeDisabled();
    expect(getByTestId(mockId).querySelector('option')).toHaveAttribute('value', value);
    expect(getByTestId(mockId).querySelector('option')).toHaveTextContent(name);
  });

  it('SelectBox is valid when it is touched and has no error', () => {
    render(
      <SelectBox
        onChange={mockOnChange}
        selectedValue={mockSelectedValue}
        options={mockOptions}
        isTouched={mockedIsTouched}
        hasError={mockedHasError}
      />
    );
    const valid = mockedIsTouched && !mockedHasError;
    expect(valid).toBe(true);
  });

  it('SelectBox is invalid when it is touched and has error', () => {
    render(
      <SelectBox
        onChange={mockOnChange}
        selectedValue={mockSelectedValue}
        options={mockOptions}
        isTouched={mockedIsTouched}
        hasError={mockedHasError}
      />
    );
    const valid = mockedIsTouched && mockedHasError;
    expect(valid).toBe(false);
  });

  it('SelectBox `onChange` handler is called correctly', () => {
    const { getByTestId } = render(
      <SelectBox
        onChange={mockOnChange}
        selectedValue={mockSelectedValue}
        options={mockOptions}
      />
    );
    const select = getByTestId(mockId);
    expect(mockOnChange.mock.calls).toHaveLength(0);
    fireEvent.change(select, { target: { value: mockSelectedValue2 } });
    expect(mockOnChange.mock.calls).toHaveLength(1);
  });
});
