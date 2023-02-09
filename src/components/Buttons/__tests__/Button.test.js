import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from '../Button';

const mockId = 'buttonMockId';
const mockText = 'Button mock text';
const mockIconSpecific = 'arrow-left';
const mockClassNameAdditional = 'mockButtonClassName';
const mockOnClick = jest.fn();

const classNameDefault = 'o-buttons';
const classNamePrimary = `${classNameDefault}--primary`;
const classNameSecondary = `${classNameDefault}--secondary`;
const classNameInverse = `${classNameDefault}--inverse`;
const classNameBig = `${classNameDefault}--big`;
const classNameMono = `${classNameDefault}--mono`;
const classNameB2c = `${classNameDefault}--b2c`;
const classNameIcon = `${classNameDefault}-icon`;
const classNameIconSpecific = `${classNameIcon}--${mockIconSpecific}`;
const classNameIconOnly = `${classNameIcon}--icon-only`;

describe('Button component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<Button id={mockId} />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('renders text correctly', () => {
    const { getByText } = render(<Button id={mockId}>{mockText}</Button>);
    expect(getByText(mockText)).toBeInTheDocument();
  });

  it('button is disabled if prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} disabled />);
    expect(getByTestId(mockId)).toBeDisabled();
  });

  it('button is not disabled if prop is not passed', () => {
    const { getByTestId } = render(<Button id={mockId} />);
    expect(getByTestId(mockId)).not.toBeDisabled();
  });

  it('button has `aria-selected` attribute if `selected` prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} selected />);
    expect(getByTestId(mockId)).toHaveAttribute('aria-selected', 'true');
  });

  it('button has default classname', () => {
    const { getByTestId } = render(<Button id={mockId} />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('button has `primary` classname when prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} primary />);
    expect(getByTestId(mockId)).toHaveClass(classNamePrimary);
  });

  it('button has `secondary` classname when prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} secondary />);
    expect(getByTestId(mockId)).toHaveClass(classNameSecondary);
  });

  it('button has `inverse` classname when prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} inverse />);
    expect(getByTestId(mockId)).toHaveClass(classNameInverse);
  });

  it('button has `big` classname when prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} big />);
    expect(getByTestId(mockId)).toHaveClass(classNameBig);
  });

  it('button has `mono` classname when prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} mono />);
    expect(getByTestId(mockId)).toHaveClass(classNameMono);
  });

  it('button has `b2c` classname when prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} b2c />);
    expect(getByTestId(mockId)).toHaveClass(classNameB2c);
  });

  it('button has `icon` classnames when prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} icon={mockIconSpecific} />);
    expect(getByTestId(mockId)).toHaveClass(classNameIcon);
    expect(getByTestId(mockId)).toHaveClass(classNameIconSpecific);
    expect(getByTestId(mockId)).toHaveClass(classNameIconOnly);
  });

  it('button has not `icon-only` classname when children prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} icon={mockIconSpecific}>Icon</Button>);
    expect(getByTestId(mockId)).not.toHaveClass(classNameIconOnly);
  });

  it('button has no origami classnames when props are not passed', () => {
    const { getByTestId } = render(<Button id={mockId} />);
    expect(getByTestId(mockId)).not.toHaveClass(classNamePrimary);
    expect(getByTestId(mockId)).not.toHaveClass(classNameSecondary);
    expect(getByTestId(mockId)).not.toHaveClass(classNameInverse);
    expect(getByTestId(mockId)).not.toHaveClass(classNameBig);
    expect(getByTestId(mockId)).not.toHaveClass(classNameMono);
    expect(getByTestId(mockId)).not.toHaveClass(classNameB2c);
    expect(getByTestId(mockId)).not.toHaveClass(classNameIcon);
    expect(getByTestId(mockId)).not.toHaveClass(classNameIconSpecific);
  });

  it('button has additional classname when prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} className={mockClassNameAdditional} />);
    expect(getByTestId(mockId)).toHaveClass(mockClassNameAdditional);
  });

  it('button has not additional classname when prop is not passed', () => {
    const { getByTestId } = render(<Button id={mockId} />);
    expect(getByTestId(mockId)).not.toHaveClass(mockClassNameAdditional);
  });

  it('button\'s onClick method is called', () => {
    const { getByTestId } = render(<Button id={mockId} onClick={mockOnClick} />);
    getByTestId(mockId).click();
    expect(mockOnClick.mock.calls).toHaveLength(1);
  });
});
