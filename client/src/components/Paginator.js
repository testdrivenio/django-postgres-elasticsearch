import React from 'react';

import { Pagination } from 'react-bootstrap';

function Paginator ({ paginatedData, search /* changed */ }) {
  const { currentPage, totalPages } = getPageData();

  function parseUrlSearchParams (urlString) {
    const url = new URL(urlString);
    const urlSearchParams = url.searchParams;
    return {
      country: urlSearchParams.get('country'),
      limit: parseInt(urlSearchParams.get('limit') ?? 10),
      offset: parseInt(urlSearchParams.get('offset') ?? 0),
      points: urlSearchParams.get('points'),
      query: urlSearchParams.get('query'),
    };
  };

  function getPageData () {
    if (paginatedData?.previous !== null) {
      const { limit, offset } = parseUrlSearchParams(paginatedData?.previous);
      return {
        currentPage: Math.floor((offset + limit) / limit) + 1,
        totalPages: Math.ceil((paginatedData?.count ?? 0) / limit),
      };
    }
    else if (paginatedData?.next !== null) {
      const { limit, offset } = parseUrlSearchParams(paginatedData?.next);
      return {
        currentPage: Math.floor((offset - limit) / limit) + 1,
        totalPages: Math.ceil((paginatedData?.count ?? 0) / limit),
      };
    }
    return { currentPage: 1, totalPages: 1 };
  };

  // new
  async function loadPreviousPage () {
    if (paginatedData?.previous !== null) {
      const urlSearchParams = parseUrlSearchParams(paginatedData?.previous);
      await search(urlSearchParams);
    }
  };

  // new
  async function loadNextPage () {
    if (paginatedData?.next !== null) {
      const urlSearchParams = parseUrlSearchParams(paginatedData?.next);
      await search(urlSearchParams);
    }
  };

  return (
    <div className='align-items-center d-flex flex-row'>
      <Pagination className='p-2'>
        {/* changed */}
        <Pagination.Prev
          data-cy='previous-button'
          disabled={paginatedData?.previous === null}
          onClick={loadPreviousPage}
        />
        {/* changed */}
        <Pagination.Next
          data-cy='next-button'
          disabled={paginatedData?.next === null}
          onClick={loadNextPage}
        />
      </Pagination>
      <p className='text-muted' data-cy='page-count'>
        {currentPage} of {totalPages} pages
      </p>
    </div>
  );
}

export default Paginator;
