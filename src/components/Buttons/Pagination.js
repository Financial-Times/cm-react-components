import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Pagination = ({
  changePageHandler,
  currentPage,
  totalPages,
  maxPagesToShow = 6,
  startingPages = 3,
  endingPages = 3,
  className: additionalClassname,
  buttonsProps
}) => {
  let pages = null;

  /**
   * Generates and returns Button components with number by given `start` and `end`
   * @param {number} startNumber
   * @param {number}  endNumber
   * @returns {[*]}
   */
  const getItems = (startNumber, endNumber) => {
    const itemsList = [];

    for (let number = startNumber; number <= endNumber; number += 1) {
      itemsList.push(
        <Button
          key={number}
          onClick={() => changePageHandler(number)}
          selected={number === currentPage}
          {...buttonsProps}
        >
          {number}
        </Button>
      );
    }

    return itemsList;
  };

  // Constructing Pagination items based on different cases of
  // totalPages; currentPage, maxPagesToShow; startingPages; endingPages
  if (totalPages <= maxPagesToShow) {
    pages = getItems(1, totalPages);
  } else if (currentPage <= startingPages) {
    pages = getItems(1, startingPages);
    pages.push(<span key="starting-dots" className="starting-dots">...</span>);
    pages = pages.concat(getItems(totalPages, totalPages));
  } else if (currentPage > 3 && currentPage < totalPages - endingPages + 1) {
    pages = getItems(1, 1);
    pages.push(<span key="starting-dots" className="starting-dots">...</span>);
    pages = pages.concat(getItems(currentPage - 1, currentPage - 1));
    pages = pages.concat(getItems(currentPage, currentPage));
    pages = pages.concat(getItems(currentPage + 1, currentPage + 1));
    pages.push(<span key="ending-dots" className="ending-dots">...</span>);
    pages = pages.concat(getItems(totalPages, totalPages));
  } else {
    pages = getItems(1, 1);
    pages.push(<span key="ending-dots" className="ending-dots">...</span>);
    pages = pages.concat(getItems(totalPages - endingPages + 1, totalPages));
  }

  const prevPageButton = currentPage > 1 && (
    <Button
      onClick={() => changePageHandler(currentPage - 1)}
      icon="arrow-left"
      className="arrow-prev"
      {...buttonsProps}
    />
  );
  const nextPageButton = currentPage < totalPages && (
    <Button
      onClick={() => changePageHandler(currentPage + 1)}
      icon="arrow-right"
      className="arrow-next"
      {...buttonsProps}
    />
  );

  let paginationClasses = 'o-buttons-pagination';
  if (additionalClassname) {
    paginationClasses += ` ${additionalClassname}`;
  }

  return (
    <div className={paginationClasses} data-testid="paginationContainer">
      {prevPageButton}
      {pages}
      {nextPageButton}
    </div>
  );
};

Pagination.propTypes = {
  changePageHandler: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  maxPagesToShow: PropTypes.number,
  startingPages: PropTypes.number,
  endingPages: PropTypes.number,
  className: PropTypes.string,
  buttonsProps: PropTypes.objectOf(PropTypes.bool)
};

export default Pagination;
