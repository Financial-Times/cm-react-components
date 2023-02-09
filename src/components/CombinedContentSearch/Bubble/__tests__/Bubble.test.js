import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Bubble from '../Bubble';

const mockId = 'bubbleContainer';
const classNameDefault = 'bubble-container';
const classNamePrimary = 'primary';

describe('Test Bubble component', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<Bubble />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('Bubble has default classname', () => {
    const { getByTestId } = render(<Bubble />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('Bubble has `primary` class when prop is passed', () => {
    const { getByTestId } = render(<Bubble primary />);
    expect(getByTestId(mockId)).toHaveClass(classNamePrimary);
  });
});
