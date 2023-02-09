import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FormsField from '../FormsField';

const mockId = 'formsField';
const mockedTitle = 'Mocked Title';

const classNameTitleDefault = 'o-forms-title';

const classNameDefault = 'o-forms-field';
const classNameAdditional = 'mockedAdditionalClassname';
const classNameInline = `${classNameDefault}--inline`;
const classNameOptional = `${classNameDefault}--optional`;
const classNameInverse = `${classNameDefault}--inverse`;

describe('FormsFieldTitle component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<FormsField />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('FormsField has default classname', () => {
    const { getByTestId } = render(<FormsField />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('FormsField has `inline` classname when prop is passed', () => {
    const { getByTestId } = render(<FormsField inline />);
    expect(getByTestId(mockId)).toHaveClass(classNameInline);
  });

  it('FormsField has `optional` classname when prop is passed', () => {
    const { getByTestId } = render(<FormsField optional />);
    expect(getByTestId(mockId)).toHaveClass(classNameOptional);
  });

  it('FormsField has `inverse` classname when prop is passed', () => {
    const { getByTestId } = render(<FormsField inverse />);
    expect(getByTestId(mockId)).toHaveClass(classNameInverse);
  });

  it('FormsField has additional classname when prop is passed', () => {
    const { getByTestId } = render(<FormsField className={classNameAdditional} />);
    expect(getByTestId(mockId)).toHaveClass(classNameAdditional);
  });

  it('FormsField has `title` when prop is passed', () => {
    const { container } = render(<FormsField title={mockedTitle} />);
    expect(container.querySelector(`.${classNameTitleDefault}`)).toBeInTheDocument();
  });

  it('FormsField is `label` when no `containerTag` is passed', () => {
    const { getByTestId } = render(<FormsField />);
    expect(getByTestId(mockId).tagName.toLowerCase()).toBe('label');
  });

  it('FormsField is `div` when `containerTag: div` is passed', () => {
    const { getByTestId } = render(<FormsField containerTag="div" />);
    expect(getByTestId(mockId).tagName.toLowerCase()).toBe('div');
  });
});
