import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { usePagination } from '../../../../utils/hooks/usePagination';

jest.mock('../../../../utils/hooks/usePagination');

import FeedPreview from '../FeedPreview';

const mockId = 'feedPreviewContainer';
const classNameTime = 'time-period-container';
const classNameTeasers = 'articles .articles-teasers';
const classNamePagination = 'articles-pagination';
const classNameFeedPreview = 'feed-preview';

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    location: {
      pathname: '/query-builder/id/preview'
    },
    push: mockPush
  })
}));

const mockArticles = {
  items: [
    {
      uuid: 'f0317022-f13e-11e2-b753-00144feabdc00',
      title: 'F1 owner CVC Capital raises €10.5bn for European buyouts 0',
      standfirst:
        'Fundraising ends as Europe\'s new rules on market funds come in',
      main_image: [Object],
      web_url:
        'https://www.ft.com/content/f0317022-f13e-11e2-b753-00144feabdc0',
      type: 'article',
      published_date: '2013-07-08T18:04:41.000Z'
    },
    {
      uuid: 'f0317022-f13e-11e2-b753-00144feabdc01',
      title: 'F1 owner CVC Capital raises €10.5bn for European buyouts 1',
      standfirst:
        'Fundraising ends as Europe\'s new rules on market funds come in',
      main_image: [Object],
      web_url:
        'https://www.ft.com/content/f0317022-f13e-11e2-b753-00144feabdc0',
      type: 'article',
      published_date: '2013-07-08T18:04:41.000Z'
    }
  ],
  period: {
    from: '2013-07-08T18:04:41.000Z',
    to: '2013-07-23T18:04:41.000Z'
  }
};
const mockExpression = {
  operands: [
    {
      type: 'type'
    }
  ]
};

const pleaseBuildAQueryText = 'Please build a query in order to see results!';

describe('Test FeedPreview component', () => {
  beforeEach(() => {
    act(() => {
      usePagination.mockReturnValue(({
        isPaged: true,
        pageItems: [
          {
            uuid: 'f0317022-f13e-11e2-b753-00144feabdc00',
            title: 'F1 owner CVC Capital raises €10.5bn for European buyouts 0',
            standfirst:
              'Fundraising ends as Europe\'s new rules on market funds come in',
            main_image: [Object],
            web_url:
              'https://www.ft.com/content/f0317022-f13e-11e2-b753-00144feabdc0',
            type: 'article',
            published_date: '2013-07-08T18:04:41.000Z'
          },
          {
            uuid: 'f0317022-f13e-11e2-b753-00144feabdc01',
            title: 'F1 owner CVC Capital raises €10.5bn for European buyouts 1',
            standfirst:
              'Fundraising ends as Europe\'s new rules on market funds come in',
            main_image: [Object],
            web_url:
              'https://www.ft.com/content/f0317022-f13e-11e2-b753-00144feabdc0',
            type: 'article',
            published_date: '2013-07-08T18:04:41.000Z'
          }
        ],
        setItemList: jest.fn(),
        currentPage: 1,
        setCurrentPage: jest.fn(),
        totalPages: 1
      }));
    });
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    const { getByTestId } = render(<FeedPreview />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('FeedPreview renders feed children correctly when not loading feed', () => {
    const { getByTestId } = render(<FeedPreview feed={mockArticles} />);

    expect(getByTestId(mockId).querySelector(`.${classNameTime}`)).toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${classNameTeasers}`)).toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${classNamePagination}`)).toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${classNameFeedPreview}`)).toBeInTheDocument();
  });

  it('FeedPreview renders feed children correctly when loading feed', () => {
    const { getByTestId } = render(<FeedPreview feed={mockArticles} isLoading={true} />);

    expect(getByTestId(mockId).querySelector(`.${classNameFeedPreview}`)).not.toBeInTheDocument();
  });

  it('FeedPreview renders expression children correctly', () => {
    const { queryByText } = render(<FeedPreview feed={mockArticles} expression={mockExpression} />);
    expect(queryByText(pleaseBuildAQueryText)).not.toBeInTheDocument();
  });
});
