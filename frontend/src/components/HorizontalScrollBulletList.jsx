import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBrands } from "../slices/filterSlice";

const HorizontalScrollBulletList = ({ items }) => {
  let data;
  if (items && items.length > 0) {
    data = ['All',...items];
  }
  console.log(data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (item) => {
    if (item !== "All") {
      dispatch(setBrands(item));
    }
    navigate("/products?redirect=/brand");
  };
  return (
    <>
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
    </>
  );
};

export default HorizontalScrollBulletList;
