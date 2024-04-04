import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../slices/filterSlice";

const SelectData = () => {
  const { sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <>
      <Form.Select
        size="sm"
        value={sort}
        aria-label="select sorting"
        className="select-sort"
        onChange={(e) => dispatch(setSort(e.target.value))}
      >
        <option value="-createdAt">Newest</option>
        <option value="createdAt">Oldest</option>
        <option value="-rating">Highest Rated</option>
        <option value="-numReviews">Most Reviewed</option>
        <option value="price">Price Low to High</option>
        <option value="-price">Price High to Low</option>
      </Form.Select>
    </>
  );
};

export default SelectData;
