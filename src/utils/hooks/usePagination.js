import { useState } from 'react';

const shouldDisplayItem = (currentPage, maxPerPage, index) => {
  const currentPageStart = ((currentPage - 1) * maxPerPage) + 1;
  const currentPageEnd = currentPage * maxPerPage;

  return (index + 1) >= currentPageStart && (index + 1) <= currentPageEnd;
};

export const usePagination = (itemList, maxItemsPerPage = 10) => {
  const [items, setItems] = useState(itemList);
  const [currentPage, setCurrentPage] = useState(1);

  const isPaged = items.length > maxItemsPerPage;
  const totalPages = Math.ceil(items.length / maxItemsPerPage);

  const pageItems = items.filter((value, index) => {
    if (!isPaged) {
      return true;
    }

    return shouldDisplayItem(currentPage, maxItemsPerPage, index);
  });

  const setItemList = itemsList => {
    setCurrentPage(1);
    setItems(itemsList);
  };

  return {
    setItemList,
    isPaged,
    currentPage,
    setCurrentPage,
    pageItems,
    totalPages
  };
};
