import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Loader from '../Loader';

const mockId = 'loader';

const classNameDefault = 'o-loading';
const mockPropSize = 'small';
const mockPropTheme = 'dark';

describe('Loader component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('Loader has default className', () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('Loader has `size` className when prop is passed', () => {
    const { getByTestId } = render(<Loader size={mockPropSize} />);
    expect(getByTestId(mockId)).toHaveClass(`${classNameDefault}--${mockPropSize}`);
  });

  it('Loader has `theme` className when prop is passed', () => {
    const { getByTestId } = render(<Loader theme={mockPropTheme} />);
    expect(getByTestId(mockId)).toHaveClass(`${classNameDefault}--${mockPropTheme}`);
  });
});
