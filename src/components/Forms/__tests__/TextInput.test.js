import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TextInput from '../TextInput';

const mockId = 'textInput';
const mockValue = 'Mock value';
const mockValue2 = 'Mock value 2';
const mockOnChange = jest.fn();
const inputType = 'password';
const mockedIsTouched = true;
const mockedHasError = false;
const mockedRowsCountDefault = 4;
const mockedRowsCount = 20;

describe('TextInput component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<TextInput value={mockValue} onChange={mockOnChange} />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('TextInput is an input of type `text` when `inputType` is not passed', () => {
    const { getByTestId } = render(<TextInput value={mockValue} onChange={mockOnChange} />);
    expect(getByTestId(mockId).tagName.toLowerCase()).toBe('input');
    expect(getByTestId(mockId).type.toLowerCase()).toBe('text');
  });

  it('TextInput is an input of different type when `inputType` is passed', () => {
    const { getByTestId } = render(
      <TextInput
        value={mockValue}
        onChange={mockOnChange}
        inputType={inputType}
      />
    );
    expect(getByTestId(mockId).tagName.toLowerCase()).toBe('input');
    expect(getByTestId(mockId).type.toLowerCase()).toBe(inputType);
  });

  it('TextInput is a textarea when `inputType: textarea`', () => {
    const { getByTestId } = render(
      <TextInput
        value={mockValue}
        onChange={mockOnChange}
        inputType="textarea"
      />
    );
    expect(getByTestId(mockId).tagName.toLowerCase()).toBe('textarea');
  });

  it('TextInput has `value` equal to passed prop', () => {
    const { getByTestId } = render(
      <TextInput
        value={mockValue}
        onChange={mockOnChange}
      />
    );
    expect(getByTestId(mockId).value).toBe(mockValue);
    expect(getByTestId(mockId).value).not.toBe(mockValue2);
  });

  it('TextInput is `disabled` when prop is passed', () => {
    const { getByTestId } = render(
      <TextInput
        value={mockValue}
        onChange={mockOnChange}
        disabled
      />
    );
    expect(getByTestId(mockId)).toBeDisabled();
  });

  it('TextInput is not `disabled` when prop is not passed', () => {
    const { getByTestId } = render(
      <TextInput
        value={mockValue}
        onChange={mockOnChange}
      />
    );
    expect(getByTestId(mockId)).not.toBeDisabled();
  });

  it('TextInput `onChange` handler is called correctly', () => {
    const { getByTestId } = render(
      <TextInput
        value={mockValue}
        onChange={mockOnChange}
      />
    );
    const input = getByTestId(mockId);
    expect(mockOnChange.mock.calls).toHaveLength(0);
    fireEvent.change(input, { target: { value: mockValue2 } });
    expect(mockOnChange.mock.calls).toHaveLength(1);
  });

  it('TextInput is valid when it is touched and has no error', () => {
    render(
      <TextInput
        value={mockValue}
        onChange={mockOnChange}
        isTouched={mockedIsTouched}
        hasError={mockedHasError}
      />
    );
    const valid = mockedIsTouched && !mockedHasError;
    expect(valid).toBe(true);
  });

  it('TextInput is invalid when it is touched and has error', () => {
    render(
      <TextInput
        value={mockValue}
        onChange={mockOnChange}
        isTouched={mockedIsTouched}
        hasError={mockedHasError}
      />
    );
    const valid = mockedIsTouched && mockedHasError;
    expect(valid).toBe(false);
  });

  it('TextInput of type `textarea` has default `rows` property value when prop is not passed', () => {
    const { getByTestId } = render(
      <TextInput
        value={mockValue}
        onChange={mockOnChange}
        inputType="textarea"
      />
    );
    expect(getByTestId(mockId)).toHaveAttribute('rows', mockedRowsCountDefault.toString());
  });

  it('TextInput of type `textarea` has passed `rows` property value', () => {
    const { getByTestId } = render(
      <TextInput
        value={mockValue}
        onChange={mockOnChange}
        inputType="textarea"
        rows={20}
      />
    );
    expect(getByTestId(mockId)).toHaveAttribute('rows', mockedRowsCount.toString());
  });
});
