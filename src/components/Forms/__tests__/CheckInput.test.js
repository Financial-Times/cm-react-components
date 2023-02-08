import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CheckInput from '../CheckInput';

const mockId = 'checkboxInput';
const mockOnChange = jest.fn();
const classNameDefault = 'checkbox';
const classNameParentDefault = 'o-forms-input';
const classNameParentToggle = `${classNameParentDefault}--toggle`;

describe('CheckInput component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<CheckInput checked={true} onChange={mockOnChange} />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('CheckInput has default classname', () => {
    const { getByTestId } = render(<CheckInput checked={true} onChange={mockOnChange} />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('CheckInput parent is "toggle-type" when `isToggle` prop is passed', () => {
    const { getByTestId } = render(<CheckInput checked={true} onChange={mockOnChange} isToggle />);
    const formsInput = (getByTestId(mockId).closest(`.${classNameParentDefault}`));
    expect(formsInput).toHaveClass(classNameParentToggle);
  });

  it('CheckInput parent is "checkbox-type" when `isToggle` prop is not passed', () => {
    const { getByTestId } = render(<CheckInput checked={true} onChange={mockOnChange} />);
    const formsInput = (getByTestId(mockId).closest(`.${classNameParentDefault}`));
    expect(formsInput).not.toHaveClass(classNameParentToggle);
  });

  it('CheckInput is `checked` when passed prop is `true`', () => {
    const { getByTestId } = render(<CheckInput checked={true} onChange={mockOnChange} />);
    expect(getByTestId(mockId)).toHaveAttribute('checked');
  });

  it('CheckInput is not `checked` when passed prop is `false`', () => {
    const { getByTestId } = render(<CheckInput checked={false} onChange={mockOnChange} />);
    expect(getByTestId(mockId)).not.toHaveAttribute('checked');
  });

  it('CheckInput is `disabled` when prop is passed', () => {
    const { getByTestId } = render(<CheckInput checked={true} onChange={mockOnChange} disabled />);
    expect(getByTestId(mockId)).toBeDisabled();
  });

  it('CheckInput `onChange` handler is called correctly', () => {
    const { getByTestId } = render(<CheckInput checked={true} onChange={mockOnChange} />);
    const checkbox = getByTestId(mockId);
    expect(mockOnChange.mock.calls).toHaveLength(0);
    fireEvent.change(checkbox, { target: { checked: false } });
    expect(mockOnChange.mock.calls).toHaveLength(0);
  });
});
