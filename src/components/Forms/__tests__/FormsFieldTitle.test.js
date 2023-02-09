import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FormsFieldTitle } from '../FormsFieldTitle';

const mockId = 'formsFieldTitleContainer';
const defaultChildrenLength = 1;

const classNameDefault = 'o-forms-title';
const classNameVerticalCenter = `${classNameDefault}--vertical-center`;
const classNameShrink = `${classNameDefault}--shrink`;

describe('FormsFieldTitle component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<FormsFieldTitle />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('FormsFieldTitle has default classname', () => {
    const { getByTestId } = render(<FormsFieldTitle />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('FormsFieldTitle has `vertical-center` classname when prop is passed', () => {
    const { getByTestId } = render(<FormsFieldTitle verticalCenter />);
    expect(getByTestId(mockId)).toHaveClass(classNameVerticalCenter);
  });

  it('FormsFieldTitle has `shrink` classname when prop is passed', () => {
    const { getByTestId } = render(<FormsFieldTitle shrink />);
    expect(getByTestId(mockId)).toHaveClass(classNameShrink);
  });

  it('FormsFieldTitle has `no prompt` when prop is not passed', () => {
    const { getByTestId } = render(<FormsFieldTitle />);
    expect((getByTestId(mockId)).children).toHaveLength(defaultChildrenLength);
  });

  it('FormsFieldTitle has `prompt` when prop is passed', () => {
    const { getByTestId } = render(<FormsFieldTitle prompt="Mocked prompt" />);
    expect((getByTestId(mockId)).children).toHaveLength(defaultChildrenLength + 1);
  });
});
