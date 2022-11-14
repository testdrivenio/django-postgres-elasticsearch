import React from 'react';

import { Pagination } from 'react-bootstrap';

function Paginator ({ loadNextPage, loadPreviousPage, params, results }) {
  const currentPage = Math.floor(params.offset / params.limit) + 1;
  const totalPages = Math.ceil((results?.count ?? 0) / 10);

  return (
    <div className='align-items-center d-flex flex-row'>
      <Pagination className='p-2'>
        <Pagination.First 
          disabled={results?.previous === null} 
          onClick={loadPreviousPage}
        />
        <Pagination.Last 
          disabled={results?.next === null} 
          onClick={loadNextPage}
        />
      </Pagination>
      <p className='text-muted'>
        {currentPage} of {totalPages} pages
      </p>
    </div>
  );
}

export default Paginator;
