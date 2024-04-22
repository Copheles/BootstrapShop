import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBrands } from "../slices/filterSlice";
import { Placeholder } from "react-bootstrap";

const HorizontalScrollBulletList = ({ items, isLoading }) => {
  let data;
  if (items && items.length > 0) {
    data = ["All", ...items];
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (item) => {
    if (item !== "All") {
      dispatch(setBrands(item));
    }
    navigate("/products?redirect=/brand");
  };
  return isLoading ? (
    <Placeholder
      as="div"
      animation="glow"
      className="horizontal-scroll-container bullet-box"
    >
      <Placeholder xs={1} className="bullet-item-placeholder" />
      <Placeholder xs={1} className="bullet-item-placeholder" />
      <Placeholder xs={1} className="bullet-item-placeholder" />
      <Placeholder xs={1} className="bullet-item-placeholder" />
      <Placeholder xs={1} className="bullet-item-placeholder" />
      <Placeholder xs={1} className="bullet-item-placeholder" />
      <Placeholder xs={1} className="bullet-item-placeholder" />
      <Placeholder xs={1} className="bullet-item-placeholder" />
      <Placeholder xs={1} className="bullet-item-placeholder" />
      <Placeholder xs={1} className="bullet-item-placeholder" />
      <Placeholder xs={1} className="bullet-item-placeholder" />
      <Placeholder xs={1} className="bullet-item-placeholder" />
    </Placeholder>
  ) : (
    <div className="horizontal-scroll-container bullet-box">
      {data?.map((item) => (
        <div
          className="bullet-item"
          key={item}
          onClick={() => handleClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default HorizontalScrollBulletList;
