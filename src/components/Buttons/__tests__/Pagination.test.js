import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Pagination from '../Pagination';

const mockId = 'paginationContainer';
const mockTotalPages = 10;
const mockCurrentPage = 1;
const mockChangePageHandler = jest.fn();

const classNameDefault = 'o-buttons-pagination';
const mockClassNameAdditional = 'mockPaginationClassName';

describe('Pagination component test', () => {
  afterEach(() => cleanup(), mockChangePageHandler.mockClear());

  it('component renders without crashing', () => {
    const { getByTestId } = render(
      <Pagination
        totalPages={mockTotalPages}
        currentPage={mockCurrentPage}
        changePageHandler={mockChangePageHandler}
      />
      );
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('Pagination has default classname', () => {
    const { getByTestId } = render(
      <Pagination
        totalPages={mockTotalPages}
        currentPage={mockCurrentPage}
        changePageHandler={mockChangePageHandler}
      />
    );
    expect(getByTestId(mockId)).toHaveClass(classNameDefault);
  });

  it('Pagination has additional classname when prop is passed', () => {
    const { getByTestId } = render(
      <Pagination
        totalPages={mockTotalPages}
        currentPage={mockCurrentPage}
        changePageHandler={mockChangePageHandler}
        className={mockClassNameAdditional}
      />
    );
    expect(getByTestId(mockId)).toHaveClass(mockClassNameAdditional);
  });

  it('Pagination `prev` and `next` buttons handlers are called correctly', () => {
    const { container } = render(
      <Pagination
        totalPages={mockTotalPages}
        currentPage={2}
        changePageHandler={mockChangePageHandler}
      />
    );

    container.querySelector('.arrow-prev').click();
    container.querySelector('.arrow-next').click();
    expect(mockChangePageHandler.mock.calls).toHaveLength(2);
  });

  it('Pagination item with number handlers is called correctly', () => {
    mockChangePageHandler.mockClear();
    const { container } = render(
      <Pagination
        totalPages={mockTotalPages}
        currentPage={mockCurrentPage}
        changePageHandler={mockChangePageHandler}
      />
    );

    container.querySelector('button[aria-selected="false"]').click();
    expect(mockChangePageHandler.mock.calls).toHaveLength(1);
  });

  it('Pagination container has `totalPages + 1` children when `totalPages < maxPagesToShow`', () => {
    const mockLessTotalPages = 5;

    const { getByTestId } = render(
      <Pagination
        totalPages={mockLessTotalPages}
        maxPagesToShow={mockLessTotalPages + 2}
        currentPage={mockCurrentPage}
        changePageHandler={mockChangePageHandler}
      />
    );

    expect((getByTestId(mockId)).children).toHaveLength(mockLessTotalPages + 1);
  });

  it('Pagination have spans with `...` when one of the middle pages is selected', () => {
    const { container } = render(
      <Pagination
        totalPages={mockTotalPages}
        currentPage={mockTotalPages / 2}
        changePageHandler={mockChangePageHandler}
      />
    );

    const dots = container.querySelectorAll('span');
    expect(dots[0]).toHaveClass('starting-dots');
    expect(dots[dots.length - 1]).toHaveClass('ending-dots');
  });

  it('Pagination to have `endingPages + 3 (prevPage + firstItem + dots)` children when last page is selected', () => {
    const mockEndingPages = 3;

    const { getByTestId } = render(
      <Pagination
        totalPages={mockTotalPages}
        currentPage={mockTotalPages}
        endingPages={mockEndingPages}
        changePageHandler={mockChangePageHandler}
      />
    );

    expect((getByTestId(mockId)).children).toHaveLength(mockEndingPages + 3);
  });
});
