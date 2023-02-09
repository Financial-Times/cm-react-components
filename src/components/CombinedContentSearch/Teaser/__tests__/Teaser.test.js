import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Teaser from '../Teaser';

const mockId = 'teaser';
const mockDefaultClassName = 'teaser-container';
const mockAdditionalClassName = 'teaserAdditionalClassName';
const mockLinkUrl = 'mock-link-url';

const mockImageSrc = 'imageSrc';
const imageClassName = 'teaser-image';
const mockTopic = 'Topic';
const topicClassName = 'topic';
const mockHeading = 'Heading';
const headingClassName = 'heading';
const mockContent = 'Content';
const contentClassName = 'content';

describe('Teaser component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<Teaser />);

    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('Teaser has default className', () => {
    const { getByTestId } = render(<Teaser />);
    expect(getByTestId(mockId)).toHaveClass(mockDefaultClassName);
  });

  it('Teaser has additional className when prop is passed', () => {
    const { getByTestId } = render(<Teaser className={mockAdditionalClassName} />);
    expect(getByTestId(mockId)).toHaveClass(mockAdditionalClassName);
  });

  it('Teaser doesnt render image, topic, heading, content when props are not passed', () => {
    const { getByTestId } = render(<Teaser />);
    expect(getByTestId(mockId).querySelector(`.${imageClassName}`)).not.toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${topicClassName}`)).not.toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${headingClassName}`)).not.toBeInTheDocument();
    expect(getByTestId(mockId).querySelector(`.${contentClassName}`)).not.toBeInTheDocument();
  });

  it('Teaser renders image when `imageSrc` is truthy', () => {
    const { getByTestId } = render(<Teaser imageSrc={mockImageSrc} />);
    expect(getByTestId(mockId).querySelector(`.${imageClassName}`)).toBeInTheDocument();
  });

  it('Teaser renders topic when prop is passed', () => {
    const { getByTestId } = render(<Teaser topic={mockTopic} />);
    expect(getByTestId(mockId).querySelector(`.${topicClassName}`)).toBeInTheDocument();
  });

  it('Teaser renders heading when prop is passed', () => {
    const { getByTestId } = render(<Teaser heading={mockHeading} />);
    expect(getByTestId(mockId).querySelector(`.${headingClassName}`)).toBeInTheDocument();
  });

  it('Teaser renders content when prop is passed', () => {
    const { getByTestId } = render(<Teaser content={mockContent} />);
    expect(getByTestId(mockId).querySelector(`.${contentClassName}`)).toBeInTheDocument();
  });

  it('Teaser is a div if `linkUrl` prop is not passed', () => {
    const { getByTestId } = render(<Teaser />);
    expect(getByTestId(mockId).tagName.toLowerCase()).toBe('div');
    expect(getByTestId(mockId)).not.toHaveAttribute('target');
    expect(getByTestId(mockId)).not.toHaveAttribute('href');
  });

  it('Teaser is a link if `linkUrl` prop is passed', () => {
    const { getByTestId } = render(<Teaser linkUrl={mockLinkUrl} />);
    expect(getByTestId(mockId).tagName.toLowerCase()).toBe('a');
    expect(getByTestId(mockId)).toHaveAttribute('target', '_blank');
    expect(getByTestId(mockId)).toHaveAttribute('href', mockLinkUrl);
  });
});
