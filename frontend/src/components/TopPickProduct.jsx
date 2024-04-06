import React from "react";
import { Button } from "react-bootstrap";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

const product = {
  _id: "65d73e2d2a043e0d654f6724",
  user: "65d73e2d2a043e0d654f671b",
  name: "Amazon Echo Dot 3rd Generation",
  image: "/images/alexa.jpg",
  brand: "Amazon",
  category: "Electronics",
  description:
    "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
  rating: 4,
  numReviews: 12,
  price: 29.99,
  countInStock: 0,
  reviews: [],
  __v: 0,
  createdAt: "2024-02-22T12:29:33.900Z",
  updatedAt: "2024-03-23T10:11:39.673Z",
  isFeatured: false,
  soldAmount: 24,
};

const TopPickProduct = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <>
      <h2>Top Pick's for Today</h2>
      <div className="toppick-container">
        <div className="toppick-leftbox">
          <img className="toppick-img" src={product.image} alt={product.name} />
        </div>
        <div className="toppick-rightbox">
          <div className="toppick-wrapper">
            <span>Exclusively Avaliable on Store</span>
            <h2>{product.name}</h2>            
            <Rating value={product.rating} text={`$ ${product.price}`} clsName="price_text" />
            <p>{product.description}</p>
            <Button variant="dark" onClick={handleClick}>
              Buy Now <FaLongArrowAltRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopPickProduct;
