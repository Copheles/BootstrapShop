import React from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const HorizontalScrollList = ({ data, listTitle, seeMore }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <div className="horizontal-scroll-header">
        <h2>{listTitle}</h2>
        <Link to={seeMore.link} id="see-more-link">
          {seeMore.title} <FaLongArrowAltRight />
        </Link>
      </div>
      <div className="horizontal-scroll-container">
        {data?.map((item) => (
          <Card
            key={item._id}
            className="scroll-item card-with-aspect-ratio"
            onClick={() => handleClick(item._id)}
          >
            <div className="aspect-ratio-wrapper">
              <Card.Img variant="top" src={item.image} className="card-img" />
            </div>
            <Card.Body>
              <Card.Title className="custom_card_title">
                <Link to="/">{item.name}</Link>
              </Card.Title>
              <Card.Text className="custom_card_text">${item.price}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default HorizontalScrollList;
