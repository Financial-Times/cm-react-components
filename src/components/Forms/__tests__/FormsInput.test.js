import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FormsInput } from '../FormsInput';

const mockId = 'formsInput';
const mockedErrorMessage = 'Mocked Error Message';

const classNameDefault = 'o-forms-input';
const classNameAdditional = 'mockedAdditionalClassname';
const classNameError = `${classNameDefault}__error`;
const classNameValid = `${classNameDefault}--valid`;
const classNameInvalid = `${classNameDefault}--invalid`;
const classNameSmall = `${classNameDefault}--small`;
const classNameInline = `${classNameDefault}--inline`;

describe('FormsFieldTitle component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<FormsInput />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('FormsInput has default classname', () => {
    const { getByTestId } = render(<FormsInput />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('FormsInput has `valid` classname when prop is passed', () => {
    const { getByTestId } = render(<FormsInput valid />);
    expect(getByTestId(mockId)).toHaveClass(classNameValid);
  });

  it('FormsInput has `invalid` classname when `hasError` prop is passed', () => {
    const { getByTestId } = render(<FormsInput hasError />);
    expect(getByTestId(mockId)).toHaveClass(classNameInvalid);
  });

  it('FormsInput has `small` classname when prop is passed', () => {
    const { getByTestId } = render(<FormsInput small />);
    expect(getByTestId(mockId)).toHaveClass(classNameSmall);
  });

  it('FormsInput has `inline` classname when prop is passed', () => {
    const { getByTestId } = render(<FormsInput inline />);
    expect(getByTestId(mockId)).toHaveClass(classNameInline);
  });

  it('FormsInput has additional classname when prop is passed', () => {
    const { getByTestId } = render(<FormsInput className={classNameAdditional} />);
    expect(getByTestId(mockId)).toHaveClass(classNameAdditional);
  });

  it('FormsInput has `error` when prop is passed', () => {
    const { container } = render(<FormsInput hasError />);
    expect(container.querySelector(`.${classNameError}`)).toBeInTheDocument();
  });

  it('FormsInput has correct `errorMessage`', () => {
    const { container } = render(<FormsInput hasError errorMessage={mockedErrorMessage} />);
    expect(container.querySelector(`.${classNameError}`).textContent).toBe(mockedErrorMessage);
  });
});
