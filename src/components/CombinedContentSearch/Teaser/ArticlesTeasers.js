import React from 'react';
import PropTypes from 'prop-types';

import Teaser from './Teaser';

import { dateToMonthDDYYYY } from '../../../utils/helpers';

const ArticlesTeasers = ({
  date = '',
  articles = []
}) => {
  const formattedDate = date ? dateToMonthDDYYYY(date) : '';

  return (
    <div className="articles-teasers container" data-testid="articlesTeasers">
      {articles.length > 0 && (
        <>
          <div className="date">{formattedDate}</div>
          <div className="teasers">
            {articles.map((article, index) => {
                const {
                  main_image,
                  type,
                  title,
                  standfirst,
                  web_url
                } = article;

                const imageSrc = main_image
                  ? main_image.thumbnail
                  : '';

                return (
                  <Teaser
                    key={`${date}--article-${index}`}
                    imageSrc={imageSrc}
                    topic={type}
                    heading={title}
                    content={standfirst}
                    linkUrl={web_url}
                  />
                );
              }
            )}
          </div>
        </>
      )}
    </div>
  );
};

ArticlesTeasers.propTypes = {
  date: PropTypes.string,
  articles: PropTypes.arrayOf(PropTypes.object)
};

export default ArticlesTeasers;
