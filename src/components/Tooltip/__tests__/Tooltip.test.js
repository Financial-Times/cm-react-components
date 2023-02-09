import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Tooltip from '../Tooltip';

const mockId = 'tooltip';

const classNameDefault = 'o-tooltip';
const classNameArrowLeft = `${classNameDefault}--arrow-left`;
const classNameArrowAlignMiddle = `${classNameDefault}-arrow--align-middle`;
const classNameVisible = 'visible';
const classNameClose = `${classNameDefault}-close`;

const arrowWidth = 12;
const mockTop = 10;
const mockLeft = 30;
const mockTooltipRef = {
  current: {
    clientHeight: 20
  }
};
const mockClose = jest.fn();

describe('Tooltip component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<Tooltip />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('Tooltip has default classNames', () => {
    const { getByTestId } = render(<Tooltip />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
    expect(getByTestId(mockId)).toHaveClass(classNameArrowLeft);
    expect(getByTestId(mockId)).toHaveClass(classNameArrowAlignMiddle);
  });

  it('Tooltip has no `visible` className when `isVisible` prop is false', () => {
    const { getByTestId } = render(<Tooltip isVisible={false} />);
    expect(getByTestId(mockId)).not.toHaveClass(classNameVisible);
  });

  it('Tooltip has `visible` className when `isVisible` prop is true', () => {
    const { getByTestId } = render(<Tooltip isVisible />);
    expect(getByTestId(mockId)).toHaveClass(classNameVisible);
  });

  it('Tooltip has correct top position', () => {
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue(mockTooltipRef);
    expect(useRefSpy).toBeCalledTimes(0);
    const { getByTestId } = render(<Tooltip top={mockTop} />);
    useRefSpy();
    expect(useRefSpy).toBeCalledTimes(2);
    const topPosition = (mockTooltipRef.current.clientHeight - mockTop) / 2;
    expect(getByTestId(mockId)).toHaveStyle(`top: ${topPosition}px`);
  });

  it('Tooltip has correct left position', () => {
    const { getByTestId } = render(<Tooltip left={mockLeft} />);
    expect(getByTestId(mockId)).toHaveStyle(`left: ${mockLeft + arrowWidth}px`);
  });

  it('Tooltip renders close button when prop is passed', () => {
    const { getByTestId } = render(<Tooltip close={mockClose} />);
    expect(getByTestId(mockId).querySelector(`.${classNameClose}`)).toBeInTheDocument();
  });

  it('Tooltip close button handler is called correctly', () => {
    const { getByTestId } = render(<Tooltip close={mockClose} />);
    const closeButton = getByTestId(mockId).querySelector(`.${classNameClose}`);
    expect(mockClose.mock.calls).toHaveLength(0);
    closeButton.click();
    expect(mockClose.mock.calls).toHaveLength(1);
  });
});
