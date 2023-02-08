import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import RadioInput from '../RadioInput';

const mockId = 'radioInputs';
const classNameDefault = 'o-forms-input--radio-box__container';
const mockOptions = [
  {
    name: 'Option 1',
    value: 'option1'
  }, {
    name: 'Option 2',
    value: 'option2'
  }
];
const mockSelectedValue = 'option1';
const mockOnChange = jest.fn();

describe('RadioInput component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<RadioInput />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('RadioInput has no children when `options` is not passed', () => {
    const { getByTestId } = render(<RadioInput />);
    expect(getByTestId(mockId).children).toHaveLength(0);
  });

  it('RadioInput has children.length equal to `options.length` when options is passed', () => {
    const { getByTestId } = render(<RadioInput options={mockOptions} onChange={mockOnChange} />);
    expect(getByTestId(mockId).children).toHaveLength(mockOptions.length);
  });

  it('RadioInput: container of inputs has default "box" classname when `isRounded` is false', () => {
    const { getByTestId } = render(<RadioInput />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('RadioInput: container of inputs has not default "box" classname when `isRounded` is true', () => {
    const { getByTestId } = render(<RadioInput isRounded />);
    expect(getByTestId(mockId)).not.toHaveClass(classNameDefault);
  });

  it('RadioInput inputs are `disabled` when prop is passed', () => {
    const { getByTestId } = render(<RadioInput options={mockOptions} onChange={mockOnChange} disabled />);
    getByTestId(mockId).querySelectorAll('input[type="radio"]')
      .forEach(radio => {
        expect(radio).toBeDisabled();
      });
  });

  it('RadioInput inputs are not `disabled` when prop is not passed', () => {
    const { getByTestId } = render(<RadioInput options={mockOptions} onChange={mockOnChange} />);
    getByTestId(mockId).querySelectorAll('input[type="radio"]')
      .forEach(radio => {
        expect(radio).not.toBeDisabled();
      });
  });

  it('RadioInput input with `value = selectedValue` is checked, the others are not', () => {
    const { getByTestId } = render(<RadioInput options={mockOptions} selectedValue={mockSelectedValue} onChange={mockOnChange}/>);

    getByTestId(mockId).querySelectorAll('input[type="radio"]')
      .forEach(radio => {
        if (radio.value === mockSelectedValue) {
          expect(radio).toHaveAttribute('checked');
        } else {
          expect(radio).not.toHaveAttribute('checked');
        }
      });
  });

  it('RadioInput has no checked input when `selectedValue` is not passed', () => {
    const { getByTestId } = render(<RadioInput options={mockOptions} onChange={mockOnChange} />);

    getByTestId(mockId).querySelectorAll('input[type="radio"]')
      .forEach(radio => {
        expect(radio).not.toHaveAttribute('checked');
      });
  });

  it('RadioInput inputs are rendered correctly', () => {
    const { getByTestId } = render(<RadioInput options={mockOptions} onChange={mockOnChange} />);

    const { value, name } = mockOptions[0];
    expect(getByTestId(mockId).querySelector('input[type="radio"]')).toHaveAttribute('value', value);
    expect(getByTestId(mockId).querySelector('.o-forms-input__label')).toHaveTextContent(name);
  });

  it('RadioInput changeHandler is called correctly', () => {
    const { getByTestId } = render(<RadioInput options={mockOptions} onChange={mockOnChange} />);

    const input = getByTestId(mockId).querySelector('input:not(checked)');
    expect(mockOnChange.mock.calls).toHaveLength(0);
    input.click();
    expect(mockOnChange.mock.calls).toHaveLength(1);
  });
});
