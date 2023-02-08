import React from 'react';
import { cleanup, render } from '@testing-library/react';

import SimilarConceptsList from '../SimilarConceptsList';

const mockListClassname = 'similar-concepts-list';

const mockTitle = 'Title';
const mockConcepts = [
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
const mockConceptClick = jest.fn();
const mockHideTooltip = jest.fn();

describe('SimilarConceptsList component test', () => {
  afterEach(cleanup);

  it('SimilarConceptsList renders when `concepts` are passed', () => {
    const { container } = render(
      <SimilarConceptsList
        title={mockTitle}
        concepts={mockConcepts}
        onConceptClick={mockConceptClick}
        hideTooltip={mockHideTooltip}
      />
    );

    expect(container.querySelector(`.${mockListClassname}`)).toBeInTheDocument();
  });

  it('SimilarConceptsList does not render when `concepts` are not passed', () => {
    const { container } = render(
      <SimilarConceptsList
        title={mockTitle}
        onConceptClick={mockConceptClick}
        hideTooltip={mockHideTooltip}
      />
    );

    expect(container.querySelector(`.${mockListClassname}`)).not.toBeInTheDocument();
  });

  it('SimilarConceptsList renders children correctly', () => {
    const { container } = render(
      <SimilarConceptsList
        title={mockTitle}
        concepts={mockConcepts}
        onConceptClick={mockConceptClick}
        hideTooltip={mockHideTooltip}
      />
    );

    expect(container.querySelector(`.${mockListClassname}`).children).toHaveLength(2);
    expect(container.querySelector(`.${mockListClassname} .title`)).toHaveTextContent(mockTitle);
    expect(container.querySelector(`.${mockListClassname} .concepts`).children).toHaveLength(mockConcepts.length);
  });
});
