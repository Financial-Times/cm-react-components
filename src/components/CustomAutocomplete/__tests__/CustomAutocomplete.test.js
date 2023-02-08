import React from 'react';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CustomAutocomplete from '../CustomAutocomplete';

const { error: originalError } = console;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    originalError(...args);
    const error = util.format.apply(this, rest);
    throw new Error(error);
  });
});
afterAll(() => {
  console.error.mockRestore();
});
afterEach(() => {
  cleanup();
  console.error.mockClear();
});

const mockId = 'mockCustomAutocompleteId';
const classNameDefault = 'autocomplete-container';

const mockOptions = [
  {
    prefLabel: 'mockTitle'
  }
];
const mockOptionsInvalid = [
  {
    notTitle: 'mockTitle'
  }
];
const mockOnComplete = jest.fn();
const mockOnChange = jest.fn();
const mockedNewValue = 'mockValue';

describe('CustomAutocomplete component test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('component renders without crashing', () => {
    const { getByTestId } = render(<CustomAutocomplete id={mockId} options={mockOptions} />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('CustomAutocomplete has default classname', () => {
    const { getByTestId } = render(<CustomAutocomplete id={mockId} options={mockOptions} />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('CustomAutocomplete throws an error when invalid `options` array is passed', () => {
    console.error.mockImplementation(() => {
    });
    render(<CustomAutocomplete id={mockId} options={mockOptionsInvalid} />);
    expect(console.error).toHaveBeenCalled();
  });

  it('CustomAutocomplete throws an error when `options` is an object', () => {
    console.error.mockImplementation(() => {
    });
    render(<CustomAutocomplete id={mockId} options={{}} />);
    expect(console.error).toHaveBeenCalled();
  });

  it('CustomAutocomplete `useEffect` is not called on `inputValue` change', () => {
    const { getByTestId } = render(
      <CustomAutocomplete
        id={mockId}
        options={mockOptions}
        onComplete={mockOnComplete}
      />
    );
    const input = getByTestId(mockId).querySelector('input');
    expect(mockOnComplete.mock.calls).toHaveLength(1);
    fireEvent.change(input, { target: { value: mockedNewValue } });
    expect(mockOnComplete.mock.calls).toHaveLength(1);
  });

  it('CustomAutocomplete calls `onChange` handler when it is passed', async () => {
    const { getByTestId } = render(
      <CustomAutocomplete
        id={mockId}
        options={mockOptions}
        onChange={mockOnChange}
      />
    );
    const input = getByTestId(mockId).querySelector('input');
    expect(mockOnChange.mock.calls).toHaveLength(0);
    fireEvent.change(input, { target: { value: mockedNewValue } });
    await wait(() => expect(mockOnChange.mock.calls).toHaveLength(1));
  });
});
