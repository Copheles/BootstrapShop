import { Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import recentlyViewedToLocalStorage from "../utils/recentlyViewedToLocalStorage";

const Product = ({ product }) => {
  const handleClick = (item) => {
    recentlyViewedToLocalStorage(item)
  };

  return (
    <Card className="my-3 p-3 rounded border-0" style={{ height: "100%" }}>
      <Link
        to={`/products/${product._id}?redirect=/products`}
        onClick={() => handleClick(product)}
      >
        <div className="aspect-ratio-wrapper">
          <Card.Img variant="top" src={product.image} className="card-img" />
        </div>
      </Link>
      <CardBody>
        <Link
          to={`/products/${product._id}?redirect=/products`}
          onClick={() => handleClick(product)}
        >
          <Card.Title className="custom_card_title">{product.name}</Card.Title>
        </Link>
        <Card.Text as="div" className="custom_card_text mb-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} ${
              product.numReviews > 1 ? "reviews" : "review"
            }`}
            clsName="custom_card_text"
          />
        </Card.Text>
        <Card.Text as="h5" className="custom_card_text">
          ${product.price}
        </Card.Text>
      </CardBody>
    </Card>
  );
};

export default Product;
