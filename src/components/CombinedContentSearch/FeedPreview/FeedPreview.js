import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import ArticlesTeasers from '../../../components/CombinedContentSearch/Teaser/ArticlesTeasers';
import TimePeriod from '../../../components/CombinedContentSearch/TimePeriod/TimePeriod';
import PreviewFilterExpression from '../../../components/CombinedContentSearch/FilterExpression/PreviewFilterExpression';
import Button from '../../../components/Buttons/Button';
import Pagination from '../../../components/Buttons/Pagination';
import LoaderScreen from '../../../components/Loader/LoaderScreen';

import { usePagination } from '../../../utils/hooks/usePagination';
import { sortArrayOfObjects } from '../../../utils/helpers';
import { APP_ROUTES } from '../../../utils/constants';

const FeedPreview = ({
  expression,
  feed,
  isLoading
}) => {
  const history = useHistory();

  const [pageItemsToRender, setPageItemsToRender] = useState(null);
  const {
    isPaged,
    currentPage,
    setCurrentPage,
    pageItems,
    setItemList,
    totalPages
  } = usePagination([], 5);

  // On mounting of the component calls method for setting sorted `itemList` in pagination
  useEffect(() => {
    feed && feed.items && setItemList(sortArrayOfObjects(feed.items, 'published_date'));
  }, [JSON.stringify(feed)]);

  // Construct object of type:
  // { date: [article] }
  // so it could be passed to ArticlesTeasers component.
  // Invoked on every change of `pageItems`
  useEffect(() => {
    const newPageItems = {};
    pageItems.forEach(item => {
      if (newPageItems[item.published_date]) {
        newPageItems[item.published_date].push(item);
      } else {
        newPageItems[item.published_date] = [item];
      }
    });

    setPageItemsToRender(newPageItems);
  }, [JSON.stringify(pageItems)]);

  const returnToBuilder = () => {
    const path = history.location.pathname;
    // Length of 'preview' route + 1 (because of '/' in front)
    const previewLength = APP_ROUTES.queryBuilderPreview.length + 1;
    const newPath = path.slice(0, path.length - previewLength);
    history.push(newPath);
  };

  const subTitleText = feed && feed.items && feed.items.length > 0
    ? `${feed.items.length} articles match your query. Good job!`
    : 'No articles match your query. For better results, please refine your search.';

  return (
    <div className="feed-preview-container" data-testid="feedPreviewContainer">
      <div className="container heading-container">
        <h1>Feed preview</h1>
        <Button
          primary
          mono
          big
          onClick={returnToBuilder}
        >
          Return to builder
        </Button>
      </div>
      {isLoading
        ? <LoaderScreen />
        : (
          <div className="container feed-preview">
            <div className="filters">
              <h2>Filters</h2>
              <div className="filters-content">
                {feed && feed.period && (
                  <TimePeriod
                    from={feed.period.from}
                    to={feed.period.to}
                  />
                )}
                {expression && expression.operands && expression.operands.length > 0
                  ? <PreviewFilterExpression expression={expression} />
                  : <div>Please build a query in order to see results!</div>
                }
              </div>
            </div>
            <div className="separator" />
            <div className="articles">
              <h2>Feed</h2>
              <p>{subTitleText}</p>
              {pageItemsToRender && Object.keys(pageItemsToRender).map((key, index) => {
                const item = pageItemsToRender[key];

                return (
                  <ArticlesTeasers
                    key={index}
                    date={key}
                    articles={item}
                  />
                );
              })}
              {isPaged && (
                <Pagination
                  className="articles-pagination"
                  totalPages={totalPages}
                  currentPage={currentPage}
                  changePageHandler={setCurrentPage}
                  buttonsProps={{
                    secondary: true
                  }}
                />
              )}
            </div>
          </div>
        )
      }
    </div>
  );
};

FeedPreview.propTypes = {
  expression: PreviewFilterExpression.propTypes.expression,
  feed: PropTypes.object,
  isLoading: PropTypes.bool
};

export default FeedPreview;
