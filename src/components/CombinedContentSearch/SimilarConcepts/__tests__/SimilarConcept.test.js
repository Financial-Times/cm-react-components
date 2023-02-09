import React from 'react';
import { cleanup, render } from '@testing-library/react';

import { SimilarConcept } from '../SimilarConcept';

const mockId = 'similarConceptContainer';
const mockPrefLabel = 'prefLabel';
const mockConceptClick = jest.fn();
const mockConceptId = '1234';
const mockType = 'Type';
const mockTypeForSimilarConcepts = 'Topic';
const mockHideTooltip = jest.fn();
const mockArgumentObject = {
  prefLabel: mockPrefLabel,
  id: mockConceptId,
  type: mockType
};

describe('SimilarConcept component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(
      <SimilarConcept
        prefLabel={mockPrefLabel}
        onConceptClick={mockConceptClick}
        id={mockConceptId}
        type={mockType}
        hideTooltip={mockHideTooltip}
      />
    );

    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('SimilarConcept has correct `prefLabel`', () => {
    const { container } = render(
      <SimilarConcept
        prefLabel={mockPrefLabel}
        onConceptClick={mockConceptClick}
        id={mockConceptId}
        type={mockType}
        hideTooltip={mockHideTooltip}
      />
    );

    expect(container.querySelector('.single-concept span')).toHaveTextContent(mockPrefLabel);
  });

  it('SimilarConcept click handler is called correctly without request for similar concepts', () => {
    const { getByTestId } = render(
      <SimilarConcept
        prefLabel={mockPrefLabel}
        onConceptClick={mockConceptClick}
        id={mockConceptId}
        type={mockType}
        hideTooltip={mockHideTooltip}
      />
    );

    getByTestId(mockId).click();
    expect(mockConceptClick).toHaveBeenCalledWith(mockArgumentObject);
    expect(mockHideTooltip).toHaveBeenCalled();
  });

  it('SimilarConcept click handler is called correctly with request for similar concepts', () => {
    const { getByTestId } = render(
      <SimilarConcept
        prefLabel={mockPrefLabel}
        onConceptClick={mockConceptClick}
        id={mockConceptId}
        type={mockTypeForSimilarConcepts}
        hideTooltip={mockHideTooltip}
      />
    );

    getByTestId(mockId).click();
    expect(mockConceptClick).toHaveBeenCalledWith({
      ...mockArgumentObject,
      type: mockTypeForSimilarConcepts
    });
    expect(mockHideTooltip).toHaveBeenCalled();
  });
});
