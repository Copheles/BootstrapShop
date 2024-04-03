import { Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setPageNumber } from "../slices/filterSlice";

const PaginationCustom = ({ pages, page }) => {
  const dispatch = useDispatch();

  const handlePageClick = (pageNumber) => {
    dispatch(setPageNumber(pageNumber));
  };

  const renderPaginationItems = () => {
    const pageRange = 3; // Number of pagination items to show around the current page

    const paginationItems = [];

    // Calculate start and end page numbers
    let startPage = Math.max(1, page - pageRange);
    let endPage = Math.min(pages, page + pageRange);

    // Adjust start and end page numbers if near the beginning or end of the range
    if (page - startPage < pageRange) {
      endPage = Math.min(pages, startPage + 2 * pageRange);
    }
    if (endPage - page < pageRange) {
      startPage = Math.max(1, endPage - 2 * pageRange);
    }

    // Add First, Previous, Next, and Last buttons
    if (page > 1) {
      paginationItems.push(
        <Pagination.First key="first" onClick={() => handlePageClick(1)} />,
        <Pagination.Prev key="prev" onClick={() => handlePageClick(page - 1)} />
      );
    }

    // Add pagination items
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === page}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Add Next and Last buttons
    if (page < pages) {
      paginationItems.push(
        <Pagination.Next
          key="next"
          onClick={() => handlePageClick(page + 1)}
        />,
        <Pagination.Last key="last" onClick={() => handlePageClick(pages)} />
      );
    }

    return paginationItems;
  };

  return (
    pages > 1 && (
      <Pagination className="mt-5 pagination-custom">
        {/* Render pagination items */}
        {renderPaginationItems()}
      </Pagination>
    )
  );
};

export default PaginationCustom;
