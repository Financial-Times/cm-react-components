import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import TimePeriod from '../TimePeriod';

const mockId = 'timePeriod';
const mockSelectId = 'selectBox';
const classNameDefault = 'time-period-container';
const classNameEditable = 'editable';
const classNameFrom = 'from';
const classNameTo = 'to';
const classNameDate = 'date';

const mockOnChange = jest.fn();
const mockOnSetEmbargoPeriod = jest.fn();

describe('Test `TimePeriod` component', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<TimePeriod />);
    expect(getByTestId(mockId)).toBeInTheDocument();
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('TimePeriod has `editable` className when prop is passed', () => {
    const { getByTestId } = render(<TimePeriod isEditable onChange={mockOnChange} />);
    expect(getByTestId(mockId)).toHaveClass(classNameEditable);
  });

  it('TimePeriod has no `.date` children when prop isEditable is passed', () => {
    const { getByTestId } = render(<TimePeriod isEditable onChange={mockOnChange} />);
    expect(getByTestId(mockId).querySelector(`.${classNameFrom} .${classNameDate}`)).not.toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${classNameTo} .${classNameDate}`)).not.toBeInTheDocument();
  });

  it('TimePeriod has `.date` children when prop isEditable is not passed', () => {
    const { getByTestId } = render(<TimePeriod />);
    expect(getByTestId(mockId).querySelector(`.${classNameFrom} .${classNameDate}`)).toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${classNameTo} .${classNameDate}`)).toBeInTheDocument();
  });

  it('TimePeriod set formsFieldProps correctly', () => {
    const { getByTestId } = render(<TimePeriod isEditable={true} setEmbargoPeriod={mockOnSetEmbargoPeriod} onChange={mockOnChange} formsFieldProps={ { titleProps: { shrink: true } } }/>);

    const title = getByTestId('formsFieldTitleContainer')
    expect(title.className).toBe('o-forms-title o-forms-title--shrink');
  });
  
  it('TimePeriod set checkInputProps correctly', () => {
    const { getByTestId } = render(<TimePeriod isEditable={true} setEmbargoPeriod={mockOnSetEmbargoPeriod} onChange={mockOnChange} checkInputProps={ { disabled: true } }/>);

    const input = getByTestId(mockId).querySelector('input');
    expect(input).toBeDisabled();
  });

  it('TimePeriod set selectBoxProps correctly', () => {
    const { getByTestId } = render(<TimePeriod isEditable={true} onChange={mockOnChange} selectBoxProps={ { disabled: true } }/>);

    const selectBox = getByTestId(mockSelectId);
    expect(selectBox).toBeDisabled();
  });

  it('TimePeriod clear date clickHandler is called', () => {
    const { getByTestId } = render(<TimePeriod isEditable onChange={mockOnChange} />);
    const input = getByTestId(mockSelectId);
    fireEvent.change(input, { target: { value: '24' } });
    expect(mockOnChange.mock.calls).toHaveLength(1);
  });
});
