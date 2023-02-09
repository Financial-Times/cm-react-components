import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useTooltip } from '../../../../utils/hooks/useTooltip';

jest.mock('../../../../utils/hooks/useTooltip');

import Hint from '../Hint';

export const createDocumentListenersMock = () => {
  const listeners = {};
  const handler = (domEl, event) => listeners[event]({ target: domEl });
  document.addEventListener = jest.fn((event, cb) => {
    listeners[event] = cb;
  });
  document.removeEventListener = jest.fn(event => {
    delete listeners[event];
  });

  return {
    click: domEl => handler(domEl, 'click'),
  };
};

const mockId = 'hint';
const defaultClassName = 'with-tooltip';
const additionalClassName = 'additionalClassName';

const mockHide = jest.fn();
describe('Test `Hint` component', () => {
  beforeEach(() => {
    act(() => {
      useTooltip.mockReturnValue(({
        isVisible: true,
        hideTooltip: mockHide,
        showTooltip: jest.fn(),
        top: 0,
        left: 0
      }));
    });
  });
  afterEach(() => {
    cleanup();
    mockHide.mockClear();
  });

  it('component renders without crashing and has default className', () => {
    const { getByTestId } = render(<Hint />);
    expect(getByTestId(mockId)).toBeInTheDocument();
    expect(getByTestId(mockId)).toHaveClass(defaultClassName);
  });

  it('Hint has additional className when prop is passed', () => {
    const { getByTestId } = render(<Hint className={additionalClassName} />);

    expect(getByTestId(mockId)).toHaveClass(additionalClassName);
  });

  it('Hint is hidden on click on document', () => {
    const fireEvent = createDocumentListenersMock();
    render(<Hint />);

    fireEvent.click(document.body);
    expect(mockHide).toHaveBeenCalledTimes(1);
  });

  it('Hint is not hidden on click inside the component', () => {
    const fireEvent = createDocumentListenersMock();
    const { getByTestId } = render(<Hint>Test</Hint>);

    fireEvent.click(getByTestId(mockId));
    expect(mockHide).toHaveBeenCalledTimes(0);
  });

});
