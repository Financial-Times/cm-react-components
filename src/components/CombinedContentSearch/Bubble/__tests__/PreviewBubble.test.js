import React from 'react';
import { cleanup, render } from '@testing-library/react';

import PreviewBubble from '../PreviewBubble';
import { FILTER_EXPRESSION_TYPES } from '../../../../utils/constants';

const mockId = 'previewBubble';
const mockFilterId = 1;
const mockType = 'type';
const mockKeywordType = 'keyword-filter';
const mockValue = 'Value';
const mockActions = {
  edit: jest.fn(),
  delete: jest.fn()
};
const mockNarrowerConcepts = [
  {
    concept: {
      uuid: '1',
      id: '1',
      prefLabel: 'PrefLabel',
      type: 'Type'
    }
  }, {
    concept: {
      uuid: '2',
      id: '2',
      prefLabel: 'PrefLabel',
      type: 'Type'
    }
  }
];
const mockRelatedConcepts = [
  {
    concept: {
      uuid: '3',
      id: '3',
      prefLabel: 'PrefLabel',
      type: 'Type'
    }
  }, {
    concept: {
      uuid: '4',
      id: '4',
      prefLabel: 'PrefLabel',
      type: 'Type'
    }
  }
];

const classNameDefault = 'preview-bubble';
const classNameValue = 'value';
const classNameActions = 'action-buttons';
const classNameEdit = 'pencil';
const classNameDelete = 'delete';

describe('Test PreviewBubble component', () => {
  afterEach(() => {
    mockActions.edit.mockClear();
    mockActions.delete.mockClear();
    cleanup();
  });

  it('component renders without crashing', () => {
    const { getByTestId } = render(<PreviewBubble />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('PreviewBubble has default classname', () => {
    const { getByTestId } = render(<PreviewBubble />);
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('PreviewBubble renders children correctly without actions', () => {
    const { getByTestId } = render(<PreviewBubble type={mockType} value={mockValue} />);
    expect(getByTestId(mockId).children).toHaveLength(2);
    expect(getByTestId(mockId).querySelector(`.${classNameActions}`)).not.toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${classNameValue}`)).toHaveTextContent(mockValue);
  });

  it('PreviewBubble renders children correctly with actions', () => {
    const { getByTestId } = render(<PreviewBubble type={mockType} value={mockValue} actions={mockActions} />);
    expect(getByTestId(mockId).children).toHaveLength(3);
    expect(getByTestId(mockId).querySelector(`.${classNameActions}`)).toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${classNameValue}`)).toHaveTextContent(mockValue);
  });

  it('PreviewBubble renders children correctly with actions and narrower concepts', () => {
    const { getByTestId } = render(
      <PreviewBubble
        type={mockType}
        value={mockValue}
        actions={mockActions}
        narrower={mockNarrowerConcepts}
      />
    );
    expect(getByTestId(mockId).children).toHaveLength(4);
    expect(getByTestId(mockId).querySelector(`.${classNameActions}`)).toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${classNameValue}`)).toHaveTextContent(mockValue);
  });

  it('PreviewBubble renders children correctly with actions and related concepts', () => {
    const { getByTestId } = render(
      <PreviewBubble
        type={mockType}
        value={mockValue}
        actions={mockActions}
        related={mockRelatedConcepts}
      />
    );
    expect(getByTestId(mockId).children).toHaveLength(4);
    expect(getByTestId(mockId).querySelector(`.${classNameActions}`)).toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${classNameValue}`)).toHaveTextContent(mockValue);
  });

  it('PreviewBubble action buttons handlers are called correctly', () => {
    const { getByTestId } = render(
      <PreviewBubble
        id={mockFilterId}
        type={mockKeywordType}
        value={mockValue}
        actions={mockActions}
        options={[]}
      />
    );
    const editButton = getByTestId(mockId).querySelector(`.${classNameActions} .${classNameEdit}`);
    const deleteButton = getByTestId(mockId).querySelector(`.${classNameActions} .${classNameDelete}`);
    expect(mockActions.edit.mock.calls).toHaveLength(0);
    expect(mockActions.delete.mock.calls).toHaveLength(0);
    editButton.click();
    deleteButton.click();
    expect(mockActions.edit.mock.calls).toHaveLength(1);
    expect(mockActions.edit).toHaveBeenCalledWith({
      id: mockFilterId,
      type: mockKeywordType,
      value: mockValue,
      options: [],
      editMode: true
    });
    expect(mockActions.delete.mock.calls).toHaveLength(1);
  });

  it('PreviewBubble edit button handlers are called correctly', () => {
    const { getByTestId } = render(
      <PreviewBubble
        id={mockFilterId}
        type={mockType}
        value={mockValue}
        actions={mockActions}
        options={[]}
      />
    );
    const editButton = getByTestId(mockId).querySelector(`.${classNameActions} .${classNameEdit}`);
    expect(mockActions.edit.mock.calls).toHaveLength(0);
    editButton.click();
    expect(mockActions.edit.mock.calls).toHaveLength(1);
    expect(mockActions.edit).toHaveBeenCalledWith({
      id: mockFilterId,
      type: FILTER_EXPRESSION_TYPES.relatedEntity,
      relationship: mockType,
      value: '',
      options: [],
      editMode: true
    });
  });
});
