import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useInput } from '../../../../utils/hooks/useInput';

jest.mock('../../../../utils/hooks/useInput');

import FilterBubble from '../FilterBubble';

const mockId = 'filterBubble';
const mockOnChange = jest.fn();

const mockOnChangeInput = jest.fn();

const mockNewValue = 'Keyword';
const mockAutocompleteFinish = jest.fn();
const mockAutocompleteId = 'mockAutocompleteId';
const mockAutocompleteOptions = [
  {
    prefLabel: 'mockTitle'
  }
];
const mockKeywordValue = 'keyword-filter';

const classNameDefault = 'filter-bubble';

describe('Test FilterBubble component', () => {
  beforeEach(() => {
    act(() => {
      useInput.mockReturnValueOnce(({
        value: mockNewValue,
        onChange: mockOnChangeInput
      }));
    });
  });
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(
      <FilterBubble
        onChange={mockOnChange}
        autocompleteId={mockAutocompleteId}
        autocompleteOptions={mockAutocompleteOptions}
      />
    );
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('FilterBubble has default classname', () => {
    const { getByTestId } = render(
      <FilterBubble
        onChange={mockOnChange}
        autocompleteId={mockAutocompleteId}
        autocompleteOptions={mockAutocompleteOptions}
      />
    );
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('FilterBubble onChange and onBlur handlers are called correctly', () => {
    const { getByTestId } = render(
      <FilterBubble
        value={mockKeywordValue}
        onChange={mockOnChange}
        autocompleteId={mockAutocompleteId}
        autocompleteOptions={mockAutocompleteOptions}
        autocompleteFinish={mockAutocompleteFinish}
      />
    );
    const input = getByTestId(mockId).querySelector('.input-container input');
    expect(mockOnChangeInput.mock.calls).toHaveLength(0);
    fireEvent.change(input, { target: { value: 'mockNewValue' } });
    expect(mockOnChangeInput.mock.calls).toHaveLength(1);

    expect(mockAutocompleteFinish.mock.calls).toHaveLength(0);
    fireEvent.focusOut(input);
    expect(mockAutocompleteFinish.mock.calls).toHaveLength(1);
    expect(mockAutocompleteFinish).toHaveBeenCalledWith(mockNewValue);
  });

  it('FilterBubble set customAutoCompleteInputProps correctly', () =>{
    const { getByTestId } = render(
      <FilterBubble
        value={mockNewValue}
        onChange={mockOnChange}
        autocompleteId={mockAutocompleteId}
        autocompleteOptions={mockAutocompleteOptions}
        autocompleteFinish={mockAutocompleteFinish}
        customAutocompleteInputProps={ { maxLength: 12, disabled: true } }
      />
    );
    const customAutocompleteInput = getByTestId(mockId).querySelector('.autocomplete-container input')

    expect(customAutocompleteInput.maxLength).toBe(12);
    expect(customAutocompleteInput).toBeDisabled();
  })

  it('FilterBubble set textInputProps correctly', () =>{
    const { getByTestId } = render(
      <FilterBubble
        value={mockKeywordValue}
        onChange={mockOnChange}
        autocompleteId={mockAutocompleteId}
        autocompleteOptions={mockAutocompleteOptions}
        autocompleteFinish={mockAutocompleteFinish}
        textInputProps={ { maxLength: 10, disabled: true } }
      />
    );
    const textInput = getByTestId(mockId).querySelector('.input-container input')

    expect(textInput.maxLength).toBe(10);
    expect(textInput).toBeDisabled();
  })

  it('FilterBubble onKeyDown handler is called correctly', () => {
    const { getByTestId } = render(
      <FilterBubble
        value={mockKeywordValue}
        onChange={mockOnChange}
        autocompleteId={mockAutocompleteId}
        autocompleteOptions={mockAutocompleteOptions}
        autocompleteFinish={mockAutocompleteFinish}
      />
    );
    const input = getByTestId(mockId).querySelector('.input-container input');
    const oldValue = input.value;
    fireEvent.keyDown(input,
      {
        key: ' ',
        keyCode: 32
      });

    expect(input.value).toBe(`${oldValue}`);

    fireEvent.keyDown(input,
      {
        key: 'a',
        keyCode: 65
      });

    expect(input.value).toBe(`${oldValue}`);
  });
});
