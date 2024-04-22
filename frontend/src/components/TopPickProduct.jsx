import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import recentlyViewedToLocalStorage from "../utils/recentlyViewedToLocalStorage";
import { Placeholder } from "react-bootstrap";

const TopPickProduct = ({ product, isLoading }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    recentlyViewedToLocalStorage(product);
    navigate(`/products/${product?._id}`);
  };

  return (
    <>
      <h2 className="mt-2">Top Pick's for Today</h2>
      {isLoading ? (
        <div className="toppick-container">
          <Placeholder className="toppick-leftbox">
            <Placeholder className="toppick-img" />
          </Placeholder>
          <Placeholder className="toppick-rightbox">
            <Placeholder className="toppick-wrapper">
              <div>
                <Placeholder xs={10} />
              </div>
              <div className="mb-0">
                <Placeholder xs={12} />
              </div>
              <h2 className="mb-0">
                <Placeholder xs={12} />
              </h2>
              <h2 className="mb-0">
                <Placeholder xs={12} />
              </h2>
            </Placeholder>
          </Placeholder>
        </div>
      ) : (
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
              <span>Exclusively Avaliable on Store</span>
              <h2 className="mb-0">{product?.name}</h2>
              <Rating
                value={product?.rating}
                text={`$ ${product?.price}`}
                clsName="price_text"
              />
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
      )}
    </>
  );
};

export default TopPickProduct;
