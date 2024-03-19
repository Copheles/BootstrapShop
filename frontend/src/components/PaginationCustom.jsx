import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";

const PaginationCustom = ({
  pages,
  page,
  link,
  maxPages = 5, // Maximum number of pages to show in pagination
}) => {
  const [displayPages, setDisplayPages] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(pages);
    const startPage = Math.max(
      1,
      Math.min(page - Math.floor(maxPages / 2), totalPages - maxPages + 1)
    );
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    const pagesArray = [];
    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }
    setDisplayPages(pagesArray);
  }, [page, pages, maxPages]);

  return (
    pages > 1 && (
      <Pagination className="mt-5 pagination-custom">
        <LinkContainer to={`${link}/${1}`}>
          <Pagination.First disabled={page === 1} />
        </LinkContainer>
        <LinkContainer to={`${link}/${Math.max(1, page - 1)}`}>
          <Pagination.Prev disabled={page === 1} />
        </LinkContainer>
        {displayPages.map((p) => (
          <LinkContainer key={p} to={`${link}/${p}`}>
            <Pagination.Item active={p === page}>{p}</Pagination.Item>
          </LinkContainer>
        ))}
        <LinkContainer to={`${link}/${Math.min(pages, page + 1)}`}>
          <Pagination.Next disabled={page === pages} />
        </LinkContainer>
        <LinkContainer to={`${link}/${pages}`}>
          <Pagination.Last disabled={page === pages} />
        </LinkContainer>
      </Pagination>
    )
  );
};

export default PaginationCustom;
