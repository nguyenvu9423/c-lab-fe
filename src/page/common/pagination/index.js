import * as React from 'react';

export function usePagination({ totalCount, countPerPage }) {
  const [activePage, setActivePage] = React.useState(1);
  const totalPages = Math.floor((totalCount - 1) / countPerPage) + 1;
  const firstIndex = (activePage - 1) * countPerPage;
  const lastIndex = activePage * countPerPage - 1;
  return { totalPages, activePage, setActivePage, firstIndex, lastIndex };
}
