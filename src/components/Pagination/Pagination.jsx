import Pagination from '@mui/material/Pagination';
import { useState, useEffect } from 'react';

function usePagination({ currentPage, totalPages, onPageChange }) {
  const [page, setPage] = useState(currentPage);

  const handleClick = (_, pageNumber) => {
    setPage(pageNumber);
    onPageChange(pageNumber);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={handleClick}
      variant="outlined"
      shape="rounded"
      siblingCount={1}
      boundaryCount={1}
      showFirstButton
      showLastButton
      onClick={() => {
        if (page > 1) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (page < totalPages) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
    />
  );
}

export default usePagination;
