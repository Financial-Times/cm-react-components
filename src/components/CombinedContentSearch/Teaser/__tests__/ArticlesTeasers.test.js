import React from 'react';
import { cleanup, render } from '@testing-library/react';

import ArticlesTeasers from '../ArticlesTeasers';

const mockId = 'articlesTeasers';
const mockTimestamp = '1597229787437';
const classNameDefault = 'articles-teasers';
const classNameDate = 'date';
const classNameTeasers = 'teasers';
const classNameImages = 'teaser-image';
const mockArticles = [
  {
    main_image: { main_image_thumbnail: 'imageSrc' },
    title: 'title',
    type: 'topic',
    standfirst: 'content'
  }
];
const mockArticlesNoImage = [
  {
    title: 'title',
    type: 'topic',
    standfirst: 'content'
  }
];

describe('Test `ArticlesTeasers` component', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<ArticlesTeasers />);
    expect(getByTestId(mockId)).toBeInTheDocument();
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('ArticlesTeasers has no children when `articles` is not passed', () => {
    const { getByTestId } = render(<ArticlesTeasers />);
    expect(getByTestId(mockId).children.length).toEqual(0);
  });

  it('ArticlesTeasers has children when `articles` are passed', () => {
    const { getByTestId } = render(<ArticlesTeasers articles={mockArticles} />);
    expect(getByTestId(mockId).children.length).toEqual(2);
    expect(getByTestId(mockId).querySelector(`.${classNameDefault} .${classNameDate}`)).toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${classNameDefault} .${classNameTeasers}`)).toBeInTheDocument();
  });

  it('ArticlesTeasers date is empty when date is not passed', () => {
    const { getByTestId } = render(<ArticlesTeasers articles={mockArticles} />);
    expect(getByTestId(mockId).querySelector(`.${classNameDefault} .${classNameDate}`)).toHaveTextContent('');
  });

  it('ArticlesTeasers date is not empty when date is passed', () => {
    const { getByTestId } = render(<ArticlesTeasers articles={mockArticles} date={mockTimestamp} />);
    expect(getByTestId(mockId).querySelector(`.${classNameDefault} .${classNameDate}`)).not.toHaveTextContent('');
  });

  it('ArticlesTeasers renders correct images', () => {
    const { getByTestId } = render(<ArticlesTeasers articles={mockArticlesNoImage} date={mockTimestamp} />);
    expect(getByTestId(mockId).querySelector(`.${classNameDefault} .${classNameImages}`)).not.toBeInTheDocument();
  });
});
