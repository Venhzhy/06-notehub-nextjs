"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = (selectedItem: { selected: number }): void => {
    const newPage = selectedItem.selected + 1;
    onPageChange(newPage);
  };

  return (
    <ReactPaginate
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      onPageChange={handlePageChange}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      previousLabel="<"
      nextLabel=">"
    />
  );
};

export default Pagination;