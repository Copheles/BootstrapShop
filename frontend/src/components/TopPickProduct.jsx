import React from "react";
import { Button } from "react-bootstrap";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import recentlyViewedToLocalStorage from "../utils/recentlyViewedToLocalStorage";

const TopPickProduct = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    recentlyViewedToLocalStorage(product);
    navigate(`/products/${product?._id}`);
  };

  return (
    <>
      <h2 className="mt-2">Top Pick's for Today</h2>
      <div className="toppick-container cursor-pointer" onClick={handleClick}>
        <div className="toppick-leftbox">
          <img
            className="toppick-img"
            src={product?.image}
            alt={product?.name}
          />
        </div>
        <div className="toppick-rightbox">
          <div className="toppick-wrapper">
            <span className="mb-2" style={{

            }}>Exclusively Avaliable on Store</span>
            <h2 className="mb-0">{product?.name}</h2>
            <Rating
              value={product?.rating}
              text={`$ ${product?.price}`}
              clsName="price_text"
            />

            <p>{product?.description}</p>
            <button
              variant="dark"
              onClick={handleClick}
              className="btn-buy-now"
            >
              Buy Now <FaLongArrowAltRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopPickProduct;
