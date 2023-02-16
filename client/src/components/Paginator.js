import React from 'react';

import { Pagination } from 'react-bootstrap';

function Paginator ({ results, search }) {
  const currentPage = getCurrentPage();
  const totalPages = Math.ceil((results?.count ?? 0) / 10);

  function parseUrlSearchParams (urlString) {
    const url = new URL(urlString);
    const urlSearchParams = url.searchParams;
    return {
      country: urlSearchParams.get('country'),
      limit: parseInt(urlSearchParams.get('limit') ?? 0),
      offset: parseInt(urlSearchParams.get('offset') ?? 0),
      points: urlSearchParams.get('points'),
      query: urlSearchParams.get('query'),
    };
  };

  async function loadPreviousPage () {
    if (results?.previous !== null) {
      const urlSearchParams = parseUrlSearchParams(results?.previous);
      await search(urlSearchParams);
    }
  };

  async function loadNextPage () {
    if (results?.next !== null) {
      const urlSearchParams = parseUrlSearchParams(results?.next);
      await search(urlSearchParams);
    }
  };

  function getCurrentPage () {
    if (results?.previous !== null) {
      const { limit, offset } = parseUrlSearchParams(results?.previous);
      return Math.floor((offset + limit) / limit) + 1;
    }
    if (results?.next !== null) {
      const { limit, offset } = parseUrlSearchParams(results?.next);
      return Math.floor((offset - limit) / limit) + 1;
    }
    return 1;
  };

  return (
    <div className='align-items-center d-flex flex-row'>
      <Pagination className='p-2'>
        <Pagination.First 
          data-cy='previous-button'
          disabled={results?.previous === null}
          onClick={loadPreviousPage}
        />
        <Pagination.Last 
          data-cy='next-button'
          disabled={results?.next === null} 
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
